import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor (
        @InjectRepository(Employees)
        private employeesRepository: Repository<Employees>,
    ){}
}
