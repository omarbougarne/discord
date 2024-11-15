import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';


@Injectable()
export class UserService {
  

    constructor (
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}


    async getAllFriends() : Promise<User[]> {
        return await this.userModel
        .find();
    }
    async GetAllUsers(): Promise<UserDocument[]> {
        return await this.userModel.find().exec();
      }
    

}
