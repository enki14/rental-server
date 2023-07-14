'use strict';

// const shingleDown = (el) => {
//     el.style.height = 'auto'; // 初期値が0にならないように一旦autoにする
//     let h = el.offsetHeight; // 要素の高さを取得
//     el.style.offsetHeight = h + 'px';
//     el.animate([ // animate(keyframes, options)
//         { height: '0px'},
//         { height: h + 'px'}
//     ], {
//         duration: 300,
//     });
// }
const shingleDown = (el) => {
    el.style.height = 'auto'; // 初期値が0にならないように一旦autoにする
    el.style.transition = 'height 0s'; // アニメーションの適用を一時的に無効化
    let h = el.scrollHeight; // 要素の高さを取得（コンテンツ全体の高さ）
    let paddingTop = parseFloat(window.getComputedStyle(el).paddingTop);
    let paddingBottom = parseFloat(window.getComputedStyle(el).paddingBottom);
    h += paddingTop + paddingBottom; // paddingを高さに加算する
    el.style.height = '0px'; // 高さを一時的に0にする
    el.style.transition = ''; // アニメーションの適用を有効化
    el.offsetHeight; // 要素の高さを再取得するためにリフローを発生させる
    el.style.height = h + 'px'; // 高さを設定
};

const shingleUp = (el) => {
    el.style.height = 0;
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
