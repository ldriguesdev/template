export abstract class EmailService {
  abstract sendPasswordResetEmail(to: string, token: string): Promise<void>;
}
