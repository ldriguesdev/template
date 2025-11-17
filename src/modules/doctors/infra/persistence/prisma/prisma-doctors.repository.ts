import { PrismaService } from 'src/core/providers/prisma.service';
import { Injectable } from '@nestjs/common';
import { DoctorsRepository } from 'src/modules/doctors/domain/repository/doctors.repository';
import { Doctor } from 'src/modules/doctors/domain/entities/doctor.entity';
import { DoctorMapper } from '../../mappers/doctor.mapper';

@Injectable()
export class PrismaDoctorsRepository implements DoctorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(doctor: Doctor): Promise<Doctor> {
    const raw = await this.prisma.doctor.create({
      data: {
        crm: doctor.crm,
        state: doctor.state,
        bio: doctor.bio,
        city: doctor.city,
        created_at: doctor.createdAt,
        id: doctor.id,
        phone: doctor.phone,
        updated_at: doctor.updatedAt,
        user_id: doctor.userId,
      },
      include: {
        user: true,
      },
    });

    return DoctorMapper.toDomain(raw);
  }

  async findById(id: string): Promise<Doctor | null> {
    const raw = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return raw ? DoctorMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<Doctor[] | null> {
    const raw = await this.prisma.doctor.findMany({
      include: {
        user: true,
      },
    });

    return raw.map((doctor) => DoctorMapper.toDomain(doctor));
  }

  async delete(id: string): Promise<Doctor | null> {
    const raw = await this.prisma.doctor.delete({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return DoctorMapper.toDomain(raw);
  }

  async update(doctor: Doctor): Promise<Doctor> {
    const raw = await this.prisma.doctor.update({
      where: { id: doctor.id },
      data: {
        crm: doctor.crm,
        bio: doctor.bio,
        city: doctor.city,
        state: doctor.state,
        phone: doctor.phone,
        updated_at: new Date(),
        user: {
          update: {
            email: doctor.email,
            name: doctor.name,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return DoctorMapper.toDomain(raw);
  }

  async findByUserId(userId: string): Promise<Doctor | null> {
    const raw = await this.prisma.doctor.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        user: true,
      },
    });

    return raw ? DoctorMapper.toDomain(raw) : null;
  }
}
