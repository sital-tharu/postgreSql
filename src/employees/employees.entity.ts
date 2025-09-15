import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Employees{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

    @Column()
    position: string;

    @Column()
    dipartment: string;

}

