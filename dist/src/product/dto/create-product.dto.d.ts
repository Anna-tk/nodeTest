declare class ProductCharacteristicDto {
    name: string;
    value: string;
}
export declare class CreateProductDto {
    image: string;
    title: string;
    price: number;
    oldPrice?: number;
    credit: number;
    description: string;
    advantages: string;
    dasAdvantages: string;
    categories: string[];
    tags: string[];
    characteristics: ProductCharacteristicDto[];
}
export {};
