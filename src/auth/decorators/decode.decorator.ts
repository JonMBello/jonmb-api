import { DecodedData } from '../interfaces/decoded-data.interface';
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetDecodedData = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx
      .switchToHttp()
      .getRequest<Request & { user: DecodedData }>();
    const decoded = req.user;
    if (!decoded)
      throw new InternalServerErrorException(
        '[auth, decorators, decode.decorator.ts] Decoded data not found',
      );
    return !data ? decoded : decoded[data as keyof DecodedData];
  },
);
