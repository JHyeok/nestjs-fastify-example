import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@Controller('')
@ApiTags('')
export class HealthController {
  constructor(private readonly appService: HealthService) {}

  @Get('/health')
  @ApiOperation({ description: 'health check' })
  healthCheck() {
    return this.appService.sendOk();
  }
}
