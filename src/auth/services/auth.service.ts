import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsuarioService } from "../../usuario/service/usuario.service";
import { JwtService } from "@nestjs/jwt";
import { Bcrypt } from "../bcrypt/bcrypt";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { UsuarioSemSenha } from "../interfaces/usuario-sem-senha";
import { UsuarioResponse } from "../interfaces/user-response";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){}

    async validateUser(userName: string, password:string): Promise<UsuarioSemSenha | null> {
        const buscaUsuario = await this.usuarioService.findByUsuario(userName)

        if(!buscaUsuario)
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);

        const matchPassword = await this.bcrypt.compararSenha(password, buscaUsuario.senha)

        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }

        return null
    }

    async login(usuarioLogin: UsuarioLogin): Promise<UsuarioResponse> {

  const buscaUsuario = await this.usuarioService.findByUsuario(
    usuarioLogin.usuario,
  );

  if (!buscaUsuario)
    throw new HttpException('Usuario não encontrado', HttpStatus.UNAUTHORIZED);

  const senhaValida = await this.bcrypt.compararSenha(
    usuarioLogin.senha,
    buscaUsuario.senha,
  );

  if (!senhaValida)
    throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);

  const payload = {
    id: buscaUsuario.id,
    usuario: buscaUsuario.usuario,
  };

  return {
    id: buscaUsuario.id,
    nome: buscaUsuario.nome,
    usuario: buscaUsuario.usuario,
    foto: buscaUsuario.foto,
    token: this.jwtService.sign(payload),
  };
}
}