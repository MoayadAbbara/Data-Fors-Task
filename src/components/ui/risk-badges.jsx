import { Badge } from '@/components/ui/badge';
import { RISK_COLORS } from '@/constants';

export function RiskBadges({ riskFlags, riskFlag }) {
  if (!riskFlag && (!Array.isArray(riskFlags) || riskFlags.length === 0)) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {Array.isArray(riskFlags) &&
        riskFlags.map((flag) => (
          <Badge
            key={flag}
            variant="secondary"
            className={RISK_COLORS[flag] || 'bg-red-100 text-red-800'}
          >
            {flag.replaceAll('_', ' ')}
          </Badge>
        ))}
      {riskFlag && (!Array.isArray(riskFlags) || riskFlags.length === 0) && (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          risk
        </Badge>
      )}
    </div>
  );
}
