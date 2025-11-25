/* Adapter TS para o ControllerCliente.js (callbacks -> Promises) */
/* eslint-disable @typescript-eslint/no-var-requires */
const repo = require('../../servico-cliente/Controller/ControllerCliente.js');

export type ClienteRow = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  senha?: string; // vem do banco; não vamos expor na API
};

export class ClienteRepository {
  static async create(nome: string, telefone: string, email: string, senhaHash: string): Promise<{ id: number }> {
    return new Promise((resolve, reject) => {
      repo.createCliente(nome, telefone, email, senhaHash, (err: Error | null, result: { id: number }) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  static async findAll(): Promise<ClienteRow[]> {
    return new Promise((resolve, reject) => {
      repo.readClientes((err: Error | null, rows: ClienteRow[]) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static async findById(id: number): Promise<ClienteRow | undefined> {
    return new Promise((resolve, reject) => {
      repo.readClienteById(id, (err: Error | null, row: ClienteRow | undefined) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  static async update(id: number, nome: string, telefone: string, email: string, senhaHash: string): Promise<{ changes: number }> {
    return new Promise((resolve, reject) => {
      repo.updateCliente(id, nome, telefone, email, senhaHash, (err: Error | null, result: { changes: number }) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  static async remove(id: number): Promise<{ changes: number }> {
    return new Promise((resolve, reject) => {
      repo.deleteCliente(id, (err: Error | null, result: { changes: number }) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}
