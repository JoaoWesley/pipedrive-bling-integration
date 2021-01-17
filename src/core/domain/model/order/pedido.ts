import { codigosRastreamento } from "./codigos-rastreamento";

export interface Pedido {
  codigos_rastreamento: codigosRastreamento;
  idPedido: number;
  numero: string;
  volumes: unknown;
}
