import { SEVERITY_THRESHOLDS } from '@/constants';

export function SeverityIndicator({ severity }) {
  if (severity == null) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }
  const percent = Math.round(severity * 100);
  const color =
    severity >= SEVERITY_THRESHOLDS.HIGH
      ? 'text-red-600'
      : severity >= SEVERITY_THRESHOLDS.MEDIUM
        ? 'text-amber-600'
        : 'text-gray-500';

  return <span className={`text-sm font-medium ${color}`}>{percent}%</span>;
}
