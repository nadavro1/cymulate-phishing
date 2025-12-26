import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AttemptsModule } from './attempts/attempts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AttemptsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/phishing-management'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
