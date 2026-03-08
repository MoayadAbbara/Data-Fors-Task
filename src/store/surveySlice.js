import { createSlice, createSelector } from '@reduxjs/toolkit';
import { FILTER_VALUES, SCORE_RANGES } from '@/constants';

const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    data: [],
    columnFilters: {},
    displayFilter: FILTER_VALUES.ONE_CIKANLAR,
    riskFilter: FILTER_VALUES.TUMU,
    loading: true,
    error: null,
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setColumnFilter(state, action) {
      const { column, values } = action.payload;
      if (values.length === 0) {
        delete state.columnFilters[column];
      } else {
        state.columnFilters[column] = values;
      }
    },
    setDisplayFilter(state, action) {
      state.displayFilter = action.payload;
    },
    setRiskFilter(state, action) {
      state.riskFilter = action.payload;
    },
  },
});

export const { setData, setError, setColumnFilter, setDisplayFilter, setRiskFilter } =
  surveySlice.actions;

const selectData = (state) => state.survey.data;
const selectColumnFilters = (state) => state.survey.columnFilters;
const selectDisplayFilter = (state) => state.survey.displayFilter;
const selectRiskFilter = (state) => state.survey.riskFilter;

export const selectFilteredData = createSelector(
  [selectData, selectColumnFilters, selectDisplayFilter, selectRiskFilter],
  (data, columnFilters, displayFilter, riskFilter) => {
    return data.filter((row) => {
      for (const [column, values] of Object.entries(columnFilters)) {
        if (!values.includes(row[column])) return false;
      }
      if (displayFilter === FILTER_VALUES.ONE_CIKANLAR && !row.should_display) return false;
      if (riskFilter === FILTER_VALUES.SADECE_RISKLI && !row.risk_flag) return false;
      return true;
    });
  }
);

export const selectSummaryStats = createSelector([selectData], (data) => {
  if (data.length === 0) {
    return {
      totalCount: 0,
      highlightedCount: 0,
      actionRequiredCount: 0,
      riskCount: 0,
      riskTypes: [],
      score: { min: 0, avg: 0, max: 0 },
      severity: { min: 0, avg: 0, max: 0 },
      confidence: { min: 0, avg: 0, max: 0 },
    };
  }

  let scoreSum = 0, sevSum = 0, confSum = 0;
  let scoreN = 0, sevN = 0, confN = 0;
  let scoreMin = 1, sevMin = 1, confMin = 1;
  let scoreMax = 0, sevMax = 0, confMax = 0;
  let highlightedCount = 0, followUpCount = 0, escalateCount = 0, riskCount = 0;
  const riskTypeSet = new Set();

  for (const row of data) {
    if (row.score != null) {
      scoreSum += row.score; scoreN++;
      if (row.score < scoreMin) scoreMin = row.score;
      if (row.score > scoreMax) scoreMax = row.score;
    }
    if (row.severity != null) {
      sevSum += row.severity; sevN++;
      if (row.severity < sevMin) sevMin = row.severity;
      if (row.severity > sevMax) sevMax = row.severity;
    }
    if (row.confidence != null) {
      confSum += row.confidence; confN++;
      if (row.confidence < confMin) confMin = row.confidence;
      if (row.confidence > confMax) confMax = row.confidence;
    }
    if (row.should_display) highlightedCount++;
    if (row.action === 'follow_up') followUpCount++;
    if (row.action === 'escalate') escalateCount++;
    if (row.risk_flag) {
      riskCount++;
      if (Array.isArray(row.risk_flags)) {
        row.risk_flags.forEach((f) => riskTypeSet.add(f));
      }
    }
  }

  return {
    totalCount: data.length,
    highlightedCount,
    followUpCount,
    escalateCount,
    actionRequiredCount: followUpCount + escalateCount,
    riskCount,
    riskTypes: [...riskTypeSet],
    score: { min: scoreN ? scoreMin : 0, avg: scoreN ? scoreSum / scoreN : 0, max: scoreMax },
    severity: { min: sevN ? sevMin : 0, avg: sevN ? sevSum / sevN : 0, max: sevMax },
    confidence: { min: confN ? confMin : 0, avg: confN ? confSum / confN : 0, max: confMax },
  };
});

export const selectSentimentData = createSelector([selectData], (data) => {
  const counts = {};
  for (const row of data) {
    const key = row.sentiment || '';
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
});

export const selectScoreDistData = createSelector([selectData], (data) => {
  const buckets = SCORE_RANGES.map((r) => ({ range: r.key, count: 0 }));
  for (const row of data) {
    if (row.score == null) continue;
    const idx = SCORE_RANGES.findIndex((r) => row.score >= r.min && row.score < r.max);
    if (idx !== -1) buckets[idx].count++;
  }
  return buckets;
});

export const selectThemeData = createSelector([selectData], (data) => {
  const counts = {};
  for (const row of data) {
    if (!Array.isArray(row.themes)) continue;
    for (const theme of row.themes) {
      counts[theme] = (counts[theme] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
});

export const selectSentimentActionMatrix = createSelector([selectData], (data) => {
  const matrix = {};
  for (const row of data) {
    const action = row.action || 'unknown';
    const sentiment = row.sentiment || '';
    if (!matrix[action]) matrix[action] = { action, positive: 0, negative: 0, neutral: 0, '': 0 };
    matrix[action][sentiment]++;
  }
  return Object.values(matrix);
});

export const selectHighPriorityItems = createSelector([selectData], (data) => {
  return data
    .filter((row) => row.action === 'follow_up' || row.action === 'escalate' || row.risk_flag)
    .sort((a, b) => (b.severity ?? 0) - (a.severity ?? 0))
    .slice(0, 8);
});

const columnOptionSelectors = {};

export const selectColumnOptions = (column) => {
  if (!columnOptionSelectors[column]) {
    columnOptionSelectors[column] = createSelector([selectData], (data) => {
      const values = [...new Set(data.map((row) => row[column]).filter(Boolean))];
      return values.sort();
    });
  }
  return columnOptionSelectors[column];
};

export default surveySlice.reducer;
