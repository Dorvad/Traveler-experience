import { useState } from 'react';
import { Icon } from './AirportArt.jsx';

// ─────────────────────────────────────────────────────────────
// Button
// ─────────────────────────────────────────────────────────────
export function Button({
  children, variant = 'primary', size = 'lg', icon, iconRight,
  onClick, disabled, style = {}, fullWidth = true,
}) {
  const [pressed, setPressed] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, border: 0, cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit', fontWeight: 600,
    transition: 'transform .12s cubic-bezier(.2,.7,.3,1), box-shadow .15s, background .15s, opacity .15s',
    width: fullWidth ? '100%' : undefined,
    opacity: disabled ? 0.45 : 1,
    transform: pressed ? 'scale(0.97)' : 'scale(1)',
  };
  const sizes = {
    lg: { height: 56, padding: '0 22px', fontSize: 17, borderRadius: 999 },
    md: { height: 48, padding: '0 18px', fontSize: 16, borderRadius: 999 },
    sm: { height: 38, padding: '0 14px', fontSize: 14, borderRadius: 999 },
  };
  const variants = {
    primary: {
      background: 'linear-gradient(180deg, #2db8a7 0%, #1d9d8d 100%)',
      color: '#fff',
      boxShadow: '0 6px 16px rgba(29,157,141,0.32), inset 0 1px 0 rgba(255,255,255,0.25)',
    },
    accent: {
      background: 'linear-gradient(180deg, #ffd166 0%, #f5b942 100%)',
      color: '#5a3e0f',
      boxShadow: '0 6px 16px rgba(245,185,66,0.36), inset 0 1px 0 rgba(255,255,255,0.45)',
    },
    sky: {
      background: 'linear-gradient(180deg, #5fb4e3 0%, #3a99cf 100%)',
      color: '#fff',
      boxShadow: '0 6px 16px rgba(58,153,207,0.32), inset 0 1px 0 rgba(255,255,255,0.25)',
    },
    secondary: {
      background: '#ffffff',
      color: 'var(--ink-800)',
      boxShadow: '0 2px 6px rgba(20,56,98,0.08), inset 0 0 0 1px rgba(20,56,98,0.08)',
    },
    ghost: {
      background: 'rgba(255,255,255,0.55)',
      color: 'var(--ink-800)',
      boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.12)',
      backdropFilter: 'blur(8px)',
    },
    quiet: {
      background: 'transparent',
      color: 'var(--ink-700)',
      boxShadow: 'none',
    },
  };
  return (
    <button onClick={onClick} disabled={disabled}
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => setPressed(false)}
            onPointerLeave={() => setPressed(false)}
            style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{children}</span>
      {iconRight && <span style={{ display: 'inline-flex' }}>{iconRight}</span>}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────────────────────
