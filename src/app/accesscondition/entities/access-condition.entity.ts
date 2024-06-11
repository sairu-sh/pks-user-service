import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccessCondition {

    @PrimaryGeneratedColumn('uuid')
    id: string;
}
