// 실습문제 1) 다음 조건을 만족하는 Class를 정의하시오
// Person class는 name,age,address,introduction속성을 가지고 있습니다.
// 각 속성의 타입과 접근제한자는 다음과 같습니다.
// name은 문자열이며 어디서든 접근 가능합니다.
// age는 숫자이며 클래스 내에서만 접근 가능합니다.
// address는 주소이며 클래스 내에서만 접근가능하며, 객체 생성시에만 대입이 가능하고 수정이 불가능한 속성입니다.
// introduction은 함수이며 어디서든 접근 가능합니다.
// introduction은 클래스의 name,address,age속성에 저장된 내용을 출력하며 매개변수와 반환값은 없는 메서드입니다.

class Person {
    constructor(public name:string, private age:number, readonly address:string) {}
    introduction() {
        console.log(`안녕 난 ${this.name}이라고해. ${this.address}에 살고 나이는 ${this.age}야.`);
    }
}
const mkm:Person = new Person('mkm',1234,'서울'); 
mkm.introduction(); // 안녕 난 mkm이라고해.서울에 살고 나이는 1234야

// 실습문제 2) 다음 조건을 만족하는 class들을 정의하시오
// Pet는 다음 속성을 가지며 추상 클래스입니다.
// kind  - 문자열속성이며 필수속성입니다.
// name - 문자열속성이며 필수속성입니다.
// info() :void - 추상메서드입니다.
// Hamster는 Pet클래스를 상속받으며 다음 속성을 가지고 있습니다.
// food  - 문자열속성이며 선택속성입니다.
// info(): void
// kind,name,food에 저장된 값을 출력하는 메서드
// 출력형식은 아래 문제를 참고

abstract class Pet {
    constructor(kind:string, name:string){}
    abstract info():void;
}
class Hamster extends Pet {
    constructor(private kind:string, private name:string, private food?:string) {
        super(kind, name);
    }
    info() {
        console.log(`이 햄스터는 ${this.kind}종이며, 이름은 ${this.name}입니다.`);
        this.food ? console.log(`주식은 ${this.food}를 먹습니다.`) : 0;
    }
}
const hamzzi:Hamster = new Hamster('페디그리 햄스터', '햄찌', '해바라기씨');
hamzzi.info();
//이 햄스터는 페디그리 햄스터종이며, 이름은 햄찌입니다.
//주식은 해바라기씨를 먹습니다.

const podong:Hamster = new Hamster('골든 햄스터', '포동');
podong.info();
//이 햄스터는 골든 햄스터종이며, 이름은 포동입니다.


// 실습문제 3)  다음 함수를 완성하시오
// 매개변수의 item에 전달되는 값은  반드시 length 속성이 존재해야 합니다.
// 매개변수가 전달되지 않을 경우 기본타입은 {length: 0}으로 설정합니다.
// item이 null혹은 undefined인 경우 value에는 기본타입과 동일한 값을 저장합니다. 
// item이 null혹은 undefined가 아닌 경우 value에는 item값이 그대로 저장됩니다.
// extends {length:number}
function print<T extends {length:number} = {length: 0}>(item?: T): void {
    const value:T = item ?? {length: 0} as T;
    console.log(value.length);
}
print("hello"); // 5
print([1, 2, 3]); // 3
print({length : 100}); // 100
print(); // 0
// print(123); // 컴파일에러발생.


// 실습문제 4)  다음 조건을 만족하는 타입을 정의하시오
// ProductUpdateInput은 수정할 상품정보를 검사하는 타입입니다.
// cateogory는 업데이트 대상이 아니므로 제외하여 전달합니다.
// id, name,price는 반드시 값이 입력되어야 합니다.
// description, stock은 입력하지 않아도 상관없습니다.

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    category: string;
}

type ProductUpdateInput = {
    id: number,
    name: string,
    price: number,
    description?: string,
    stock?: 5
};
const product1:ProductUpdateInput = {id:1,name:'galaxy1',price:500000};
const product2:ProductUpdateInput = 
{id:2,name:'galaxy2',price:1000000, description: '멋진상품입니다.',stock:5};

//컴파일 에러 발생
// const product3:ProductUpdateInput = 
// {id:3,name:'galaxy3',price:1500000,cateogry:'핸드폰'};


// 실습문제 5) 다음 조건을 만족하는 타입을 정의하시오
// 회원가입 폼을 만들기 위해 입력필드와, 각 필드에 대한 에러메세지를 다룰 타입을 설계하려고합니다.
// 에러메세지를 검사할 입력필드들은 다음과 같습니다
// "email", "password", "nickname", "phone"
// 각 입력필드들을 저장하는 FormField타입을 정의하세요.
// FormField에 대한 에러메세지를 저장하는 객체타입 FormErrorMap을 정의하세요.

type FormField = {
    email:string,
    password:string,
    nickname:string,
    phone:string
};
type FormErrorMap = FormField;
const errorMessages: FormErrorMap = {
  email: "이메일을 입력해주세요",
  password: "비밀번호는 8자 이상이어야 합니다",
  nickname: "닉네임을 입력해주세요",
  phone: "전화번호를 입력해주세요",
//   hobby : "취미를 입력해주세요" hobby추가시 컴파일 에러
};
console.log(errorMessages);


// 실습문제 6) 다음 조건을 만족하는  수를 작성하시오
// logAndFetchPost 함수는 fetchPost 함수의 시그니쳐를 활용하여 동일한 타입구조를 갖는 새로운 함수를 안전하게 정의하려고 합니다.
// logAndFetchPost 함수는
// fetchPost와 동일한 인자를 받아야 합니다.
// 내부에서 fetchPost를 호출한 뒤, 결과를 콘솔에 출력하고 반환합니다.
// 콘솔출력문은 주석을 통해 확인하세요.

type PostData = {
    id: number;
    title: string;
    content: string;
    comments: string[];
};
function fetchPost({ id, title, content, comments }: PostData) {
    return { id, title, content, comments };
}

type PostResponse = typeof fetchPost;
type PostParams = PostData;
function logAndFetchPost({...args}:PostParams) {
    console.log(args.id, args.title, args.content, args.comments);
}

const post = {
    id: 1,
    title: "위고비투약 5일차",
    content: "1키로감량",
    comments: ["위고비얼만가요", "75키로 가자~"]
};
logAndFetchPost(post);
// 1 위고비투약 5일차 1키로감량 [ '위고비얼만가요', '75키로 가자~' ]




export default Person;