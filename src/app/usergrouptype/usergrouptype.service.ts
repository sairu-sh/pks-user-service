import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserGroupType } from './entities';

@Injectable()
export class UserGroupTypeService {
    constructor(private readonly usergroupTypeRepository: Repository<UserGroupType>) {}

    async getAllTypes(): Promise<UserGroupType[]> {
        return this.usergroupTypeRepository.find();
    }
}
