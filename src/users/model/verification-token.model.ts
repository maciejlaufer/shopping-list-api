import { ObjectId } from 'mongodb';

export class VerificationToken {
  _id: ObjectId;
  _userId: ObjectId;
  token: string;
  createdAt: Date;
}
