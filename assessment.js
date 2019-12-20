(function () { // 雛形
  'use strict'; // 厳格モード

  // 各行で、HTMLで設定したidを使って要素を取得する
  const userNameInput = document.getElementById('user-name');
  const assessmentButton = document.getElementById('assessment');
  const resultDivided = document.getElementById('result-area');
  const tweetDivided = document.getElementById('tweet-area');

  // エンターキーを押したときにも診断結果を表示してほしい
  userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      // TODO ボタンのonclick() 処理を呼び出す
      assessmentButton.onclick();
      // console.log('エンターが押されました');
    }
  };

  // JavaScriptで入力された名前を受け取る
  // id=assessmentがクリックされたら
  // userNameInputオブジェクトのvalueプロパティから、テキストエリアに入力された文字列を受け取り
  // 文字数が0のときは関数を終了する。
  assessmentButton.onclick = () => {
    const userName = userNameInput.value; // id=user-nameのテキストボックスに入力された文字列を取得する
    if (userName.length === 0) { // 名前が空のとき（文字数が0のとき）
      return; // 関数終了
    }

    // 診断結果の表示エリアの作成
    removeAllChildern(resultDivided);
    const header = document.createElement('h3'); // haderに<h3>タグを作って入れる
    header.innerText = '診断結果'; // headerの中に診断結果という文章を入れる
    resultDivided.appendChild(header); // resultDividedの中の子要素にheaderを入れる
    
    const paragraph = document.createElement('p'); // paragraphに<p>タグを作って入れる
    const result = assessment(userName); // assessment関数の結果をresultに入れる
    paragraph.innerText = result; // 診断結果を<p>タグの中に入れる
    resultDivided.appendChild(paragraph); // resultDividedの中の子要素にparagraphを入れる

    // TODO ツイートエリアの作成
    removeAllChildern(tweetDivided); // ツイートエリアに表示された子要素を全て削除

    const anchor = document.createElement('a'); // 定数anchorにエレメント<a>を作る
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw'; // 日本語の部分をURIエンコードする
    anchor.setAttribute('href', hrefValue); // 第一引数の属性名hrefを追加して、第二引数の属性値hrefValueを追加する
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    // twitter社が用意してる関数。これによりTwitterのボタンのような見た目になる。また診断結果もきちんとツイートに組み込まれる
    twttr.widgets.load();
  };

  // answers　診断結果の配列
  const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  ];

    /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} userName ユーザーの名前
    * @return {string} 診断結果
    */
  function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfcharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfcharCode % answers.length;
    let result = answers[index]; // 変数の値が変わっていくのでlet、answersのindex番目の診断結果をresultに入れる

    // TODO {userName} をユーザーの名前に置き換える
    result = result.replace(/\{userName\}/g, userName); //resuleの中の{userName}を入力された名前に置き換える
    return result; // 診断結果を返す
  }

  /**
   * 診断結果表示エリアに子の要素が存在する限り、最初の子の要素を削除し続ける
   * @param {HTMLElement} element HTMLの要素 
   */
  // 連続して診断結果がでてしまわないようにしている
  function removeAllChildern(element) {
    while (element.firstChild) { // 子要素の先頭がある限り（true）の場合削除
      element.removeChild(element.firstChild);
    }
  }

  // 以下はテスト
  // 「入力が同じ名前なら、同じ診断結果を出力する」処理が正しいかどうか
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  ); // assessment関数に太郎を渡したとき

  // 太郎の出力結果が右の文言と間違いないか
  console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  ); // assessment関数に太郎を渡したとき
})();
