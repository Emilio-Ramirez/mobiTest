import { ApiProperty } from '@nestjs/swagger';

export class TaskEntity {
  @ApiProperty({ example: 1, description: 'The task ID' })
  id: number;

  @ApiProperty({ example: 'Do laundry', description: 'The title of the task' })
  title: string;

  @ApiProperty({ example: 'Wash and dry clothes', description: 'A description of the task' })
  description?: string;

  @ApiProperty({ example: false, description: 'Whether the task is completed' })
  completed: boolean;

  @ApiProperty({ example: '2024-03-13T12:00:00Z', description: 'The creation date of the task' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-13T12:00:00Z', description: 'The last update date of the task' })
  updatedAt: Date;
}
