import { SetMetadata } from '@nestjs/common';

export const META_APIKEY = 'apikey';

export const ApikeyProtected = (apikey: string) => {
  return SetMetadata(META_APIKEY, apikey);
};
