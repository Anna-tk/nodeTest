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
exports.TopPageService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const top_page_model_1 = require("./top-page.model");
let TopPageService = class TopPageService {
    constructor(topPageModel) {
        this.topPageModel = topPageModel;
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topPageModel.create(dto);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topPageModel.findById(id).exec();
        });
    }
    findByAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topPageModel.findOne({ alias }).exec();
        });
    }
    findByCategory(firstCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topPageModel
                .aggregate()
                .match({ firstCategory })
                .group({
                _id: { secondCategory: '$secondCategory' },
                pages: { $push: { alias: '$alias', title: '$title' } }
            })
                .exec();
        });
    }
    findByText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topPageModel.find({
                $text: {
                    $search: text,
                    $caseSensitive: false
                }
            }).exec();
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topPageModel.findByIdAndRemove(id).exec();
        });
    }
    updateById(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topPageModel.findByIdAndUpdate(id, dto, { new: true });
        });
    }
};
TopPageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(top_page_model_1.TopPageModel)),
    __metadata("design:paramtypes", [Object])
], TopPageService);
exports.TopPageService = TopPageService;
//# sourceMappingURL=top-page.service.js.map