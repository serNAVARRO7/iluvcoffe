import { Controller, Get, Param, Post, Body, Res, Patch, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@UsePipes(ValidationPipe) // Controller-scoped
@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService){}

    @Public()
    @Get('test')
    test() {
      return 'Coffee time';
    }

    @UsePipes(ValidationPipe) // Method-scoped
    @Public()
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
      return this.coffeesService.findAll(paginationQuery);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.coffeesService.findOne(id);
    }
  
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
      console.log(createCoffeeDto instanceof CreateCoffeeDto)
      return this.coffeesService.create(createCoffeeDto);
    }
  
    @Patch(':id') // Param-scoped pipe, is available to Pipes only.
    update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
      return this.coffeesService.update(id, updateCoffeeDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.coffeesService.remove(id);
    }
}
