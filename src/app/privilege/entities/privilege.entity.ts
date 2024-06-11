import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { UserGroup } from 'src/app/usergroup/entities';
import { Role } from 'src/app/role/entities';
import { Endpoint } from 'src/app/endpoint/entities';

@Entity()
export class Privilege {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        type: String,
    })
    name: string;


    @ManyToMany(() => Role, role => role.privileges)
    roles: Role[];


    // @ManyToMany(() => Endpoint, endpoint => endpoint.privileges)
    // @JoinTable()
    // endPoints: Endpoint[];


}
