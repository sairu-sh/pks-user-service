import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
    @ApiProperty({
        type: String,
    })
    access_token: string;

    @ApiProperty({
        type: String,
    })
    token_type: string;

    @ApiProperty({
        type: String,
    })
    expires_in: number;
}
