import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employees)
        private employeesRepository: Repository<Employees>,
    ) { }
    async create(employeeData: Partial<Employees>): Promise<Employees> {
        const employee = this.employeesRepository.create(employeeData);
        return this.employeesRepository.save(employee);
    }
    async findAll(): Promise<Employees[]> {
        return this.employeesRepository.find();
    }
    async findOne(id: number): Promise<Employees> {
        const employee = await this.employeesRepository.findOneBy({ id });
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        return employee;
    }
    async update(id: number, updatedData: Partial<Employees>): Promise<Employees> {
        const employee = await this.employeesRepository.findOneBy({ id });
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        const updatedEmployee = Object.assign(employee, updatedData);
        return this.employeesRepository.save(updatedEmployee);
    }
    async delete(id: number): Promise<{ message: string }> {
        const result = await this.employeesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        return { message: `Employee id ${id} deleted successfully` };
    }
    async search(filters: { name?: string; deprtment?: string; }): Promise<Employees[]> {
        const query = this.employeesRepository.createQueryBuilder('employee');
        if (filters.name) {
            query.andWhere('employee.name ILIKE :name', { name: `%${filters.name}%` });

        }
        if (filters.deprtment) {
            query.andWhere('employee.department LIKE :dept', { dept: filters.deprtment });

        }
        return query.getMany();


    }


}
