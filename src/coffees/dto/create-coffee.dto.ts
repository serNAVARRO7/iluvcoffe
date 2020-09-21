import { IsString } from 'class-validator';
export class CreateCoffeeDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly brand: string;

    // Validation -> each flavour is string
    @IsString({ each: true})
    readonly flavors: string[];
}
