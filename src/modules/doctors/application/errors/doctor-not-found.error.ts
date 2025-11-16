import { ApplicationError } from 'src/core/shared/errors/application.error';

export class DoctorNotFoundError extends ApplicationError {
  constructor() {
    super('Médico não encontrado', 404);
  }
}
