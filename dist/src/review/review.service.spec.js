"use strict";
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
const testing_1 = require("@nestjs/testing");
const review_service_1 = require("./review.service");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mongoose_1 = require("mongoose");
describe('ReviewService', () => {
    let service;
    const exec = { exec: jest.fn() };
    const reviewRepositoryFactory = () => ({
        find: () => exec
    });
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [
                review_service_1.ReviewService,
                { useFactory: reviewRepositoryFactory, provide: (0, nestjs_typegoose_1.getModelToken)('ReviewModel') }
            ],
        }).compile();
        service = module.get(review_service_1.ReviewService);
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('findByProductId working', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.Types.ObjectId().toHexString();
        reviewRepositoryFactory().find().exec.mockReturnValueOnce([{ productId: id }]);
        const res = yield service.findByProductId(id);
        expect(res[0].productId).toBe(id);
    }));
});
//# sourceMappingURL=review.service.spec.js.map