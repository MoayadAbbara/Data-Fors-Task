import { SentimentChart } from '@/components/charts/sentiment-chart';
import { ScoreDistChart } from '@/components/charts/score-dist-chart';
import { ThemeChart } from '@/components/charts/theme-chart';
import { SentimentActionMatrix } from '@/components/charts/sentiment-action-matrix';
import { RiskOverview } from '@/components/charts/risk-overview';

export function ChartSection() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SentimentChart />
        <ScoreDistChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ThemeChart />
        <SentimentActionMatrix />
      </div>

      <RiskOverview />
    </div>
  );
}
