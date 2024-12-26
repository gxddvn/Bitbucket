import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create method of UserService', async () => {
      const dto: CreateUserDto = {
        name: 'John Doe',
        email: 'johndoe2024.yahoo.com',
        password: '12345678'
      };
      mockUserService.create.mockResolvedValue(dto);

      const result = await controller.create(dto);

      expect(result).toEqual(dto);
      expect(mockUserService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call findAll method of UserService', async () => {
      const users = [{ id: '1', name: 'John' }];
      mockUserService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();

      expect(result).toEqual(users);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call findOne method of UserService with correct ID', async () => {
      const user = { id: '1', name: 'John' };
      mockUserService.findOne.mockResolvedValue(user);

      const result = await controller.findOne('1');

      expect(result).toEqual(user);
      expect(mockUserService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should call update method of UserService with correct ID and DTO', async () => {
      const dto: UpdateUserDto = { name: 'Jane' };
      const updatedUser = { id: '1', name: 'Jane' };

      mockUserService.update.mockResolvedValue(updatedUser);

      const result = await controller.update('1', dto);

      expect(result).toEqual(updatedUser);
      expect(mockUserService.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('delete', () => {
    it('should call delete method of UserService with correct ID', async () => {
      mockUserService.delete.mockResolvedValue(undefined);

      const result = await controller.delete('1');

      expect(result).toEqual('User id: 1 was deleted!');
      expect(mockUserService.delete).toHaveBeenCalledWith('1');
    });
  });
});
