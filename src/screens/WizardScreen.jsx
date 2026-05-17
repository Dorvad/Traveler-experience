import { useState } from 'react';
import { Icon } from '../components/AirportArt.jsx';
import {
  PhoneScreen, TopBar, ProgressBar,
  Chip, ChipGroup, TextAreaCard, ScaleRow, Button,
} from '../components/UI.jsx';

const WIZARD_TITLES = [
  null,
  'מה ראינו?',
  'רגע האמת',
  'להיכנס לנעלי הנוסע',
  'איך השירות פגש את הצורך?',
  'מה השפיע על החוויה?',
  'מה הנוסע יזכור?',
  'רגע ששווה לשמר',
  'מה למדנו ומה עושים עם זה?',
  'החוויה במשפט אחד',
];

const WIZARD_KICKERS = [
  null,
  'תיעוד עובדתי',
  'זיהוי הרגע',
  'אמפתיה',
  'מענה שירותי',
  'גורמי השפעה',
  'תפיסת השירות',
  'רגע לשימור',
  'מהתצפית למעשה',
  'משפט מסכם',
];

export function WizardScreen({
  passengerIndex = 1, step = 1, passenger, setPassenger,
  onBack, onNext, onPrev, onSaveAndExit,
}) {
  const total = 9;
  const progress = (step / total) * 100;
  const StepComp = WIZARD_STEPS[step - 1];

  return (
    <PhoneScreen bg="paper" pad={false}>
      {/* Header */}
      <div style={{
        padding: '14px 20px 14px',
        background: 'linear-gradient(180deg, rgba(247,251,253,0.95) 0%, rgba(247,251,253,0.0) 100%)',
        backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <TopBar
          title={`נוסע ${passengerIndex} · שלב ${step} מתוך ${total}`}
          onBack={onBack}
          right={(
            <button onClick={onSaveAndExit} style={{
              height: 36, padding: '0 12px', borderRadius: 999, border: 0,
              background: 'rgba(255,255,255,0.85)',
              boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.08)',
              color: 'var(--ink-700)', fontWeight: 500, fontSize: 12.5,
              display: 'inline-flex', alignItems: 'center', gap: 5,
            }}>
              <Icon name="save" size={14}/>
              שמור וחזור
            </button>
          )}
        />
        <ProgressBar value={progress}
                     label={WIZARD_TITLES[step]}
                     sublabel={`${step} / ${total}`}/>
      </div>

      {/* Step body */}
      <div className="wizard-step" key={step}
           style={{ padding: '8px 20px 24px' }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{
            fontSize: 11.5, color: 'var(--teal-600)', fontWeight: 600,
            letterSpacing: 0.5, marginBottom: 4,
          }}>{WIZARD_KICKERS[step]}</div>
          <h1 style={{
            margin: 0, fontSize: 24, fontWeight: 700, lineHeight: 1.2,
            color: 'var(--ink-900)', letterSpacing: -0.3,
          }}>{WIZARD_TITLES[step]}</h1>
        </div>

        {StepComp && <StepComp passenger={passenger} setPassenger={setPassenger}/>}
      </div>

      {/* Footer nav */}
      <div style={{
        position: 'sticky', bottom: 0,
        padding: '14px 20px 18px',
        background: 'linear-gradient(180deg, rgba(247,251,253,0) 0%, rgba(247,251,253,1) 40%)',
        display: 'flex', gap: 10,
      }}>
        <Button variant="ghost" size="md" fullWidth={false}
                onClick={onPrev} disabled={step === 1}
                style={{ flex: '0 0 auto', padding: '0 18px' }}>
          הקודם
        </Button>
        <Button variant="primary" size="md"
                onClick={onNext}
                iconRight={step < 9
                  ? <Icon name="arrow-left" size={18}/>
                  : <Icon name="check" size={18} weight={2.4}/>}>
          {step < 9 ? 'המשך' : 'סיום כרטיס נוסע'}
        </Button>
      </div>
    </PhoneScreen>
  );
}

// ─────────────────────────────────────────────────────────────
// Helper components
// ─────────────────────────────────────────────────────────────
function Field({ q, help, children, icon }) {
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          {icon && (
            <div style={{ width: 22, height: 22, marginTop: 2, flexShrink: 0,
                          color: 'var(--teal-600)' }}>
              <Icon name={icon} size={18}/>
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-900)',
                          lineHeight: 1.3 }}>{q}</div>
            {help && (
              <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>
                {help}
              </div>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

// Free-text input shown when "אחר" is selected
function OtherInput({ value, onChange, placeholder = 'פרטו את הקטגוריה...' }) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        marginTop: 8, width: '100%',
        padding: '10px 14px',
        background: '#ffffff',
        border: 0, outline: 0,
        borderRadius: 14,
        boxShadow: '0 0 0 2px rgba(45,184,167,0.4), 0 2px 8px rgba(20,56,98,0.06)',
        fontSize: 14.5, color: 'var(--ink-900)',
        fontFamily: 'inherit', direction: 'rtl',
      }}
    />
  );
}

