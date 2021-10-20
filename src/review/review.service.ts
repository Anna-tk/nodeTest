import {Inject, Injectable} from '@nestjs/common';
import {ReviewModel} from "./review.model";
import {ModelType, DocumentType} from "@typegoose/typegoose/lib/types";
import {CreateReviewDto} from "./dto/create-review.dto";

@Injectable()
export class ReviewService {
    constructor(@Inject(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>){}

    // @ts-ignore
    async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
        return this.reviewModel.create(dto);
    }
}


