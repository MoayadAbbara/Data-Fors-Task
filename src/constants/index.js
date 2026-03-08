export const PAGE_SIZE = 20;

export const FILTER_VALUES = {
  TUMU: 'tumu',
  ONE_CIKANLAR: 'one_cikanlar',
  SADECE_RISKLI: 'sadece_riskli',
};

export const SCORE_THRESHOLDS = {
  HIGH: 0.7,
  MEDIUM: 0.4,
};

export const SEVERITY_THRESHOLDS = {
  HIGH: 0.7,
  MEDIUM: 0.4,
};

export const SENTIMENT_COLORS = {
  positive: 'bg-emerald-100 text-emerald-800',
  negative: 'bg-red-100 text-red-800',
  neutral: 'bg-gray-100 text-gray-800',
};

export const ACTION_COLORS = {
  watch: 'bg-amber-100 text-amber-800',
  follow_up: 'bg-red-100 text-red-800',
  ignore: 'bg-gray-100 text-gray-600',
};

export const RISK_COLORS = {
  safety_risk: 'bg-red-200 text-red-900',
  harassment_risk: 'bg-orange-200 text-orange-900',
  burnout_risk: 'bg-amber-200 text-amber-900',
  discrimination_risk: 'bg-purple-200 text-purple-900',
  self_harm_risk: 'bg-rose-200 text-rose-900',
};

export const CHART_COLORS = {
  sentiment: {
    positive: '#4ade80',
    negative: '#f87171',
    neutral: '#facc15',
    '': '#94a3b8',
  },
  action: {
    ignore: '#64748b',
    watch: '#f59e0b',
    follow_up: '#fb923c',
    escalate: '#ef4444',
  },
  score: ['#ef4444', '#f97316', '#94a3b8', '#60a5fa', '#4ade80'],
};

export const SENTIMENT_LABELS = {
  positive: 'Pozitif',
  negative: 'Negatif',
  neutral: 'Nötr',
  '': 'Belirsiz',
};

export const ACTION_LABELS = {
  ignore: 'Görmezden Gel',
  watch: 'İzle',
  follow_up: 'Takip Et',
  escalate: 'Eskalasyon',
};

export const THEME_LABELS = {
  communication: 'İletişim',
  culture: 'Kültür',
  process: 'Süreç',
  learning_development: 'Öğrenme',
  tools_systems: 'Araçlar',
  team_dynamics: 'Takım',
  fairness: 'Adalet',
  manager_behavior: 'Yönetici',
  compensation: 'Ücret',
  workload: 'İş Yükü',
  career_growth: 'Kariyer',
  work_life_balance: 'İş-Yaşam',
  recognition: 'Takdir',
  role_clarity: 'Rol Netliği',
};

export const THEME_BAR_COLORS = [
  '#6366f1', '#8b5cf6', '#a78bfa', '#60a5fa', '#38bdf8',
  '#2dd4bf', '#34d399', '#4ade80', '#a3e635', '#facc15',
  '#fb923c', '#f87171', '#e879f9', '#94a3b8',
];

export const SCORE_RANGES = [
  { key: '0.0–0.2', min: 0, max: 0.2 },
  { key: '0.2–0.4', min: 0.2, max: 0.4 },
  { key: '0.4–0.6', min: 0.4, max: 0.6 },
  { key: '0.6–0.8', min: 0.6, max: 0.8 },
  { key: '0.8–1.0', min: 0.8, max: 1.01 },
];
