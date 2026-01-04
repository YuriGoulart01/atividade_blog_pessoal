import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioCreateDto } from '../dto/usuario-create.dto';
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { UsuarioUpdateDto } from "../dto/usuario-update.dto";

@Controller('/usuarios')
export class UsuarioController{
    constructor(
        private readonly usuarioService: UsuarioService
    ){}

    @Get('/all')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.findById(id)
    }

    @Post('/cadastrar')
@HttpCode(HttpStatus.CREATED)
create(@Body() usuarioDto: UsuarioCreateDto): Promise<Usuario> {
  return this.usuarioService.create(usuarioDto);
}

    @Put('/atualizar')
@HttpCode(HttpStatus.OK)
@UseGuards(JwtAuthGuard)
update(@Body() usuarioDto: UsuarioUpdateDto): Promise<Usuario> {
  return this.usuarioService.update(usuarioDto as Usuario);
}
}