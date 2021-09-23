import { PartialType } from "@nestjs/mapped-types"
import { CreatePessoaEnderecoDto } from "./create-pessoa-endereco.dto"

export class UpdatePessoaEnderecoDto extends PartialType(CreatePessoaEnderecoDto) {}