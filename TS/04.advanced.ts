/**
 * 1. Class
 * - javascript의 class 문법을 보다 확장하여, 좀 더 객체지향적인 프로그래밍이 가능하도록 만들었다.
 * - 접근제한자, 추상클래스, 인터페이스 구현 등의 기능을 제공.
 */

abstract class Animal {
    abstract bark():void;
}

class Tiger extends Animal {
    // 필드
    public name:string;
    protected age:number;
    private location:string;
    
    // 생성자
    constructor(name:string, age:number, location:string) {
        super();
        this.name = name;
        this.age = age;
        this.location = location;
    }

    bark():void {
        console.log("어흥!");
    }
}

const khTiger = new Tiger('hjy', 25, '서울');
khTiger.bark();

// 2. Constructor Parameter Properties
// - class 생성시의 반복되는 코드를 줄일 수 있는 단축문법
class Product {
    // 필드 선언 생략, 초기화 코드 생략
    constructor(
        public id:number,
        protected name:string,
        private price:number,
        readonly brand:string // readonly: 수정 불가.
    ) {

    }

    printInfo() {
        console.log(this.id);
        console.log(this.name);
        console.log(this.price);
        console.log(this.brand);
    }
}

new Product(1, '컴퓨터', 500, '엔비디아').printInfo();

/**
 * 3. Generics
 * - Type을 변수처럼 외부에서 주입받아 사용하는 기능으로 타입변수라고 불린다.
 * - Type에 유연성을 제공하면서 확장성과 타입 안정성을 추가할 수 있다.
 * 
 * * Generics의 주요 기능
 * - extends 키워드를 통한 상한 경계 설정(super는 지원하지 않음).
 * - Default Type
 */

// 1) 제네릭과 타입추론
function returnGeneric<T>(value: T):T {
    return value;
}
// 매개변수로 전달된 데이터를 통해 타입추론
const result = returnGeneric("hello");
console.log(result);

/**
 * 2) 제네릭의 extends
 * - 제네릭에 들어갈 타입의 상한타입을 설정.
 * - super(하한경계)는 지원하지 않는다.
 */
// Animal을 상속받았거나 하위 타입만 받는 함수를 작성.
function func<T extends Animal>(animal:T) {
    animal.bark();
}

// TypeScript는 구조 중심의 타입 검사 시스템을 사용하기 때문에 다음과 같이 작성 가능.
function func2<T extends {bark():void}>(animal:T) {
    animal.bark();
}
func2(khTiger);

// 3) 제네릭의 기본타입
// - 제네릭이 사용되지 않는 경우 타입변수에 대입될 기본값 지정.
function defValue<T = string>(value?:T):T[] {
    return value ? [value] : [];
}
const arr1 = defValue("hi");
const arr2 = defValue(45);
const arr3 = defValue();

/**
 * 기본타입과 extends의 혼합사용
 */
type Options = {theme:string};
function config<T extends Options = {theme:"dark"}>(option?:T):T {
    // return option ? option : {theme:"dark"} as T;
    // return option || {theme:"dark"} as T; // 이 방법은 지양할 것.
    // falsy? 값이 비어있으면 false

    // 널병합연산자 ??
    // - a ?? b -> a가 null 또는 undefined인 경우 b 반환, 아닌경우 a
    return option ?? {theme:"dark"} as T;
}

// 4) keyOf 연산자와 Generic
// - 객체타입의 속성 명들을 UnionType으로 추출하는 연산자.
type Person2 = {
    name: string,
    age: number,
    location: string
};
type KeyOfPerson = keyof Person2; // "name" | "age" | "location" 리터럴들이 병합된 상태.

function getValue<K extends KeyOfPerson>(person:Person2, key:K):Person2[K] {
    return person[key];
}
const person:Person2 = {name:'hjy', age:37, location:'Seoul'};
const value = getValue(person, "age");
console.log(value);

/**
 * 4. Utility Type
 * - 기존 객체타입들을 변형 및 조작할 수 있도록 도와주는 유틸리티 타입들.
 * 
 * 1) Partial<T>
 * - T의 모든 속성을 optional 속성으로 변경해주는 유틸리티 타입.
 * - 모든 속성을 필수, 읽기 전용으로 만들어주는 Required<T>, Readonly<T>도 존재한다.
 */
interface User {
    id: number;
    name: string;
    email: string;
}
// const user:User = {id:1, name:'hjy'}; // 수정할 데이터 중 email이 없는 경우 에러.
const PartialUser:Partial<User> = {id:1, name:'hjy'};

/**
 * 2) Pick<T, K>
 * - 객체의 속성 중 일부만 선택하여 새로운 타입을 만들 때 사용한다.
 */
type SimpleUser = Pick<User, "name" | "email">;

// 3) Omit<T, K>
// - 객체타입에서 특정 속성을 제외하고 나머지만 남긴 새 타입을 만들 때 사용한다.
// id를 제외한 사용자 정보
type NewUser = Omit<User, "id">;
const userData:NewUser = {name: 'hjy', email:'hjy@email.com'};
/**
 * Utility Type 조합
 * 1. User에서 id를 제외한 나머지 속성을 선택 후 전체를 옵셔널로 만들기.
 * 2. User의 속성 중 name 속성을 필수로 만들기.
 * 3. 1, 2번을 병합.
 * 
 * 같은 속성이 겹치는 경우 더 구체적인 속성으로 우선시되어 병합.
 */
type EditableUser = Partial<Omit<User, "id">> & Required<Pick<User, "name">>;

/**
 * 4) Record<K, T>
 * - 키 집합을 기준으로 T 타입을 지정하는 객체 타입을 만든다.
 * - 지정된 키값들로 구성된 객체를 만들고 싶을 때 사용한다.
 */
type Page = "home" | "about" | "contact";
type PageInfo = {
    title:string,
    path:string
};
const pageMap:Record<Page, PageInfo> = {
    home: {title:"홈페이지", path:"/"},
    about: {title:"어바웃", path:"/about"},
    contact: {title:"연락처", path:"/contact"}
};

/**
 * 5) ReturnType<T>
 * - 함수타입 T가 반환하는 결과의 타입을 그대로 가져오는 유틸리티 타입.
 */
function getUser() {
    return {id:1, name:'hjy', email:'abc'};
}
type UserData = ReturnType<typeof getUser>;
const data:UserData = {id:11, name:'Omnis', email:'hmm'};

/**
 * 6) Parameters<T>
 * - 함수타입 T의 매개변수 타입을 배열로 추출.
 * - 함수의 동일한 시그니쳐 유지를 위해 사용한다.
 */
function greet(name:string, age:number) {

}
type GreetParams = Parameters<typeof greet>; // [string, number]
const callGreet = function(...args:GreetParams) {
    greet(...args);
}
callGreet('hjy', 37);












export default Animal;