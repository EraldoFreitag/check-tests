import React, { useState } from 'react';
import { List, Checkbox, Input, Button, Space, Timeline } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import type { StatusValidacao } from '../types';

interface Props {
  validacoes: any[];
  featureId: string;
  onChangeStatus: (
    featureId: string,
    validacaoId: string,
    status: StatusValidacao
  ) => void;
  onChangeComentario: (
    featureId: string,
    validacaoId: string,
    comentario: string
  ) => void;
}

const ListaValidacoes: React.FC<Props> = ({
  validacoes,
  featureId,
  onChangeStatus,
  onChangeComentario,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <List
      dataSource={validacoes}
      renderItem={item => {
        const expanded = expandedId === item.id;

        return (
          <List.Item style={{ padding: '8px 0' }}>
            <div style={{ width: '100%' }}>
              {/* Linha principal */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Space>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expanded ? <DownOutlined /> : <RightOutlined />}
                  </span>

                  <Checkbox
                    checked={item.status === 'approved'}
                    onChange={e =>
                      onChangeStatus(
                        featureId,
                        item.id,
                        e.target.checked ? 'approved' : 'pending'
                      )
                    }
                  />

                  <span>{item.descricao}</span>
                </Space>
              </div>

              {/* Área expandida */}
              {expanded && (
                <div style={{ marginTop: 8, paddingLeft: 32 }}>
                  {/* Comentário */}
                  <Input.TextArea
                    rows={2}
                    placeholder="Adicionar comentário..."
                    value={item.comentario}
                    onChange={e =>
                      onChangeComentario(
                        featureId,
                        item.id,
                        e.target.value
                      )
                    }
                  />

                  <div style={{ marginTop: 8 }}>
                    <Button size="small" type="primary">
                      Salvar comentário
                    </Button>
                  </div>

                  {/* Histórico */}
                  {item.historico?.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <Timeline
                        items={item.historico.map((h: any, index: number) => ({
                          key: index,
                          children: `${h.status === 'approved' ? 'Aprovado' : 'Pendente'} - ${new Date(h.data).toLocaleString()}`,
                        }))}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </List.Item>
        );
      }}
    />
  );
};

export default ListaValidacoes;
