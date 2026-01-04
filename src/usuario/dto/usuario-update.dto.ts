import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UsuarioUpdateDto {

  @IsNumber()
  id: number;

  @IsNotEmpty()
  nome: string;

  @IsEmail()
  usuario: string;

  @IsNotEmpty()
  senha: string;

  @IsOptional()
  foto?: string;
}