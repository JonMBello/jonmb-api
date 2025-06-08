import { Injectable, Logger } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getStatus() {
    const now = new Date().toISOString();
    const response = {
      uptime: Math.round(process.uptime()),
      servertime: now,
      rev: this._gitInfo(),
      env: process.env.NODE_ENV,
      // minVersion: {
      //   ios: this.configService.get('iosMinVersion'),
      //   android: this.configService.get('androindMinVersion')
      // }
    };
    return response;
  }

  private _gitInfo() {
    try {
      // FIXME if not a git repository, output is dumped into console, try to avoid it
      return parseInt(execSync('git rev-list --count HEAD').toString().trim());
    } catch (err) {
      this.logger.error(err);
      return '0';
    }
  }
}
