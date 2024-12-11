import { TrackRecord } from '@/types/track';

interface TrackRecordsProps {
  records: TrackRecord[];
}

const recordTypeKorean = {
  race: '레이스',
  qualifying: '예선',
  practice: '연습'
};

export default function TrackRecords({ records }: TrackRecordsProps) {
  return (
    <div className="bg-bg-secondary rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-text-primary">트랙 기록</h3>
      <div className="space-y-4">
        {records.map((record, index) => (
          <div
            key={index}
            className="bg-bg-tertiary p-3 rounded-md hover:bg-opacity-80 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-text-secondary">
                {recordTypeKorean[record.type]}
              </span>
              <span className="text-f1-red font-mono font-bold">
                {record.time}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-text-primary font-medium">{record.driver}</p>
                <p className="text-sm text-text-secondary">{record.team}</p>
              </div>
              <div className="text-right">
                <p className="text-text-primary">{record.year}</p>
                <p className="text-sm text-text-secondary">
                  {new Date(record.date).toLocaleDateString('ko-KR')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 