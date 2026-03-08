import { useState, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ChevronDown, Filter, X } from 'lucide-react';

export function ColumnFilter({ title, options, selected, onSelectionChange }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const hasFilter = selected.length > 0;
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const term = search.toLowerCase();
    return options.filter((opt) => opt.toLowerCase().includes(term));
  }, [options, search]);

  const handleToggle = (value) => {
    if (selectedSet.has(value)) {
      onSelectionChange(selected.filter((v) => v !== value));
    } else {
      onSelectionChange([...selected, value]);
    }
  };

  const handleClearFilter = () => {
    onSelectionChange([]);
  };

  const handleSelectOnly = (value) => {
    onSelectionChange([value]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 mx-auto">
          <span>{title}</span>
          {hasFilter ? (
            <Filter className="h-3 w-3 text-primary" />
          ) : (
            <ChevronDown className="h-3 w-3 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0" align="start">
        <div className="p-2 border-b">
          <Input
            placeholder="Ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 text-sm"
          />
        </div>

        {hasFilter && (
          <div className="p-2 border-b flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              {selected.length} / {options.length} seçili
            </span>
            <Button
              variant="ghost"
              size="xs"
              className="text-destructive hover:text-destructive"
              onClick={handleClearFilter}
            >
              <X className="h-3 w-3" />
              Filtreyi Temizle
            </Button>
          </div>
        )}

        <div className="max-h-[240px] overflow-y-auto p-2 space-y-1">
          {filtered.map((option) => (
            <div
              key={option}
              className="flex items-center gap-2 px-1 py-1 rounded hover:bg-accent group"
            >
              <Checkbox
                id={`filter-${option}`}
                checked={selectedSet.has(option)}
                onCheckedChange={() => handleToggle(option)}
                className="h-3.5 w-3.5"
              />
              <label
                htmlFor={`filter-${option}`}
                className="text-xs cursor-pointer flex-1 truncate"
              >
                {option}
              </label>
              <Button
                variant="link"
                size="xs"
                className="text-[10px] text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity p-0 h-auto"
                onClick={() => handleSelectOnly(option)}
              >
                sadece
              </Button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-2">
              Sonuç bulunamadı
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
