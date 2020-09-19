export interface IUser {
  id: string;
  name: string;
}

export class User implements IUser {
  constructor(public id = '', public name = '') {}

  static Build(user: IUser): User {
    if (!user) {
      return new User();
    }

    return new User(user.id, user.name);
  }

  toJSON(): object {
    return Object.assign(this);
  }
}
