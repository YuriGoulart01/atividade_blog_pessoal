import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagens/entities/postagem.entity"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity('tb_usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id:number;

    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    @ApiProperty()

    nome:string;

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    @ApiProperty()
    usuario:string;

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    @ApiProperty()
    senha:string;

    @IsNotEmpty()
    @Column({length: 5000})
    @ApiProperty()
    foto:string;

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.usuario) 
    postagem: Postagem[];
}