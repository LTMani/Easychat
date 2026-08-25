import { Module } from '@nestjs/common';
import { SsoController } from './sso.controller';
import { SamlSsoService } from './saml-sso.service';

@Module({
  controllers: [SsoController],
  providers: [SamlSsoService],
  exports: [SamlSsoService],
})
export class SsoModule {}
