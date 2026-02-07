import React, { useState } from 'react';
import { Input, Button, Space, Timeline } from 'antd';
import type { ItemValidacao } from '../types';
import { formatDateTime } from '../helper/date';

interface Props {
  item: ItemValidacao;
  onChangeComentario: (comentario: string) => void;
}

const ValidacaoDetalhes: React.FC<Props> = ({
  item,
  onChangeComentario,
}) => {
  const [comentario, setComentario] = useState(item.comentario || '');

  const handleSalvar = () => {
    onChangeComentario(comentario);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* COMENTÁRIO */}
      <Input.TextArea
        rows={3}
        value={comentario}
        placeholder="Digite um comentário..."
        onChange={(e) => setComentario(e.target.value)}
      />

      <Button
        type="primary"
        size="small"
        disabled={comentario === item.comentario}
        onClick={handleSalvar}
      >
        Salvar comentário
      </Button>


      {/* HISTÓRICO */}
      {item.historico && item.historico.length > 0 && (
        <Timeline
          items={item.historico.map((h, index) => ({
            key: index,
            children: (
              <div>
                <b>{h.acao}</b>
                <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                  {formatDateTime(h.data)}
                </div>
              </div>
            ),
          }))}
        />
      )}
    </Space>
  );
};

export default ValidacaoDetalhes;
