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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const product_model_1 = require("./product.model");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productModel.create(dto);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productModel.findById(id).exec();
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productModel.findByIdAndDelete(id).exec();
        });
    }
    updateById(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        });
    }
    findWithReviews(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.aggregate([
                {
                    $match: {
                        categories: dto.category
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                },
                {
                    $limit: dto.limit
                },
                {
                    $lookup: {
                        from: 'Review',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'reviews'
                    }
                },
                {
                    $addFields: {
                        reviewCount: { $size: '$reviews' },
                        reviewAvg: { $avg: '$reviews.rating' },
                    }
                }
            ]).exec();
        });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(product_model_1.ProductModel)),
    __metadata("design:paramtypes", [Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map