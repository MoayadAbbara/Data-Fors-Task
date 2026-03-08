import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { selectSummaryStats, selectHighPriorityItems } from '@/store/surveySlice';
import { ACTION_LABELS, CHART_COLORS, RISK_COLORS } from '@/constants';

export function RiskOverview() {
  const stats = useSelector(selectSummaryStats);
  const items = useSelector(selectHighPriorityItems);

  const riskItems = [
    { label: 'Eskalasyon', value: stats.escalateCount, color: CHART_COLORS.action.escalate },
    { label: 'Takip', value: stats.followUpCount, color: CHART_COLORS.action.follow_up },
    { label: 'Riskli', value: stats.riskCount, color: CHART_COLORS.action.watch },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Risk Analizi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {riskItems.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border p-3 text-center transition-colors hover:bg-accent/30"
              style={{ borderColor: item.color + '30', backgroundColor: item.value > 0 ? item.color + '08' : undefined }}
            >
              <div
                className="h-2 w-2 rounded-full mx-auto mb-2"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-xl font-bold tabular-nums" style={{ color: item.color }}>
                {item.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Yüksek Öncelikli
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {items.map((row, i) => {
                const sevPercent = Math.round((row.severity ?? 0) * 100);
                const actionColor = CHART_COLORS.action[row.action] || '#64748b';

                return (
                  <div
                    key={row.label_id || i}
                    className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/30 transition-colors"
                  >
                    <Badge
                      variant="secondary"
                      className="text-[10px] shrink-0 mt-0.5"
                      style={{
                        backgroundColor: actionColor + '15',
                        color: actionColor,
                        border: `1px solid ${actionColor}30`,
                      }}
                    >
                      {ACTION_LABELS[row.action] || row.action}
                    </Badge>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm leading-snug line-clamp-2">
                        {row.display_label || row.summary || '—'}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1 flex flex-wrap items-center gap-2">
                        <span>Ciddiyet: <strong className={sevPercent >= 70 ? 'text-red-500' : 'text-amber-500'}>{sevPercent}%</strong></span>
                        <span>Skor: <strong>{row.score != null ? Math.round(row.score * 100) + '%' : '—'}</strong></span>
                        {row.risk_flag && Array.isArray(row.risk_flags) && row.risk_flags.map((flag) => (
                          <Badge
                            key={flag}
                            variant="secondary"
                            className={`text-[9px] ${RISK_COLORS[flag] || 'bg-red-100 text-red-800'}`}
                          >
                            {flag.replaceAll('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div
                      className="h-9 w-9 rounded-full shrink-0 flex items-center justify-center"
                      style={{
                        background: `conic-gradient(${sevPercent >= 50 ? '#ef4444' : '#f59e0b'} ${sevPercent * 3.6}deg, hsl(var(--muted)) 0deg)`,
                      }}
                    >
                      <div className="h-6 w-6 rounded-full bg-background flex items-center justify-center text-[10px] text-muted-foreground font-mono font-bold">
                        {sevPercent}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
