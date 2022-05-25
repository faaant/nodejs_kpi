import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ExchangeRates } from '@shared/interfaces/rates.interface';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getRates(): Promise<any> {
    const result = await firstValueFrom(
      this.httpService.get(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/uah.json',
      ),
    );
    return result;
  }
}
