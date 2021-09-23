import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from 'src/entities/courses/CourseEntity'
import { CreateCourseDto } from 'src/entities/courses/dto/create-course.dto'
import { UpdateCourseDto } from 'src/entities/courses/dto/update-course.dto'
import { Tag } from 'src/entities/tags/TagEntity'
import { Repository } from 'typeorm'

@Injectable()
export class CoursesService {
    
    constructor(

        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    findAll(){
        return this.courseRepository.find({
            relations: ['tags']
        })
    }

    findOne(id: string) {
        
        const nId = parseInt(id)
        const course = this.courseRepository.findOne(nId, {
            relations: ['tags']
        })
        
        if(!course){
            throw new NotFoundException(`Curso #${nId} não encontrado`)
        }

        return course
    }

    async create(createCourseDto: CreateCourseDto){
        const tags = await Promise.all(
            createCourseDto.tags.map( (name) => this.preloadTagByName(name))
        )
        const course = this.courseRepository.create({
            ...createCourseDto,
            tags,
        })
        return this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDto: UpdateCourseDto){
        const tags = updateCourseDto.tags && (
            await Promise.all(updateCourseDto.tags.map( (name) => this.preloadTagByName(name)))
        )

        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
            tags
        })

        if(!course){
            throw new NotFoundException(`Course id# ${id} não encontrado`)
        }
        return this.courseRepository.save(course)
    }

    async remove(id: string){
        const course = await this.courseRepository.findOne(id)
        
        if(!course){
            throw new NotFoundException(`Course id# ${id} não encontrado`)
        }
        return this.courseRepository.remove(course)
    }

    private async preloadTagByName(name: string): Promise<Tag>{
        const tag = await this.tagRepository.findOne({name})


        if(tag){
            return tag
        }
        return this.tagRepository.create({ name })
    }
}
