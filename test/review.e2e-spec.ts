import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../app.module";
import request from 'supertest';
import {CreateReviewDto} from "../src/review/dto/create-review.dto";
import {Types, disconnect} from "mongoose";
import {REVIEW_NOT_FOUNT} from "../src/review/review.constants";

const productId = new Types.ObjectId().toHexString();

const testDTo: CreateReviewDto = {
    name: 'Тест',
    title: 'Заголовок',
    description: 'Описание тестов',
    rating: 5,
    productId

}
describe('AppController (e2e): ', () => {
    let app: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/review/create (POST)  - success', (done) => {
        request(app.getHttpServer())
            .post('/review/create')
            .send(testDTo)
            .expect(201)
            .then(({body}: request.Response) => {
                createdId = body._id;
                expect(createdId).toBeDefined();
                done();
            })
    });

    it('/review/create (POST)  - fail', (done) => {
        request(app.getHttpServer())
            .post('/review/create')
            .send({...testDTo, rating: 0})
            .expect(400)
            .then(({body}: request.Response) => {
                console.log(body);
                    done();
                })
    });

    it('/review/byProduct/:productId (GET) - success', (done) => {
            request(app.getHttpServer())
            .get('/review/byProduct/' + productId)
            .expect(200)
            .then(({body}: request.Response) => {
                expect(body.length).toBe(1);
                done();
            })
    });

    //пытаемся получить, но продукта НЕТ, неуспешный поиск продукта
    it('/review/byProduct/:productId (GET) - fail', (done) => {
        request(app.getHttpServer())
            .get('/review/byProduct/' + new Types.ObjectId().toHexString())
            .expect(200)
            .then(({body}: request.Response) => {
                expect(body.length).toBe(0);
                done();
            })
    });

    it('/review/:id (DELETE)  - success', () => {
       return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .expect(200)
    });

    //удаление несуществующего ID
    it('/review/:id (DELETE)  - fail', () => {
           return request(app.getHttpServer())
                .delete('/review/' + new Types.ObjectId().toHexString())
                .expect(404, {
                    statusCode: 404,
                    message: REVIEW_NOT_FOUNT
                });
        });

    afterAll(() => {
       disconnect();
    });

})