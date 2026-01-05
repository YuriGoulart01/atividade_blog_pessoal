import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { UsuarioLoginDto } from "../dto/usuario-login.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Usuario')
@Controller('/usuarios')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/logar')
  @HttpCode(HttpStatus.OK)
  login(@Body() usuarioLoginDto: UsuarioLoginDto) {
    return this.authService.login(usuarioLoginDto);
  }
}
