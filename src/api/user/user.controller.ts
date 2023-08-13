import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './domain/user.entity';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('v1/users')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '모든 유저 조회 API' })
  @ApiOkResponse({ description: '모든 유저를 조회한다.', type: User })
  async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  async create(@Body() requestDto: UserCreateRequestDto) {
    return await this.userService.create(requestDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 정보 조회 API' })
  @ApiOkResponse({
    description: 'Id가 일치하는 유저 정보를 조회한다.',
    type: UserResponseDto,
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '유저 정보 수정 API' })
  @ApiOkResponse({
    description: 'Id가 일치하는 유저 정보를 수정한다.',
    type: User,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() requestDto: UserUpdateRequestDto,
  ) {
    return await this.userService.update(id, requestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '유저 삭제 API' })
  @ApiNoContentResponse({ description: 'Id가 일치하는 유저 정보를 삭제한다.' })
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.delete(id);
  }
}
