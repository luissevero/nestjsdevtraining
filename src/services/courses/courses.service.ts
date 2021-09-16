import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from 'src/entities/courses/CourseEntity'
import { CreateCourseDto } from 'src/entities/courses/dto/create-course.dto'
import { UpdateCourseDto } from 'src/entities/courses/dto/update-course.dto'
import { Repository } from 'typeorm'

@Injectable()
export class CoursesService {
    
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {}

    findAll(){
        return this.courseRepository.find()
    }

    findOne(id: string) {
        
        const nId = parseInt(id)
        const course = this.courseRepository.findOne(nId)
        
        if(!course){
            throw new NotFoundException(`Curso #${nId} não encontrado`)
        }

        return course
    }

    create(createCourseDto: CreateCourseDto){
        const course = this.courseRepository.create(createCourseDto)
        return this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDto: UpdateCourseDto){
        
        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
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
}
