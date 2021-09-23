import { Controller, Body, Get, Param, Post, Patch } from '@nestjs/common'
import { CreatePessoaEnderecoDto } from 'src/entities/pessoas_enderecos/dto/create-pessoa-endereco.dto'
import { UpdatePessoaEnderecoDto } from 'src/entities/pessoas_enderecos/dto/update-pessoa-endereco.dto'
import { PessoasEnderecosService } from 'src/services/pessoas_enderecos/pessoas_enderecos.service'

@Controller('pessoas_enderecos')
export class PessoasEnderecosController {

    constructor(private readonly pessoasEnderecosService: PessoasEnderecosService) {}

    @Get()
    findAll(){
        return this.pessoasEnderecosService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.pessoasEnderecosService.findOne(id)
    }

    @Post()
    create(@Body() createPessoaEndDto: CreatePessoaEnderecoDto){
        return this.pessoasEnderecosService.create(createPessoaEndDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePessoaEndDto: UpdatePessoaEnderecoDto){
        return this.pessoasEnderecosService.update(id, updatePessoaEndDto)
    }

}