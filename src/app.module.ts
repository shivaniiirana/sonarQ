import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Ensure .env is loaded globally
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    UsersModule,
  ],
})
export class AppModule {}
