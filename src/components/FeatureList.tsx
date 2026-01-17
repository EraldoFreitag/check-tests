import React, { useState } from 'react';
import { Collapse, Tag, Space } from 'antd';
import type { CollapseProps } from 'antd';
import type { FeaturePrincipal, TipoItem, StatusValidacao } from '../types';
import ListaValidacoes from './ListaValidacoes';
import HeaderActions from './HeaderActions';

const DADOS_INICIAIS: FeaturePrincipal[] = [
  {
    id: 'f1',
    titulo: 'Checklist Formulário',
    tipo: 'Form',
    validacoes: [
      { id: '1', descricao: 'Tamanho dos campos igual ao tamanho da coluna no BD', status: 'approved' },
      { id: '2', descricao: 'Testar campos obrigatórios (Required)', status: 'pending' },
    ],
  },
  {
    id: 'f2',
    titulo: 'Checklist Popup',
    tipo: 'Popup',
    validacoes: [
      { id: '1', descricao: 'Tamanho dos campos igual ao tamanho da coluna no BD', status: 'approved' },
      { id: '2', descricao: 'Testar campos obrigatórios (Required)', status: 'pending' },
    ],
  },
  {
    id: 'f3',
    titulo: 'Checklist Grid',
    tipo: 'Grid',
    validacoes: [
      { id: '1', descricao: 'Tamanho dos campos igual ao tamanho da coluna no BD', status: 'approved' },
      { id: '2', descricao: 'Testar campos obrigatórios (Required)', status: 'pending' },
    ],
  },
];

const getTagColor = (tipo: TipoItem) => {
  switch (tipo) {
    case 'Form':
      return 'blue';
    case 'Popup':
      return 'purple';
    case 'Grid':
      return 'green';
    default:
      return 'default';
  }
};

const FeatureList: React.FC = () => {
  const [features, setFeatures] = useState<FeaturePrincipal[]>(DADOS_INICIAIS);

  /** Marcar / desmarcar TODAS as validações */
  const handleToggleAllValidacoes = (featureId: string, approved: boolean) => {
    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId
          ? {
              ...feature,
              validacoes: feature.validacoes.map(v => ({
                ...v,
                status: approved ? 'approved' : 'pending',
                dataAtualizacao: new Date(),
              })),
            }
          : feature
      )
    );
  };

  /** Atualiza UMA validação */
  const handleToggleValidacao = (
    featureId: string,
    validacaoId: string,
    status: StatusValidacao
  ) => {
    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId
          ? {
              ...feature,
              validacoes: feature.validacoes.map(v =>
                v.id === validacaoId
                  ? { ...v, status, dataAtualizacao: new Date() }
                  : v
              ),
            }
          : feature
      )
    );
  };

  const getCollapseItems = (features: FeaturePrincipal[]): CollapseProps['items'] =>
    features.map(feature => {
      const total = feature.validacoes.length;
      const aprovados = feature.validacoes.filter(v => v.status === 'approved').length;
      const allCompleted = aprovados === total && total > 0;

      const header = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <Tag color={getTagColor(feature.tipo)}>{feature.tipo}</Tag>
            <b>{feature.titulo}</b>
          </Space>

          <Space>
            <HeaderActions
              featureId={feature.id}
              onToggleAll={handleToggleAllValidacoes}
              allCompleted={allCompleted}
            />

            <Tag color={allCompleted ? 'success' : 'processing'}>
              {aprovados} / {total} Aprovados
            </Tag>
          </Space>
        </div>
      );

      return {
        key: feature.id,
        label: header,
        children: (
          <ListaValidacoes
            validacoes={feature.validacoes}
            featureId={feature.id}
            onChangeStatus={handleToggleValidacao}
          />
        ),
      };
    });

  return (
    <Collapse
      defaultActiveKey={features.map(f => f.id)}
      style={{ width: '100%' }}
      items={getCollapseItems(features)}
    />
  );
};

export default FeatureList;
