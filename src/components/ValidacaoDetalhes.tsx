import React, { useState, useEffect } from 'react';
import { Input, Button, Space, Tag, Divider, Timeline } from 'antd';
import type { ItemValidacao } from '../types';
import { formatDateTime } from '../helper/date';

interface ValidacaoDetalhesProps {
  item: ItemValidacao;
  onChangeComentario: (comentario: string) => void;
}

const ValidacaoDetalhes: React.FC<ValidacaoDetalhesProps> = ({
  item,
  onChangeComentario,
}) => {
  const [comentarioTemp, setComentarioTemp] = useState(item.comentario || '');
  const [salvo, setSalvo] = useState(true);

  useEffect(() => {
    setComentarioTemp(item.comentario || '');
    setSalvo(true);
  }, [item.id]);

  const handleSalvar = () => {
    onChangeComentario(comentarioTemp);
    setSalvo(true);
  };

  return (
    <Space direction="vertical" size={6} style={{ width: '100%' }}>
      {/* COMENTÁRIO */}
      <Input.TextArea
        rows={3}
        value={comentarioTemp}
        onChange={(e) => {
          setComentarioTemp(e.target.value);
          setSalvo(false);
        }}
        placeholder="Digite um comentário..."
      />

      {/* AÇÕES */}
      <Space size={8}>
        <Button
          type="primary"
          size="small"
          onClick={handleSalvar}
          disabled={salvo}
        >
          Salvar comentário
        </Button>

        {salvo && item.comentario && <Tag color="success">Salvo</Tag>}
        {!salvo && <Tag color="warning">Não salvo</Tag>}
      </Space>

      {/* HISTÓRICO */}
      {item.historico && item.historico.length > 0 && (
        <>
          <Divider style={{ margin: '8px 0' }} />

          <Timeline
            items={item.historico.map((h, index) => ({
              key: index,
              children: (
                <span style={{ fontSize: 12 }}>
                  <b>{h.acao}</b> — {formatDateTime(h.data)}
                </span>
              ),
            }))}
          />
        </>
      )}
    </Space>
  );
};

export default ValidacaoDetalhes;
