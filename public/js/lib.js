
function download() {
  const canvas = document.getElementById("drawer");
  let n = Number(localStorage.getItem("n") ?? 1);

  canvas.toBlob(function(blob) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `circuit${n}.png`;
    link.click();

    URL.revokeObjectURL(link.href); // メモリ解放
  }, "image/png");
  localStorage.setItem("n", n + 1);
}

