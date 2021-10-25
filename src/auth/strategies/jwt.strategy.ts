import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {UserModel} from "../user.model";

//JSON Web Token открытый стандарт для создания токенов доступа, основанный на формате JSON.
// Как правило, используется для передачи данных для аутентификации в клиент-серверных приложениях.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET')
        });
    }
    async validate({email}: Pick<UserModel, 'email'>) {
        return email;
    }
}