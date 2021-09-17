import { IsString, IsNumber } from "class-validator"

export class CreatePessoaDto {
    
    @IsString()
    readonly nome: string
    
    @IsNumber()
    readonly idade: number

    @IsString()
    readonly login: string

    @IsString()
    readonly senha: string
    
}