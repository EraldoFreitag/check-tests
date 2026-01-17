export type TipoItem = 'Form' | 'Popup' | 'Grid';

export type StatusValidacao = 'pending' | 'approved' | 'adjust' | 'rejected';

export interface ItemValidacao {
  id: string;
  descricao: string;
  status: StatusValidacao;
  dataAtualizacao?: Date;
}

export interface FeaturePrincipal {
  id: string;
  titulo: string;
  tipo: TipoItem;
  validacoes: ItemValidacao[];
}
