import { Controller, Post, Body, Get } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employees } from './employees.entity';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService){}

    @Post()
    async createEmployee(@Body() employeeData: Partial<Employees>): Promise<Employees> {
        return this.employeesService.create(employeeData);
    }
    @Get()
    async findAllEmployees(): Promise<Employees[]> {
        return this.employeesService.findAll();
    }
}
