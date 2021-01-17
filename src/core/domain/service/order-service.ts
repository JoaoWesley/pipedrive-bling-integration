import { inject, injectable } from "inversify";
import * as jsontoxml from "jsontoxml";

import { INFRA_TYPES, REPOSITORY_TYPES } from "../../../commons/types";
import { Deal, Order, OrderDb } from "../model/";
import { OrderRepository } from "../repository/order-repository";
import { ApiBlingClientInterface } from "../service/";
import { OrderServiceInterface } from "../service/";

@injectable()
export class OrderService implements OrderServiceInterface {
  constructor(
    @inject(INFRA_TYPES.ApiBlingClient)
    private _apiBlingClient: ApiBlingClientInterface,
    @inject(REPOSITORY_TYPES.OrderDbRepository)
    private _orderDbRepository: OrderRepository
  ) {}
  async createOrder(deals: Deal[]): Promise<Order[]> {
    const dealsXml = deals.map((deal) => {
      const xml = jsontoxml({
        pedido: [
          {
            name: "cliente",
            children: [
              {
                name: "nome",
                text: deal.org_id.name ? deal.org_id.name : "Company example",
              },
              { name: "tipoPessoa", text: "J" },
              { name: "endereco", text: "Rua Visconde de São Gabriel" },
              { name: "cpf_cnpj", text: "00000000000000" },
              { name: "ie", text: "3067663000" },
              { name: "numero", text: "392" },
              { name: "complemento", text: "Sala 54" },
              { name: "bairro", text: "Cidade Alta" },
              { name: "cep", text: "95.700-000" },
              { name: "cidade", text: "Bento Gonçalves" },
              { name: "uf", text: "RS" },
              { name: "fone", text: "5481153376" },
              {
                name: "email",
                text: deal.creator_user_id.email || "teste@teste.com.br",
              },
            ],
          },
          {
            name: "transporte",
            children: [
              { name: "transportadora", text: "Transportadora XYZ" },
              { name: "tipo_frete", text: "R" },
              { name: "servico_correios", text: "SEDEX - CONTRATO" },
              {
                name: "dados_etiqueta",
                children: [
                  { name: "nome", text: "Endereco de entrega" },
                  { name: "endereco", text: "Rua Visconde de Sao Gabriel" },
                  { name: "numero", text: "392" },
                  { name: "complemento", text: "Sala 59" },
                  { name: "municipio", text: "Bento Goncalves" },
                  { name: "uf", text: "RS" },
                  { name: "cep", text: "95.700-000" },
                  { name: "cidade", text: "Cidade Alta" },
                ],
              },
              {
                name: "volumes",
                children: [
                  {
                    name: "volume",
                    children: [
                      {
                        name: "servico",
                        text: "SEDEX - CONTRATO",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "itens",
            children: [
              {
                name: "item",
                children: [
                  { name: "codigo", text: "001" },
                  { name: "descricao", text: "Caneta 001" },
                  { name: "un", text: "Pç" },
                  { name: "qtde", text: 1 },
                  { name: "vlr_unit", text: deal.value || 2.68 },
                ],
              },
            ],
          },
          {
            name: "parcelas",
            children: [
              {
                name: "parcela",
                children: [
                  {
                    name: "vlr",
                    text: deal.value || 0,
                  },
                ],
              },
            ],
          },
        ],
      });
      return xml;
    });

    const ordersCreated = [];
    try {
      for (let x = 0; x < dealsXml.length; x++) {
        const order = await this._apiBlingClient.createOrder(dealsXml[x]);
        ordersCreated.push(order);
      }
    } catch (error) {
      //   console.log(error.message);
      //   this._logger.error("Error while trying to get deals.", {
      //     message,
      //   });
      console.log(error);
      throw error;
    }

    return ordersCreated;
  }

  async saveOrder(orders: Order[], deals: Deal[]): Promise<void> {
    // eslint-disable-next-line prettier/prettier
    const day = new Date((new Date().toISOString())).getDate();
    const month = new Date(new Date().toISOString()).getMonth() + 1;
    const year = new Date(new Date().toISOString()).getFullYear();

    // const orderDocumentFound = await this.findOrderByDate(
    //   `${day}-${month}-${year}`
    // );

    let totalDealsValue = 0;
    deals.forEach((deal) => {
      totalDealsValue += deal.value;
    });

    // if (orderDocumentFound) {
    //   await this.updateOrder(orderDocumentFound, orders, totalDealsValue);
    //   return;
    // }

    await this._orderDbRepository.save({
      orders: orders,
      total: totalDealsValue,
      date: `${day}-${month}-${year}`,
    });
  }

  async findOrderByDate(date: string): Promise<OrderDb> {
    return this._orderDbRepository.findOne(date);
  }

  async findAllOrders(date: string): Promise<OrderDb[]> {
    return this._orderDbRepository.findAll(date);
  }

  async updateOrder(
    orderDocumentFound: OrderDb,
    newOrders: Order[],
    totalDealsValue: number
  ): Promise<void> {
    const ordersInDb = orderDocumentFound.orders;

    for (let x = 0; x < newOrders.length; x++) {
      ordersInDb.push({
        pedido: newOrders[x].pedido,
      });
    }

    this._orderDbRepository.findOneAndUpdate(new Date().toISOString(), {
      orders: ordersInDb,
      total: totalDealsValue + orderDocumentFound.total,
      date: orderDocumentFound.date,
    });
  }
}
