import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UsuarioLoginDto {

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  usuario: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  senha: string;
}
