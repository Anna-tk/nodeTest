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
const loginDto = {
    login: 'aaa21@mail.ru',
    password: "1111"
};
describe('AuthController (e2e): ', () => {
    let app;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const moduleFixture = yield testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        yield app.init();
    }));
    it('/auth/login (POST)  - success', (done) => {
        (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({ body }) => {
            expect(body.access_token).toBeDefined();
            done();
        });
    });
    it('/auth/login (POST)  - fail password', () => {
        (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/login')
            .send(Object.assign(Object.assign({}, loginDto), { password: '2' }))
            .expect(401, {
            statusCode: 401,
            message: "Пароль неверный",
            error: "Unauthorized"
        });
    });
    it('/auth/login (POST)  - fail login', () => {
        (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/login')
            .send(Object.assign(Object.assign({}, loginDto), { login: 'aaa@a.ru' }))
            .expect(401, {
            statusCode: 401,
            message: "Пользователь с таким email не найден",
            error: "Unauthorized"
        });
    });
    afterAll(() => {
        (0, mongoose_1.disconnect)();
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map