export function Card({ children, style = {}, padding = 20, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick}
         onMouseEnter={() => onClick && setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         style={{
           background: '#ffffff',
           borderRadius: 24,
           padding,
           boxShadow: hovered
             ? '0 4px 14px rgba(20,56,98,0.10), 0 18px 40px rgba(20,56,98,0.12)'
             : 'var(--shadow-card)',
           transition: 'transform .15s cubic-bezier(.2,.7,.3,1), box-shadow .15s',
           transform: hovered ? 'translateY(-2px)' : 'none',
           cursor: onClick ? 'pointer' : undefined,
           ...style,
         }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// Chip
// ─────────────────────────────────────────────────────────────
export function Chip({ children, selected = false, onClick, icon, size = 'md', tone = 'teal' }) {
  const tones = {
    teal:   { bg: '#2db8a7', shadow: 'rgba(29,157,141,0.28)' },
    sky:    { bg: '#3a99cf', shadow: 'rgba(58,153,207,0.28)' },
    yellow: { bg: '#f5b942', shadow: 'rgba(245,185,66,0.32)', fg: '#5a3e0f' },
    coral:  { bg: '#f48066', shadow: 'rgba(244,128,102,0.30)' },
  };
  const t = tones[tone];
  const sizes = {
    sm: { height: 32, padding: '0 12px', fontSize: 13, borderRadius: 16 },
    md: { height: 40, padding: '0 16px', fontSize: 14.5, borderRadius: 20 },
    lg: { height: 48, padding: '0 18px', fontSize: 15.5, borderRadius: 24 },
  };
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      border: 0, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
      transition: 'all .15s cubic-bezier(.2,.7,.3,1)',
      background: selected ? t.bg : '#ffffff',
      color: selected ? (t.fg || '#ffffff') : 'var(--ink-700)',
      boxShadow: selected
        ? `0 6px 14px ${t.shadow}, inset 0 1px 0 rgba(255,255,255,0.25)`
        : '0 1px 3px rgba(20,56,98,0.06), inset 0 0 0 1px rgba(20,56,98,0.10)',
      transform: selected ? 'translateY(-1px)' : 'none',
      ...sizes[size],
    }}>
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{children}</span>
      {selected && <Icon name="check" size={14} color={t.fg || '#ffffff'} weight={2.2}/>}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// StatusPill
// ─────────────────────────────────────────────────────────────
export function StatusPill({ status }) {
  const map = {
    'not-started': { label: 'לא התחיל',  bg: '#eef4f9', fg: '#5b7186', dot: '#95a9bf' },
    'in-progress': { label: 'בתהליך',    bg: '#fff3d6', fg: '#8a6210', dot: '#f5b942' },
    'almost':      { label: 'כמעט מוכן', bg: '#d6f2ee', fg: '#0f7a6c', dot: '#2db8a7' },
    'done':        { label: 'הושלם',     bg: '#dff5e9', fg: '#1d6c44', dot: '#4cc38a' },
  };
  const s = map[status] || map['not-started'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 10px 5px 12px',
      borderRadius: 999, fontSize: 12, fontWeight: 600,
      background: s.bg, color: s.fg,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: 99, background: s.dot,
        animation: status === 'in-progress' ? 'pulseDot 1.6s ease-in-out infinite' : undefined,
      }}/>
      {s.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// ProgressBar
// ─────────────────────────────────────────────────────────────
export function ProgressBar({ value = 0, label, sublabel }) {
  return (
    <div style={{ width: '100%' }}>
      {(label || sublabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between',
                      fontSize: 12.5, color: 'var(--slate-500)',
                      fontWeight: 500, marginBottom: 6 }}>
          <span style={{ color: 'var(--ink-700)', fontWeight: 600 }}>{label}</span>
          <span>{sublabel}</span>
        </div>
      )}
      <div style={{
        height: 8, background: 'rgba(255,255,255,0.65)',
        borderRadius: 99, overflow: 'hidden',
        boxShadow: 'inset 0 1px 2px rgba(20,56,98,0.08)',
      }}>
        <div style={{
          height: '100%', width: `${Math.max(4, value)}%`,
          background: 'linear-gradient(90deg, #4dc7b8, #2db8a7 50%, #4dc7b8)',
          backgroundSize: '200% 100%',
          borderRadius: 99,
          transition: 'width .5s cubic-bezier(.2,.7,.3,1)',
          animation: 'progressShine 2.4s linear infinite',
          boxShadow: '0 0 8px rgba(45,184,167,0.4)',
        }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// InputCard
// ─────────────────────────────────────────────────────────────
export function InputCard({ icon, label, value, onChange, placeholder, type = 'text', readOnly }) {
  const [focused, setFocused] = useState(false);
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: '#ffffff', borderRadius: 18, padding: '14px 16px',
      boxShadow: focused
        ? '0 0 0 2px rgba(45,184,167,0.35), var(--shadow-card)'
        : 'var(--shadow-card)',
      cursor: readOnly ? 'default' : 'text',
      transition: 'box-shadow .2s',
    }}>
      {icon && (
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: focused ? 'rgba(45,184,167,0.15)' : 'rgba(45,184,167,0.10)',
          color: '#1d9d8d',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background .2s',
        }}>{icon}</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: 'var(--slate-500)',
                      fontWeight: 500, marginBottom: 2 }}>{label}</div>
        <input value={value || ''} onChange={onChange} placeholder={placeholder}
               type={type} readOnly={readOnly}
               onFocus={() => setFocused(true)}
               onBlur={() => setFocused(false)}
               style={{
                 width: '100%', border: 0, outline: 0, background: 'transparent',
                 fontSize: 16, color: 'var(--ink-900)', fontWeight: 500,
                 fontFamily: 'inherit', padding: 0, direction: 'rtl',
               }}/>
      </div>
    </label>
  );
}

