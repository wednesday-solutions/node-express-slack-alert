import jwt from 'jsonwebtoken';

export class Token {
  static secret = process.env.ACCESS_TOKEN_SECRET;
  expiresIn = '1d';

  constructor({ user, overrideExpiration }) {
    if (overrideExpiration) {
      this.expiresIn = overrideExpiration;
    }
    if (!user) {
      return;
    }
    this.user = user;
  }

  get() {
    const token = jwt.sign(
      {
        userId: this.user.id
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: this.expiresIn
      }
    );
    return token;
  }
}
