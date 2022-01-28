import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { getUser } from '../auth/get-user.decorator'
import { User } from '../auth/user.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { UpdateTaskStatusDto } from './dto/update-task-status.dto'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController')
  constructor(
    private tasksService: TasksService,
    private configService: ConfigService,
  ) {
    console.log(configService.get('DEV_PORT'))
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @getUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    )
    return this.tasksService.getTasks(filterDto, user)
  }

  @Get(`/:id`)
  getTaskById(@Param('id') id: string, @getUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user)
  }
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @getUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    )
    return this.tasksService.createTask(createTaskDto, user)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @getUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @getUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(id, status, user)
  }
}
