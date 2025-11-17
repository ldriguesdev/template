import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from '../../../application/use-cases/sign-in.usecase';
import { RefreshTokenUseCase } from '../../../application/use-cases/refresh-token.usecase';
import { RequestPasswordResetUseCase } from '../../../application/use-cases/request-password-reset.usecase';
import { ResetPasswordUseCase } from '../../../application/use-cases/reset-password.usecase';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { SignInDto } from '../dto/sign-in.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RequestPasswordResetDto } from '../dto/request-password-reset.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto.email, signInDto.password);
  }

  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(refreshTokenDto.refreshToken);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('forgot-password')
  async forgotPassword(@Body() dto: RequestPasswordResetDto): Promise<void> {
    await this.requestPasswordResetUseCase.execute(dto.email);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    await this.resetPasswordUseCase.execute(dto.token, dto.password);
  }
}
