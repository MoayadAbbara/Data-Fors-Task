import Papa from 'papaparse';

export function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      complete: (results) => {
        const data = results.data.map((row) => ({
          ...row,
          score: safeFloat(row.score),
          severity: safeFloat(row.severity),
          confidence: safeFloat(row.confidence),
          risk_flag: row.risk_flag === 't',
          should_display: row.should_display === 't',
          tags: safeParse(row.tags),
          themes: safeParse(row.themes),
          risk_flags: safeParse(row.risk_flags),
        }));
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

function safeFloat(value) {
  if (value === '' || value == null) return null;
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function safeParse(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch {
    return [];
  }
}
