import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ColumnFilter } from '@/components/ui/column-filter';
import { Pagination } from '@/components/ui/pagination';
import { ScoreBar } from '@/components/ui/score-bar';
import { SeverityIndicator } from '@/components/ui/severity-indicator';
import { RiskBadges } from '@/components/ui/risk-badges';
import { selectFilteredData, selectColumnOptions, setColumnFilter } from '@/store/surveySlice';
import { PAGE_SIZE, SENTIMENT_COLORS, ACTION_COLORS } from '@/constants';

const COLUMN_COUNT = 9;

export function SurveyTable() {
  const dispatch = useDispatch();
  const data = useSelector(selectFilteredData);
  const surveyIdOptions = useSelector(selectColumnOptions('survey_id'));
  const sentimentOptions = useSelector(selectColumnOptions('sentiment'));
  const actionOptions = useSelector(selectColumnOptions('action'));
  const surveyIdFilter = useSelector((state) => state.survey.columnFilters.survey_id || []);
  const sentimentFilter = useSelector((state) => state.survey.columnFilters.sentiment || []);
  const actionFilter = useSelector((state) => state.survey.columnFilters.action || []);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const term = search.toLowerCase();
    return data.filter(
      (row) =>
        (row.summary && row.summary.toLowerCase().includes(term)) ||
        (row.display_label && row.display_label.toLowerCase().includes(term)) ||
        (row.display_note && row.display_note.toLowerCase().includes(term)) ||
        (row.survey_id && row.survey_id.toLowerCase().includes(term))
    );
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(0, totalPages - 1));
  const paged = useMemo(
    () => filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE),
    [filtered, safePage]
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleColumnFilter = (column) => (values) => {
    dispatch(setColumnFilter({ column, values }));
    setPage(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Arama yap... (özet, etiket, anket ID)"
          value={search}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <span className="text-sm text-muted-foreground">
          {filtered.length} kayıt bulundu
        </span>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <ColumnFilter
                  title="Anket ID"
                  options={surveyIdOptions}
                  selected={surveyIdFilter}
                  onSelectionChange={handleColumnFilter('survey_id')}
                />
              </TableHead>
              <TableHead className="w-[200px] text-left">Insight</TableHead>
              <TableHead className="w-[280px] text-left">Özet</TableHead>
              <TableHead>
                <ColumnFilter
                  title="Duygu"
                  options={sentimentOptions}
                  selected={sentimentFilter}
                  onSelectionChange={handleColumnFilter('sentiment')}
                />
              </TableHead>
              <TableHead>Skor</TableHead>
              <TableHead>Ciddiyet</TableHead>
              <TableHead>
                <ColumnFilter
                  title="Aksiyon"
                  options={actionOptions}
                  selected={actionFilter}
                  onSelectionChange={handleColumnFilter('action')}
                />
              </TableHead>
              <TableHead>Temalar</TableHead>
              <TableHead>Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} className="text-center py-8 text-muted-foreground">
                  Veri bulunamadı
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row, i) => (
                <TableRow
                  key={row.label_id || i}
                  className={row.risk_flag ? 'bg-red-50/50' : ''}
                >
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    {row.survey_id}
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {row.display_label || '—'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground text-left">
                    {row.summary || '—'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={SENTIMENT_COLORS[row.sentiment] || ''}
                    >
                      {row.sentiment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ScoreBar score={row.score} />
                  </TableCell>
                  <TableCell>
                    <SeverityIndicator severity={row.severity} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={ACTION_COLORS[row.action] || ''}
                    >
                      {row.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {Array.isArray(row.themes) && row.themes.length > 0
                        ? row.themes.map((theme) => (
                            <Badge key={theme} variant="outline" className="text-xs">
                              {theme}
                            </Badge>
                          ))
                        : '—'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <RiskBadges riskFlags={row.risk_flags} riskFlag={row.risk_flag} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
