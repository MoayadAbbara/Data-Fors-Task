import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MAX_VISIBLE_PAGES = 5;

function getPageNumbers(current, total) {
  if (total <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const half = Math.floor(MAX_VISIBLE_PAGES / 2);
  let start = current - half;
  let end = current + half;

  if (start < 0) {
    start = 0;
    end = MAX_VISIBLE_PAGES - 1;
  }
  if (end >= total) {
    end = total - 1;
    start = total - MAX_VISIBLE_PAGES;
  }

  const pages = [];
  if (start > 0) {
    pages.push(0);
    if (start > 1) pages.push('...');
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < total - 1) {
    if (end < total - 2) pages.push('...');
    pages.push(total - 1);
  }
  return pages;
}

export function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = useMemo(() => getPageNumbers(page, totalPages), [page, totalPages]);

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(0, page - 1))}
        disabled={page === 0}
      >
        <ChevronLeft className="h-4 w-4" />
        Önceki
      </Button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-1 text-sm text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={p}
              variant={p === page ? 'default' : 'ghost'}
              size="xs"
              onClick={() => onPageChange(p)}
            >
              {p + 1}
            </Button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
        disabled={page >= totalPages - 1}
      >
        Sonraki
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
