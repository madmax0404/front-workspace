/**
 * 1. 타입 주석
 * - 타입스크립트에서는 변수 선언시 타입을 명시할 수 있다.
 * - 타입 주석을 통해 정적 타입 검사가 가능해지며, 잘못된 타입의 값이 들어갈 경우 컴파일 오류가 발생한다.
 */
let num:number;
num = 12345;
// num = '12345';
num = num * Number('1');

// 배열 데이터 타입주석
// type[]
let animals:string[];
animals = ['hamster', 'cat', 'dog'];

// 객체 타입주석
// {key:type}
let animal:{name:string};
animal = {name:'coco'};

/**
 * 2. 타입추론
 * - 변수에 대입하는 값을 바탕으로 자동으로 타입을 추론하는 기능.
 * - 간단한 변수 선언시에는 타입주석을 작성하지 않고 타입 추론을 이용한다.
 * - 단, 복잡한 함수의 매개변수나 반환형, api 함수와 같이 명확한 타입정의가 필요한 곳에는 반드시 작성한다.
 */
let userName = 'kh 타이거';
let age = 5;

/**
 * 3. 배열과 튜플
 * 배열의 특징
 * - 배열의 크기에 대한 제약이 존재하지 않으며, js 기준 들어가는 타입에 대한 제한도 없다.
 * - 잘못된 인덱스에 접근시 에러가 발생하지 않는다.
 */
let numArr:number[];
numArr = [1,2,3];
console.log(numArr[2], numArr[3]);
numArr = [1,2,3,4,5];

/**
 * 튜플
 * - 튜플은 배열의 특수한 형태로 "길이"와 "타입"이 고정된 배열.
 * - 일반 배열은 언제든 요소의 수가 변할 수 있지만, 튜플은 항상 고정된 구조를 갖는다.
 */
let numTuple:[number, number, number];
numTuple = [1,2,3];
console.log(numTuple[2]); // 잘못된 인덱스 접근시 에러 발생.

/**
 * 4. readonly
 * - 튜플은 배열이 가질 수 있는 값의 수와 타입을 정의한다.
 * - 단, 튜플은 javascript에는 존재하지 않는 타입으로, 컴파일 완료 후에는 배열로 변환된다.
 * - 타입스크립트의 정적 타입 체크 시스템은 실제 코드를 "실행 하기 전" 단계에서 작동하므로, 실행 환경에서 동작하는 "메서드에 대한 검사"는 수행하지 않는다.
 * - 이 경우 튜플에 대한 논리적인 오류가 발생할 수 있는데, 이를 방지할 수 있는게 readonly.
 */
numTuple.push(4);
console.log(numTuple);

// 수정불가 튜플
let readonlyTuple:readonly[number, string, boolean];
readonlyTuple = [1, 'kh', true];
// readonlyTuple.push(11); // 메서드가 없어져서 수정 불가.

// ?
let tempTuple:[number, string];
tempTuple = [1, 'hi'];
tempTuple.push('bye');
tempTuple.push(2);
console.log(tempTuple);

// 객체의 속성에 수정불가 옵션 추가하기.
let readonlyObject:{readonly name:string};
readonlyObject = {name: 'kh'};
// readonlyObject.name = 'hjy';

/**
 * 5. any Type
 * - 어떤 값이든 저장할 수 있는 타입.
 * - 타입스크립트의 정적 타입 검사를 우회하기 위해 설계되었다.
 * - JavaScript 코드와의 호환성 유지 및 마이그레이션을 돕기 위한 타입이고, 무분별하게 사용시 TypeScript의 사용 의미가 사라진다.
 */
let any:any;
any = 1;
any = 'hi';

let str:string;
let num2:number;
let undef:undefined;

str = any;
num2 = any;
undef = any;

/**
 * 6. unknown type
 * - 어떤 값이든 할당할 수 있는 타입.
 * - 단, 타입검사기능이 제대로 동작하여, any와 달리 타입안정성 유지 가능.
 */

let unknown:unknown;
unknown = 3;
unknown = 'hi';

// str = unknown;
// num2 = unknown;
// unknown 타입의 값은 어떤 타입에도 재할당이 불가능.
// 단순히 값을 받기 위한 용도로만 사용하며, unknown에 할당된 데이터를 재할당 하기 위해서는 적절한 타입으로의 narrowing이 필요.

console.log(typeof unknown);
console.log(typeof numTuple);
console.log(typeof tempTuple);
console.log(typeof readonlyTuple);

/**
 * 7. union Type
 * - 여러타입들을 하나로 묶어서 관리하는 타입
 * - type1 | type2 | type3
 */
let stringOrNumber:string|number;
stringOrNumber = 1;
stringOrNumber = 'hi';
// stringOrNumber = true;

// ?
let tempObject:Object;
tempObject = 1;
tempObject = 'hi';
tempObject = true;

// 다양한 타입이 들어가는 배열
let unionArr:(string|number|boolean)[];

// 8. 리터럴 타입
// - 값 자체를 타입으로 사용하는 타입
// - 여러 리터럴 값들을 묶어서 리터럴 유니온 타입으로 자주 활용된다.
const PI = 3.14;
let constNumber:1234 = 1234;

// 리터럴 유니온 타입
let method:'card'|'bank';
method = 'card';
method = 'bank';
// method = 'point';

// as const
// - 객체나 배열에 저장된 값을 리터럴 타입으로 고정시켜 타입 안정성을 확보할 수 있게 도와주는 기능.
let payInfo = {name:'kh 풍뎅이', price:15000, method:'bank'} as const;
method = payInfo.method;

console.log(typeof {name:'hi'});

export default num;