import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from './task.interface';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }
}
