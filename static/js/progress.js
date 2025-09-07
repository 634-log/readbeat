/**
 * progress.js
 * インスタストーリー風の進捗バー制御
 */

/**
 * 進捗バーを初期化
 * @param {number} totalChapters - 章の数
 */
function initStoryProgress(totalChapters) {
  const container = document.getElementById("story-progress");
  container.innerHTML = ""; // リセット

  for (let i = 0; i < totalChapters; i++) {
    const bar = document.createElement("div");
    bar.className = "story-bar";

    const fill = document.createElement("div");
    fill.className = "story-bar-fill";

    bar.appendChild(fill);
    container.appendChild(bar);
  }
}

/**
 * 進捗を更新
 * @param {number} currentChapter - 現在の章番号 (0スタート)
 * @param {number} progress - 章内の進捗率 (0〜1)
 */
function updateStoryProgress(currentChapter, progress = 1) {
  const bars = document.querySelectorAll(".story-bar-fill");

  bars.forEach((bar, i) => {
    if (i < currentChapter) {
      bar.style.width = "100%"; // 完了
    } else if (i === currentChapter) {
      bar.style.width = `${progress * 100}%`; // 現在の進捗
    } else {
      bar.style.width = "0%"; // 未読
    }
  });
}

const percentEl = document.getElementById("progress-percent");
if (percentEl) {
  const percent = ((index + 1) / sentences.length) * 100;
  percentEl.textContent = percent.toFixed(1) + "%";  // 小数点1桁
}