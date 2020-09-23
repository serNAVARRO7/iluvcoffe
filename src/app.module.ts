import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import  * as Joi from '@hapi/joi';

// .env variables process.env.DATABASE_HOST = string, +process.env.DATABASE_HOST = number

/**
 * To specify another path for .env file, 
 * let’s pass in an options object into the forRoot() method 
 * and set the envFilePath property like so:
 * In this example, we’re looking instead for a .environment file.
  ConfigModule.forRoot({
    envFilePath: '.environment’,
  });
 */

/** 
 * Have ConfigModule *ignore* .env files 
 * Useful when using Provider UI's such as Heroku, etc (and they handle all ENV variables)
  ConfigModule.forRoot({
    ignoreEnvFile: true,
  });
 */

@Module({
  imports: [
    ConfigModule.forRoot({
      // Use JOI for .env variables validation 
      // $ npm install @hapi/joi
      // $ npm install --save-dev @types/hapi__joi
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    CoffeesModule, 
    CoffeeRatingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
