export const INITIAL_SETUP = {
  team: '',
  date: new Date().toLocaleDateString('he-IL'),
  area: '',
  duration: '',
  participants: '',
};

export const EMPTY_PASSENGER = {
  status: 'not-started',
  situation: '',
  moment: '',
  impact: '',
  summary: '',
  step1: {}, step2: {}, step3: {}, step4: {},
  step5: { causes: {} }, step6: {}, step7: {},
  step8: {}, step9: {},
};

export function newPassenger() {
  return { ...EMPTY_PASSENGER, id: `p-${Date.now()}` };
}

export const AREAS = [
  { id: 'entry',     label: 'כניסה לטרמינל',    icon: 'door' },
  { id: 'checkin',   label: "צ'ק אין",           icon: 'ticket' },
  { id: 'queue',     label: 'תור / אזור המתנה',  icon: 'queue' },
  { id: 'security',  label: 'בידוק ביטחוני',    icon: 'shield' },
  { id: 'border',    label: 'ביקורת גבולות',    icon: 'passport' },
  { id: 'duty',      label: "דיוטי פרי / מסחר", icon: 'bag' },
  { id: 'gate',      label: 'שער עלייה למטוס',  icon: 'gate' },
  { id: 'baggage',   label: 'איסוף כבודה',      icon: 'bag' },
  { id: 'info',      label: 'מודיעין / שירות',  icon: 'info' },
  { id: 'transit',   label: 'מעבר בין אזורים',  icon: 'transfer' },
  { id: 'other',     label: 'אחר',              icon: 'dots' },
];

export function getAreaLabel(id) {
  const a = AREAS.find(x => x.id === id);
  return a ? a.label : id;
}
