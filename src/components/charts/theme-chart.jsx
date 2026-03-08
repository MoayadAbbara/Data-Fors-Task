import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { selectThemeData } from '@/store/surveySlice';
import { THEME_LABELS, THEME_BAR_COLORS } from '@/constants';

export function ThemeChart() {
  const data = useSelector(selectThemeData);
  const maxValue = data.length > 0 ? data[0].value : 1;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Tema Yoğunluğu</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          {data.map((d, i) => {
            const pct = (d.value / maxValue) * 100;
            const color = THEME_BAR_COLORS[i % THEME_BAR_COLORS.length];
            return (
              <div key={d.name} className="group">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {THEME_LABELS[d.name] || d.name}
                  </span>
                  <span className="text-[11px] font-bold tabular-nums" style={{ color }}>
                    {d.value}
                  </span>
                </div>
                <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
