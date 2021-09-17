import { Module } from '@nestjs/common'
import { PessoasController } from 'src/controllers/pessoas/pessoas.controller'
import { PessoasService } from 'src/services/pessoas/pessoas.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pessoa } from 'src/entities/pessoas/PessoaEntity'

@Module({
    imports: [TypeOrmModule.forFeature([Pessoa])],
    controllers: [PessoasController],
    providers: [PessoasService]
})

export class PessoasModule {
}
