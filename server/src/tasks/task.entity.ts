import { ApiProperty } from '@nestjs/swagger';
import { Task } from './task.interface';

export class TaskEntity implements Task {
  @ApiProperty({ example: 1, description: 'The task ID' })
  id: number;

  @ApiProperty({ example: 'Do laundry', description: 'The title of the task' })
  title: string;

  @ApiProperty({ example: 'Wash and dry clothes', description: 'A description of the task' })
  description: string;

  @ApiProperty({ example: false, description: 'Whether the task is completed' })
  completed: boolean;
}
