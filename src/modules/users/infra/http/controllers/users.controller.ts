import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
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
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({ type: CreateUserDTO })
  async create(@Body() dto: CreateUserDTO) {
    const user = await this.createUser.execute(dto);
    return UserPresenter.toHTTP(user);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza o usuário' })
  @ApiBody({ type: UpdateUserDTO })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    const user = await this.updateUser.execute(id, dto);

    return UserPresenter.toHTTP(user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar usuário por ID',
    description:
      'Retorna os dados detalhados de um usuário existente no sistema.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'ID do usuário a ser buscado',
    example: '9b6f98c5-3f24-4fae-8ff4-f6921b777abc',
  })
  @ApiOkResponse({
    description: 'Usuário encontrado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou mal formatado',
  })
  async findById(@Param('id') id: string) {
    const user = await this.getUser.execute(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return UserPresenter.toHTTP(user);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 201, description: 'Lista retornada com sucesso' })
  async findAll() {
    const users = await this.getAllUsers.execute();

    return users.map((data) => UserPresenter.toHTTP(data));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar usuário por ID',
    description:
      'Remove um usuário existente do sistema com base no ID informado.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID do usuário a ser deletado',
    required: true,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  async delete(@Param('id') id: string) {
    const user = await this.deleteUser.execute(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return UserPresenter.toHTTP(user);
  }
}
