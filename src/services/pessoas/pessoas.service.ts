import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Pessoa } from 'src/entities/pessoas/PessoaEntity'
import { CreatePessoaDto } from 'src/entities/pessoas/dto/create-pessoa.dto'
import { UpdatePessoaDto } from 'src/entities/pessoas/dto/update-pessoa.dto'
import { Repository } from 'typeorm'

@Injectable()
export class PessoasService {

    constructor(
        @InjectRepository(Pessoa)
        private readonly pessoaRepository: Repository<Pessoa>
    ) {}

    findAll(){
        return this.pessoaRepository.find()
    }

    findOne(id: string){
        const nId = parseInt(id)
        const pessoa = this.pessoaRepository.findOne(nId)

        if(!pessoa){
            throw new NotFoundException(`Pessoa id #${nId} não encontrada`)
        }

        return pessoa
    }

    create(createPessoaDto: CreatePessoaDto){
        const pessoa = this.pessoaRepository.create(createPessoaDto)
        return this.pessoaRepository.save(pessoa)
    }

    async update(id: string, updatePessoaDto: UpdatePessoaDto){
        const pessoa = await this.pessoaRepository.preload({
            id: +id,
            ...updatePessoaDto,
        })

        if(!pessoa){
            throw new NotFoundException(`Pessoa id #${id} não encontrada`)
        }
        return this.pessoaRepository.save(pessoa)
    }

}
