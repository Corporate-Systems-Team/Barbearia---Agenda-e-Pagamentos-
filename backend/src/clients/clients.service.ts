import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientsDto } from './dto/query-clients.dto';
import { ClienteRepository } from './infra/cliente.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ClientsService {
  async create(dto: CreateClientDto) {
    const senhaHash = await bcrypt.hash(dto.senha, 10);
    const { id } = await ClienteRepository.create(dto.nome, dto.telefone, dto.email, senhaHash);
    const created = await ClienteRepository.findById(id);
    if (!created) throw new BadRequestException('Falha ao criar cliente');
    delete (created as any).senha; // nunca exponha
    return created;
  }

  async list(_q: QueryClientsDto) {
    // Seu repositório atual não tem busca/paginação — devolvemos tudo
    const rows = await ClienteRepository.findAll();
    return rows.map(r => {
      delete (r as any).senha;
      return r;
    });
  }

  async getById(id: number) {
    const row = await ClienteRepository.findById(id);
    if (!row) throw new NotFoundException('Cliente não encontrado');
    delete (row as any).senha;
    return row;
  }

  async update(id: number, dto: UpdateClientDto) {
    const current = await ClienteRepository.findById(id);
    if (!current) throw new NotFoundException('Cliente não encontrado');

    const nome = dto.nome ?? current.nome;
    const telefone = dto.telefone ?? current.telefone;
    const email = dto.email ?? current.email;
    const senhaHash = dto.senha ? await bcrypt.hash(dto.senha, 10) : (current.senha as string);

    const { changes } = await ClienteRepository.update(id, nome, telefone, email, senhaHash);
    if (changes === 0) throw new BadRequestException('Nada para atualizar');

    const row = await ClienteRepository.findById(id);
    if (!row) throw new NotFoundException('Cliente não encontrado após atualizar');
    delete (row as any).senha;
    return row;
  }

  async remove(id: number) {
    const { changes } = await ClienteRepository.remove(id);
    if (changes === 0) throw new NotFoundException('Cliente não encontrado');
    return { ok: true };
  }
}
