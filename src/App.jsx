import { useCSVData } from '@/hooks/useCSVData';
import { useSelector } from 'react-redux';
import { SummaryCards } from '@/components/layout/summary-cards';
import { SurveyFilter } from '@/components/layout/survey-filter';
import { ChartSection } from '@/components/layout/chart-section';
import { SurveyTable } from '@/components/layout/survey-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';

function App() {
  useCSVData();
  const loading = useSelector((state) => state.survey.loading);
  const error = useSelector((state) => state.survey.error);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Veriler yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive text-lg">Veriler yüklenemedi: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ne Dendy?</h1>
            <p className="text-sm text-muted-foreground">
              Anket yanıtları analiz paneli
            </p>
          </div>
          <ThemeToggle />
        </div>

        <SummaryCards />

        <ChartSection />

        <SurveyFilter />

        <Card>
          <CardHeader>
            <CardTitle>Yanıt Tablosu</CardTitle>
          </CardHeader>
          <CardContent>
            <SurveyTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
