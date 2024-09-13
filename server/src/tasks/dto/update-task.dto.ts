import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Do laundry', description: 'The title of the task', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Wash and dry clothes', description: 'A description of the task', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: false, description: 'Whether the task is completed', required: false })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
