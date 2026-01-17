export type TipoItem = 'Form' | 'Popup' | 'Grid';

export type StatusValidacao = 'pending' | 'approved' | 'adjust' | 'rejected';

export interface HistoricoItem {
  status: StatusValidacao;
  data: Date;
  acao: string;
}

export interface ItemValidacao {
  id: string;
  descricao: string;
  status: StatusValidacao;
  comentario?: string;
  dataAtualizacao?: Date;
  historico?: HistoricoItem[];
}

export interface FeaturePrincipal {
  id: string;
  titulo: string;
  tipo: TipoItem;
  validacoes: ItemValidacao[];
}

export interface HistoricoStatus {
  status: StatusValidacao;
  data: Date;
}