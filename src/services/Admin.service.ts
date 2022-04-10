import { Admin } from '../models/Admin';

export class AdminService {
  constructor() {}

  public login = async (name: string, pwd: string) => {
    let user = await Admin.findOne({ where: { username: name } });
    let result = user?.pwd == pwd;
    return result;
  };
}
