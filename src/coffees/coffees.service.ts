import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { COFFEE_BRANDS } from './coffees.constants';


// -------------

/** 
 * Scope TRANSIENT 
  
 * Transient providers are NOT shared across consumers. 
 * Each consumer that injects a transient provider 
 * will receive a new, dedicated instance of that provider. 

  @Injectable({ scope: Scope.TRANSIENT })
  export class CoffeesService {}

 */


/**
  *Scope TRANSIENT with a Custom Provider
  {
    provide: 'COFFEE_BRANDS',
    useFactory: () => ['buddy brew', 'nescafe'],
    scope: Scope.TRANSIENT // 👈
  }
*/

// -------------

/**
 * Scope REQUEST 

 * Request scope provides a new instance of the provider 
 * exclusively for each incoming request. 
 
  @Injectable({ scope: Scope.REQUEST })
  export class CoffeesService {}

 */

 // -------------

// Scope DEFAULT - This is assumed when NO Scope is entered like so: @Injectable() */
@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  constructor(@Inject(COFFEE_BRANDS) coffeeBrands: string[]) {
    console.log(coffeeBrands);
  }

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find(item => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
