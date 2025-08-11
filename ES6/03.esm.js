// ESM: ES Module, 표준 모듈 시스템

function sayHi() {
    console.log("hello module");
}
const abc = "abcde";

export {sayHi, abc};
export const fn1 = a => console.log(a);

// default 는 모듈 당 1개만 쓸 수 있다.
export default abc;