import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Do laundry', description: 'The title of the task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Wash and dry clothes', description: 'A description of the task', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: false, description: 'Whether the task is completed', required: false })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
