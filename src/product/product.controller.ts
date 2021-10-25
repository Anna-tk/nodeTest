import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {ProductModel} from "./product.model";
import {FindProductDto} from "./dto/find-product.dto";
import {CreateProductDto} from "./dto/create-product.dto";
import {ProductService} from "./product.service";
import {PRODUCT_NOT_FOUND_ERROR} from "./product.constants";
import {IdValidationPipe} from "../pipes/id-validation.pipe";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto)
    }

    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const product = await this.productService.findById(id);
        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
        }
        return product;
    }

    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deleteProduct = await this.productService.deleteById(id);
        if (!deleteProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
        }
    }

    @Patch(':id') // обновление, добавление поля
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
        const updateProduct = await this.productService.updateById(id, dto);
        if (!updateProduct) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
        }
        return updateProduct;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto){
        return this.productService.findWithReviews(dto);
    }
}
