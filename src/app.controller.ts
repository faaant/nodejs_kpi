import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ExchangeRates } from './interfaces/rates.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('exchange/rate')
  getRate() {
    return this.appService.getRates()
    .then((data)=>{
      return data.data.uah
    })
  }
}
