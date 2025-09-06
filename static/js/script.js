// ==============================
// Readbeat メインスクリプト
// ==============================

// 本文データとインデックス
let sentences = [];
let currentIndex = 0;

// ------------------------------
// ビューポート高さの安定化（スマホ用）
// ------------------------------
function updateViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh * 100}px`);
}

// 初期化 & リサイズ/回転時に高さを更新
window.addEventListener('load', updateViewportHeight);
window.addEventListener('resize', updateViewportHeight);
window.addEventListener('orientationchange', updateViewportHeight);

// ------------------------------
// 文を表示
// ------------------------------
function showSentence(index) {
  const display = document.getElementById("display");
  display.textContent = sentences[index] || "";
}

// ------------------------------
// 本文データを読み込む
// ------------------------------
function loadBook() {
  fetch("/static/data/" + filename) // Flaskから渡されたfilenameを利用
    .then((response) => response.json())
    .then((data) => {
      sentences = data.sentences;
      currentIndex = 0; // 読み始めは最初から
      showSentence(currentIndex);
    })
    .catch((err) => {
      document.getElementById("display").textContent = "読み込みエラー";
      console.error("本のデータ読み込みに失敗:", err);
    });
}

// ------------------------------
// クリックでページ送り（右=次, 左=戻る）
// ------------------------------
document.addEventListener("click", function (e) {
  const x = e.clientX;
  const width = window.innerWidth;

  if (x > width / 2) {
    // 右側 → 次の文へ
    if (currentIndex < sentences.length - 1) {
      currentIndex++;
      showSentence(currentIndex);
    }
  } else {
    // 左側 → 前の文へ
    if (currentIndex > 0) {
      currentIndex--;
      showSentence(currentIndex);
    }
  }
});

// ------------------------------
// 初期化呼び出し
// ------------------------------
loadBook();