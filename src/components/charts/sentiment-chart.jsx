import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { selectSentimentData } from '@/store/surveySlice';
import { CHART_COLORS, SENTIMENT_LABELS } from '@/constants';

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="rounded-lg border bg-background px-3 py-2 text-sm shadow-md">
      <div className="font-medium">{SENTIMENT_LABELS[name] || name}</div>
      <div className="text-muted-foreground">{value} yanıt</div>
    </div>
  );
}

const RENDER_LABEL = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function SentimentChart() {
  const data = useSelector(selectSentimentData);
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Duygu Dağılımı</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={75}
              dataKey="value"
              strokeWidth={2}
              stroke="hsl(var(--background))"
              labelLine={false}
              label={RENDER_LABEL}
            >
              {data.map((d) => (
                <Cell
                  key={d.name}
                  fill={CHART_COLORS.sentiment[d.name] || '#94a3b8'}
                />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-2 mt-auto pt-3">
          {data.map((d) => {
            const color = CHART_COLORS.sentiment[d.name] || '#94a3b8';
            return (
              <div
                key={d.name}
                className="flex items-center gap-2 rounded-md px-2.5 py-1.5"
                style={{ backgroundColor: color + '12' }}
              >
                <div
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-muted-foreground truncate">
                    {SENTIMENT_LABELS[d.name] || 'Belirsiz'}
                  </div>
                </div>
                <span className="text-xs font-bold tabular-nums" style={{ color }}>
                  {d.value}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
