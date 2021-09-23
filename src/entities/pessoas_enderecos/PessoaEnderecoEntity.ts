import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Pessoa } from '../pessoas/PessoaEntity'

@Entity('pessoas_enderecos')
export class PessoaEndereco {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Pessoa)
    @JoinColumn({name: 'id_pessoa'})
    id_pessoa: Pessoa

    @Column()
    endereco: string

    @Column()
    numero: number

    @Column({nullable: true})
    complemento: string

    @Column()
    bairro: string

    @Column()
    cep: string

}
