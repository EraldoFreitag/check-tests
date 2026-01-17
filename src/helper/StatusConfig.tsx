import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

export const STATUS_CONFIG = {
  pending: {
    label: 'Pendente',
    color: 'default',
    icon: <ClockCircleOutlined />,
  },
  approved: {
    label: 'Aprovado',
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  adjust: {
    label: 'Ajustar',
    color: 'warning',
    icon: <ExclamationCircleOutlined />,
  },
  rejected: {
    label: 'Reprovado',
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
};