function toggle(arr, x) {
  return arr.includes(x) ? arr.filter(a => a !== x) : [...arr, x];
}
function toggleMax(arr, x, max) {
  if (arr.includes(x)) return arr.filter(a => a !== x);
  if (arr.length >= max) return [...arr.slice(1), x];
  return [...arr, x];
}

// ─────────────────────────────────────────────────────────────
// Step 1: מה ראינו?
// ─────────────────────────────────────────────────────────────
function Step1({ passenger, setPassenger }) {
  const s = passenger.step1 || {};
  const update = (patch) => setPassenger({ ...passenger, step1: { ...s, ...patch } });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Field q="איפה התרחשה הסיטואציה?">
        <ChipGroup>
          {['תור','עמדת שירות','שער עלייה למטוס','מסוע כבודה','בידוק ביטחוני',
            'אזור ישיבה','מודיעין','מסדרון / מעבר','מכונה לשירות עצמי','אחר']
            .map(o => (
              <Chip key={o} selected={s.where === o}
                    onClick={() => update({ where: o })}>{o}</Chip>
            ))}
        </ChipGroup>
        {s.where === 'אחר' && (
          <OtherInput value={s.whereCustom} onChange={v => update({ whereCustom: v })}/>
        )}
      </Field>

      <Field q="איזה סוג אינטראקציה זיהינו?">
        <ChipGroup>
          {['בקשת מידע','בירור / שאלה','תלונה','קושי בהבנת הנחיות','המתנה בתור',
            'בעיה טכנית','עיכוב / שינוי בלו״ז','קבלת עזרה','התמודדות עם עומס',
            'אינטראקציה חיובית במיוחד','אחר'].map(o => (
              <Chip key={o} selected={s.interaction === o}
                    onClick={() => update({ interaction: o })}>{o}</Chip>
            ))}
        </ChipGroup>
        {s.interaction === 'אחר' && (
          <OtherInput value={s.interactionCustom} onChange={v => update({ interactionCustom: v })}/>
        )}
      </Field>

      <Field q="מי היה מעורב?" help="ניתן לבחור יותר מאחד">
        <ChipGroup>
          {['נוסע יחיד','זוג','משפחה','קבוצת נוסעים','נוסע עם ילדים','נוסע מבוגר',
            'נוסע עם צורך מיוחד','נותן שירות','מאבטח / בידוק',
            'דייל / נציג חברת תעופה','עובד ניקיון / תחזוקה','אחר'].map(o => (
              <Chip key={o} selected={(s.involved || []).includes(o)}
                    onClick={() => update({ involved: toggle(s.involved || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.involved || []).includes('אחר') && (
          <OtherInput value={s.involvedCustom} onChange={v => update({ involvedCustom: v })}/>
        )}
      </Field>

      <Field q="תיאור עובדתי של מה שקרה">
        <TextAreaCard
          placeholder="לדוגמה: 'הנוסע שאל איפה השער, הנציג הצביע ימינה ואמר...'"
          helper="כתבו רק מה שראיתם ושמעתם. הימנעו מפרשנות."
          value={s.description}
          rows={4}
          onChange={e => update({ description: e.target.value })}/>
      </Field>

      <Field q="ציטוטים שנשמעו" help="אופציונלי">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(s.quotes || []).map((q, i) => (
            <QuoteRow key={i} quote={q}
                      onChange={(nq) => update({
                        quotes: (s.quotes || []).map((x, j) => j === i ? nq : x)
                      })}
                      onRemove={() => update({
                        quotes: (s.quotes || []).filter((_, j) => j !== i)
                      })}/>
          ))}
          <button onClick={() => update({
            quotes: [...(s.quotes || []), { who: '', what: '' }]
          })} style={{
            background: 'transparent', border: '1.5px dashed rgba(45,184,167,0.5)',
            borderRadius: 14, padding: '10px',
            color: 'var(--teal-600)', fontFamily: 'inherit', fontWeight: 600, fontSize: 13.5,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, cursor: 'pointer',
          }}>
            <Icon name="quote" size={16}/>
            + הוספת ציטוט
          </button>
        </div>
      </Field>
    </div>
  );
}

function QuoteRow({ quote, onChange, onRemove }) {
  return (
    <div style={{
      background: '#ffffff', borderRadius: 14, padding: '10px 12px',
      boxShadow: '0 1px 3px rgba(20,56,98,0.06), inset 0 0 0 1px rgba(20,56,98,0.06)',
      display: 'flex', flexDirection: 'column', gap: 4, position: 'relative',
    }}>
      <button onClick={onRemove} style={{
        position: 'absolute', top: 8, left: 8,
        width: 22, height: 22, borderRadius: 99, border: 0,
        background: 'rgba(244,128,102,0.12)', color: '#f48066',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 14, lineHeight: 1,
      }}>×</button>
      <input value={quote.who} placeholder="מי אמר? (נוסע / נציג / ...)"
             onChange={e => onChange({ ...quote, who: e.target.value })}
             style={{
               border: 0, outline: 0, background: 'transparent',
               fontSize: 12.5, fontWeight: 600, color: 'var(--teal-600)',
               fontFamily: 'inherit', direction: 'rtl',
             }}/>
      <input value={quote.what} placeholder="מה נאמר?"
             onChange={e => onChange({ ...quote, what: e.target.value })}
             style={{
               border: 0, outline: 0, background: 'transparent',
               fontSize: 14.5, color: 'var(--ink-900)',
               fontFamily: 'inherit', direction: 'rtl',
             }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 2: רגע האמת
// ─────────────────────────────────────────────────────────────
function Step2({ passenger, setPassenger }) {
  const s = passenger.step2 || {};
  const update = (patch) => setPassenger({ ...passenger, step2: { ...s, ...patch } });
  const journey = ['הגעה לטרמינל','חיפוש מידע / התמצאות','המתנה','מפגש עם נותן שירות',
                   'קבלת מענה','המשך הדרך','סיום החוויה','אחר'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Field q="האם זוהה רגע אמת?">
        <ChipGroup>
          {['כן, רגע אחד','כן, שני רגעים','לא בטוחים','לא זוהה רגע משמעותי']
            .map(o => (
              <Chip key={o} selected={s.detected === o}
                    onClick={() => update({ detected: o })}>{o}</Chip>
            ))}
        </ChipGroup>
      </Field>

      <Field q="סוג רגע האמת" help="ניתן לבחור עד שניים">
        <ChipGroup>
          {['רגע של בלבול','רגע של לחץ','רגע של המתנה','רגע של חוסר ודאות',
            'רגע של קבלת עזרה','רגע של פתרון בעיה','רגע של יחס אישי',
            'רגע של תסכול','רגע של הקלה','רגע חיובי במיוחד','אחר'].map(o => (
              <Chip key={o} selected={(s.types || []).includes(o)}
                    onClick={() => update({ types: toggleMax(s.types || [], o, 2) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.types || []).includes('אחר') && (
          <OtherInput value={s.typesCustom} onChange={v => update({ typesCustom: v })}/>
        )}
      </Field>

      <Field q="איפה במסע הנוסע זה קרה?">
        <JourneyLine items={journey} value={s.stage}
                     onChange={v => update({ stage: v })}/>
        {s.stage === 'אחר' && (
          <OtherInput value={s.stageCustom} onChange={v => update({ stageCustom: v })}
                      placeholder="תארו את שלב המסע..."/>
        )}
      </Field>

      <Field q="עד כמה הרגע היה משמעותי?">
        <ScaleRow value={s.significance || 0}
                  onChange={v => update({ significance: v })}
                  labels={['כמעט לא השפיע','רגע מכריע בחוויה']}/>
      </Field>

      <Field q="מה קרה ברגע הזה ולמה הוא משמעותי?">
        <TextAreaCard placeholder="כתבו במשפט-שניים מה הפך את הרגע למשמעותי..."
                      rows={3} value={s.why}
                      onChange={e => update({ why: e.target.value })}/>
      </Field>
    </div>
  );
}

function JourneyLine({ items, value, onChange }) {
  const valueIdx = items.indexOf(value);
  return (
    <div style={{
      background: '#ffffff', borderRadius: 18, padding: '16px 14px 14px',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{
        position: 'relative', overflowX: 'auto',
        WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
      }} className="tt-scroll">
        <div style={{
          display: 'flex', minWidth: 'max-content',
          gap: 0, padding: '6px 4px', direction: 'rtl',
        }}>
          {items.map((item, i) => {
            const sel = item === value;
            const passed = valueIdx >= 0 && i < valueIdx;
            return (
              <div key={item} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                minWidth: 84, position: 'relative',
              }}>
                {i < items.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 13, right: '-50%', width: '100%',
                    height: 3, borderRadius: 2,
                    background: passed || sel
                      ? 'linear-gradient(90deg, #4dc7b8, #2db8a7)'
                      : 'rgba(20,56,98,0.08)',
                    transition: 'background .3s',
                  }}/>
                )}
                <button onClick={() => onChange(item)} style={{
                  width: 28, height: 28, borderRadius: 99, border: 0,
                  background: sel
                    ? 'linear-gradient(180deg, #2db8a7, #1d9d8d)'
                    : (passed ? '#4dc7b8' : '#ffffff'),
                  boxShadow: sel
                    ? '0 6px 14px rgba(29,157,141,0.28), inset 0 0 0 4px rgba(255,255,255,0.9)'
                    : 'inset 0 0 0 2px rgba(20,56,98,0.18)',
                  position: 'relative', zIndex: 1, cursor: 'pointer',
                  transition: 'all .15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {passed && !sel && (
                    <Icon name="check" size={14} color="#fff" weight={2.4}/>
                  )}
                </button>
                <div style={{
                  marginTop: 8, fontSize: 11.5, textAlign: 'center',
                  color: sel ? 'var(--ink-900)' : 'var(--slate-500)',
                  fontWeight: sel ? 700 : 500,
                  maxWidth: 78, lineHeight: 1.3,
                }}>{item}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 3: נעלי הנוסע
// ─────────────────────────────────────────────────────────────
function Step3({ passenger, setPassenger }) {
  const s = passenger.step3 || {};
  const update = (patch) => setPassenger({ ...passenger, step3: { ...s, ...patch } });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Field q="מה לדעתכם הנוסע חשב?" icon="cloud" help="אפשר לבחור כמה">
        <ChipGroup>
          {['איפה אני אמור להיות?','כמה זמן זה ייקח?','למה זה לא ברור?',
            'למי אני צריך לפנות?','האם אני עומד לפספס משהו?','האם מטפלים בי?',
            'זה מתקדם בסדר','קיבלתי מענה','אחר'].map(o => (
              <Chip key={o} tone="sky" selected={(s.thoughts || []).includes(o)}
                    onClick={() => update({ thoughts: toggle(s.thoughts || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.thoughts || []).includes('אחר') && (
          <OtherInput value={s.thoughtsCustom} onChange={v => update({ thoughtsCustom: v })}/>
        )}
      </Field>

      <Field q="מה לדעתכם הנוסע הרגיש?" icon="heart">
        <ChipGroup>
          {['רגוע','מבולבל','לחוץ','מתוסכל','חסר אונים','כועס','מופתע',
            'בטוח','מוקל','מרוצה','לא נראה רגש ברור','אחר'].map(o => (
              <Chip key={o} tone="coral" selected={(s.emotions || []).includes(o)}
                    onClick={() => update({ emotions: toggle(s.emotions || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.emotions || []).includes('אחר') && (
          <OtherInput value={s.emotionsCustom} onChange={v => update({ emotionsCustom: v })}/>
        )}
      </Field>

      <Field q="מה הנוסע היה צריך באותו רגע?" icon="compass">
        <ChipGroup>
          {['מידע ברור','הכוונה פיזית','אישור שהוא במקום הנכון','קיצור זמן המתנה',
            'יחס אישי','הסבר על התהליך','פתרון בעיה','הרגעה',
            'נגישות / התאמה אישית','מענה בשפה אחרת','אחר'].map(o => (
              <Chip key={o} tone="teal" selected={(s.needs || []).includes(o)}
                    onClick={() => update({ needs: toggle(s.needs || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.needs || []).includes('אחר') && (
          <OtherInput value={s.needsCustom} onChange={v => update({ needsCustom: v })}/>
        )}
      </Field>

      <Field q="במשפט או שניים, איך נראתה החוויה מנקודת המבט של הנוסע?">
        <TextAreaCard rows={3} placeholder="לדוגמה: 'הוא הרגיש שהוא לא בטוח לאן ללכת...'"
                      value={s.fromPov}
                      onChange={e => update({ fromPov: e.target.value })}/>
      </Field>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 4: איך השירות פגש את הצורך?
// ─────────────────────────────────────────────────────────────
function Step4({ passenger, setPassenger }) {
  const s = passenger.step4 || {};
  const update = (patch) => setPassenger({ ...passenger, step4: { ...s, ...patch } });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Field q="האם הצורך של הנוסע זוהה?">
        <ChipGroup>
          {['כן','חלקית','לא','לא ברור','לא היה צורך מובהק'].map(o => (
            <Chip key={o} selected={s.identified === o}
                  onClick={() => update({ identified: o })}>{o}</Chip>
          ))}
        </ChipGroup>
      </Field>

      <Field q="איך הצורך זוהה?">
        <ChipGroup>
          {['הנוסע פנה בעצמו','נותן השירות הבחין בצורך','הצורך עלה מתוך שאלה',
            'הצורך התגלה בעקבות קושי / תקלה','הצורך לא זוהה','אחר'].map(o => (
              <Chip key={o} selected={s.howIdentified === o}
                    onClick={() => update({ howIdentified: o })}>{o}</Chip>
            ))}
        </ChipGroup>
        {s.howIdentified === 'אחר' && (
          <OtherInput value={s.howIdentifiedCustom} onChange={v => update({ howIdentifiedCustom: v })}/>
        )}
      </Field>

      <Field q="איזה מענה ניתן?">
        <ChipGroup>
          {['הסבר','הכוונה','פתרון בעיה','הרגעה','קיצור תהליך','הפניה לגורם אחר',
            'ליווי פיזי','בדיקה במערכת','לא ניתן מענה','המענה היה לא ברור','אחר']
            .map(o => (
              <Chip key={o} selected={(s.response || []).includes(o)}
                    onClick={() => update({ response: toggle(s.response || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.response || []).includes('אחר') && (
          <OtherInput value={s.responseCustom} onChange={v => update({ responseCustom: v })}/>
        )}
      </Field>

      <Field q="מה עבד טוב?" icon="check-circle">
        <ChipGroup>
          {['מהירות המענה','אדיבות','בהירות ההסבר','יוזמה מצד נותן השירות',
            'תחושת ביטחון','פתרון יעיל','התאמה לצורך הנוסע',
            'שיתוף פעולה בין גורמים','אחר'].map(o => (
              <Chip key={o} tone="teal" selected={(s.worked || []).includes(o)}
                    onClick={() => update({ worked: toggle(s.worked || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.worked || []).includes('אחר') && (
          <OtherInput value={s.workedCustom} onChange={v => update({ workedCustom: v })}/>
        )}
      </Field>

      <Field q="מה פחות עבד?">
        <ChipGroup>
          {['זמן המתנה','חוסר בהירות','חוסר יוזמה','יחס לא אישי','עומס',
            'תהליך מסורבל','שילוט לא ברור','הפניה לא מדויקת',
            'חוסר תיאום בין גורמים','לא זוהה משהו שפחות עבד','אחר'].map(o => (
              <Chip key={o} tone="coral" selected={(s.didnt || []).includes(o)}
                    onClick={() => update({ didnt: toggle(s.didnt || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.didnt || []).includes('אחר') && (
          <OtherInput value={s.didntCustom} onChange={v => update({ didntCustom: v })}/>
        )}
      </Field>

      <Field q="מה אפשר ללמוד מהמענה שניתן?">
        <TextAreaCard rows={3} value={s.lesson}
                      onChange={e => update({ lesson: e.target.value })}/>
      </Field>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 5: גורמי השפעה
// ─────────────────────────────────────────────────────────────
const CAUSE_GROUPS = [
  { id: 'person',  title: 'אדם / נותן שירות',   icon: 'users',   color: '#3a99cf',
    options: ['יחס אישי','אדיבות','יוזמה','מקצועיות','חוסר סבלנות','חוסר זמינות','תקשורת לא ברורה','אחר'] },
  { id: 'process', title: 'תהליך / נוהל',        icon: 'list',    color: '#2db8a7',
    options: ['תהליך לא ברור','יותר מדי שלבים','הנחיות סותרות','תלות בגורם אחר','מעבר לא נוח בין שלבים','נוהל שלא מתאים למצב בשטח','אחר'] },
  { id: 'time',    title: 'עומס / זמן',          icon: 'clock',   color: '#f5b942',
    options: ['תור ארוך','זמן המתנה לא ברור','לחץ זמן','עומס חריג','מחסור בעמדות פעילות','צוואר בקבוק','אחר'] },
  { id: 'env',     title: 'סביבה פיזית',         icon: 'hallway', color: '#5fb4e3',
    options: ['שילוט לא ברור','מרחקים גדולים','רעש','צפיפות','חוסר במקומות ישיבה','קושי בהתמצאות','תאורה / מרחב לא נוח','אחר'] },
  { id: 'tech',    title: 'טכנולוגיה / מערכות',  icon: 'self',    color: '#7e6ad5',
    options: ['מכונה לא עבדה','מסך לא ברור','מידע דיגיטלי חסר','מערכת איטית','פער בין מידע דיגיטלי למידע בשטח','אחר'] },
  { id: 'info',    title: 'מידע ותקשורת',        icon: 'info',    color: '#f48066',
    options: ['מידע חסר','מידע לא עקבי','שפה לא מותאמת','הנחיות לא מספיק ברורות','חוסר בעדכון בזמן אמת','אחר'] },
];

function Step5({ passenger, setPassenger }) {
  const s = passenger.step5 || { causes: {} };
  const update = (patch) => setPassenger({ ...passenger, step5: { ...s, ...patch } });

  const toggleCause = (groupId, option) => {
    const list = (s.causes && s.causes[groupId]) || [];
    const exists = list.find(c => c.id === option);
    const nextList = exists
      ? list.filter(c => c.id !== option)
      : [...list, { id: option, impact: 'med' }];
    update({ causes: { ...s.causes, [groupId]: nextList } });
  };
  const setImpact = (groupId, option, impact) => {
    const list = (s.causes && s.causes[groupId]) || [];
    update({
      causes: {
        ...s.causes,
        [groupId]: list.map(c => c.id === option ? { ...c, impact } : c),
      }
    });
  };
  const setGroupOther = (groupId, text) => {
    update({ causesOther: { ...(s.causesOther || {}), [groupId]: text } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <p style={{
        margin: 0, padding: '10px 12px',
        background: 'rgba(255,255,255,0.6)', borderRadius: 12,
        fontSize: 12.5, color: 'var(--slate-600)', lineHeight: 1.5,
        boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.06)',
      }}>בחרו את הגורמים שהשפיעו על החוויה, וסמנו לכל אחד את עוצמת ההשפעה.</p>

      {CAUSE_GROUPS.map(group => {
        const list = (s.causes && s.causes[group.id]) || [];
        const hasOther = list.some(c => c.id === 'אחר');
        return (
          <div key={group.id}>
            <CauseGroupCard group={group} selected={list}
                            onToggle={(o) => toggleCause(group.id, o)}
                            onImpact={(o, i) => setImpact(group.id, o, i)}/>
            {hasOther && (
              <OtherInput
                value={(s.causesOther || {})[group.id]}
                onChange={v => setGroupOther(group.id, v)}/>
            )}
          </div>
        );
      })}

      <Field q="הסבירו בקצרה למה בחרתם בגורמים האלה.">
        <TextAreaCard rows={3} value={s.explanation}
                      onChange={e => update({ explanation: e.target.value })}/>
      </Field>
    </div>
  );
}

function CauseGroupCard({ group, selected, onToggle, onImpact }) {
  const count = selected.length;
  return (
    <div style={{
      background: '#ffffff', borderRadius: 20, overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 16px',
        borderBottom: '1px solid rgba(20,56,98,0.06)',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: `${group.color}1f`, color: group.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={group.icon} size={18}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-900)' }}>
            {group.title}
          </div>
          {count > 0 && (
            <div style={{ fontSize: 11.5, color: group.color, fontWeight: 600 }}>
              {count} נבחרו
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: '12px 16px 14px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {group.options.map(o => {
          const sel = selected.find(c => c.id === o);
          return (
            <div key={o} style={{
              display: 'flex', alignItems: 'center',
              borderRadius: 999, overflow: 'hidden',
              boxShadow: sel
                ? `0 4px 10px ${group.color}30`
                : '0 1px 2px rgba(20,56,98,0.06), inset 0 0 0 1px rgba(20,56,98,0.10)',
            }}>
              <button onClick={() => onToggle(o)} style={{
                height: 34, padding: '0 12px', border: 0, cursor: 'pointer',
                background: sel ? group.color : '#fff',
                color: sel ? '#fff' : 'var(--ink-700)',
                fontFamily: 'inherit', fontWeight: 500, fontSize: 13,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                {sel && <Icon name="check" size={13} weight={2.4} color="#fff"/>}
                {o}
              </button>
              {sel && (
                <ImpactSelect value={sel.impact}
                              onChange={v => onImpact(o, v)}
                              color={group.color}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ImpactSelect({ value, onChange, color }) {
  const opts = [
    { id: 'low',  label: 'נמוכה',   dots: 1 },
    { id: 'med',  label: 'בינונית', dots: 2 },
    { id: 'high', label: 'גבוהה',   dots: 3 },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 1,
      background: `${color}cc`, height: 34, padding: '0 4px',
    }}>
      {opts.map(o => (
        <button key={o.id} onClick={() => onChange(o.id)}
                title={`השפעה ${o.label}`}
                style={{
                  width: 26, height: 26, borderRadius: 99, border: 0,
                  background: value === o.id ? '#fff' : 'transparent',
                  color: value === o.id ? color : '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  gap: 1, cursor: 'pointer',
                }}>
          {Array.from({ length: o.dots }).map((_, i) => (
            <div key={i} style={{
              width: 4, height: 4, borderRadius: 99,
              background: value === o.id ? color : '#fff',
            }}/>
          ))}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 6: מה הנוסע יזכור?
// ─────────────────────────────────────────────────────────────
function Step6({ passenger, setPassenger }) {
  const s = passenger.step6 || {};
  const update = (patch) => setPassenger({ ...passenger, step6: { ...s, ...patch } });
  const overall = [
    { id: 'very-neg', label: 'שלילית מאוד', emoji: '😣', color: '#d65a40' },
    { id: 'neg',      label: 'שלילית',       emoji: '🙁', color: '#f48066' },
    { id: 'neutral',  label: 'ניטרלית',      emoji: '😐', color: '#95a9bf' },
    { id: 'pos',      label: 'חיובית',       emoji: '🙂', color: '#6fd6a3' },
    { id: 'very-pos', label: 'חיובית מאוד',  emoji: '😄', color: '#2faa6e' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Field q="איך הנוסע כנראה יזכור את החוויה?">
        <ChipGroup>
          {['יעילה','נעימה','מקצועית','ברורה','מבלבלת','מלחיצה','מתסכלת',
            'איטית','לא אישית','מפתיעה לטובה','לא משמעותית במיוחד','אחר'].map(o => (
              <Chip key={o} selected={(s.memory || []).includes(o)}
                    onClick={() => update({ memory: toggle(s.memory || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.memory || []).includes('אחר') && (
          <OtherInput value={s.memoryCustom} onChange={v => update({ memoryCustom: v })}/>
        )}
      </Field>

      <Field q="השפעה כוללת על תפיסת השירות">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6 }}>
          {overall.map(o => {
            const sel = s.overall === o.id;
            return (
              <button key={o.id} onClick={() => update({ overall: o.id })}
                style={{
                  border: 0, cursor: 'pointer', fontFamily: 'inherit',
                  padding: '12px 4px', borderRadius: 16,
                  background: sel ? `${o.color}26` : '#fff',
                  boxShadow: sel
                    ? `inset 0 0 0 2px ${o.color}, 0 6px 14px ${o.color}33`
                    : '0 1px 3px rgba(20,56,98,0.06), inset 0 0 0 1px rgba(20,56,98,0.06)',
                  transition: 'all .15s',
                  transform: sel ? 'translateY(-2px)' : 'none',
                }}>
                <div style={{ fontSize: 22, lineHeight: 1 }}>{o.emoji}</div>
                <div style={{
                  fontSize: 10.5, marginTop: 6, fontWeight: 600,
                  color: sel ? o.color : 'var(--slate-600)',
                  lineHeight: 1.2,
                }}>{o.label}</div>
              </button>
            );
          })}
        </div>
      </Field>

      <Field q="מה לדעתכם יישאר עם הנוסע אחרי המפגש?"
             help="חשבו מה הוא יספר אחר כך למישהו אחר.">
        <TextAreaCard rows={3} value={s.takeaway}
                      onChange={e => update({ takeaway: e.target.value })}/>
      </Field>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 7: רגע ששווה לשמר
// ─────────────────────────────────────────────────────────────
function Step7({ passenger, setPassenger }) {
  const s = passenger.step7 || {};
  const update = (patch) => setPassenger({ ...passenger, step7: { ...s, ...patch } });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Field q="האם זוהה רגע חיובי במיוחד?">
        <ChipGroup>
          {['כן','לא','לא בטוחים'].map(o => (
            <Chip key={o} tone="yellow" selected={s.has === o}
                  onClick={() => update({ has: o })}>{o}</Chip>
          ))}
        </ChipGroup>
      </Field>

      <Field q="מה הפך אותו לחיובי?">
        <ChipGroup>
          {['יחס אישי','יוזמה','פתרון מהיר','הסבר ברור','רגישות לצורך',
            'שיתוף פעולה בין אנשי צוות','הפחתת לחץ','יצירת תחושת ביטחון',
            'הפתעה נעימה','אחר'].map(o => (
              <Chip key={o} tone="yellow" selected={(s.whatMade || []).includes(o)}
                    onClick={() => update({ whatMade: toggle(s.whatMade || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.whatMade || []).includes('אחר') && (
          <OtherInput value={s.whatMadeCustom} onChange={v => update({ whatMadeCustom: v })}/>
        )}
      </Field>

      <Field q="מה קרה שם בפועל?">
        <TextAreaCard rows={3} value={s.whatHappened}
                      onChange={e => update({ whatHappened: e.target.value })}/>
      </Field>

      <Field q="מה אפשר לשמר או לשכפל מהרגע הזה?">
        <TextAreaCard rows={3} value={s.replicate}
                      onChange={e => update({ replicate: e.target.value })}/>
      </Field>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 8: מה למדנו ומה עושים עם זה?
// ─────────────────────────────────────────────────────────────
function Step8({ passenger, setPassenger }) {
  const s = passenger.step8 || {};
  const update = (patch) => setPassenger({ ...passenger, step8: { ...s, ...patch } });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Field q="התובנה המרכזית מהתצפית על הנוסע הזה" icon="wand">
        <TextAreaCard rows={3} value={s.insight}
                      onChange={e => update({ insight: e.target.value })}/>
      </Field>

      <Field q="מה כדאי לשפר?">
        <ChipGroup>
          {['בהירות מידע','שילוט והכוונה','זמן המתנה','זמינות נותני שירות',
            'איכות ההסבר','יחס אישי','תיאום בין גורמים','תהליך / נוהל',
            'סביבה פיזית','טכנולוגיה','לא נדרש שיפור משמעותי','אחר'].map(o => (
              <Chip key={o} selected={(s.improve || []).includes(o)}
                    onClick={() => update({ improve: toggle(s.improve || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.improve || []).includes('אחר') && (
          <OtherInput value={s.improveCustom} onChange={v => update({ improveCustom: v })}/>
        )}
      </Field>

      <Field q="פעולה אחת ישימה בעקבות התצפית" icon="sparkle">
        <TextAreaCard rows={2} value={s.action}
                      onChange={e => update({ action: e.target.value })}/>
      </Field>

      <Field q="מי יכול להשפיע על הפעולה הזאת?">
        <ChipGroup>
          {['נותן שירות','מנהל משמרת','צוות הדרכה','צוות תפעול',
            'צוות שילוט / מרחב','מערכות מידע','הנהלה','גורם חיצוני','אחר'].map(o => (
              <Chip key={o} tone="sky" selected={(s.who || []).includes(o)}
                    onClick={() => update({ who: toggle(s.who || [], o) })}>
                {o}
              </Chip>
            ))}
        </ChipGroup>
        {(s.who || []).includes('אחר') && (
          <OtherInput value={s.whoCustom} onChange={v => update({ whoCustom: v })}/>
        )}
      </Field>

      <Field q="רמת ישימות">
        <ChipGroup>
          {['אפשר ליישם מיידית','דורש תיאום קטן','דורש שינוי תהליך',
            'דורש החלטת הנהלה','דורש בדיקה נוספת'].map(o => (
              <Chip key={o} selected={s.applicability === o}
                    onClick={() => update({ applicability: o })}>{o}</Chip>
            ))}
        </ChipGroup>
      </Field>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 9: החוויה במשפט אחד
// ─────────────────────────────────────────────────────────────
function Step9({ passenger, setPassenger }) {
  const s = passenger.step9 || {};
  const update = (patch) => setPassenger({ ...passenger, step9: { ...s, ...patch } });
  const max = 140;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <p style={{ margin: 0, fontSize: 14.5, color: 'var(--slate-600)', lineHeight: 1.55 }}>
        נסו לסכם את החוויה כאילו אתם הנוסע. משפט אחד, עד {max} תווים.
      </p>

      <div style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #ffffff 0%, #f4faff 100%)',
        borderRadius: 24, padding: '24px 18px 18px',
        boxShadow: 'var(--shadow-card-lg)',
      }}>
        <div style={{
          position: 'absolute', top: -8, right: 20, padding: '4px 10px',
          background: '#ffd166', color: '#5a3e0f', fontSize: 11, fontWeight: 700,
          borderRadius: 99, boxShadow: '0 4px 10px rgba(245,185,66,0.32)',
        }}>משפט סיכום</div>

        <Icon name="quote" size={26} color="#2db8a7"/>
        <textarea value={s.sentence || ''} maxLength={max}
                  onChange={e => update({ sentence: e.target.value })}
                  rows={3}
                  placeholder="לדוגמה: 'הרגשתי שלא בטוח לאן ללכת, ובסוף קיבלתי תשובה ברורה תוך דקה.'"
                  style={{
                    width: '100%', border: 0, outline: 0, background: 'transparent',
                    fontFamily: 'inherit', fontSize: 18, fontWeight: 500,
                    lineHeight: 1.4, color: 'var(--ink-900)',
                    marginTop: 8, padding: 0, direction: 'rtl',
                    letterSpacing: -0.2,
                  }}/>
        <div style={{ textAlign: 'left', marginTop: 6, fontSize: 12, color: 'var(--slate-400)' }}>
          {(s.sentence || '').length} / {max}
        </div>
      </div>

      <div style={{
        background: 'rgba(76,195,138,0.10)', borderRadius: 16,
        padding: '12px 14px', fontSize: 13, color: 'var(--ink-700)',
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <Icon name="sparkle" size={18} color="#2faa6e"/>
        <div style={{ flex: 1, lineHeight: 1.55 }}>
          <b>טיפ:</b> השתמשו בגוף ראשון. תארו רגש או רגע, לא רק עובדה.
        </div>
      </div>
    </div>
  );
}

const WIZARD_STEPS = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9];

export { CAUSE_GROUPS };
