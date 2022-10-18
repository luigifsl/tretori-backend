import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { oneAccessFixture } from 'domains/core/access/tests/access.fixtures'
import { LegalPerson } from '../../../customer/legal-person/legal-person.entity'
import { LegalPersonService } from '../../../customer/legal-person/legal-person.service'
import {
  legalPersonArrayFixture,
  oneLegalPersonFixture,
} from '../../../customer/legal-person/test/fixtures'
import { PhysicalPerson } from '../../../customer/physical-person/physical-person.entity'
import { PhysicalPersonService } from '../../../customer/physical-person/physical-person.service'
import {
  onePhysicalPersonFixture,
  physicalPersonArrayFixture,
} from '../../../customer/physical-person/test/fixtures'
import { Access } from '../../access/access.entity'
import { AccessService } from '../../access/access.service'
import { Move } from '../../move/move.entity'
import { MoveService } from '../../move/move.service'
import { moveArrayFixture, oneMoveFixture } from '../../move/test/fixtures'
import { Renew } from '../../renew/renew.entity'
import { RenewService } from '../../renew/renew.service'
import { oneRenewFixture, renewArrayFixture } from '../../renew/test/fixtures'
import { ContractController } from '../contract.controller'
import { Contract } from '../contract.entity'
import { ContractService } from '../contract.service'
import { IContract } from '../contract.types'
import { contractArrayFixture, oneContractFixture, updateContractPayload } from './fixtures'

describe('ContractController', () => {
  let contractController: ContractController
  let contractService: ContractService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContractController],
      providers: [
        AccessService,
        ContractService,
        MoveService,
        RenewService,
        PhysicalPersonService,
        LegalPersonService,
        {
          provide: ContractService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((contract: IContract) => Promise.resolve({ id: 1, ...contract })),
            findAll: jest.fn().mockResolvedValue(contractArrayFixture),
            findOne: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
            moveContract: jest.fn().mockResolvedValue(oneContractFixture),
            renewContract: jest.fn().mockResolvedValue(oneRenewFixture),
          },
        },
        {
          provide: getRepositoryToken(Move),
          useValue: {
            find: jest.fn().mockResolvedValue(moveArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(oneMoveFixture),
            save: jest.fn().mockResolvedValue(oneMoveFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Renew),
          useValue: {
            find: jest.fn().mockResolvedValue(renewArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(oneRenewFixture),
            save: jest.fn().mockResolvedValue(oneRenewFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(LegalPerson),
          useValue: {
            find: jest.fn().mockResolvedValue(legalPersonArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(oneLegalPersonFixture),
            save: jest.fn().mockResolvedValue(oneLegalPersonFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(PhysicalPerson),
          useValue: {
            find: jest.fn().mockResolvedValue(physicalPersonArrayFixture),
            findOneBy: jest.fn().mockResolvedValue(onePhysicalPersonFixture),
            save: jest.fn().mockResolvedValue(onePhysicalPersonFixture),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Access),
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve({ id: 1, ...oneAccessFixture })),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...oneAccessFixture })),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    contractController = app.get<ContractController>(ContractController)
    contractService = app.get<ContractService>(ContractService)
  })

  it('should be defined', () => {
    expect(contractController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a contract', async () => {
      contractController.create(oneContractFixture)
      await expect(contractController.create(oneContractFixture)).resolves.toEqual({
        id: 1,
        ...oneContractFixture,
      })
      expect(contractService.create).toHaveBeenCalledWith(oneContractFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all contract', () => {
      contractController.findAll()
      expect(contractService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find a contract', async () => {
      jest.spyOn(contractService, 'findOne').mockResolvedValue(oneContractFixture as Contract)
      await expect(contractController.findOne(oneContractFixture.id)).resolves.toEqual(
        oneContractFixture
      )
      expect(contractService.findOne).toHaveBeenCalled()
    })
  })

  describe('update()', () => {
    it('should successfully update a contract', async () => {
      const contract: Contract = new Contract()

      Object.assign(contract, {
        ...oneContractFixture,
        id: 1,
      })

      jest.spyOn(contractService, 'update').mockImplementation(() => Promise.resolve(contract))
      await expect(contractController.update(1, updateContractPayload)).resolves.toEqual(contract)
    })
  })

  describe('remove()', () => {
    it('should remove the contract', () => {
      contractController.remove(2)
      expect(contractService.remove).toHaveBeenCalled()
    })
  })

  describe('moveContract()', () => {
    it('should add a movement to the contract', async () => {
      const contract = oneContractFixture
      const move = oneMoveFixture

      jest.spyOn(contractService, 'findOne').mockResolvedValue(contract as Contract)
      jest.spyOn(contractService, 'moveContract').mockResolvedValue({
        move,
        contract,
      })
      await expect(contractController.moveContract(1, move)).resolves.toEqual({
        move,
        contract,
      })
    })
  })

  describe('renewContract()', () => {
    it('should add a renewal to the contract', async () => {
      const contract = oneContractFixture
      const renew = oneRenewFixture

      jest.spyOn(contractService, 'findOne').mockResolvedValue(contract as Contract)
      jest.spyOn(contractService, 'renewContract').mockResolvedValue({
        renew,
        contract,
      })
      await expect(contractController.renewContract(1, renew)).resolves.toEqual({
        renew,
        contract,
      })
    })
  })
})
