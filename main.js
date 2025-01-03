document.addEventListener("DOMContentLoaded", () => {
  let results = document.getElementById("results");
});

function shoot(player) {
  console.log(`${player} is shooting!`);
  results.innerHTML = `<p>${player} is shooting!</p>`;
}
