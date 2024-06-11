import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AssignRoleDto {
    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    @IsUUID()
    roleId: string;
}
