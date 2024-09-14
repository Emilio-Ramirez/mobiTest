import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Task } from './task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const mockTasks: Task[] = [
        {
          id: 1,
          title: 'Test Task',
          description: 'Test Description',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      jest.spyOn(prismaService.task, 'findMany').mockResolvedValue(mockTasks);

      expect(await service.getTasks()).toEqual(mockTasks);
    });
  });

  describe('getTaskById', () => {
    it('should return a task if found', async () => {
      const mockTask: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      jest.spyOn(prismaService.task, 'findUnique').mockResolvedValue(mockTask);

      expect(await service.getTaskById(1)).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      jest.spyOn(prismaService.task, 'findUnique').mockResolvedValue(null);

      await expect(service.getTaskById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = { title: 'New Task', description: 'New Description' };
      const mockTask: Task = {
        id: 1,
        ...createTaskDto,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      jest.spyOn(prismaService.task, 'create').mockResolvedValue(mockTask);

      expect(await service.createTask(createTaskDto)).toEqual(mockTask);
    });
  });

  describe('updateTask', () => {
    it('should update a task if found', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const mockTask: Task = {
        id: 1,
        title: 'Updated Task',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      jest.spyOn(prismaService.task, 'update').mockResolvedValue(mockTask);

      expect(await service.updateTask(1, updateTaskDto)).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      jest.spyOn(prismaService.task, 'update').mockRejectedValue(new Error('Not found'));

      await expect(service.updateTask(1, { title: 'Updated Task' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task if found', async () => {
      jest.spyOn(prismaService.task, 'delete').mockResolvedValue({} as Task);

      await expect(service.deleteTask(1)).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if task not found', async () => {
      jest.spyOn(prismaService.task, 'delete').mockRejectedValue(new Error('Not found'));

      await expect(service.deleteTask(1)).rejects.toThrow(NotFoundException);
    });
  });
});
