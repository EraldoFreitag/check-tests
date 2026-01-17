import React from 'react';
import { List, Tag, Select } from 'antd';
import type { ItemValidacao, StatusValidacao } from '../types';
import { STATUS_CONFIG } from '../helper/StatusConfig';

interface ListaValidacoesProps {
  validacoes: ItemValidacao[];
  featureId: string;
  onChangeStatus: (
    featureId: string,
    validacaoId: string,
    status: StatusValidacao
  ) => void;
}

const ListaValidacoes: React.FC<ListaValidacoesProps> = ({
  validacoes,
  onChangeStatus,
  featureId,
}) => (
  <List
    dataSource={validacoes}
    renderItem={(item) => {
      const statusConfig = STATUS_CONFIG[item.status];

      return (
        <List.Item
          actions={[
            <Select
              key="status"
              value={item.status}
              onChange={(value: StatusValidacao) =>
                onChangeStatus(featureId, item.id, value)
              }
              style={{ width: 160 }}
            >
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <Select.Option key={key} value={key}>
                  <Tag color={config.color}>{config.label}</Tag>
                </Select.Option>
              ))}
            </Select>,
          ]}
        >
          <List.Item.Meta
            title={
              <span
                style={{
                  textDecoration:
                    item.status === 'approved'
                      ? 'line-through'
                      : 'none',
                }}
              >
                {item.descricao}
              </span>
            }
          />
        </List.Item>
      );
    }}
  />
);

export default ListaValidacoes;
