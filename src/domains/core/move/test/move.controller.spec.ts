import { Test, TestingModule } from '@nestjs/testing'
import { MoveController } from '../move.controller'
import { MoveService } from '../move.service'
import { IMove } from '../move.types'
import { moveArrayFixture, oneMoveFixture } from './fixtures'

describe('MoveController', () => {
  let moveController: MoveController
  let moveService: MoveService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MoveController],
      providers: [
        MoveService,
        {
          provide: MoveService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((move: IMove) => Promise.resolve({ id: 1, ...move })),
            findAll: jest.fn().mockResolvedValue(moveArrayFixture),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id, ...oneMoveFixture })),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    moveController = app.get<MoveController>(MoveController)
    moveService = app.get<MoveService>(MoveService)
  })

  it('should be defined', () => {
    expect(moveController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a move', async () => {
      moveController.create(oneMoveFixture)
      await expect(moveController.create(oneMoveFixture)).resolves.toEqual({
        id: 1,
        ...oneMoveFixture,
      })
      expect(moveService.create).toHaveBeenCalledWith(oneMoveFixture)
    })
  })

  describe('findAll()', () => {
    it('should find all move', () => {
      moveController.findAll()
      expect(moveService.findAll).toHaveBeenCalled()
    })
  })
})
