import React from 'react';
import { List, Checkbox, Tag } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import type { ItemValidacao } from '../types';

interface ListaValidacoesProps {
  validacoes: ItemValidacao[];
  onToggle: (featureId: string, validacaoId: string, concluido: boolean) => void;
  featureId: string; 
}

const ListaValidacoes: React.FC<ListaValidacoesProps> = ({ validacoes, onToggle, featureId }) => (
  <List
    dataSource={validacoes}
    renderItem={(item) => (
      <List.Item
        actions={[
          item.concluido ? 
            <Tag icon={<CheckOutlined />} color="success">Concluído</Tag> : 
            <Tag color="default">Pendente</Tag>
        ]}
      >
        <List.Item.Meta
          avatar={
            <Checkbox
              checked={item.concluido}
              onChange={(e) => onToggle(featureId, item.id, e.target.checked)} 
            />
          }
          title={
            <span style={{ textDecoration: item.concluido ? 'line-through' : 'none' }}>
              {item.descricao}
            </span>
          }
        />
      </List.Item>
    )}
  />
);

export default ListaValidacoes;