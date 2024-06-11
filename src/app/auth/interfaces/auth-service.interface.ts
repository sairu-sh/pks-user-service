import { SignInDto, SignInResponseDto } from '../dto';

export abstract class IAuthService {
    abstract signin(signInPayload: SignInDto): Promise<SignInResponseDto>;
}
