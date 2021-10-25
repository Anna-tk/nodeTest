/// <reference types="mongoose" />
import { AuthDto } from "./dto/auth.dto";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { UserModel } from "./user.model";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: ModelType<UserModel>, jwtService: JwtService);
    createUser(dto: AuthDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findUser(email: string): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>>;
    login(email: string): Promise<{
        access_token: string;
    }>;
}
