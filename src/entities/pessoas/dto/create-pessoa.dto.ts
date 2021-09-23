import { IsString, IsNumber, IsObject } from "class-validator"
import { PessoaEndereco } from "src/entities/pessoas_enderecos/PessoaEnderecoEntity"

export class CreatePessoaDto {
    
    @IsString()
    readonly nome: string
    
    @IsNumber()
    readonly idade: number

    @IsString()
    readonly login: string

    @IsString()
    readonly senha: string

    @IsObject({each: true})
    readonly endereco: PessoaEndereco

}