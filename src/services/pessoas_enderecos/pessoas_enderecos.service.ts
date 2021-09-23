import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PessoaEndereco } from 'src/entities/pessoas_enderecos/PessoaEnderecoEntity'
import { CreatePessoaEnderecoDto } from 'src/entities/pessoas_enderecos/dto/create-pessoa-endereco.dto'
import { UpdatePessoaEnderecoDto } from 'src/entities/pessoas_enderecos/dto/update-pessoa-endereco.dto'

@Injectable()
export class PessoasEnderecosService {

    constructor(
        @InjectRepository(PessoaEndereco)
        private readonly pessoaEnderecoRepository: Repository<PessoaEndereco>
    ) {}

    findAll(){
        return this.pessoaEnderecoRepository.find()
    }

    findOne(id: string){
        const nId = parseInt(id)
        const pessoaEnd = this.pessoaEnderecoRepository.findOne(nId)

        if(!pessoaEnd){
            throw new NotFoundException(`Endereço id #${nId} não encontrada`)
        }

        return pessoaEnd
    }

    create(createPessoaEndDto: CreatePessoaEnderecoDto){
        const pessoaEnd = this.pessoaEnderecoRepository.create(createPessoaEndDto)
        return this.pessoaEnderecoRepository.save(pessoaEnd)
    }

    async update(id: string, updatePessoaEndDto: UpdatePessoaEnderecoDto){
        const pessoaEnd = await this.pessoaEnderecoRepository.preload({
            id: +id,
            ...updatePessoaEndDto,
        })

        if(!pessoaEnd){
            throw new NotFoundException(`Endereço id #${id} não encontrada`)
        }
        return this.pessoaEnderecoRepository.save(pessoaEnd)
    }



}