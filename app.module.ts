import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AuthModule} from "./src/auth/auth.module";
import {TopPageModule} from "./src/top-page/top-page.module";
import {ProductModule} from "./src/product/product.module";
import {ReviewModule} from "./src/review/review.module";

@Module({
    imports: [AuthModule, TopPageModule, ProductModule, ReviewModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule{ }