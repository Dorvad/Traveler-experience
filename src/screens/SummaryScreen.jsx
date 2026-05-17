import { useState } from 'react';
import { Icon, PaperPlane, MiniTower } from '../components/AirportArt.jsx';
import { PhoneScreen, TopBar, Chip, ChipGroup, StatusPill, Button } from '../components/UI.jsx';
import { CAUSE_GROUPS } from './WizardScreen.jsx';
import { getAreaLabel } from '../data/sampleData.js';

// ─────────────────────────────────────────────────────────────
// Summary Screen
// ─────────────────────────────────────────────────────────────
export function SummaryScreen({ setup, passengers, onDownload, onShare, onBack, onSaveDraft }) {
  const [showDownload, setShowDownload] = useState(false);
  const completed = passengers.filter(p => p.status === 'done');

  const repeatedNeeds = countTags(completed.flatMap(p => p.step3?.needs || []));
  const repeatedCauses = countTags(
    completed.flatMap(p => Object.values(p.step5?.causes || {}).flat().map(c => c.id))
  );
  const proposedActions = completed.map(p => p.step8?.action).filter(Boolean);
  const positiveMoments = completed.map(p => p.step7?.replicate).filter(Boolean);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <PhoneScreen bg="summary">
        <TopBar title="סיכום התצפית" onBack={onBack}
                right={(
                  <button onClick={onSaveDraft} style={{
                    height: 36, padding: '0 12px', borderRadius: 999, border: 0,
                    background: 'rgba(255,255,255,0.85)',
                    boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.08)',
                    color: 'var(--ink-700)', fontWeight: 500, fontSize: 12.5,
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                  }}>
                    <Icon name="save" size={14}/>
                    טיוטה
                  </button>
                )}/>

        {/* Hero card */}
        <div style={{ position: 'relative', marginBottom: 18 }}>
          <div style={{
            background: 'linear-gradient(135deg, #2db8a7 0%, #1d9d8d 80%, #18856f 100%)',
            borderRadius: 24, padding: '18px 18px 16px',
            color: '#fff', position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(29,157,141,0.30)',
          }}>
            <div style={{ position: 'absolute', top: -8, left: -8, opacity: 0.18,
                          transform: 'rotate(-15deg)' }}>
              <PaperPlane size={80} color="#ffffff" stroke="#ffffff"/>
            </div>
            <div style={{ position: 'absolute', bottom: -20, left: -20, opacity: 0.12 }}>
              <MiniTower size={120} color="#ffffff"/>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8,
                          fontSize: 11, fontWeight: 600, letterSpacing: 0.4,
                          opacity: 0.85, marginBottom: 6 }}>
              <Icon name="ticket" size={14}/>
              OBSERVATION REPORT · גרסה 1.0
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
              חוויית הנוסע בטרמינל
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
              background: 'rgba(255,255,255,0.10)', borderRadius: 16, padding: '12px',
            }}>
              <StatCell label="צוות" value={setup?.team || '—'}/>
              <StatCell label="תאריך" value={setup?.date || '—'}/>
              <StatCell label="אזור" value={getAreaLabel(setup?.area) || '—'}/>
              <StatCell label="משך" value={setup?.duration || '—'}/>
            </div>

            <div style={{
              display: 'flex', gap: 14, marginTop: 12,
              paddingTop: 12, borderTop: '1px dashed rgba(255,255,255,0.3)',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{passengers.length}</div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>נוסעים שתועדו</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{completed.length}</div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>כרטיסים הושלמו</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{positiveMoments.length}</div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>רגעים לשימור</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-passenger synthesis */}
        <div style={{ marginBottom: 18 }}>
          <SectionHeader kicker="מבט רוחבי" title="תובנות חוצות-נוסעים"/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SynthesisCard icon="compass" color="#2db8a7" title="צרכים שחזרו" chips={repeatedNeeds}/>
            <SynthesisCard icon="dots" color="#3a99cf" title="גורמי השפעה שחזרו" chips={repeatedCauses}/>
            <SynthesisCard icon="sparkle" color="#f5b942" title="פעולות מוצעות" items={proposedActions.slice(0,3)}/>
            <SynthesisCard icon="heart" color="#f48066" title="רגעים חיוביים לשימור" items={positiveMoments.slice(0,2)}/>
          </div>
        </div>

        {/* Per-passenger summary */}
        <div style={{ marginBottom: 18 }}>
          <SectionHeader kicker="לפי נוסע" title="סיכום לכל אינטראקציה"/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {completed.map((p, i) => (
              <PassengerSummaryCard key={p.id} passenger={p} index={i + 1}/>
            ))}
          </div>
        </div>

        {/* Download card */}
        <div style={{
          background: '#ffffff', borderRadius: 24,
          padding: '16px', boxShadow: 'var(--shadow-card)',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 14,
              background: 'linear-gradient(180deg, #ffd166, #f5b942)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(245,185,66,0.36)',
            }}><Icon name="pdf" size={20} color="#5a3e0f" weight={2}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-900)' }}>
                סיכום מוכן לשליחה
              </div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>
                PDF מעוצב כ-Observation Boarding Pass
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="primary" size="md" onClick={() => setShowDownload(true)}
                    icon={<Icon name="download" size={18}/>}>
              הורדת סיכום PDF
            </Button>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="md" onClick={onShare}
                      icon={<Icon name="share" size={16}/>}>
                שיתוף סיכום
              </Button>
              <Button variant="secondary" size="md" onClick={onSaveDraft}
                      icon={<Icon name="save" size={16}/>}>
                שמירה כטיוטה
              </Button>
            </div>
          </div>
        </div>
      </PhoneScreen>

      {/* Download sheet overlay */}
      {showDownload && (
        <DownloadSheet
          onClose={() => setShowDownload(false)}
          onSent={() => { setShowDownload(false); onDownload && onDownload(); }}/>
      )}
    </div>
  );
}

