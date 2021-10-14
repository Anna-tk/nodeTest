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
console.log(nameA);

//type

type Point = {
    x: number;
    y: number;
}
type p = keyof Point; // union типа x, y
function MyF() {
    return {a : 1}
}
type K = ReturnType<typeof MyF>

const MyArray = [{
    name: 'Ann',
    age: 25
}]
type Person = typeof MyArray[number];
type Age = typeof MyArray[number]['age'];

type MessageOf<T> = T extends {message : unknown} ? T['message'] : never;
interface Email {
    message: string;
}
interface Cat {
    test: number;
}

type EmailMessageContents = MessageOf<Email>
type CatMessageContents = MessageOf<Cat>

// неограниченное кол-во ключей и значений
interface Test {
    [key: string]: number;
}
// мапить один тип на другой
type OptionFlags<Type> ={
    [Property in keyof Type]: boolean;
}

// литеральные типы
type world = 'world'
type Greeting = `hello ${world}`