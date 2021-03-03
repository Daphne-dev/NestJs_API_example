import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() productData: CreateProductDto): Promise<Products> {
    return this.productsService.create(productData);
  }

  @Get()
  findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') productId: number): Promise<Products> {
    return this.productsService.findOne(productId);
  }

  @Delete(':id')
  remove(@Param('id') productId: number): Promise<void> {
    return this.productsService.deleteOne(productId);
  }

  @Put(':id')
  updateOne(
    @Param('id') productId: number,
    @Body() productData: UpdateProductDto,
  ): Promise<void> {
    return this.productsService.updateOne(productId, productData);
  }
}
