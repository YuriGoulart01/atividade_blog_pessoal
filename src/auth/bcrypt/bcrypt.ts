import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class Bcrypt {
    async criptografarSenha(senha:string):Promise<string>{
        const saltos:number = 10;
        return await hash(senha,saltos);
    }

    async compararSenha(senhaDigitada:string,senhaArmazenada:string): Promise<boolean>{
        return await compare(senhaDigitada,senhaArmazenada)
    }
}