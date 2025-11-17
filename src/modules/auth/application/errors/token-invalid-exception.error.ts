import { ApplicationError } from 'src/core/shared/errors/application.error';

export class TokenInvalidExceptionError extends ApplicationError {
  constructor() {
    super('Token de redefinição inválido ou expirado.', 400);
  }
}
