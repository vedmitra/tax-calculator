import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaxModule } from './tax/tax.module';

@Module({
  imports: [TaxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
