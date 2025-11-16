import { ApplicationError } from 'src/core/shared/errors/application.error';

export class EmailAlreadyExistsError extends ApplicationError {
  constructor() {
    super('Já existe um usuário com esse e-mail.', 409);
  }
}
