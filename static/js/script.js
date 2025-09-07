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

  // 進捗バー更新
  const progress = (index + 1) / sentences.length;
  updateStoryProgress(0, progress); // 仮に「1章＝全文」として進捗率更新

  // 進捗％の更新（小数点1桁表示）
const percent = progress * 100;
const percentEl = document.getElementById("progress-percent");
if (percentEl) {
  percentEl.textContent = percent.toFixed(1) + "%";
}
}

// ------------------------------
// 本文データを読み込む
// ------------------------------
function loadBook() {
  fetch("/static/data/" + filename) // Flaskから渡されたfilenameを利用
    .then((response) => response.json())
    .then((data) => {
      sentences = data.sentences;
      currentIndex = 0;

      // 進捗バー初期化（今は「全文＝1章」として1本だけ生成）
      initStoryProgress(1);

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