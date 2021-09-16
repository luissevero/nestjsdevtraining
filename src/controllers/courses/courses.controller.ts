import { 
    Controller, 
    Get, 
    Post, 
    Patch,
    Param, 
    Body, 
    Delete
} from '@nestjs/common'
import { CreateCourseDto } from 'src/entities/courses/dto/create-course.dto'
import { UpdateCourseDto } from 'src/entities/courses/dto/update-course.dto'
import { CoursesService } from 'src/services/courses/courses.service'

@Controller('courses')
export class CoursesController {
    
    constructor(private readonly coursesService: CoursesService){

    }

    @Get()
    findAll() {
        return this.coursesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.coursesService.findOne(id)
    }

    @Post()
    create(@Body() createCourseDto: CreateCourseDto){
        return this.coursesService.create(createCourseDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto){
        return this.coursesService.update(id, updateCourseDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.coursesService.remove(id)
    }
}
