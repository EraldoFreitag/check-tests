import React, { useState } from 'react';
import { Collapse, Tag, Space } from 'antd';
import type { CollapseProps, } from 'antd';
import type { FeaturePrincipal, TipoItem } from '../types';
import ListaValidacoes from './ListaValidacoes';
import HeaderActions from './HeaderActions';

const DADOS_INICIAIS: FeaturePrincipal[] = [
  {
    id: 'f1',
    titulo: 'Checklist Formulário',
    tipo: 'Form',
    validacoes: [
      { id: '1', descricao: 'Tamanho dos campos igual ao tamanho da coluna no BD', concluido: true },
      { id: '2', descricao: 'Testar campos obrigatórios (Required)', concluido: false },
      { id: '3', descricao: 'Máscaras de CPF/CNPJ aplicadas corretamente', concluido: false },
      { id: '4', descricao: 'Tamanho dos campos igual ao tamanho da coluna no BD', concluido: true },
      { id: '5', descricao: 'Testar campos obrigatórios (Required)', concluido: false },
      { id: '6', descricao: 'Máscaras de CPF/CNPJ aplicadas corretamente', concluido: false },
    ],
  },
  {
    id: 'f2',
    titulo: 'Checklist Popup',
    tipo: 'Popup',
    validacoes: [
      { id: '1', descricao: 'Popup é responsivo', concluido: true },
      { id: '2', descricao: 'Teclando ESC o Popup é fechado', concluido: false },
       { id: '3', descricao: 'Tamanho dos campos igual ao tamanho da coluna no BD', concluido: true },
      { id: '4', descricao: 'Testar campos obrigatórios (Required)', concluido: false },
      { id: '5', descricao: 'Máscaras de CPF/CNPJ aplicadas corretamente', concluido: false },
      { id: '6', descricao: 'Tamanho dos campos igual ao tamanho da coluna no BD', concluido: true },
      { id: '7', descricao: 'Testar campos obrigatórios (Required)', concluido: false },
      { id: '8', descricao: 'Máscaras de CPF/CNPJ aplicadas corretamente', concluido: false },
    ],
  },
  {
    id: 'f3',
    titulo: 'Checklist Grid',
    tipo: 'Grid',
    validacoes: [
        { id: '1', descricao: 'Paginação e filtros funcionando', concluido: true },
        { id: '2', descricao: 'Exportação para CSV/Excel', concluido: true }
    ]
  }
];

const getTagColor = (tipo: TipoItem) => {
  switch (tipo) {
    case 'Form': return 'blue';
    case 'Popup': return 'purple';
    case 'Grid': return 'green';
    default: return 'default';
  }
};

const FeatureList: React.FC = () => {
  const [features, setFeatures] = useState<FeaturePrincipal[]>(DADOS_INICIAIS);

  // Lógica para marcar/desmarcar TODAS as validações de uma Feature
  const handleToggleAllValidacoes = (featureId: string, concluido: boolean) => {
    setFeatures(prevFeatures => 
      prevFeatures.map(feature => {
        if (feature.id === featureId) {
          const updatedValidacoes = feature.validacoes.map(validacao => ({
            ...validacao,
            concluido: concluido,
          }));
          
          return {
            ...feature,
            validacoes: updatedValidacoes,
          };
        }
        return feature;
      })
    );
  };

  // Função central para atualizar o status do checkbox
  const handleToggleValidacao = (featureId: string, validacaoId: string, concluido: boolean) => {
    setFeatures(prevFeatures => 
      prevFeatures.map(feature => {
        if (feature.id === featureId) {
          return {
            ...feature,
            validacoes: feature.validacoes.map(validacao => 
              validacao.id === validacaoId 
                ? { ...validacao, concluido: concluido, dataAtualizacao: new Date() } 
                : validacao
            ),
          };
        }
        return feature;
      })
    );
  };

  const getCollapseItems = (features: FeaturePrincipal[]): CollapseProps['items'] => {
    return features.map(feature => {
      const concluidos = feature.validacoes.filter(v => v.concluido).length;
      const total = feature.validacoes.length;
      const allCompleted = concluidos === total;
      
      // Conteúdo do cabeçalho do Collapse
      const header = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <Space>
            <Tag color={getTagColor(feature.tipo)}>{feature.tipo}</Tag> 
            <b>{feature.titulo}</b>
          </Space>

          <Space>
            {/* Componente Marcar/Desmarcar Todos */}
            <HeaderActions
              featureId={feature.id}
              onToggleAll={handleToggleAllValidacoes}
              allCompleted={allCompleted}
            />
            
            {/* Status de Conclusão */}
            <Tag color={allCompleted ? 'success' : 'processing'}>
                {concluidos} / {total} Concluídos
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
                onToggle={handleToggleValidacao} 
                featureId={feature.id}
            />
        ),
      };
    });
  };

  return (
    <Collapse 
      defaultActiveKey={['f1', 'f2', 'f3']} 
      style={{ width: '100%' }}
      items={getCollapseItems(features)}
    />
  );
};

export default FeatureList;