import { Controller, Post, Body, Get, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employees } from './employees.entity';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    async createEmployee(@Body() employeeData: Partial<Employees>): Promise<Employees> {
        return this.employeesService.create(employeeData);
    }
    @UseGuards(SupabaseAuthGuard)
    @Get()
    async findAllEmployees(): Promise<Employees[]> {
        return this.employeesService.findAll();
    }
    @Get('search')
    async searchEmployees(
        @Query('name') Name?: string,
        @Query('department') department?: string,): Promise<Employees[]> {
        return this.employeesService.search({ Name, department: department });

    }



    @Get(':id')
    async findEmployeeById(@Param('id') id: number): Promise<Employees> {
        return this.employeesService.findOne(id);
    }
    @Put(':id')
    async updateEmployee(@Param('id') id: number, @Body() Body: Partial<Employees>): Promise<Employees> {
        return this.employeesService.update(id, Body);
    }
    @Delete(':id')
    async deleteEmployee(@Param('id') id: number): Promise<{ message: string }> {
        return this.employeesService.delete(id);
    }
}
