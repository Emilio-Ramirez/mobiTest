import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.interface';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            getTasks: jest.fn(),
            getTaskById: jest.fn(),
            createTask: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: 1,
          title: 'Test Task',
          description: 'Test Description',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      jest.spyOn(service, 'getTasks').mockResolvedValue(result);

      expect(await controller.getTasks()).toBe(result);
    });
  });

  describe('getTaskById', () => {
    it('should return a single task', async () => {
      const result: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      jest.spyOn(service, 'getTaskById').mockResolvedValue(result);

      expect(await controller.getTaskById(1)).toBe(result);
    });
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = { title: 'New Task', description: 'New Description' };
      const result: Task = {
        id: 1,
        ...createTaskDto,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      jest.spyOn(service, 'createTask').mockResolvedValue(result);

      expect(await controller.createTask(createTaskDto)).toBe(result);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const result: Task = {
        id: 1,
        title: 'Updated Task',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      jest.spyOn(service, 'updateTask').mockResolvedValue(result);

      expect(await controller.updateTask(1, updateTaskDto)).toBe(result);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      jest.spyOn(service, 'deleteTask').mockResolvedValue(undefined);

      await expect(controller.deleteTask(1)).resolves.toBeUndefined();
    });
  });
});
