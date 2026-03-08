import { useSelector, useDispatch } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { setDisplayFilter, setRiskFilter } from '@/store/surveySlice';
import { FILTER_VALUES } from '@/constants';

const DISPLAY_LABELS = {
  [FILTER_VALUES.TUMU]: 'Tüm Yanıtlar',
  [FILTER_VALUES.ONE_CIKANLAR]: 'Öne Çıkanlar',
};

const RISK_LABELS = {
  [FILTER_VALUES.TUMU]: 'Tümü',
  [FILTER_VALUES.SADECE_RISKLI]: 'Sadece Riskli',
};

export function SurveyFilter() {
  const dispatch = useDispatch();
  const displayFilter = useSelector((state) => state.survey.displayFilter);
  const riskFilter = useSelector((state) => state.survey.riskFilter);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          Görünüm
        </label>
        <Select
          value={displayFilter}
          onValueChange={(value) => dispatch(setDisplayFilter(value))}
          modal={false}
        >
          <SelectTrigger className="w-[180px]">
            <span className="flex flex-1 text-left">{DISPLAY_LABELS[displayFilter]}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_VALUES.TUMU}>Tüm Yanıtlar</SelectItem>
            <SelectItem value={FILTER_VALUES.ONE_CIKANLAR}>Öne Çıkanlar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          Risk
        </label>
        <Select
          value={riskFilter}
          onValueChange={(value) => dispatch(setRiskFilter(value))}
          modal={false}
        >
          <SelectTrigger className="w-[180px]">
            <span className="flex flex-1 text-left">{RISK_LABELS[riskFilter]}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_VALUES.TUMU}>Tümü</SelectItem>
            <SelectItem value={FILTER_VALUES.SADECE_RISKLI}>Sadece Riskli</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
