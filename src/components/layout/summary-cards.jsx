import { useSelector } from 'react-redux';
import { selectSummaryStats } from '@/store/surveySlice';
import { StatCard } from '@/components/ui/stat-card';
import { RiskSummaryCard } from '@/components/ui/risk-summary-card';
import { BarChart3, Eye, AlertTriangle, Target, Activity } from 'lucide-react';

export function SummaryCards() {
  const stats = useSelector(selectSummaryStats);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard
        title="Toplam Yanıt"
        stats={stats.totalCount}
        icon={BarChart3}
        format="number"
      />
      <StatCard
        title="Öne Çıkan"
        stats={stats.highlightedCount}
        icon={Eye}
        format="number"
      />
      <StatCard
        title="Aksiyon Bekleyen"
        stats={stats.actionRequiredCount}
        icon={AlertTriangle}
        format="number"
      />
      <StatCard title="Skor" stats={stats.score} icon={Target} />
      <StatCard title="Ciddiyet" stats={stats.severity} icon={Activity} />
      <RiskSummaryCard riskCount={stats.riskCount} riskTypes={stats.riskTypes} />
    </div>
  );
}
