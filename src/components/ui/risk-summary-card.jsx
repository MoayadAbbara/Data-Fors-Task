import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert } from 'lucide-react';
import { RISK_COLORS } from '@/constants';

export function RiskSummaryCard({ riskCount, riskTypes }) {
  const hasRisk = riskCount > 0;

  return (
    <Card className={hasRisk ? 'border-red-200 bg-red-50/30' : ''}>
      <CardContent className="pt-4 pb-4 px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Risk Uyarıları
          </span>
          <ShieldAlert
            className={`h-4 w-4 ${hasRisk ? 'text-red-500' : 'text-muted-foreground'}`}
          />
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className={`text-2xl font-bold ${hasRisk ? 'text-red-600' : ''}`}>
            {riskCount}
          </span>
          <span className="text-xs text-muted-foreground mb-1">riskli yanıt</span>
        </div>
        {riskTypes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {riskTypes.map((flag) => (
              <Badge
                key={flag}
                variant="secondary"
                className={`text-[10px] ${RISK_COLORS[flag] || 'bg-red-100 text-red-800'}`}
              >
                {flag.replaceAll('_', ' ')}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
