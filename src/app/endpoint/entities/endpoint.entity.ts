import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { UserGroup } from 'src/app/usergroup/entities';
import { Role } from 'src/app/role/entities';
import { Privilege } from 'src/app/privilege/entities';

@Entity()
export class Endpoint {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        type: String,
    })
    code: string;

    @Column({
        unique: true,
        type: String,
    })
    path: string;

    @Column({
        unique: true,
        type: String,
    })
    method: string;


    // @ManyToMany(() => Privilege, privilege => privilege.endPoints)
    // privileges: Privilege[];

}
