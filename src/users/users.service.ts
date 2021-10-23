import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entites/user.entity';

@Injectable()
export class UsersService {
    private readonly users:User[]=[{id:'1',username:'Bilal',password:'sosecure'}]
    constructor(@InjectModel('Users') private userModel: Model<User>) {}

    async findOne(username:string):Promise<User|undefined>{
        return this.users.find((user)=>user.username===username)
    }

    async create(createUserDto:CreateUserDto):Promise<User>{
     const newUser = new this.userModel(createUserDto)
     return newUser.save()
    }

}
