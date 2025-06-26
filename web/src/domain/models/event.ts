
export type Event = {
  id: number;
  nome: string;
  categoriaId: number;
  descricao: string;
  dataEvento: Date;
  lotacaoTotal: number;
  status: number;
  local: string;
  categoria: {
    id: number;
    nome: string;
  };
  organizador: {
    id: number;
    nome: string;
    email: string;
  };
  imagem?: string | null; // Optional field for image URL
  tiposBilhetes?: ticket[];
}



export type ticket = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  eventoNome: string;
  event: Event
}
