import { useSelector } from 'react-redux';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { selectScoreDistData } from '@/store/surveySlice';
import { CHART_COLORS } from '@/constants';

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background px-3 py-2 text-sm shadow-md">
      <div className="text-muted-foreground text-xs mb-1">Aralık: {label}</div>
      <div className="font-semibold">{payload[0].value} yanıt</div>
    </div>
  );
}

function CustomBarLabel({ x, y, width, value }) {
  if (value === 0) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 6}
      textAnchor="middle"
      fontSize={10}
      fontWeight={600}
      className="fill-muted-foreground"
    >
      {value}
    </text>
  );
}

export function ScoreDistChart() {
  const data = useSelector(selectScoreDistData);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Skor Dağılımı</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barSize={36} margin={{ top: 20, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/50" />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              className="fill-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              className="fill-muted-foreground"
              width={36}
            />
            <Tooltip content={<ChartTooltip />} cursor={false} />
            <Bar dataKey="count" name="Yanıt" radius={[6, 6, 0, 0]} label={<CustomBarLabel />}>
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS.score[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}
