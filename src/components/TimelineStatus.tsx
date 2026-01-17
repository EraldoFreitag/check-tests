import { Timeline, Tag } from 'antd';
import type { HistoricoStatus } from '../types';
import { STATUS_CONFIG } from '../helper/StatusConfig';
import { formatDateTime } from '../helper/date';

interface Props {
  historico?: HistoricoStatus[];
}

const TimelineStatus: React.FC<Props> = ({ historico }) => {
  if (!historico || historico.length === 0) return null;

  return (
    <Timeline
      items={historico.map((h, index) => ({
        key: index,
        children: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Tag color={STATUS_CONFIG[h.status].color}>
              {STATUS_CONFIG[h.status].label}
            </Tag>
            <span style={{ marginLeft: 8, fontSize: 12 }}>
              {formatDateTime(h.data)}
            </span>
          </div>
        ),
      }))}
    />
  );
};

export default TimelineStatus;
