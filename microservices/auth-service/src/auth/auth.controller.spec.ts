import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { emailConfirmationDto, FindOneUserByEmailDto, FindOneUserByIdDto, LoginDto, OauthCallbackDto, OauthCallbackRes, oauthConnectRes, passwordDto, providerDto, RegistrationDto, resetPasswordDto, User } from "./interface/auth_service";
import { ConfigService } from '@nestjs/config';
import { DRIZZLE } from "../drizzle/drizzle.module";
import { MailService } from "../libs/mail/mail.service";
import { UserService } from "../user/user.service";
import { ProviderService } from "./provider/provider.service";
import { TwoFactorAuthService } from "./two-factor-auth/two-factor-auth.service";
import { EmailConfirmationService } from "./email-confirmation/email-confirmation.service";
import { PasswordRecoveryService } from "./password-recovery/password-recovery.service";
const registrationDto: RegistrationDto = {
    name: "",
    email: "",
    password: "",
    passwordRepeat: ""
}

const resetPasswordDto: resetPasswordDto = {
    email: ""
}

const passwordDto: passwordDto = {
    password: "",
    token: ""
}

const passwordNewDto: passwordDto = {
    password: "",
    token: ""
}

const passwordResetDto: resetPasswordDto = {
    email: ""
}

const providerDto: providerDto = {
    provider: ""
}

const emailConfirmationDto: emailConfirmationDto = {
    token: ""
}

const oauthConnectRes: oauthConnectRes = {
    url: ""
}

const oauthCallbackRes: OauthCallbackRes = {
    redirectURL: "",
    user: undefined
}

const oauthCallbackDto: OauthCallbackDto = {
    code: "",
    provider: ""
}

const loginDto: LoginDto = {
    email: "",
    password: "",
    code: undefined
}

const findOneUserByEmailDto: FindOneUserByEmailDto = {
    email: ""
}

const findOneUserByIdDto: FindOneUserByIdDto = {
    id: ""
}

const user: User = {
    id: "",
    displayName: "",
    email: "",
    password: "",
    role: "",
    isVerified: false,
    isTwoFactorEnabled: false,
    method: ""
}

describe('Auth Controller', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        registration: jest.fn().mockResolvedValue(user),
                        login: jest.fn().mockResolvedValue(user),
                        oauthConnect: jest.fn().mockResolvedValue(oauthConnectRes),
                    },
                },
                {
                    provide: ConfigService, 
                    useValue: {
                        get: jest.fn().mockReturnValue('mocked-value'),
                        getOrThrow: jest.fn().mockReturnValue('mocked-value'),
                    },
                },
                {
                    provide: DRIZZLE,
                    useValue: {
                        select: jest.fn().mockReturnValue({
                            from: jest.fn().mockReturnValue({
                                where: jest.fn().mockReturnValue([user]),
                            }),
                        }),
                        update: jest.fn().mockReturnValue({
                            set: jest.fn().mockReturnValue({
                                where: jest.fn(),
                            }),
                        }),
                        delete: jest.fn().mockReturnValue({
                            where: jest.fn(),
                        }),
                    },
                },
                {
                    provide: MailService,
                    useValue: {
                        sendConfirmationEmail: jest.fn(),
                        sendPasswordResetEmail: jest.fn(),
                        sendTwoFactorTokenEmail: jest.fn(),
                    },
                },
                {
                    provide: UserService,
                    useValue: {
                        findByEmail: jest.fn().mockResolvedValue(user),
                        findById: jest.fn().mockResolvedValue(user),
                        create: jest.fn().mockResolvedValue(user),
                        update: jest.fn().mockResolvedValue(user),
                        delete: jest.fn().mockResolvedValue(user),
                    }
                },
                {
                    provide: ProviderService,
                    useValue: {
                        getOAuthUrl: jest.fn().mockResolvedValue(oauthConnectRes),
                        getOAuthTokens: jest.fn().mockResolvedValue(oauthCallbackRes),
                    }
                },
                {
                    provide: TwoFactorAuthService,
                    useValue: {
                        sendTwoFactorToken: jest.fn(),
                        verifyTwoFactorToken: jest.fn().mockResolvedValue(true),
                    }
                },
                {
                    provide: EmailConfirmationService,
                    useValue: {
                        sendVerificationToken: jest.fn(),
                        newVerification: jest.fn().mockResolvedValue(user),
                    }
                },
                {
                    provide: PasswordRecoveryService,
                    useValue: {
                        sendPasswordResetEmail: jest.fn(),
                        resetPassword: jest.fn().mockResolvedValue(user),
                    }
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
})

it('should be defined', () => {
    expect(controller).toBeDefined();
})
});