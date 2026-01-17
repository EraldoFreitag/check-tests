import React, { useState } from 'react';
import { Collapse, Tag, Space } from 'antd';
import type { CollapseProps } from 'antd';
import type { FeaturePrincipal, TipoItem, StatusValidacao, HistoricoItem } from '../types';
import ListaValidacoes from './ListaValidacoes';
import HeaderActions from './HeaderActions';

const DADOS_INICIAIS: FeaturePrincipal[] = [
  {
    id: 'f1',
    titulo: 'Checklist Formulário',
    tipo: 'Form',
    validacoes: [
      {
        id: '1',
        descricao: 'Tamanho dos campos igual ao tamanho da coluna no BD',
        status: 'approved',
        comentario: '',
        dataAtualizacao: new Date(),
        historico: [
          { status: 'approved', data: new Date(), acao: 'Item criado como aprovado', },
        ],
      },
      {
        id: '2',
        descricao: 'Testar campos obrigatórios (Required)',
        status: 'pending',
        comentario: '',
        dataAtualizacao: new Date(),
        historico: [
          { status: 'pending', data: new Date(), acao: 'Item criado como pendente', },
        ],
      },
    ],
  },
  {
    id: 'f2',
    titulo: 'Checklist Popup',
    tipo: 'Popup',
    validacoes: [
      {
        id: '1',
        descricao: 'Tamanho dos campos igual ao tamanho da coluna no BD',
        status: 'approved',
        comentario: '',
        dataAtualizacao: new Date(),
        historico: [
          { status: 'approved', data: new Date(), acao: 'Item criado como aprovado', },
        ],
      },
      {
        id: '2',
        descricao: 'Testar campos obrigatórios (Required)',
        status: 'pending',
        comentario: '',
        dataAtualizacao: new Date(),
        historico: [
          { status: 'pending', data: new Date(), acao: 'Item criado como pendente', },
        ],
      },
    ],
  },
  {
    id: 'f3',
    titulo: 'Checklist Grid',
    tipo: 'Grid',
    validacoes: [
      {
        id: '1',
        descricao: 'Tamanho dos campos igual ao tamanho da coluna no BD',
        status: 'approved',
        comentario: '',
        dataAtualizacao: new Date(),
        historico: [
          { status: 'approved', data: new Date(), acao: 'Item criado como aprovado', },
        ],
      },
      {
        id: '2',
        descricao: 'Testar campos obrigatórios (Required)',
        status: 'pending',
        comentario: '',
        dataAtualizacao: new Date(),
        historico: [
          { status: 'pending', data: new Date(), acao: 'Item criado como pendente', },
        ],
      },
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
    const now = new Date();
    const status: StatusValidacao = approved ? 'approved' : 'pending';

    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId
          ? {
            ...feature,
            validacoes: feature.validacoes.map(v => ({
              ...v,
              status,
              dataAtualizacao: now,
              historico: [
                ...(v.historico || []),
                {
                  status,
                  data: now,
                  acao: approved
                    ? 'Validação aprovada em massa'
                    : 'Validação reprovada em massa',
                },
              ],
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
    const now = new Date();

    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId
          ? {
            ...feature,
            validacoes: feature.validacoes.map(v =>
              v.id === validacaoId
                ? {
                  ...v,
                  status,
                  dataAtualizacao: now,
                  historico: [
                    ...(v.historico || []),
                    {
                      status,
                      data: now,
                      acao: `Status alterado para ${status}`,
                    },
                  ],
                }
                : v
            ),
          }
          : feature
      )
    );
  };

  const handleChangeComentario = (
    featureId: string,
    validacaoId: string,
    comentario: string
  ) => {
    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId
          ? {
            ...feature,
            validacoes: feature.validacoes.map(v =>
              v.id === validacaoId
                ? { ...v, comentario }
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
            onChangeComentario={handleChangeComentario}
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
