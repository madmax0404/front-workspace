// 1) 눈코딩
const obj = {
    name: "홍길동",
    normalFn: function() {
        console.log("일반 함수:", this.name);
    },
    arrowFn: () => {
        console.log("화살표 함수:", this.name);
    }
};

obj.normalFn(); // 홍길동?
obj.arrowFn();  // undefined

// 2) 눈코딩
const person = {
    name: "안찰스",
    greet: function() {
        const innerArrow = () => console.log(this.name);
        const innerNormal = function() { console.log(this.name); };
        
        innerArrow();
        innerNormal();
    }
};

person.greet();
// innerArrow 출력: 안찰스
// innerNormal 출력: undefined

// 3) 눈코딩
// 1초 간격으로 Hello , 찰스를 출력하려고 하나 이름값이 제대로 출력되지 않았다.
// 문제의 원인과 수정방안을 생각하세요
function User(name) {
    this.name = name;
    setTimeout(() => {
        console.log("Hello, " + this.name);
    }, 1000);
}

new User("찰스"); // "Hello, undefined"
// 원인: 내부 function의 this.name은 내부 function의 this.name을 가리키고 있음.
// 수정방안: 화살표 함수로 바꿈.

// 4) 눈코딩
const tom = {
    name : 'Tom',
    sayName : function(){
        console.log(this.name);
    }
}

const alice = { name: "Alice" };

tom.sayName(); // Tom
tom.sayName.call(alice); // Alice

// 5) 눈코딩
this.tag = "Error";

function print() {
    console.log(this.tag); 
}
const obj2 = { tag: "OK" };

const boundPrint = print.bind(obj2);

print(); // undefined
boundPrint(); // "OK"
