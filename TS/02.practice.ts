// 실습문제 1)  다음 함수의 타입을 정의하시오
// a,b는 숫자값만 들어온다.

const apply:((a:number, b:number) => number) = (a,b) => a+b;

// 실습문제 2) PrintType 의 함수별칭을 만드시오
// name에는 문자열만 사용 가능합니다

// favorite에는 돈까스, 제육, 치킨만 사용 가능합니다.

type PrintType = ((name:string, favorite:("돈까스"|"제육"|"치킨"))=>void);
const print:PrintType = (name, favorite) => {
    console.log(`안녕하세요 . 제 이름은 ${name}입니다. 제 최애 음식은 ${favorite}입니다,
    하나만 사주세요`);
}

// 실습문제 3) racoonInfo함수 생성하기
// 아래 실행결과를 바탕으로 racoonInfo함수를 완성하시오

// racoonInfo함수 호출시 매개인자는 4개 혹은 3개를 전달할 수 있습니다.

// racoonInfo함수의 반환값을 data에 담은 후 출력 시 출력결과는 다음과 같습니다.

// 이름 : podong , 무게 : 10 , 성별 : male, 중성화 : true

// 이름 : coco , 무게 : 4 , 성별 : female

let data:string; 
data = racoonInfo('podong' , 10, 'male', true );
console.log(data);//이름 : podong , 무게 : 10 , 성별 : male, 중성화 : true
data = racoonInfo('coco',4, 'female' );
console.log(data);//이름 : coco , 무게 : 4 , 성별 : female

function racoonInfo(name:string, weight:number, gender:string, neutered?:boolean):string {
    if (neutered != undefined) {
        return `이름: ${name}, 무게: ${weight}, 성별: ${gender}, 중성화: ${neutered}`;
    } else {
        return `이름: ${name}, 무게: ${weight}, 성별: ${gender}`;
    }
}

// 실습문제 4) sum함수의 몸통부분을 완성하시오

const array2:(string|number|number[])[] = ['1',2,3,4,'5',[1,2,3,4,5]];
function sum(array2: (string|number|number[])[]) : number{
    // 매개변수로 들어온 배열을 반복문을 통해 모두 더한 후 더한 값을 반환
    let total = 0;
    for (let i = 0; i < array2.length; i++) {
        let val = array2[i];
        if (typeof val === 'object') {
            for (let j = 0; j < val.length; j++) {
                total += Number(val[j]);
            }
        } else {
            total += Number(array2[i]);
        }
    }

    return total;
}
const total = sum(array2);
console.log(total); // 30

// 실습문제 5) 다음 조건을 만족하는 함수를 완성하시오
// abc함수는 1개의 매개변수를 가지고 있습니다. 
// abe함수의 매개변수로는 다음 데이터 유형들이 매개인자로 전달되며 각 값을 전달시 반환값은 다음과 같습니다.

abc(11) // 11

abc('11') // 11

abc(['1','2','3','4']) //  [1,2,3,4]

abc([1,2,3,4]) // [1,2,3,4]

function abc(praam:(number|string|string[]|number[])):number|number[] {
    //??
    if (typeof praam === 'object') {
        for (let i = 0; i < praam.length; i++) {
            praam[i] = Number(praam[i]);
        }
    } else {
        praam = Number(praam);
    }

    console.log(praam);

    return praam as (number|number[]);
}

// 실습문제 6) 매개변수로 들어온 모든 숫자를 곱하여 반환하는 함수 작성
// multiplyAll의 매개변수는 1개 의상의 매개인자가 들어올 수 있습니다.

function multiplyAll(...rest:number[]): number {
    let sum = 1;
    for (let i = 0; i < rest.length; i++) {
        sum *= rest[i];
    }

    return sum;
}
console.log(multiplyAll(2)); // 2
console.log(multiplyAll(2, 2)); // 4
console.log(multiplyAll(2, 2, 2)); // 8
console.log(multiplyAll(2, 2, 2, 2)); // 16
console.log(multiplyAll(2, 2, 2, 2, 2)); // 32
//...

// 실습문제 7) 다음 조건에 맞는 함수를 작성하시오
// handleValue함수는 string,number,boolean타입을 매개변수로 받습니다
// handleValue함수는 전달받은 타입에 따라 분기하여 각기 다른 내용이 출력됩니다.
// string이 전달된 경우 : '문자열입니다' 출력
// number가 전달된 경우 : '숫자입니다'출력
// boolean이 전달된 경우 : '불린입니다'출력
// 그 외의 타입이 들어오는 경우 assertNever함수를 호출하여 타입을 검사합니다.
// assertNever는 타입가드를 위한 보조함수로 절대 호출되지 않아야 하며, 호출시 에러를 발생시켜야 합니다. 

type Types = string|number|boolean;
function handleValue(value:Types) {
    if (typeof value === 'string') {
        console.log('문자열입니다.');
    } else if (typeof value === 'number') {
        console.log('숫자입니다.');
    } else if (typeof value === 'boolean') {
        console.log('불리안입니다.');
    } else {
        assertNever(value);
    }
}

function assertNever(value : never):never {
    throw new Error(`Unexpected Value: ${value}`);
}

// 실습문제 8) 다음 조건을 만족하는 함수를 작성하시오

type FnType = ([first, ...rest]:[first:number, ...rest:number[]]) => void;
const fn:FnType  = ([first, ...rest]:[first:number, ...rest:number[]]) => {
    for (let i = 0; i < rest.length; i++) {
        rest[i] += first;
    }
    console.log(rest);
}

// fn([]) // 컴파일에러
fn([1]); // []
fn([1,2]); // [3]
fn([1,2,3]); // [3,4]
fn([1,2,3,4]); // [3,4,5]
// fn함수는 숫자배열을 인자로 전달받습니다.
// 배열의 첫 번째 값은 기준 값으로 사용됩니다.
// fn함수는배열의 첫 번째를 제외한 나머지 값들에는첫 번째 값을 더한 새로운 배열을 반환합니다.
// fn함수에 매개변수를 전달한 후 결과값은 다음과 같습니다.
// []을 전달하면 컴파일 에러가 발생합니다.
// [1]을 전달하면 빈배열[]을 반환합니다.
// [1,2]를 전달하면 [3]을 반환합니다.
// [1,2,3]을 전달하면 [3,4]를 반환합니다.
// [1,2,3,4]를 전달하면 [3,4,5]를 반환합니다.

export default apply;