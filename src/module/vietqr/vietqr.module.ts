import { Module } from '@nestjs/common';
import VietQRController from './vietqr.controller';
import VietQRService from './vietqr.service';

@Module({
  controllers: [VietQRController],
  providers: [VietQRService],
})
export default class VietQRModule {}
