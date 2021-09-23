import { IsString, IsNumber } from "class-validator"

export class CreatePessoaEnderecoDto {
    
    @IsString()
    readonly endereco: string
    
    @IsNumber()
    readonly numero: number

    @IsString()
    readonly complemento?: string

    @IsString()
    readonly bairro: string

    @IsString()
    readonly cep: string
    
}