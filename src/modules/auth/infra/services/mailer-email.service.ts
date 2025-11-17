import { Injectable } from '@nestjs/common';
import { EmailService } from '../../domain/services/email.service';

@Injectable()
export class MailerEmailService implements EmailService {
  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    console.log(`To: ${to}`);
    console.log('Subject: Redefinição de Senha');
    console.log(`token para redefinir sua senha: ${token}`);
  }
}
