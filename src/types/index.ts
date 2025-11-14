export type TipoItem = 'Form' | 'Popup' | 'Grid';

// 1. Interface para o Checkbox/Item de Validação
export interface ItemValidacao {
  id: string;
  descricao: string;
  concluido: boolean;
  dataAtualizacao?: Date; 
}

// 2. Interface para a Feature Principal (Agrupador de Testes)
export interface FeaturePrincipal {
  id: string;
  titulo: string;
  tipo: TipoItem;
  validacoes: ItemValidacao[];
}