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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_module_1 = require("../app.module");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = require("mongoose");
const review_constants_1 = require("../src/review/review.constants");
const productId = new mongoose_1.Types.ObjectId().toHexString();
const loginDto = {
    login: 'aaa21@mail.ru',
    password: "1111"
};
const testDTo = {
    name: 'Тест',
    title: 'Заголовок',
    description: 'Описание тестов',
    rating: 5,
    productId
};
describe('AppController (e2e): ', () => {
    let app;
    let createdId;
    let token;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const moduleFixture = yield testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        yield app.init();
        const { body } = yield (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto);
        token = body.access_token;
    }));
    it('/review/create (POST)  - success', (done) => {
        (0, supertest_1.default)(app.getHttpServer())
            .post('/review/create')
            .send(testDTo)
            .expect(201)
            .then(({ body }) => {
            createdId = body._id;
            expect(createdId).toBeDefined();
            done();
        });
    });
    it('/review/create (POST)  - fail', (done) => {
        (0, supertest_1.default)(app.getHttpServer())
            .post('/review/create')
            .send(Object.assign(Object.assign({}, testDTo), { rating: 0 }))
            .expect(400)
            .then(({ body }) => {
            done();
        });
    });
    it('/review/byProduct/:productId (GET) - success', (done) => {
        (0, supertest_1.default)(app.getHttpServer())
            .get('/review/byProduct/' + productId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .then(({ body }) => {
            expect(body.length).toBe(1);
            done();
        });
    });
    it('/review/byProduct/:productId (GET) - fail', (done) => {
        (0, supertest_1.default)(app.getHttpServer())
            .get('/review/byProduct/' + new mongoose_1.Types.ObjectId().toHexString())
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .then(({ body }) => {
            expect(body.length).toBe(0);
            done();
        });
    });
    it('/review/:id (DELETE)  - success', () => {
        return (0, supertest_1.default)(app.getHttpServer())
            .delete('/review/' + createdId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });
    it('/review/:id (DELETE)  - fail', () => {
        return (0, supertest_1.default)(app.getHttpServer())
            .delete('/review/' + new mongoose_1.Types.ObjectId().toHexString())
            .set('Authorization', 'Bearer ' + token)
            .expect(404, {
            statusCode: 404,
            message: review_constants_1.REVIEW_NOT_FOUNT
        });
    });
    afterAll(() => {
        (0, mongoose_1.disconnect)();
    });
});
//# sourceMappingURL=review.e2e-spec.js.map