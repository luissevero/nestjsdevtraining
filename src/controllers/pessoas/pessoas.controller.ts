import { Controller, Get } from '@nestjs/common';

@Controller('pessoas')
export class PessoasController {

    @Get()
    findAll(){
        return '<h1>Listagem de pessoas</h1>'
    }

    @Get('list')
    findAlt(){
        return 'Listagem alternativa'
    }

    @Get(':id')
    findById(){

    }

}