function SectionHeader({ kicker, title }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11.5, color: 'var(--teal-600)', fontWeight: 600,
                    letterSpacing: 0.5, marginBottom: 4 }}>{kicker}</div>
      <div style={{ fontSize: 17, color: 'var(--ink-900)', fontWeight: 700,
                    lineHeight: 1.3 }}>{title}</div>
    </div>
  );
}

function StatCell({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, opacity: 0.75, fontWeight: 500, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap',
                    overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
    </div>
  );
}

function SynthesisCard({ icon, color, title, chips, items }) {
  return (
    <div style={{
      background: '#ffffff', borderRadius: 18,
      padding: '14px', boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: `${color}1a`, color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name={icon} size={16}/></div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{title}</div>
      </div>
      {chips && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {chips.length === 0 && <div style={{ fontSize: 12, color: 'var(--slate-400)' }}>—</div>}
          {chips.map(([tag, n]) => (
            <span key={tag} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '6px 10px', borderRadius: 99,
              fontSize: 12.5, fontWeight: 500,
              background: `${color}14`, color,
            }}>
              {tag}
              {n > 1 && <span style={{
                background: color, color: '#fff', fontSize: 10,
                fontWeight: 700, padding: '0 6px', borderRadius: 99,
              }}>×{n}</span>}
            </span>
          ))}
        </div>
      )}
      {items && (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none',
                     display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.length === 0 && <div style={{ fontSize: 12, color: 'var(--slate-400)' }}>—</div>}
          {items.map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start',
                                  fontSize: 13, color: 'var(--ink-800)', lineHeight: 1.5 }}>
              <span style={{ width: 6, height: 6, marginTop: 7, borderRadius: 99,
                              background: color, flexShrink: 0 }}/>
              <span style={{ flex: 1 }}>{t}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PassengerSummaryCard({ passenger, index }) {
  return (
    <div style={{
      background: '#ffffff', borderRadius: 20, overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px',
        background: 'linear-gradient(180deg, rgba(45,184,167,0.06), rgba(45,184,167,0))',
        borderBottom: '1px dashed rgba(20,56,98,0.08)',
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 99,
          background: 'linear-gradient(180deg, #2db8a7, #1d9d8d)',
          color: '#fff', fontSize: 13, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(29,157,141,0.24)',
        }}>{index}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>
            נוסע {index}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--slate-500)' }}>
            {passenger.step1?.where} · {passenger.step1?.interaction}
          </div>
        </div>
        <StatusPill status="done"/>
      </div>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SummaryLine label="רגע האמת" icon="sparkle" color="#f5b942"
                     value={(passenger.step2?.types || []).join(' · ')}/>
        <SummaryLine label="צורך מרכזי" icon="compass" color="#2db8a7"
                     value={(passenger.step3?.needs || []).slice(0,3).join(' · ')}/>
        <SummaryLine label="גורמי השפעה" icon="dots" color="#3a99cf"
                     value={topCauses(passenger)}/>
        <SummaryLine label="פעולה ישימה" icon="check-circle" color="#2faa6e"
                     value={passenger.step8?.action}/>

        {passenger.step9?.sentence && (
          <div style={{
            position: 'relative',
            background: 'linear-gradient(180deg, #fff8e6, #fff)',
            borderRadius: 14, padding: '12px 14px',
            boxShadow: 'inset 0 0 0 1px rgba(245,185,66,0.32)',
            marginTop: 4,
          }}>
            <Icon name="quote" size={16} color="#f5b942"/>
            <div style={{
              marginTop: 4, fontSize: 14, fontWeight: 500,
              color: 'var(--ink-900)', lineHeight: 1.5, fontStyle: 'italic',
            }}>"{passenger.step9.sentence}"</div>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryLine({ label, icon, color, value }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div style={{
        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
        background: `${color}1a`, color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon name={icon} size={14}/></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10.5, color: 'var(--slate-500)',
                      fontWeight: 500, marginBottom: 1 }}>{label}</div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-800)',
                      fontWeight: 500, lineHeight: 1.4 }}>{value}</div>
      </div>
    </div>
  );
}

