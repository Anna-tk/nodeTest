import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
export declare enum TopLevelCategory {
    Courses = 0,
    Services = 1,
    Books = 2,
    Products = 3
}
export declare class HhData {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
}
export declare class TopPageAdvantage {
    title: string;
    description: string;
}
export interface TopPageModel extends Base {
}
export declare class TopPageModel extends TimeStamps {
    firstCategory: TopLevelCategory;
    secondCategory: string;
    alias: string;
    title: string;
    category: string;
    hh?: HhData;
    advantages: TopPageAdvantage[];
    seoText: string;
    tagsTitle: string;
    tags: string[];
}
