import playerData from "./players.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
  let results = document.getElementById("results");
  const players = playerData.players;

  function shoot() {
    // Pick a random player
    const pickedPlayer = players[Math.floor(Math.random() * players.length)];

    // Format the result using the player's data
    results.innerHTML = `
      <p>
        <strong>${pickedPlayer.name}</strong> is shooting!<br>
        - Three-Pointer Chance: ${pickedPlayer.chances.three_pointers}%<br>
        - Mid-Range Chance: ${pickedPlayer.chances.mid_range}%<br>
        - Paint Chance: ${pickedPlayer.chances.paint}%
      </p>
    `;
  }

  // Attach the shoot function to the button dynamically
  const button = document.getElementById("simulate");
  button.addEventListener("click", shoot);
});
