import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UsuarioLoginDto {

  @IsEmail()
  @IsNotEmpty()
  usuario: string;

  @IsNotEmpty()
  @MinLength(8)
  senha: string;
}
