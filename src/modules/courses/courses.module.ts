import { Module } from '@nestjs/common'
import { CoursesService } from 'src/services/courses/courses.service'
import { CoursesController } from 'src/controllers/courses/courses.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from 'src/entities/courses/CourseEntity'
import { Tag } from 'src/entities/tags/TagEntity'


@Module({
    imports: [TypeOrmModule.forFeature([Course, Tag])],
    controllers: [CoursesController],
    providers: [CoursesService]
})
export class CoursesModule {}
