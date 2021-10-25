"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("./user.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const bcryptjs_1 = require("bcryptjs");
const auth_constants_1 = require("./auth.constants");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcryptjs_1.genSalt)(10);
            const newUser = new this.userModel({
                email: dto.login,
                passwordHash: yield (0, bcryptjs_1.hash)(dto.password, salt)
            });
            return newUser.save();
        });
    }
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne({ email }).exec();
        });
    }
    validateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUser(email);
            if (!user) {
                throw new common_1.UnauthorizedException(auth_constants_1.USER_NOT_FOUND_ERROR);
            }
            const isCorrectPassword = yield (0, bcryptjs_1.compare)(password, user.passwordHash);
            if (!isCorrectPassword) {
                throw new common_1.UnauthorizedException(auth_constants_1.WRONG_PASSWORD_ERROR);
            }
            return { email: user.email };
        });
    }
    login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { email };
            return {
                access_token: yield this.jwtService.signAsync(payload)
            };
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map