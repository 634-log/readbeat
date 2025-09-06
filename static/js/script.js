let bunsetsuData = [];
let currentIndex = 0;

function showBunsetsu(index) {
  const display = document.getElementById("display");
  display.textContent = bunsetsuData[index] || "";
}

function loadBunsetsu() {
    fetch("/static/data/" + filename)  // ←選ばれたファイルを読む
      .then((response) => response.json())
      .then((data) => {
        bunsetsuData = data.sentences;
        showBunsetsu(currentIndex);
      });
  }
  
  

document.addEventListener("click", function (e) {
  const x = e.clientX;
  const width = window.innerWidth;

  if (x > width / 2) {
    if (currentIndex < bunsetsuData.length - 1) {
      currentIndex++;
      showBunsetsu(currentIndex);
    }
  } else {
    if (currentIndex > 0) {
      currentIndex--;
      showBunsetsu(currentIndex);
    }
  }
});

loadBunsetsu();
