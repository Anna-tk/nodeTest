// interface IInfoType {
//     desc: string;
//     isActive: boolean;
// }
//
// interface ITagsType {
//     name: string;
//     value: number;
// }
//
// interface IMain {
//     userid: number;
//     id: number;
//     title: string;
//     info: IInfoType;
//     tags: ITagsType[];
// }

//enum

enum Test1 {
    A
}

const test = Test1.A;
const nameA = Test1[test];
console.log(nameA)
