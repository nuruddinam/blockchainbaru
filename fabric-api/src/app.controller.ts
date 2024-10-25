import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestDoDto } from './dto/request-do.dto';
import { UpdateStatusDoDto } from './dto/update-status-do.dto';
import { UpdateDoDto } from './dto/update-do.dto';
import { GetDoOrgDto } from './dto/get-do-org.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('chaincode')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags("invoke")
  @Post('invoke/do')
  requestDo(@Body() payload: RequestDoDto) {
    return this.appService.requestDo(payload.data);
  }

  @ApiTags("query")
  @Get('query/do')
  queryAllDo() {
    return this.appService.getAllDo();
  }

  @ApiTags("query")
  @Post('query/do/co')
  queryAllDoCo(@Body() payload: GetDoOrgDto) {
    return this.appService.getAllDoCo(payload.orgName);
  }

  @ApiTags("query")
  @Post('query/do/sl')
  queryAllDoSl(@Body() payload: GetDoOrgDto) {
    return this.appService.getAllDoSl(payload.orgName)
  }

  @ApiTags("query")
  @Get('query/status-do/:orderId')
  queryStatusDo(@Param('orderId') orderId: string) {
    return this.appService.getStatusDo(orderId)
  }

  @ApiTags("query")
  @Get('query/do/:orderId')
  queryDoByOrderId(@Param('orderId') orderId: string) {
    return this.appService.getDoByOrderId(orderId);
  }

  @ApiTags("query")
  @Get('query/do/release')
  queryDoRelease() {
    return this.appService.getDoRelease();
  }

  @ApiTags("invoke")
  @Put('invoke/status-do/co/:orderId')
  updateStatusDoCo(@Param('orderId') orderId: string, @Body() payload: UpdateStatusDoDto) {
    return this.appService.updateStatusDoCo(orderId, payload)
  }

  @ApiTags("invoke")
  @Put('invoke/status-do/sl/:orderId')
  updateStatusDoSl(@Param('orderId') orderId: string, @Body() payload: UpdateStatusDoDto) {
    return this.appService.updateStatusDoSl(orderId, payload)
  }

  @ApiTags("invoke")
  @Put('invoke/do/co/:orderId')
  updateDoCo(@Param('orderId') orderId: string, @Body() payload: UpdateDoDto) {
    return this.appService.updateDoCo(orderId, payload.data)
  }

  @ApiTags("invoke")
  @Put('invoke/do/sl/:orderId')
  updateDoSl(@Param('orderId') orderId: string, @Body() payload: UpdateDoDto) {
    return this.appService.updateDoSl(orderId, payload.data)
  }

  @ApiTags("invoke")
  @Put('invoke/do/decision/:orderId?')
  decisionDo(@Param('orderId') orderId: string, @Query('status') status: string) {
    if (!["Released", "Rejected"].includes(status)) {
      throw new BadRequestException(`Status for Decision DO must have been Released or Rejected`);
    }
    if (status === "Released") {
      return this.appService.releaseDo(orderId);
    } else {
      return this.appService.rejectDo(orderId);
    }
  }
}
