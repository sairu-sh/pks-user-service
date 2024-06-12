import { Test, TestingModule } from '@nestjs/testing';
import { UserGroupTypesController } from './usergrouptype.controller';

describe('UserController', () => {
    let controller: UserGroupTypesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserGroupTypesController],
        }).compile();

        controller = module.get<UserGroupTypesController>(UserGroupTypesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
