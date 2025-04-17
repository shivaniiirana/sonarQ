import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { registerDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
constructor(@InjectModel(User.name)private readonly userModel: Model<User>){}

async register(registerDto: registerDto){
    const hashedPassword= await bcrypt.hash(registerDto.password, 10);
    const user= new this.userModel({
        ...registerDto, password: hashedPassword,
    })
    return user.save();
}

async findAll(page=1, limit=10): Promise<User[]>{
const skip= (page-1)*limit;
return this.userModel.find().skip(skip).limit(limit);
}

async findByEmail(email:string): Promise<User| null>{
return this.userModel.findOne({email});
}

async validateUser(email:string, password:string): Promise<boolean>{
    const user= await this.findByEmail(email);
    if(!user) return false;
    return bcrypt.compare(password, user.password);
}

}
