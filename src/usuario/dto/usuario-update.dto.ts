import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UsuarioUpdateDto {

  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsEmail()
  @ApiProperty()
  usuario: string;

  @IsNotEmpty()
  @ApiProperty()
  senha: string;

  @IsOptional()
  @ApiProperty()
  foto?: string;
}