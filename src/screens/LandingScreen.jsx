import { AirportScene, MiniTower, Icon } from '../components/AirportArt.jsx';
import { Button } from '../components/UI.jsx';

export function LandingScreen({ onStart, onHow }) {
  return (
    <div className="rtl" style={{
      direction: 'rtl',
      width: '100%', height: '100%',
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #a4d8f2 0%, #bfe4f5 40%, #d6eef9 70%, #e9f5fb 100%)',
    }}>
      {/* Airport scene fills the upper 60% */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '64%' }}>
        <AirportScene height="100%" animatePlanes/>
      </div>

      {/* Gradient fade from scene into panel */}
      <div style={{
        position: 'absolute', top: '52%', left: 0, right: 0, height: 90,
        background: 'linear-gradient(180deg, rgba(233,245,251,0) 0%, #e9f5fb 70%, #e9f5fb 100%)',
        pointerEvents: 'none', zIndex: 2,
      }}/>

      {/* Bottom content panel */}
      <div className="hero-enter" style={{
        position: 'absolute', top: '57%', left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, #e9f5fb 0%, #f6fbff 100%)',
        zIndex: 3,
        padding: '24px 28px 40px',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Pill kicker */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(255,255,255,0.85)', color: 'var(--teal-600)',
            padding: '7px 14px 7px 12px', borderRadius: 999,
            fontSize: 12.5, fontWeight: 600,
            boxShadow: 'inset 0 0 0 1px rgba(45,184,167,0.22), 0 2px 6px rgba(20,56,98,0.06)',
          }}>
            <MiniTower size={16} color="#1d9d8d"/>
            כלי תצפית · נמל תעופה
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          margin: 0, textAlign: 'center', color: 'var(--ink-900)',
          fontSize: 30, fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.4,
        }}>חוויית הנוסע<br/>בטרמינל</h1>

        {/* Subtitle */}
        <p style={{
          margin: '12px 0 0', textAlign: 'center',
          color: 'var(--slate-600)', fontSize: 15, lineHeight: 1.5,
          fontWeight: 400,
        }}>
          כלי תצפית דיגיטלי לזיהוי
          <br/>רגעי אמת, צרכים ותובנות שירותיות
        </p>

        {/* CTAs */}
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button variant="primary" size="lg" onClick={onStart}
                  iconRight={<Icon name="arrow-left" size={20}/>}>
            התחלת תצפית
          </Button>
          <button onClick={onHow} style={{
            background: 'transparent', border: 0, cursor: 'pointer',
            color: 'var(--ink-700)', fontFamily: 'inherit',
            fontSize: 14.5, fontWeight: 500, padding: '6px',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            alignSelf: 'center',
          }}>
            <Icon name="info" size={16}/>
            איך זה עובד?
          </button>
        </div>

        <div style={{ flex: 1 }}/>

        {/* Partner logos placeholder */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 18, marginTop: 18, opacity: 0.55,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 10.5, color: 'var(--slate-500)', fontWeight: 500 }}>
            <div style={{ width: 44, height: 16, borderRadius: 4,
                          background: 'rgba(20,56,98,0.10)' }}/>
            <span>שותף 1</span>
          </div>
          <div style={{ width: 1, height: 14, background: 'rgba(20,56,98,0.12)' }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 10.5, color: 'var(--slate-500)', fontWeight: 500 }}>
            <div style={{ width: 44, height: 16, borderRadius: 4,
                          background: 'rgba(20,56,98,0.10)' }}/>
            <span>שותף 2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
