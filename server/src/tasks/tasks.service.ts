import { Injectable } from '@nestjs/common';
import { Task } from './tasks.interface';

@Injectable()
export class TasksService {
  private task: Task[] = [];

  getTasks(): Task[] {
    return this.task;
  }
}
