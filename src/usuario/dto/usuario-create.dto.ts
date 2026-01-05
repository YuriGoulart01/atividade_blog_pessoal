import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UsuarioCreateDto {

  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty()
  senha: string;

  @IsNotEmpty()
  @ApiProperty()
  foto: string;
}