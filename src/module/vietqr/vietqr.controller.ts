import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import VietQRService from './vietqr.service';

@Controller('vqr')
export default class VietQRController {
  constructor(private readonly vietQRSercive: VietQRService) {}

  @Post('api/token_generate')
  generateToken(@Headers('authorization') authorization: string) {
    try {
      return this.vietQRSercive.generateToken(authorization);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('bank/api/transaction-sync')
  transactionSync(
    @Headers('authorization') authorization: string,
    @Body() body,
  ) {
    return this.vietQRSercive.transactionSync(authorization, body);
  }

  @Get('api/test')
  test() {
    return 'Get success';
  }
}
