import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const STAT_OPTIONS = [
  { value: 'avg', label: 'Ortalama' },
  { value: 'min', label: 'Minimum' },
  { value: 'max', label: 'Maksimum' },
];

export function StatCard({ title, stats, icon: Icon, format = 'percent' }) {
  const [mode, setMode] = useState('avg');

  const hasDropdown = stats && typeof stats === 'object' && 'avg' in stats;
  const rawValue = hasDropdown ? stats[mode] : stats;
  const displayValue =
    format === 'percent' ? `${Math.round(rawValue * 100)}%` : rawValue;

  return (
    <Card>
      <CardContent className="pt-4 pb-4 px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </span>
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        </div>
        <div className="flex items-end justify-between gap-2">
          <span className="text-2xl font-bold">{displayValue}</span>
          {hasDropdown && (
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="w-[110px] h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STAT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
