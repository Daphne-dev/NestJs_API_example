import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  create(CreateProductDto: CreateProductDto): Promise<Products> {
    const product = new Products();
    product.name = CreateProductDto.name;
    product.price = CreateProductDto.price;

    return this.productsRepository.save(product);
  }

  async findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async findOne(productId: number): Promise<Products> {
    return this.productsRepository.findOne(productId);
  }

  async deleteOne(productId: number): Promise<void> {
    const productToRemove = await this.productsRepository.findOne(productId);
    await this.productsRepository.remove(productToRemove);
  }

  async updateOne(
    productId: number,
    updataData: UpdateProductDto,
  ): Promise<void> {
    const productToUpdate = await this.productsRepository.findOne(productId);
    console.log(updataData);
    if (updataData.name) productToUpdate.name = updataData.name;
    if (updataData.price) productToUpdate.price = updataData.price;
    await this.productsRepository.save(productToUpdate);
  }
}
