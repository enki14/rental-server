'use strict';



const shingleDown = (el) => {
    el.style.height = 'auto'; // 初期値が0にならないように一旦autoにする
    let h = el.offsetHeight; // 要素の高さを取得
    el.style.height = h + 'px';
    el.animate([ // animate(keyframes, options)
        { height: '0px'},
        { height: h + 'px'},
        // { transition: 'height 0.3s ease-in-out'}
    ], {
        duration: 300,
    });
    el.style.height = 'auto';
}


const shingleUp = (el) => {
    el.style.height = 0;
    // el.animate([
    //     {transition: 'height 0.3s ease-in-out'},
    // ]);
}


// querySelectorAllは配列ではなく、配列に似たオブジェクトである
const acoShiBtns = document.querySelectorAll('.c-question');
acoShiBtns.forEach((acoShiBtn, index) => {
    acoShiBtn.addEventListener('click', (e) => {
        // Array.from()で改めて配列に変換
        // Array.from(acoShiBtns)　この配列はnodeListになっているが、indexOf()で配列のインデックスを取得できる
        // ここでいう e.currentTarget はクリックしたボタンのこと
        const clickedIndex = Array.from(acoShiBtns).indexOf(e.currentTarget);
        // ➀クリックしたボタンの中身を開閉　↓↓↓
        e.currentTarget.parentNode.classList.toggle('active'); // クリックしたボタンの親要素にactiveクラスを付与
        const content = acoShiBtn.nextElementSibling; // ボタンの次の要素を取得 この場合は.c-anser
        if(e.currentTarget.parentNode.classList.contains('active')) {  // containsは指定したクラスが子孫要素であるかどうかを判定する
            shingleDown(content);
        }else {
            shingleUp(content);
        }
        console.log(content.clientHeight + 'px');
        // ➁クリックしたボタン以外の中身を閉じる ↓↓↓
        acoShiBtns.forEach((acoShibtn, index) => {
            if(clickedIndex !== index) { // クリックしたボタン以外のactiveクラスを削除
                acoShibtn.parentNode.classList.remove('active');
                const openedContent = acoShibtn.nextElementSibling;
                shingleUp(openedContent); // クリックしたボタン以外のコンテンツを閉じる
            }
        });
    });
});

