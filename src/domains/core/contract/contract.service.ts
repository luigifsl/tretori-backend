import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IContract } from './contract.types'
import { Contract } from './contract.entity'

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>
  ) {}

  findAll(): Promise<Contract[]> {
    return this.contractRepository.find({
      relations: {
        physical_person: true,
        legal_person: true,
        renew: true,
        move: true,
      },
    })
  }

  findOne(id: number): Promise<Contract> {
    return this.contractRepository.findOne({
      where: { id },
      relations: {
        physical_person: true,
        legal_person: true,
        renew: true,
        move: true,
      },
    })
  }

  create(contract: IContract): Promise<Contract> {
    return this.contractRepository.save(contract)
  }

  async update(id: number, contract: IContract): Promise<void> {
    await this.contractRepository.update(id, contract)
  }

  async remove(id: number): Promise<void> {
    await this.contractRepository.delete(id)
  }
}