import { Module } from '@nestjs/common'
import { PessoasController } from 'src/controllers/pessoas/pessoas.controller'
import { PessoasService } from 'src/services/pessoas/pessoas.service'

@Module({
    controllers: [PessoasController],
    providers: [PessoasService]
})

export class PessoasModule {
}
