import { Icon } from '../components/AirportArt.jsx';
import { PhoneScreen, TopBar, StatusPill, DottedDivider, Button } from '../components/UI.jsx';
import { getAreaLabel } from '../data/sampleData.js';

export function CardsScreen({ setup, passengers, onOpen, onAdd, onSummary, onBack }) {
  const anyCompleted = passengers.some(p => p.status === 'done');
  const completedCount = passengers.filter(p => p.status === 'done').length;

  return (
    <PhoneScreen bg="sky">
      <TopBar title="שלב 2 מתוך 3" onBack={onBack}/>

      <div style={{ marginBottom: 16 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.7)', color: 'var(--teal-600)',
          padding: '5px 11px', borderRadius: 999,
          fontSize: 11.5, fontWeight: 600, marginBottom: 10,
          boxShadow: 'inset 0 0 0 1px rgba(45,184,167,0.18)',
        }}>
          <Icon name="users" size={14}/>
          {getAreaLabel(setup?.area) || 'אזור הבידוק'} · {setup?.team || 'צוות חוויה'}
        </div>
        <h1 style={{
          margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1.2,
          color: 'var(--ink-900)', letterSpacing: -0.3,
        }}>הנוסעים שתיעדנו</h1>
        <p style={{
          margin: '8px 0 0', fontSize: 14, color: 'var(--slate-600)',
          lineHeight: 1.55,
        }}>פותחים כרטיס לכל אינטראקציה שראינו. אפשר להוסיף ולערוך מתי שרוצים.</p>
      </div>

      {/* Tally row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <div style={{
          flex: 1, padding: '10px 14px',
          background: 'rgba(255,255,255,0.7)', borderRadius: 14,
          boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.06)',
          display: 'flex', alignItems: 'baseline', gap: 6,
        }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink-900)' }}>
            {passengers.length}
          </span>
          <span style={{ fontSize: 12, color: 'var(--slate-500)' }}>כרטיסים</span>
        </div>
        <div style={{
          flex: 1, padding: '10px 14px',
          background: 'rgba(76,195,138,0.16)', borderRadius: 14,
          boxShadow: 'inset 0 0 0 1px rgba(76,195,138,0.28)',
          display: 'flex', alignItems: 'baseline', gap: 6,
        }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--green-600)' }}>
            {completedCount}
          </span>
          <span style={{ fontSize: 12, color: 'var(--green-600)' }}>הושלמו</span>
        </div>
      </div>

      {/* Cards list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {passengers.map((p, idx) => (
          <PassengerTicket key={p.id} passenger={p} index={idx + 1}
                           areaLabel={getAreaLabel(setup?.area)}
                           onClick={() => onOpen && onOpen(p.id)}/>
        ))}

        {/* Add new passenger */}
        <button onClick={onAdd} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: 'rgba(255,255,255,0.55)',
          border: '1.5px dashed rgba(45,184,167,0.5)',
          borderRadius: 22, padding: '18px',
          color: 'var(--teal-600)', fontWeight: 600, fontSize: 15,
          fontFamily: 'inherit', cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'background .15s',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 99,
            background: 'rgba(45,184,167,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="plus" size={20} color="#1d9d8d" weight={2.4}/>
          </div>
          הוספת נוסע
        </button>
      </div>

      {/* CTA when some are complete */}
      {anyCompleted && (
        <div style={{ marginTop: 22 }}>
          <Button variant="accent" size="lg" onClick={onSummary}
                  iconRight={<Icon name="sparkle" size={18}/>}>
            יצירת סיכום תצפית
          </Button>
          <p style={{
            textAlign: 'center', fontSize: 12, color: 'var(--slate-500)',
            marginTop: 8,
          }}>{completedCount} כרטיסים מוכנים לסיכום</p>
        </div>
      )}
    </PhoneScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Passenger ticket card — boarding-pass styled
// ─────────────────────────────────────────────────────────────
function PassengerTicket({ passenger, index, onClick, areaLabel }) {
  const { status, situation, moment, impact, summary } = passenger;
  const isDone = status === 'done';
  const isStarted = status !== 'not-started';

  const cta = {
    'not-started': 'התחלת תיעוד',
    'in-progress': 'המשך מילוי',
    'almost':      'המשך מילוי',
    'done':        'צפייה בכרטיס',
  }[status] || 'התחלת תיעוד';

  const stripe = {
    'not-started': '#c5d2de',
    'in-progress': '#f5b942',
    'almost':      '#2db8a7',
    'done':        '#4cc38a',
  }[status] || '#c5d2de';

  return (
    <div onClick={onClick} style={{
      position: 'relative',
      background: '#ffffff', borderRadius: 22,
      boxShadow: '0 2px 6px rgba(20,56,98,0.06), 0 14px 30px rgba(20,56,98,0.08)',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform .15s, box-shadow .15s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(20,56,98,0.10), 0 20px 40px rgba(20,56,98,0.12)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 6px rgba(20,56,98,0.06), 0 14px 30px rgba(20,56,98,0.08)';
    }}>
      {/* Right vertical stripe */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: 8,
        background: stripe,
      }}/>

      <div style={{ padding: '14px 20px 14px 14px' }}>
        {/* Top row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: isDone
                ? 'linear-gradient(180deg, #6fd6a3, #4cc38a)'
                : 'rgba(45,184,167,0.10)',
              color: isDone ? '#fff' : '#1d9d8d',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 15,
              boxShadow: isDone ? '0 4px 10px rgba(76,195,138,0.32)' : 'none',
            }}>
              {isDone ? <Icon name="check" size={20} weight={2.4}/> : `0${index}`}
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--slate-500)', fontWeight: 500 }}>נוסע</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-900)' }}>
                נוסע {index}
              </div>
            </div>
          </div>
          <StatusPill status={status}/>
        </div>

        {/* Middle: badges when started */}
        {isStarted && (
          <>
            <DottedDivider/>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8, marginTop: 10,
            }}>
              <TicketCell label="סיטואציה" value={situation || '—'}/>
              <TicketCell label="רגע אמת" value={moment || '—'}/>
              <TicketCell label="השפעה" value={impact || '—'} tone={impact}/>
            </div>
          </>
        )}

        {/* Done state — quote-style summary */}
        {isDone && summary && (
          <div style={{
            marginTop: 12,
            background: 'rgba(76,195,138,0.10)',
            borderRadius: 14, padding: '10px 12px',
            fontSize: 13, color: 'var(--ink-800)', lineHeight: 1.5,
            display: 'flex', gap: 8, alignItems: 'flex-start',
          }}>
            <Icon name="quote" size={16} color="#2faa6e"/>
            <span style={{ flex: 1 }}>{summary}</span>
          </div>
        )}

        {/* Bottom action row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 12, color: 'var(--slate-500)' }}>
            <Icon name="gate" size={14}/>
            <span>{areaLabel || 'אזור הבידוק'}</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            color: 'var(--teal-600)', fontSize: 13.5, fontWeight: 600,
          }}>
            {cta}
            <Icon name="chevron-left" size={16}/>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketCell({ label, value, tone }) {
  const tones = {
    'חיובי':  { bg: 'rgba(76,195,138,0.14)', fg: '#1d6c44' },
    'שלילי':  { bg: 'rgba(244,128,102,0.16)', fg: '#aa3d22' },
    'ניטרלי': { bg: 'rgba(149,169,191,0.18)', fg: '#5b7186' },
  };
  const t = tones[value];
  return (
    <div style={{
      background: t ? t.bg : 'var(--slate-100)',
      borderRadius: 12, padding: '8px 10px', minWidth: 0,
    }}>
      <div style={{ fontSize: 10, color: 'var(--slate-500)',
                    fontWeight: 500, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 12.5, fontWeight: 600,
                    color: t ? t.fg : 'var(--ink-800)',
                    whiteSpace: 'nowrap', overflow: 'hidden',
                    textOverflow: 'ellipsis' }}>{value}</div>
    </div>
  );
}