function topCauses(p) {
  const list = [];
  Object.entries(p.step5?.causes || {}).forEach(([, items]) => {
    items.forEach(it => { if (it.impact === 'high') list.push(it.id); });
  });
  return list.slice(0, 3).join(' · ');
}

function countTags(arr) {
  const m = new Map();
  arr.forEach(x => m.set(x, (m.get(x) || 0) + 1));
  return Array.from(m.entries()).sort((a,b) => b[1] - a[1]).slice(0, 6);
}

// ─────────────────────────────────────────────────────────────
// Download Sheet (bottom modal)
// ─────────────────────────────────────────────────────────────
function DownloadSheet({ onClose, onSent }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(14,46,77,0.45)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div className="rtl sheet-enter" style={{
        direction: 'rtl',
        background: '#fff', width: '100%', borderRadius: '28px 28px 0 0',
        padding: '14px 22px 40px',
        boxShadow: '0 -10px 30px rgba(14,46,77,0.20)',
      }}>
        {/* drag handle */}
        <div style={{
          width: 44, height: 5, borderRadius: 99,
          background: 'rgba(20,56,98,0.12)', margin: '4px auto 16px',
        }}/>

        {/* Success preview */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'linear-gradient(135deg, #e9f7f4 0%, #d6f2ee 100%)',
          padding: '14px 14px', borderRadius: 18, marginBottom: 14,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'linear-gradient(180deg, #6fd6a3, #2faa6e)',
            color: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 14px rgba(76,195,138,0.36)',
            animation: 'checkPop .5s cubic-bezier(.2,.7,.3,1) both',
          }}><Icon name="check" size={22} weight={2.4}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-900)' }}>
              הסיכום מוכן
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--slate-600)' }}>
              סיכום-תצפית_PDF · 1.8MB
            </div>
          </div>
        </div>

        {/* PDF preview */}
        <div style={{
          background: '#f6fbff', borderRadius: 18,
          padding: '14px', marginBottom: 16,
          boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.06)',
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <PdfThumbnail/>
            <div style={{ flex: 1, fontSize: 12, color: 'var(--slate-600)', lineHeight: 1.55 }}>
              <b style={{ color: 'var(--ink-900)' }}>Observation Boarding Pass Report</b>
              <div style={{ marginTop: 4 }}>כותרת · פרטי תצפית · סיכום לכל נוסע · מבט רוחבי</div>
              <div style={{ marginTop: 6,
                            display: 'inline-flex', gap: 6, padding: '3px 8px',
                            borderRadius: 99, background: 'rgba(45,184,167,0.14)',
                            color: '#1d9d8d', fontSize: 11, fontWeight: 600 }}>
                <Icon name="check" size={11} weight={2.4}/>
                מותאם להדפסה ולצפייה במובייל
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button variant="primary" size="md" onClick={onSent}
                  icon={<Icon name="download" size={18}/>}>
            שמירה למכשיר
          </Button>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" size="md" onClick={onSent}
                    icon={<Icon name="share" size={16}/>}>
              שיתוף בקישור
            </Button>
            <Button variant="ghost" size="md" onClick={onClose}>
              ביטול
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PdfThumbnail() {
  return (
    <div style={{
      width: 78, height: 100, borderRadius: 8,
      background: '#fff', boxShadow: '0 4px 12px rgba(20,56,98,0.12)',
      padding: 6, display: 'flex', flexDirection: 'column', gap: 3, flexShrink: 0,
    }}>
      <div style={{ height: 12, borderRadius: 2,
                    background: 'linear-gradient(90deg, #2db8a7, #4dc7b8)' }}/>
      <div style={{ height: 4, width: '80%', borderRadius: 2, background: '#dde7ee' }}/>
      <div style={{ height: 4, width: '60%', borderRadius: 2, background: '#eef4f9' }}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginTop: 2 }}>
        <div style={{ height: 14, borderRadius: 3, background: '#eef4f9' }}/>
        <div style={{ height: 14, borderRadius: 3, background: '#eef4f9' }}/>
        <div style={{ height: 14, borderRadius: 3, background: '#eef4f9' }}/>
        <div style={{ height: 14, borderRadius: 3, background: '#eef4f9' }}/>
      </div>
      <div style={{ height: 14, borderRadius: 3, background: 'rgba(255,209,102,0.4)', marginTop: 2 }}/>
      <div style={{ flex: 1 }}/>
      <div style={{ height: 4, width: '40%', borderRadius: 2, background: '#dde7ee' }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Passenger Detail Screen
// ─────────────────────────────────────────────────────────────
export function PassengerDetailScreen({ passenger, index, onBack, onEdit }) {
  return (
    <PhoneScreen bg="paper">
      <TopBar title={`כרטיס נוסע ${index}`} onBack={onBack}
              right={(
                <button onClick={onEdit} style={{
                  height: 36, padding: '0 12px', borderRadius: 999, border: 0,
                  background: 'rgba(255,255,255,0.85)',
                  boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.08)',
                  color: 'var(--teal-600)', fontWeight: 600, fontSize: 12.5,
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}>
                  <Icon name="edit" size={14}/>
                  עריכה
                </button>
              )}/>

      {/* Hero — completed */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #6fd6a3 0%, #4cc38a 60%, #2faa6e 100%)',
        borderRadius: 24, padding: '20px',
        color: '#fff', overflow: 'hidden', marginBottom: 16,
        boxShadow: '0 8px 24px rgba(76,195,138,0.30)',
      }}>
        <div style={{ position: 'absolute', top: -10, left: -10, opacity: 0.18,
                      transform: 'rotate(-15deg)' }}>
          <PaperPlane size={70} color="#ffffff" stroke="#ffffff"/>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 50, height: 50, borderRadius: 14,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.3)',
            animation: 'checkPop .5s cubic-bezier(.2,.7,.3,1) both',
          }}><Icon name="check" size={26} weight={2.6}/></div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 500 }}>סטטוס</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>הכרטיס הושלם</div>
          </div>
        </div>

        {passenger.step9?.sentence && (
          <div style={{
            marginTop: 14, paddingTop: 12,
            borderTop: '1px dashed rgba(255,255,255,0.3)',
            display: 'flex', gap: 8, alignItems: 'flex-start',
          }}>
            <Icon name="quote" size={18} color="#fff"/>
            <div style={{ flex: 1, fontSize: 15, fontWeight: 500,
                          fontStyle: 'italic', lineHeight: 1.5 }}>
              "{passenger.step9.sentence}"
            </div>
          </div>
        )}
      </div>

      {/* Quick badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {passenger.step1?.where && (
          <DetailBadge icon="pin" tone="sky">{passenger.step1.where}</DetailBadge>
        )}
        {passenger.step1?.interaction && (
          <DetailBadge icon="dots" tone="teal">{passenger.step1.interaction}</DetailBadge>
        )}
        {(passenger.step2?.types || []).map(t => (
          <DetailBadge key={t} icon="sparkle" tone="yellow">{t}</DetailBadge>
        ))}
      </div>

      {/* Sections */}
      <CollapsibleSection title="רגע האמת" icon="sparkle" color="#f5b942" open>
        <ChipGroup>
          {(passenger.step2?.types || []).map(t => (
            <Chip key={t} tone="yellow" selected>{t}</Chip>
          ))}
        </ChipGroup>
        {passenger.step2?.why && (
          <p style={{ margin: '10px 0 0', fontSize: 13.5,
                      color: 'var(--ink-800)', lineHeight: 1.55 }}>
            {passenger.step2.why}
          </p>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="צורך הנוסע" icon="compass" color="#2db8a7" open>
        <ChipGroup>
          {(passenger.step3?.needs || []).map(t => (
            <Chip key={t} tone="teal" selected>{t}</Chip>
          ))}
        </ChipGroup>
      </CollapsibleSection>

      <CollapsibleSection title="גורמי השפעה" icon="dots" color="#3a99cf">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Object.entries(passenger.step5?.causes || {}).map(([g, items]) => (
            items.length ? (
              <div key={g} style={{ fontSize: 12.5, color: 'var(--ink-800)' }}>
                <b>{(CAUSE_GROUPS.find(x => x.id === g) || {}).title}:</b>{' '}
                {items.map(i => i.id).join(' · ')}
              </div>
            ) : null
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="פעולה ישימה" icon="check-circle" color="#2faa6e" open>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-800)', lineHeight: 1.55 }}>
          {passenger.step8?.action || '—'}
        </p>
        {passenger.step8?.applicability && (
          <div style={{ marginTop: 8 }}>
            <Chip selected tone="teal">{passenger.step8.applicability}</Chip>
          </div>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="תיאור עובדתי" icon="eye" color="#5b7186">
        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--ink-800)', lineHeight: 1.55 }}>
          {passenger.step1?.description || '—'}
        </p>
        {(passenger.step1?.quotes || []).length > 0 && (
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {passenger.step1.quotes.map((q, i) => (
              <div key={i} style={{
                background: 'rgba(20,56,98,0.04)', borderRadius: 12,
                padding: '8px 12px', fontSize: 13,
              }}>
                <span style={{ fontWeight: 700, color: 'var(--teal-600)' }}>{q.who}: </span>
                <span style={{ color: 'var(--ink-800)' }}>"{q.what}"</span>
              </div>
            ))}
          </div>
        )}
      </CollapsibleSection>
    </PhoneScreen>
  );
}

function DetailBadge({ icon, children, tone = 'sky' }) {
  const tones = {
    sky:    { bg: 'rgba(58,153,207,0.14)', fg: '#1f6fa3' },
    teal:   { bg: 'rgba(45,184,167,0.14)', fg: '#0f7a6c' },
    yellow: { bg: 'rgba(245,185,66,0.20)',  fg: '#8a6210' },
    coral:  { bg: 'rgba(244,128,102,0.18)', fg: '#aa3d22' },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '6px 12px', borderRadius: 99, fontSize: 12.5,
      fontWeight: 500, background: t.bg, color: t.fg,
    }}>
      <Icon name={icon} size={13}/>
      {children}
    </span>
  );
}

function CollapsibleSection({ title, icon, color, open = false, children }) {
  const [isOpen, setOpen] = useState(open);
  return (
    <div style={{
      background: '#ffffff', borderRadius: 18,
      boxShadow: 'var(--shadow-card)', marginBottom: 10, overflow: 'hidden',
    }}>
      <button onClick={() => setOpen(!isOpen)} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '12px 14px', border: 0,
        background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: `${color}1a`, color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name={icon} size={16}/></div>
        <div style={{ flex: 1, textAlign: 'right',
                      fontSize: 14.5, fontWeight: 700, color: 'var(--ink-900)' }}>
          {title}
        </div>
        <Icon name={isOpen ? 'chevron-left' : 'chevron-right'} size={16} color="#95a9bf"/>
      </button>
      {isOpen && (
        <div style={{ padding: '0 14px 14px' }}>{children}</div>
      )}
    </div>
  );
}
