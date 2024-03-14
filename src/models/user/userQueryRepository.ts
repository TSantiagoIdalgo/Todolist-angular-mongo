import UserModel from '../../database/collections/user/userSchema';
import SessionModel from '../../database/collections/user/sessionSchema';

export default class UserQueryRepository {
  getAll () {
    return UserModel.find().lean().exec();
  }

  getById (userId: string) {
    return UserModel.findOne({ email: userId });
  }

  validateCSRF (csrf: string) {
    return SessionModel.findOne({ token: csrf });
  }
}