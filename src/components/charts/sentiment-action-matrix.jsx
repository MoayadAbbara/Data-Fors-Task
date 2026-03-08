import { useSelector } from 'react-redux';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { selectSentimentActionMatrix } from '@/store/surveySlice';
import { ACTION_LABELS, CHART_COLORS } from '@/constants';

const SENTIMENT_COLUMNS = [
  { key: 'positive', label: 'Pozitif', color: CHART_COLORS.sentiment.positive },
  { key: 'neutral', label: 'Nötr', color: CHART_COLORS.sentiment.neutral },
  { key: 'negative', label: 'Negatif', color: CHART_COLORS.sentiment.negative },
  { key: '', label: 'Belirsiz', color: CHART_COLORS.sentiment[''] },
];

const ACTION_ORDER = ['ignore', 'watch', 'follow_up', 'escalate'];

export function SentimentActionMatrix() {
  const rawData = useSelector(selectSentimentActionMatrix);

  const data = ACTION_ORDER
    .map((action) => rawData.find((r) => r.action === action))
    .filter(Boolean);

  const maxVal = Math.max(...data.flatMap((row) => SENTIMENT_COLUMNS.map((c) => row[c.key] || 0)), 1);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Duygu × Eylem Matrisi</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-[110px]">Eylem</TableHead>
              {SENTIMENT_COLUMNS.map((col) => (
                <TableHead key={col.key} style={{ color: col.color }}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const actionColor = CHART_COLORS.action[row.action] || '#64748b';
              return (
                <TableRow key={row.action}>
                  <TableCell className="text-left">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded"
                      style={{ backgroundColor: actionColor + '15', color: actionColor }}
                    >
                      {ACTION_LABELS[row.action] || row.action}
                    </span>
                  </TableCell>
                  {SENTIMENT_COLUMNS.map((col) => {
                    const val = row[col.key] || 0;
                    const intensity = val / maxVal;
                    return (
                      <TableCell key={col.key}>
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className="text-sm font-bold tabular-nums"
                            style={{ color: val > 0 ? col.color : 'hsl(var(--muted-foreground))' }}
                          >
                            {val}
                          </span>
                          {val > 0 && (
                            <div className="h-1 w-10 bg-muted/50 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${intensity * 100}%`, backgroundColor: col.color }}
                              />
                            </div>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
