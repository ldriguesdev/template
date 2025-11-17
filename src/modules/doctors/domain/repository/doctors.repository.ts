import { Doctor } from '../entities/doctor.entity';

export abstract class DoctorsRepository {
  abstract create(doctor: Doctor): Promise<Doctor>;
  abstract findById(id: string): Promise<Doctor | null>;
  abstract findByUserId(userId: string): Promise<Doctor | null>;
  abstract findAll(): Promise<Doctor[] | null>;
  abstract delete(id: string): Promise<Doctor | null>;
  abstract update(doctor: Doctor): Promise<Doctor>;
}
