import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UsuarioCreateDto {

  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  foto: string;
}