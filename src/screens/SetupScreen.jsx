import { MiniTower, Icon } from '../components/AirportArt.jsx';
import { PhoneScreen, TopBar, ProgressBar, InputCard, SectionTitle, Button } from '../components/UI.jsx';
import { AREAS } from '../data/sampleData.js';

export function SetupScreen({ data, setData, onContinue, onBack }) {
  return (
    <PhoneScreen bg="sky">
      <TopBar title="שלב 1 מתוך 3" onBack={onBack}/>

      {/* Heading */}
      <div style={{ marginTop: 4, marginBottom: 16, position: 'relative' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.7)', color: 'var(--teal-600)',
          padding: '5px 11px', borderRadius: 999,
          fontSize: 11.5, fontWeight: 600, marginBottom: 10,
          boxShadow: 'inset 0 0 0 1px rgba(45,184,167,0.18)',
        }}>
          <MiniTower size={14} color="#1d9d8d"/>
          פרטי התצפית
        </div>
        <h1 style={{
          margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1.2,
          color: 'var(--ink-900)', letterSpacing: -0.3,
        }}>בואו נסדר את<br/>הבמה לתצפית</h1>
        <p style={{
          margin: '8px 0 0', fontSize: 14, color: 'var(--slate-600)',
          lineHeight: 1.55,
        }}>כמה פרטים קצרים על הצוות והאזור, ואפשר להמשיך לכרטיסי הנוסעים.</p>
      </div>

      <div style={{ marginBottom: 18 }}>
        <ProgressBar value={33}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <InputCard icon={<Icon name="team" size={22}/>}
                   label="שם הצוות" placeholder="לדוגמה: צוות חוויה · משמרת בוקר"
                   value={data.team}
                   onChange={e => setData({ ...data, team: e.target.value })}/>
        <InputCard icon={<Icon name="calendar" size={22}/>}
                   label="תאריך"
                   value={data.date}
                   onChange={e => setData({ ...data, date: e.target.value })}/>
      </div>

      {/* Area selection */}
      <div style={{ marginTop: 22 }}>
        <SectionTitle kicker="אזור התצפית">איפה אנחנו מתצפתים היום?</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {AREAS.map(a => {
            const sel = data.area === a.id;
            return (
              <button key={a.id} onClick={() => setData({ ...data, area: a.id })}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  textAlign: 'right', padding: '12px 12px',
                  borderRadius: 16, border: 0, cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500,
                  background: sel ? 'linear-gradient(180deg, #2db8a7, #1d9d8d)' : '#ffffff',
                  color: sel ? '#fff' : 'var(--ink-800)',
                  boxShadow: sel
                    ? '0 6px 14px rgba(29,157,141,0.28)'
                    : '0 1px 3px rgba(20,56,98,0.06), inset 0 0 0 1px rgba(20,56,98,0.06)',
                  transition: 'all .15s',
                  transform: sel ? 'translateY(-1px)' : 'none',
                }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: sel ? 'rgba(255,255,255,0.18)' : 'rgba(45,184,167,0.10)',
                  color: sel ? '#fff' : '#1d9d8d',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon name={a.icon} size={18}/>
                </div>
                <span style={{ flex: 1 }}>{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Button variant="primary" size="lg" onClick={onContinue}
                disabled={!data.team || !data.area}
                iconRight={<Icon name="arrow-left" size={20}/>}>
          המשך לכרטיסי נוסעים
        </Button>
      </div>
    </PhoneScreen>
  );
}
