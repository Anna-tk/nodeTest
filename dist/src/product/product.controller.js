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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_model_1 = require("./product.model");
const find_product_dto_1 = require("./dto/find-product.dto");
const create_product_dto_1 = require("./dto/create-product.dto");
const product_service_1 = require("./product.service");
const product_constants_1 = require("./product.constants");
const id_validation_pipe_1 = require("../pipes/id-validation.pipe");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productService.create(dto);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findById(id);
            if (!product) {
                throw new common_1.NotFoundException(product_constants_1.PRODUCT_NOT_FOUND_ERROR);
            }
            return product;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteProduct = yield this.productService.deleteById(id);
            if (!deleteProduct) {
                throw new common_1.NotFoundException(product_constants_1.PRODUCT_NOT_FOUND_ERROR);
            }
        });
    }
    patch(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateProduct = yield this.productService.updateById(id, dto);
            if (!updateProduct) {
                throw new common_1.NotFoundException(product_constants_1.PRODUCT_NOT_FOUND_ERROR);
            }
            return updateProduct;
        });
    }
    find(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productService.findWithReviews(dto);
        });
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "get", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_model_1.ProductModel]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "patch", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_product_dto_1.FindProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "find", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map