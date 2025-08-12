/**
 * 1. 객체 타입 별칭
 */
type Person = {name:string, age:number, gender?:string};
const person1:Person = {name:'hjy', age:18};
const person2:Person = {name:'hjy', age:18};

/**
 * 2. interface
 * - 객체의 구조를 정의하는 또다른 방법.
 * - 인터페이스와 타입 별칭의 동작 방식은 유사하나 각기 존재하는 기능이 다름.
 */
interface Animal {
    name: string,
    kind: string,
    birth?: Date
}

type AnimalAlias = {
    name: string,
    kind: string,
    birth?: Date
}

const cat = {name:'coco', kind:'cat', birth: new Date()};
const animal1:Animal = cat;
const animal2:AnimalAlias = cat; // 동일하게 작동

/**
 * 3. interface와 type aliases 의 차이점
 * - 두 문법의 최종적인 동작방식은 비슷하나, "확장성"에서 차이점이 있다.
 * - 확장성: 객체의 구조를 변경하는 방법.
 */
// 1) interface A extends B
// - A 인터페이스에 B 인터페이스의 속성을 확장
interface Cat extends Animal {
    food:string
}

const cat2:Cat = {food:'츄르', name:'coco', kind:'cat'};
console.log(cat2);

// 2) interface의 선언형 merging
interface Bird {
    name:string
}
interface Bird {
    wing: number
}

const bird:Bird = {wing:4, name:'앵무'};
console.log(bird);

// 선언 병합시 주의점
// - 기존 인터페이스가 가지고 있는 속성과 중복된 속성을 사용하는 경우 반드시 타입을 일치시켜줘야 한다.
interface Bird {
    name: string,
    // wing: boolean; 기존 속성의 타입은 변경 불가.
}

// 3) object intersection / union
// - 집합연산자를 활용한 병합.
// a. or: |
type Ingredient = {name:string};
type Taste = {flavor:string};
type Food = Ingredient | Taste;

// a | b
const pizza:Food = {name:'파파존스', flavor:'짠맛'};
const burger:Food = {name:'맥도날드'};
const flavor:Food = {flavor:'짠맛'};

// b. and: &
type Food2 = Ingredient & Taste;

// a & b
const pizza2:Food2 = {name:'파파존스', flavor:'짠맛'};
// const burger2:Food2 = {name:'맥도날드'};
// const flavor2:Food2 = {flavor:'짠맛'};

// type Food3 = string & number;

/**
 * 4. 결론
 * - 대부분의 상황에서 어떤 타입을 쓰든 큰 차이점은 없다.
 * - 단, 타입 작성 목적 및 내부 구조의 구현방식에 따라 적합한 설계방식이 나뉘게 된다.
 * 
 * 1) interface가 적합한 경우
 * - 클래스와 함께 사용시, 구조 확장과 유지보수가 필요한 경우.
 * - 디버깅시 타입표시가 필요한 경우.
 * - type 별칭을 쓰든 interface를 쓰든 상관없는 경우.
 * 
 * 2) type 별칭이 적합한 경우
 * - 유니언, 교차 타입 등 타입정의가 필요한 경우.
 * - 튜플, 기본타입, 함수타입에 별칭을 정의하고자 하는 경우.
 * - 조건부타입 및 제네릭으로 지정하고 싶은 경우.
 */
type SuccessResponse = {
    status: boolean,
    data: any
};
type FailResponse = {
    status: boolean,
    errorMessage: string
};
type Response = SuccessResponse | FailResponse;

type Bool = boolean;
type Str = string;

/**
 * 5. 인덱스 시그니쳐
 * - 객체의 속성명에 대하여 명확히 인지하지 못하는 경우 사용하는 문법.
 * - 객체의 속성명과 그 타입을 일반화 하여 표현한다.
 */

type User = {
    name: string,
    age: number,
    interest: string[]
};
type UserList = {
    [id:string]:User
};
const responseData:UserList = {
    "user01": {
        name: 'kh 호랑이',
        age: 50,
        interest: ['낮잠']
    },
    "user02": {
        name: 'kh 수달',
        age: 5,
        interest: ['잠수']
    },
    // "admin": {
    //     authority: "Admin" // 안됨
    // }
};
// 인덱스 시그니쳐 사용시 주의점
// - 속성에 여러 값들이 들어가는 경우, 인덱스 시그니쳐는 그 모든값들에 대해 표현할 수 있어야 한다.
const responseData2:ClassInfo = {
    name : 'kh academy' ,
    classRoom : 'C CLASS',
    teacher : 'mkm',
    student1 : 'jsy',
    student2 : 'jsy',
    student3 : 'kkk',
    student4 : 'tes',
    studentCount : 30
};
type ClassInfo = {
    name: string,
    classRoom: string,
    teacher: string,
    [student:string]:string|number,
    studentCount: number
};

/**
 * 6. 타입 호환성
 * - 타입 스크립트에서 두 타입이 서로 대입 가능한지를 판단하는 개념.
 * - 타입검사 메커니즘상 호환되지 않는 경우 컴파일 에러를 발생시킨다.
 * - 타입 스크립트는 호환성 여부를 체크할 때 "구조적 타이핑"에 기반하여 호환 가능 여부를 판단한다.
 * - 구조란 객체의 "속성명"과 그 "타입"을 의미.
 * - 구조적 타이핑의 메커니즘으로 인해 객체의 모든 속성이 완전히 일치하지 않더라도 타입 호환이 가능하다.
 */
type Teacher = {
    name:string,
    age:number
};
type Student = {
    name:string,
    age:number
};
const hjy:Student = {name:"hjy", age:37};
const hjy2:Teacher = hjy; // 두 변수의 타입은 달라도, 구조가 똑같기 때문에 호환.
const sim = {name: 'sim', age: 4, location: 'Seoul'};
const eunsung:Student = sim;
// location 속성은 Student 에 없지만, 나머지 구조가 일치하기 때문에 호환된다. 리터럴은 불가능, 변수는 가능.
// 단, 객체 리터럴을 대입하는 경우 "잉여 속성 검사"가 수행되면서 컴파일 에러 발생.





export default Person;