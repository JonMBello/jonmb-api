import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  username: string;

  @Prop({
    unique: true,
    index: true,
  })
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  roles: string[];

  @Prop()
  isChangePasswordRequired: boolean;

  @Prop()
  isConnected: boolean;

  @Prop()
  updatedDate: string;

  @Prop()
  lastLogin: string;

  @Prop()
  status: string;
}

export const UserSchema = SchemaFactory.createForClass( User );
