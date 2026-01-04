import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { UsuarioCreateDto } from '../dto/usuario-create.dto';
import { Bcrypt } from "../../auth/bcrypt/bcrypt";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ){}

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();

    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    async findByUsuario(usuario:string): Promise<Usuario | null>{
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario,
            },
        });
    }

    async create(usuarioDto: UsuarioCreateDto): Promise<Usuario> {

  const buscaUsuario = await this.usuarioRepository.findOne({
    where: { usuario: usuarioDto.usuario }
  });

  if (buscaUsuario)
    throw new HttpException('Usuário já cadastrado!', HttpStatus.BAD_REQUEST);

  const usuario = this.usuarioRepository.create(usuarioDto);

  usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

  return this.usuarioRepository.save(usuario);
}

    async update(usuario: Usuario): Promise<Usuario> {
  const usuarioExistente = await this.findById(usuario.id);

  const buscaUsuario = await this.findByUsuario(usuario.usuario);

  if (buscaUsuario && buscaUsuario.id !== usuario.id) {
    throw new HttpException('Usuário já cadastrado!', HttpStatus.BAD_REQUEST);
  }
  usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
  return await this.usuarioRepository.save(usuario);
}
}