import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: 'created_at',
    })
    created_at: Date;

    @Column({
        type: 'uuid',
        nullable: false,
    })
    created_by: string;

    @Column({
        type: 'uuid',
        nullable: true,
    })
    modified_by: string;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
        name: 'modified_at',
    })
    modified_at: Date;

    constructor(entity: Partial<any>) {
        Object.assign(this, entity);
    }
}
