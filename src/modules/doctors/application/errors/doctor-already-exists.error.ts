import { ApplicationError } from 'src/core/shared/errors/application.error';

export class DoctorAlreadyExistsError extends ApplicationError {
  constructor() {
    super('Já existe médico cadastrado', 409);
  }
}
