import { useState, useCallback } from 'react';
import { IOSDevice } from './components/IOSFrame.jsx';
import { LandingScreen } from './screens/LandingScreen.jsx';
import { SetupScreen } from './screens/SetupScreen.jsx';
import { CardsScreen } from './screens/CardsScreen.jsx';
import { WizardScreen } from './screens/WizardScreen.jsx';
import { SummaryScreen, PassengerDetailScreen } from './screens/SummaryScreen.jsx';
import { INITIAL_SETUP, newPassenger } from './data/sampleData.js';

const FRAME_W = 390;
const FRAME_H = 844;

function App() {
  const [screen, setScreen] = useState('landing');
  const [direction, setDirection] = useState('forward');
  const [setup, setSetup] = useState({ ...INITIAL_SETUP });
  const [passengers, setPassengers] = useState([]);
  const [activePassengerId, setActivePassengerId] = useState(null);
  const [wizardStep, setWizardStep] = useState(1);

  const navigate = useCallback((to, dir = 'forward') => {
    setDirection(dir);
    setScreen(to);
  }, []);

  const activePassenger = passengers.find(p => p.id === activePassengerId) || null;
  const activePassengerIndex = passengers.findIndex(p => p.id === activePassengerId) + 1;

  const updatePassenger = useCallback((updated) => {
    setPassengers(prev => prev.map(p => p.id === updated.id ? updated : p));
  }, []);

  const completeWizard = useCallback(() => {
    if (!activePassengerId) return;
    setPassengers(prev => prev.map(p => {
      if (p.id !== activePassengerId) return p;
      const s1 = p.step1 || {};
      const s2 = p.step2 || {};
      const s3 = p.step3 || {};
      const s9 = p.step9 || {};
      const emotions = s3.emotions || [];
      const impact = emotions.includes('מרוצה') || emotions.includes('מוקל')
        ? 'חיובי'
        : emotions.includes('מתוסכל') || emotions.includes('כועס') || emotions.includes('לחוץ')
        ? 'שלילי'
        : 'ניטרלי';
      return {
        ...p,
        status: 'done',
        situation: s1.interaction || '',
        moment: (s2.types || [])[0] || '',
        impact,
        summary: s9.sentence || '',
      };
    }));
    navigate('cards', 'back');
  }, [activePassengerId, navigate]);

  const saveAndExit = useCallback(() => {
    if (!activePassengerId) return;
    setPassengers(prev => prev.map(p => {
      if (p.id !== activePassengerId) return p;
      const progress = computeProgress(p);
      const status = progress >= 9 ? 'almost' : progress > 0 ? 'in-progress' : 'not-started';
      return { ...p, status };
    }));
    navigate('cards', 'back');
  }, [activePassengerId, navigate]);

  const openPassenger = useCallback((id) => {
    const p = passengers.find(x => x.id === id);
    if (!p) return;
    setActivePassengerId(id);
    if (p.status === 'done') {
      navigate('passenger-detail');
    } else {
      setWizardStep(1);
      navigate('wizard');
    }
  }, [passengers, navigate]);

  const addPassenger = useCallback(() => {
    const p = newPassenger();
    setPassengers(prev => [...prev, p]);
    setActivePassengerId(p.id);
    setWizardStep(1);
    navigate('wizard');
  }, [navigate]);

  const animClass = direction === 'forward' ? 'screen-enter-forward' : 'screen-enter-back';

  const renderScreen = () => {
    switch (screen) {
      case 'landing':
        return (
          <LandingScreen
            onStart={() => navigate('setup')}
            onHow={() => {}}
          />
        );

      case 'setup':
        return (
          <SetupScreen
            data={setup}
            setData={setSetup}
            onBack={() => navigate('landing', 'back')}
            onContinue={() => navigate('cards')}
          />
        );

      case 'cards':
        return (
          <CardsScreen
            setup={setup}
            passengers={passengers}
            onBack={() => navigate('setup', 'back')}
            onOpen={openPassenger}
            onAdd={addPassenger}
            onSummary={() => navigate('summary')}
          />
        );

      case 'wizard':
        return activePassenger ? (
          <WizardScreen
            passengerIndex={activePassengerIndex}
            step={wizardStep}
            passenger={activePassenger}
            setPassenger={updatePassenger}
            onBack={() => navigate('cards', 'back')}
            onPrev={() => wizardStep > 1 && setWizardStep(s => s - 1)}
            onNext={() => {
              if (wizardStep < 9) {
                setWizardStep(s => s + 1);
              } else {
                completeWizard();
              }
            }}
            onSaveAndExit={saveAndExit}
          />
        ) : <CardsScreen setup={setup} passengers={passengers} onBack={() => navigate('setup', 'back')} onOpen={openPassenger} onAdd={addPassenger} onSummary={() => navigate('summary')}/>;

      case 'passenger-detail':
        return activePassenger ? (
          <PassengerDetailScreen
            passenger={activePassenger}
            index={activePassengerIndex}
            onBack={() => navigate('cards', 'back')}
            onEdit={() => {
              setWizardStep(1);
              navigate('wizard');
            }}
          />
        ) : null;

      case 'summary':
        return (
          <SummaryScreen
            setup={setup}
            passengers={passengers}
            onBack={() => navigate('cards', 'back')}
            onDownload={() => {}}
            onShare={() => {}}
            onSaveDraft={() => {}}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100svh',
      padding: '20px',
    }}>
      <IOSDevice width={FRAME_W} height={FRAME_H}>
        <div
          key={screen}
          className={animClass}
          style={{
            width: '100%', height: '100%',
            position: 'absolute', inset: 0,
          }}
        >
          {renderScreen()}
        </div>
      </IOSDevice>
    </div>
  );
}

function computeProgress(p) {
  let count = 0;
  if (p.step1?.where) count++;
  if (p.step2?.detected) count++;
  if ((p.step3?.needs || []).length) count++;
  if (p.step4?.identified) count++;
  if (Object.values(p.step5?.causes || {}).some(l => l.length)) count++;
  if (p.step6?.overall) count++;
  if (p.step7?.has) count++;
  if (p.step8?.action) count++;
  if (p.step9?.sentence) count++;
  return count;
}

export default App;
