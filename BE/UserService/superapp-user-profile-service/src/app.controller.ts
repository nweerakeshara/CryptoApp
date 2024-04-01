import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: 'This is the main Hello Wold Get Endpoint.' })
  @ApiResponse({
    status: 200,
    description: 'Successfull displayed `Hello World`.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('/v2/api-docs')
  swaggerDocument(): string {
    console.log('****---->Swagger api');
    return JSON.parse(fs.readFileSync('./swagger-spec.json', 'utf-8'));
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
