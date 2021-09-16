import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoursesModule } from './modules/courses/courses.module'
import { PessoasModule } from './modules/pessoas/pessoas.module'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'user_typeorm',
			password: 'QiV4Ru1EhujO',
			database: 'dbmestre',
			autoLoadEntities: true,
			synchronize: true
		}), 
    	CoursesModule, 
		PessoasModule
	],
  	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
