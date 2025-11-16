import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { DoctorPresenter } from '../presenters/doctor.presenter';
import { CreateDoctorUseCase } from 'src/modules/doctors/application/use-cases/create-doctor.usecase';
import { GetDoctorUseCase } from 'src/modules/doctors/application/use-cases/get-doctor.usecase';
import { GetDoctorsUseCase } from 'src/modules/doctors/application/use-cases/get-doctors.usecase';
import { CreateDoctorDTO } from 'src/modules/doctors/application/dto/create-doctor.dto';
import { UpdateDoctorDTO } from 'src/modules/doctors/application/dto/update-doctor.dto';
import { UpdateDoctorUseCase } from 'src/modules/doctors/application/use-cases/update-doctor.usecase';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly createDoctor: CreateDoctorUseCase,
    private readonly getDoctorById: GetDoctorUseCase,
    private readonly getAllDoctors: GetDoctorsUseCase,
    private readonly updateDoctor: UpdateDoctorUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new doctor',
    description: 'Registers a new doctor in the system.',
  })
  @ApiBody({ type: CreateDoctorDTO })
  @ApiCreatedResponse({
    description: 'Doctor created successfully.',
    type: DoctorPresenter,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or incorrect data.',
  })
  async create(@Body() dto: CreateDoctorDTO) {
    const doctor = await this.createDoctor.execute(dto);
    return DoctorPresenter.toHTTP(doctor);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an existing doctor.' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiBody({ type: UpdateDoctorDTO })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiNotFoundResponse({ description: 'Doctor not found.' })
  async update(@Param('id') id: string, @Body() dto: UpdateDoctorDTO) {
    const doctor = await this.updateDoctor.execute(id, dto);
    return DoctorPresenter.toHTTP(doctor);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find doctor by ID',
    description: 'Returns the detailed data of a doctor.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Doctor ID to be searched.',
    example: '9b6f98c5-3f24-4fae-8ff4-f6921b777abc',
  })
  @ApiOkResponse({
    description: 'Doctor found successfully.',
    type: DoctorPresenter,
  })
  @ApiNotFoundResponse({
    description: 'Doctor not found.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid or incorrectly formatted ID.',
  })
  async findById(@Param('id') id: string) {
    const doctor = await this.getDoctorById.execute(id);
    return DoctorPresenter.toHTTP(doctor);
  }

  @Get()
  @ApiOperation({ summary: 'List all doctors' })
  @ApiOkResponse({
    description: 'List returned successfully.',
    type: DoctorPresenter,
    isArray: true,
  })
  async findAll() {
    const doctors = await this.getAllDoctors.execute();
    return doctors.map((data) => DoctorPresenter.toHTTP(data));
  }
}
