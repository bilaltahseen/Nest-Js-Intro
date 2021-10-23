import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  private products:Product[] = []
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}
  
  async create(createProductDto: CreateProductDto):Promise<Product> {
    const newProduct = new this.productModel(createProductDto)
    return newProduct.save()
  }

  async findAll():Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string):Promise<Product> {
    const singleProduct = await this.productModel.findById(id).exec()
    if(!singleProduct){
      throw new NotFoundException
    }
    return singleProduct
  }

  async update(id: string, updateProductDto: UpdateProductDto):Promise<String> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id,updateProductDto).exec()
    if(!updatedProduct){
      throw new NotFoundException
    }
    return updatedProduct._id
  }

  async remove(id: string):Promise<{id:String}> {
    const removedProduct =  await this.productModel.remove({_id:id})
    if(removedProduct.deletedCount<1){
      throw new NotFoundException
    }
    return {id}
  }
}
