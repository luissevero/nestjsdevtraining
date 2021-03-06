import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreatePessoaDto } from 'src/entities/pessoas/dto/create-pessoa.dto'
import { UpdatePessoaDto } from 'src/entities/pessoas/dto/update-pessoa.dto'
import { PessoasService } from 'src/services/pessoas/pessoas.service'

@Controller('pessoas')
export class PessoasController {

    constructor(private readonly pessoasService: PessoasService){}
    
    @Get()
    findAll(){
        return this.pessoasService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.pessoasService.findOne(id)
    }

    @Post()
    create(@Body() createPessoaDto: CreatePessoaDto){
        return this.pessoasService.create(createPessoaDto)
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updatePessoaDto: UpdatePessoaDto){
        return this.pessoasService.update(id, updatePessoaDto)
    }

}
