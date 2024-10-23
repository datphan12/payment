import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import VietQRModule from './module/vietqr/vietqr.module';

@Module({
  imports: [VietQRModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
