import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Pessoa } from 'src/entities/pessoas/PessoaEntity'
import { PessoaEndereco } from 'src/entities/pessoas_enderecos/PessoaEnderecoEntity'

import { CreatePessoaDto } from 'src/entities/pessoas/dto/create-pessoa.dto'
import { UpdatePessoaDto } from 'src/entities/pessoas/dto/update-pessoa.dto'

@Injectable()
export class PessoasService {

    constructor(
        @InjectRepository(Pessoa)
        private readonly pessoaRepository: Repository<Pessoa>,

        @InjectRepository(PessoaEndereco)
        private readonly pessoaEnderecoRepository: Repository<PessoaEndereco>
    ) {}

    findAll(){
        return this.pessoaRepository.find({
            relations: ['enderecos']
        })
    }

    findOne(id: string){
        const nId = parseInt(id)
        const pessoa = this.pessoaRepository.findOne(nId)

        if(!pessoa){
            throw new NotFoundException(`Pessoa id #${nId} não encontrada`)
        }

        return pessoa
    }

    async create(createPessoaDto: CreatePessoaDto){
        try{
        
            if(!createPessoaDto.endereco.bairro){
                throw new NotAcceptableException('Bairro não informado!')
            }
            if(!createPessoaDto.endereco.cep){
                throw new NotAcceptableException('CEP não informado!')
            }
            if(!createPessoaDto.endereco.endereco){
                throw new NotAcceptableException('Endereço não informado!')
            }
            /*
            if(!createPessoaDto.endereco.numero){
                throw new NotAcceptableException('Número não informado!')
            }
            */
            const pessoa = await this.pessoaRepository.create(createPessoaDto)
            const retorno = await this.pessoaRepository.save(pessoa)
            
            const ret = await this.savePessoaEndereco(retorno, createPessoaDto.endereco)
            return ret
        }catch(error){
            throw new Error(error)
        }
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

    private async savePessoaEndereco(id_pessoa: Pessoa, end: PessoaEndereco): Promise<PessoaEndereco>{
        try{
            end.id_pessoa = id_pessoa
            const endereco = await this.pessoaEnderecoRepository.create(end)
            return this.pessoaEnderecoRepository.save(endereco)
        }catch(error){
            throw new Error(error)
        }
    }
}
