import { UsersRepositoryInterface } from "../../services/Interfaces/UsersRepositoryInterface";
import { UserModel, User } from '../../models/User';
import generator from '../../services/HashGenerator';

export type UserFilter = {
  [propertyName: string]: any;
  id?: string;
  username?: string;
}

export class UsersRepository implements UsersRepositoryInterface {
  async getUser(filter: UserFilter): Promise<any> {
    if (filter.id) {
      return UserModel.findById(filter.id).select('-__v');
    }
   return UserModel.findOne(filter).select('-__v');
  }
  async createUser(params: User) {
    const user = new UserModel(params);
    user.password = generator.generate(user.password);
    await user.save();
    return user;
  }
}
