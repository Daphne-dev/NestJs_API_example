import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(CreateProductDto: CreateProductDto): Promise<Products> {
    try {
      const product = new Products();
      product.name = CreateProductDto.name;
      product.price = CreateProductDto.price;

      return await this.productsRepository.save(product);
    } catch (error) {}
  }

  async findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async findOne(productId: number): Promise<Products> {
    const product = await this.productsRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
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
    if (updataData.name) productToUpdate.name = updataData.name;
    if (updataData.price) productToUpdate.price = updataData.price;
    await this.productsRepository.save(productToUpdate);
  }
}
