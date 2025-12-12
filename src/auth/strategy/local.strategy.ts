import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioSemSenha } from "../interfaces/usuario-sem-senha";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    
    private _userNameField: string;
    private _passwordField: string;
    
constructor(private readonly authService: AuthService){
    super();
    this._userNameField = 'usuario';
    this._passwordField = 'senha';
}

    async validate(usuario: string, senha: string): Promise<UsuarioSemSenha> {
        const validaUsario = await this.authService.validateUser(usuario,senha);
        if (!validaUsario)
            throw new UnauthorizedException('Usuario ou senha invalida!')

        return validaUsario;
    }
}