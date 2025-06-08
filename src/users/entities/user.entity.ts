import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({ required: true })
    status: string;
    
    @Prop({
        unique: true,
        index: true
    })
    username: string;
    
    @Prop({
        unique: true,
        index: true
    })
    password: string;

    @Prop()
    fullName: string;

    @Prop()
    roles: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    companyId: string;

    @Prop()
    isChangePasswordRequired: boolean;

    @Prop()
    isConnected: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    cedi: string;

    @Prop()
    updatedDate: string;

    @Prop()
    lastLogin: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
