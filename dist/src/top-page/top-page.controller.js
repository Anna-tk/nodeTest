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
exports.TopPageController = void 0;
const common_1 = require("@nestjs/common");
const top_page_service_1 = require("./top-page.service");
const create_top_page_dto_1 = require("./dto/create-top-page.dto");
const id_validation_pipe_1 = require("../pipes/id-validation.pipe");
const top_page_constants_1 = require("./top-page.constants");
const find_top_page_dto_1 = require("./dto/find-top-page.dto");
let TopPageController = class TopPageController {
    constructor(topPageService) {
        this.topPageService = topPageService;
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topPageService.create(dto);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.topPageService.findById(id);
            if (!page) {
                throw new common_1.NotFoundException(top_page_constants_1.NOT_FOUND_TOP_PAGE_ERROR);
            }
            return page;
        });
    }
    getByAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.topPageService.findByAlias(alias);
            if (!page) {
                throw new common_1.NotFoundException(top_page_constants_1.NOT_FOUND_TOP_PAGE_ERROR);
            }
            return page;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPage = yield this.topPageService.deleteById(id);
            if (!deletedPage) {
                throw new common_1.NotFoundException(top_page_constants_1.NOT_FOUND_TOP_PAGE_ERROR);
            }
        });
    }
    patch(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPage = yield this.topPageService.updateById(id, dto);
            if (!updatedPage) {
                throw new common_1.NotFoundException(top_page_constants_1.NOT_FOUND_TOP_PAGE_ERROR);
            }
            return updatedPage;
        });
    }
    find(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topPageService.findByCategory(dto.firstCategory);
        });
    }
    textSearch(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.topPageService.findByText(text);
        });
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_top_page_dto_1.CreateTopPageDto]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('byAlias/:alias'),
    __param(0, (0, common_1.Param)('alias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "getByAlias", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_top_page_dto_1.CreateTopPageDto]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "patch", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_top_page_dto_1.FindTopPageDto]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "find", null);
__decorate([
    (0, common_1.Get)('textSearch/:text'),
    __param(0, (0, common_1.Param)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "textSearch", null);
TopPageController = __decorate([
    (0, common_1.Controller)('top-page'),
    __metadata("design:paramtypes", [top_page_service_1.TopPageService])
], TopPageController);
exports.TopPageController = TopPageController;
//# sourceMappingURL=top-page.controller.js.map