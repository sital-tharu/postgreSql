import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:  process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,

    }),
    UserModule,
    EmployeesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
