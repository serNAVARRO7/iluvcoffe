import { Module, Injectable } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { COFFEE_BRANDS } from './coffees.constants';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}


@Injectable()
export class CoffeeBrandsFactory {
    create() {
        return ['buddy brew', 'nescafe']
    }
}

@Module({
    controllers: [CoffeesController],
    providers: [CoffeesService, CoffeeBrandsFactory, 
        {
            provide: 'COFFEE_BRANDS',
            useFactory: (brandsFactory: CoffeeBrandsFactory) => 
            brandsFactory.create(), 
            inject: [CoffeeBrandsFactory],
        }
        //{
            // provide: ConfigService,
            // useClass:
                // process.env.NODE_ENV === 'development'
                // ? DevelopmentConfigService
                // : ProductionConfigService,
        //},

        // Asynchronous "useFactory" (async provider example)
        //{
            //provide: 'COFFEE_BRANDS',
            // Note "async" here, and Promise/Async event inside the Factory function 
            // Could be a database connection / API call / etc
            // In our case we're just "mocking" this type of event with a Promise
            //useFactory: async (connection: Connection): Promise<string[]> => {
            // const coffeeBrands = await connection.query('SELECT * ...');
            //const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
            //return coffeeBrands;
            //},
            //inject: [Connection],
        //},
    ],
    exports: [CoffeesService]
})
export class CoffeesModule { }
