import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor (
        @InjectRepository(Employees)
        private employeesRepository: Repository<Employees>,
    ){}
    async create(employeeData: Partial<Employees>): Promise<Employees> {
        const employee = this.employeesRepository.create(employeeData);
        return this.employeesRepository.save(employee);
    }
    async findAll(): Promise<Employees[]> {
        return this.employeesRepository.find();
    }
    async findOne(id: number): Promise<Employees> {
       const employee = await this.employeesRepository.findOneBy ({id});
       if(!employee){
        throw new NotFoundException(`Employee with ID ${id} not found`);
       }
       return employee;
    }


   
}
