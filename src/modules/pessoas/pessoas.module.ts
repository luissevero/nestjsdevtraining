import { Module } from '@nestjs/common'
import { PessoasController } from 'src/controllers/pessoas/pessoas.controller'
import { PessoasService } from 'src/services/pessoas/pessoas.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pessoa } from 'src/entities/pessoas/PessoaEntity'
import { PessoaEndereco } from 'src/entities/pessoas_enderecos/PessoaEnderecoEntity'

@Module({
    imports: [TypeOrmModule.forFeature([Pessoa, PessoaEndereco])],
    controllers: [PessoasController],
    providers: [PessoasService]
})

export class PessoasModule {
}
