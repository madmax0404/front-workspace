function test1() {
    console.log("요소에 이벤트 발생");
}

/*
    html 페이지 로딩이 완료된 이후에 코드를 실행하고자 할 때
    - window.onload 사용
*/
window.onload = function(e) {
    document.querySelector("#btn2").onclick = test1;
    document.querySelector("#btn2").onmouseover = test1;
    
    document.querySelector("#btn3").addEventListener("click", function(e) {
        console.log("btn3 clicked!");
    });
    document.querySelector("#btn3").addEventListener("click", function(e) {
        console.log("btn3 clicked 2!");
    });

    /**
     * Event 객체
     * - 발생한 이벤트 관련 모든 정보를 가지고 있는 객체.
     * - 이벤트가 발생한 요소, 발생한 이벤트의 유형, html 내부의 위치정보 등.
     * - 이벤트 발생시 브라우저는 이벤트 핸들러 함수의 첫번째 매개변수로 항상 이벤트 객체를 주입한다.
     * 
     * Event Target 객체
     * - 이벤트가 발생한 객체.
     * - 이벤트 객체의 target 속성의 값.
     * - 
     */
    document.querySelector(".box").onmouseover = function(e) {
        console.clear();
        console.log(e);
        console.log(e.target);

        e.target.innerHTML = "하이";
        this.innerHTML += "하이2";
    };

    document.querySelector(".box").onmouseout = function(e) {
        console.clear();
        e.target.innerHTML = "잘가";
        // this.innerHTML = "잘가2";
    };

    /**
     * keydown - keypress - keyup(input에 값이 기록되는 순간)
     *                      input
     */
    document.querySelector("#userInput").addEventListener("input", function(e) {
        console.log(e);
        document.querySelector(".text-wrapper").innerHTML = this.value;
    });

    // submit event
    document.querySelector("form").onsubmit = function(e) {
        console.clear();
        /**
         * 사용자가 입력한 값이 유효한 값인지 유효성 검사를 진행하기 위한 목적으로 작성한다.
         */
        console.log(e);
        // 1. 아이디 검사
        const userId = document.querySelector("#userId");
        if (userId.value.length < 4) {
            console.log("유효한 아이디를 입력하세요.");
            userId.focus();
            return false; // submit 이벤트가 막힘
            // e.preventDefault(); // submit 이벤트가 막힘
            // 기본 이벤트 실행 방지.
            // 기본 이벤트: 각 태그마다 내장되어 있는 이벤트 기능.
            // ex) submit 버튼 태그: submit 이벤트
            //     a 태그: click 이벤트
        }
        
        // 2. 비밀번호 검사
        const pwd = document.querySelector("#pwd");
        if (pwd.value.length < 4) {
            console.log("유효한 비밀번호를 입력하세요.");
            pwd.select();
            // e.preventDefault();
            return false;
        }

        // 유효성 검사 모두 통과시 true 반환
        return true;
    };

    // const box3 = document.querySelector(".box3");
    // box3.onclick = displayMsg;
};


function displayMsg(e, boxx) {
    console.log(e.target, boxx.dataset.text);

    // 상위요소로의 이벤트 전파를 막는 함수
    e.stopPropagation();
}