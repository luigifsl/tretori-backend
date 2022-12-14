import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { InsuranceController } from '~/domains/insurance/insurance.controller'
import { InsuranceService } from '~/domains/insurance/insurance.service'
import { IInsurance } from '~/domains/insurance/insurance.types'
import { insuranceArrayFixture, oneInsuranceFixture } from '~/domains/insurance/tests/fixtures'

describe('InsuranceController', () => {
  let insuranceController: InsuranceController
  let insuranceService: InsuranceService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InsuranceController],
      providers: [
        InsuranceService,
        {
          provide: InsuranceService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((insurance: IInsurance) =>
                Promise.resolve({ id: 1, ...insurance })
              ),
            findAll: jest.fn().mockResolvedValue(insuranceArrayFixture),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...oneInsuranceFixture })),
            remove: jest
              .fn()
              .mockResolvedValueOnce({ id: 1, ...oneInsuranceFixture })
              .mockRejectedValueOnce(() => {
                throw new NotFoundException('Insurance not found')
              }),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    insuranceController = app.get<InsuranceController>(InsuranceController)
    insuranceService = app.get<InsuranceService>(InsuranceService)
  })

  it('should be defined', () => {
    expect(insuranceController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a insurance', async () => {
      insuranceController.create(oneInsuranceFixture)
      await expect(insuranceController.create(oneInsuranceFixture)).resolves.toEqual({
        id: 1,
        ...oneInsuranceFixture,
      })
      expect(insuranceService.create).toHaveBeenCalledWith(oneInsuranceFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all insurances', () => {
      insuranceController.findAll()
      expect(insuranceService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find one insurance', async () => {
      await expect(insuranceController.findOne(3)).resolves.toEqual({
        id: 3,
        ...oneInsuranceFixture,
      })
      expect(insuranceService.findOne).toHaveBeenCalled()
    })
  })

  describe('update()', () => {
    it('should update an insurance', async () => {
      jest.spyOn(insuranceService, 'update').mockResolvedValue(oneInsuranceFixture as IInsurance)
      await expect(
        insuranceController.update(oneInsuranceFixture.id, oneInsuranceFixture)
      ).resolves.toEqual(oneInsuranceFixture)
    })
  })

  describe('remove()', () => {
    it('should remove the insurance', async () => {
      const insurance = await insuranceController.create(oneInsuranceFixture)
      await expect(insuranceController.remove(insurance.id)).resolves.not.toThrow()
    })
    it('should throw NotFoundException if no insurance is found', async () => {
      insuranceController.remove(1)
      await expect(insuranceController.remove(1000)).rejects.toThrow(
        new NotFoundException('Insurance not found')
      )
    })
  })
})
