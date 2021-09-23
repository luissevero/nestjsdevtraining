import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Course } from '../courses/CourseEntity'

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany( () => Course, (course: Course) => course.tags)
    courses: Course[]
}
