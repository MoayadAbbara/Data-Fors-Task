import { SCORE_THRESHOLDS } from '@/constants';

export function ScoreBar({ score }) {
  if (score == null) return <span className="text-xs text-muted-foreground">—</span>;
  const percent = Math.round(score * 100);
  const color =
    score >= SCORE_THRESHOLDS.HIGH
      ? 'bg-emerald-500'
      : score >= SCORE_THRESHOLDS.MEDIUM
        ? 'bg-amber-500'
        : 'bg-red-500';

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs text-muted-foreground">{percent}%</span>
    </div>
  );
}
