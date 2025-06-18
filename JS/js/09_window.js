function test13() {
    console.clear();
    /* 
        img 태그 동적 생성
        <img src="이미지 파일의 경로" width, height, alt, style>
    */
    const img = document.createElement('img');
    img.src = "/resources/image/window.png";
    img.style = "width:200px";
    // img.width = 200;

    document.querySelector(".img-wrapper").appendChild(img);
}

function deleteNode(node) {
    console.clear();

    node.remove();
}

function test14() {
    console.clear();
}