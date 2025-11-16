import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/users/application/dto/create-user.dto';
import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.usecase';
import { UserPresenter } from '../presenters/user.presenter';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { GetUserUseCase } from 'src/modules/users/application/use-cases/get-user.usecase';
import { GetUsersUseCase } from 'src/modules/users/application/use-cases/get-users.usecase';
import { DeleteUserUseCase } from 'src/modules/users/application/use-cases/delete-user.usecase';
import { UpdateUserDTO } from 'src/modules/users/application/dto/update-user.dto';
import { UpdateUserUseCase } from 'src/modules/users/application/use-cases/update-user.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly getAllUsers: GetUsersUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({
    description: 'User created successfully.',
  })
  async create(@Body() dto: CreateUserDTO) {
    const user = await this.createUser.execute(dto);
    return UserPresenter.toHTTP(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an existing user.' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiBody({ type: UpdateUserDTO })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    console.log('id', id);

    const user = await this.updateUser.execute(id, dto);
    return UserPresenter.toHTTP(user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Search for a user by ID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    example: '9b6f98c5-3f24-4fae-8ff4-f6921b777abc',
  })
  @ApiOkResponse({
    description: 'User found successfully.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid or incorrectly formatted ID.',
  })
  async findById(@Param('id') id: string) {
    const user = await this.getUser.execute(id);
    return UserPresenter.toHTTP(user);
  }

  @Get()
  @ApiOperation({ summary: 'List all users.' })
  @ApiOkResponse({ description: 'Users listed successfully.' })
  async findAll() {
    const users = await this.getAllUsers.execute();
    return users ? users.map((user) => UserPresenter.toHTTP(user)) : [];
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user by ID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async delete(@Param('id') id: string) {
    const user = await this.deleteUser.execute(id);
    return UserPresenter.toHTTP(user);
  }
}
