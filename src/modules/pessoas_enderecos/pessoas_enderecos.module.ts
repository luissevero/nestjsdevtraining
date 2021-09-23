import { Module } from '@nestjs/common'
import { PessoasEnderecosController } from 'src/controllers/pessoas_enderecos/pessoas_enderecos.controller'
import { PessoasEnderecosService } from 'src/services/pessoas_enderecos/pessoas_enderecos.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PessoaEndereco } from 'src/entities/pessoas_enderecos/PessoaEnderecoEntity'

@Module({
    imports: [TypeOrmModule.forFeature([PessoaEndereco])],
    controllers: [PessoasEnderecosController],
    providers: [PessoasEnderecosService]
})

export class PessoasEnderecosModule {
}
