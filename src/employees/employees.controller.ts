import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
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
    @Get(':id')
    async findEmployeeById(@Param('id') id: number) : Promise<Employees> {
        return this.employeesService.findOne(id);
    }
    @Put(':id')
    async updateEmployee(@Param('id') id: number, @Body() Body :Partial <Employees>): Promise<Employees> {
        return this.employeesService.update(id ,Body);
    }
}
