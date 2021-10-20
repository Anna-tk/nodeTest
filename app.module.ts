import {Module} from "@nestjs/common";
import {AuthModule} from "./src/auth/auth.module";
import {TopPageModule} from "./src/top-page/top-page.module";
import {ProductModule} from "./src/product/product.module";
import {ReviewModule} from "./src/review/review.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypegooseModule} from "nestjs-typegoose";
import {getMongoConfig} from "./src/auth/configs/mongo.config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig
        }),
        AuthModule,
        TopPageModule,
        ProductModule,
        ReviewModule
    ],
    // controllers: [AppController],
    // providers: [AppService],
})
export class AppModule{}