// ─────────────────────────────────────────────────────────────
// TextAreaCard
// ─────────────────────────────────────────────────────────────
export function TextAreaCard({ label, helper, value, onChange, placeholder, rows = 4, maxLength }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      background: '#ffffff', borderRadius: 18, padding: '14px 16px',
      boxShadow: focused
        ? '0 0 0 2px rgba(45,184,167,0.35), var(--shadow-card)'
        : 'var(--shadow-card)',
      transition: 'box-shadow .2s',
    }}>
      {label && (
        <div style={{
          fontSize: 14, color: 'var(--ink-800)', fontWeight: 600,
          marginBottom: 4,
        }}>{label}</div>
      )}
      {helper && (
        <div style={{
          fontSize: 12, color: 'var(--slate-500)', fontWeight: 400,
          lineHeight: 1.5, marginBottom: 10,
        }}>{helper}</div>
      )}
      <textarea value={value || ''} onChange={onChange} placeholder={placeholder}
                rows={rows} maxLength={maxLength}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  width: '100%', border: 0, outline: 0,
                  fontSize: 15.5, color: 'var(--ink-900)',
                  fontFamily: 'inherit', padding: 0, direction: 'rtl',
                  lineHeight: 1.55, background: 'transparent',
                }}/>
      {maxLength && (
        <div style={{
          textAlign: 'left', fontSize: 11.5, color: 'var(--slate-400)',
          marginTop: 4,
        }}>{(value||'').length} / {maxLength}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SectionTitle
// ─────────────────────────────────────────────────────────────
export function SectionTitle({ children, kicker, style = {} }) {
  return (
    <div style={{ marginBottom: 10, ...style }}>
      {kicker && (
        <div style={{
          fontSize: 11.5, color: 'var(--teal-600)', fontWeight: 600,
          letterSpacing: 0.5, marginBottom: 4,
        }}>{kicker}</div>
      )}
      <div style={{
        fontSize: 17, color: 'var(--ink-900)', fontWeight: 700,
        lineHeight: 1.3,
      }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ChipGroup
// ─────────────────────────────────────────────────────────────
export function ChipGroup({ children, style = {} }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, ...style }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PhoneScreen — sky-blue gradient surface
// ─────────────────────────────────────────────────────────────
export function PhoneScreen({ children, bg = 'sky', pad = true }) {
  const bgs = {
    sky: 'linear-gradient(180deg, #a4d8f2 0%, #c5e4f3 30%, #e9f5fb 100%)',
    paper: 'linear-gradient(180deg, #eaf4fb 0%, #f6fbff 100%)',
    summary: 'linear-gradient(180deg, #b9def5 0%, #d6eaf4 18%, #f3f8fc 60%, #fafdfe 100%)',
  };
  return (
    <div className="rtl tt-scroll" style={{
      direction: 'rtl',
      width: '100%', height: '100%',
      background: bgs[bg],
      paddingTop: 'env(safe-area-inset-top, 0px)',
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
      overflowY: 'auto',
    }}>
      <div style={{ padding: pad ? '0 20px 24px' : 0 }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TopBar
// ─────────────────────────────────────────────────────────────
export function TopBar({ title, onBack, onClose, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 6px 16px', gap: 12,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{
          width: 40, height: 40, borderRadius: 999, border: 0,
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(8px)',
          boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.08), 0 2px 6px rgba(20,56,98,0.06)',
          color: 'var(--ink-800)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform .1s',
        }}><Icon name="chevron-right" size={20}/></button>
      ) : <div style={{ width: 40 }}/>}
      <div style={{
        flex: 1, textAlign: 'center', fontSize: 13.5,
        color: 'var(--ink-700)', fontWeight: 600,
      }}>{title}</div>
      {right || (onClose ? (
        <button onClick={onClose} style={{
          height: 36, padding: '0 14px', borderRadius: 999, border: 0,
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(8px)',
          boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.08)',
          color: 'var(--ink-700)', fontWeight: 500, fontSize: 13,
        }}>שמירה</button>
      ) : <div style={{ width: 40 }}/>)}
    </div>
  );
}

// Boarding-pass dotted divider
export function DottedDivider({ color = 'rgba(20,56,98,0.18)' }) {
  return (
    <div style={{
      position: 'relative', height: 1, margin: '14px 0',
      backgroundImage: `linear-gradient(90deg, ${color} 50%, transparent 50%)`,
      backgroundSize: '8px 1px',
      backgroundRepeat: 'repeat-x',
    }}>
      <div style={{
        position: 'absolute', top: '50%', right: -14,
        transform: 'translateY(-50%)',
        width: 18, height: 18, borderRadius: 99,
        background: '#a4d8f2',
        boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.06)',
      }}/>
      <div style={{
        position: 'absolute', top: '50%', left: -14,
        transform: 'translateY(-50%)',
        width: 18, height: 18, borderRadius: 99,
        background: '#a4d8f2',
        boxShadow: 'inset 0 0 0 1px rgba(20,56,98,0.06)',
      }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ScaleRow — 1–5 rating
// ─────────────────────────────────────────────────────────────
export function ScaleRow({ value, onChange, labels = [] }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, direction: 'ltr' }}>
        {[5,4,3,2,1].map(n => {
          const sel = n === value;
          return (
            <button key={n} onClick={() => onChange && onChange(n)}
              style={{
                flex: 1, height: 48, borderRadius: 16, border: 0,
                background: sel
                  ? 'linear-gradient(180deg, #2db8a7, #1d9d8d)'
                  : '#ffffff',
                color: sel ? '#fff' : 'var(--ink-700)',
                fontSize: 18, fontWeight: 700, fontFamily: 'inherit',
                boxShadow: sel
                  ? '0 6px 14px rgba(29,157,141,0.28)'
                  : '0 1px 3px rgba(20,56,98,0.06), inset 0 0 0 1px rgba(20,56,98,0.08)',
                transition: 'all .15s',
                transform: sel ? 'translateY(-1px)' : 'none',
              }}>{n}</button>
          );
        })}
      </div>
      {labels.length === 2 && (
        <div style={{ display: 'flex', justifyContent: 'space-between',
                      fontSize: 11.5, color: 'var(--slate-500)', marginTop: 6 }}>
          <span>{labels[1]}</span><span>{labels[0]}</span>
        </div>
      )}
    </div>
  );
}
