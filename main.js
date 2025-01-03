document.addEventListener("DOMContentLoaded", () => {
  let results = document.getElementById("results");
  let players = [];

  // Fetch the JSON file
  fetch("./players.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load players.json");
      }
      return response.json();
    })
    .then((data) => {
      players = data.players;

      function shoot() {
        const pickedPlayer =
          players[Math.floor(Math.random() * players.length)];

        const [displayName, type] = determineShotType(pickedPlayer);
        const accuracy = outcome(type, pickedPlayer);
        results.innerHTML = `
          <p>
            <strong>${pickedPlayer.name}</strong> is shooting!<br>
            - Three-Pointer Chance: ${pickedPlayer.chances.three_pointers}%<br>
            - Mid-Range Chance: ${pickedPlayer.chances.mid_range}%<br>
            - Paint Chance: ${pickedPlayer.chances.paint}% <br>
            - Shot Type: ${displayName}<br>
            - Status: ${accuracy}<br><br>

            <strong>${pickedPlayer.name}'s</strong> Shooting splits: <br>
            - Three-pointers: ${pickedPlayer.percentages.three_pointers}%<br>
            - Mid-ranges: ${pickedPlayer.percentages.mid_range}%<br>
          </p>
        `;
      }

      function shootAround() {
        const pickedPlayer =
          players[Math.floor(Math.random() * players.length)];
        let shot = Math.random() * 50;

        if (shot < 1) {
          results.innerHTML = `
            <p>
                <strong>${pickedPlayer.name}</strong> was lazy and decided not to practice. <br>
            </p>
            `;
        } else {
          shot = Math.floor(shot);
          results.innerHTML = `
            <p ><strong>${pickedPlayer.name}</strong> is shooting around!<br>
            They shot ${shot} times.
            </p>
            <div id="shots">
            
            </div>
            `;

          const shotsDiv = document.getElementById("shots");
          let miss = 0;
          let made = 0;
          let taley = 0;
          for (let i = 0; i < shot; i++) {
            // Determine the shot type and accuracy for each shot
            const [displayName, type] = determineShotType(pickedPlayer);
            const shotOutcome = outcome(type, pickedPlayer);

            // Create a div for each shot and display its result
            const shotDiv = document.createElement("div");
            shotDiv.className = "shot";
            shotDiv.innerHTML = `
            <p><strong>${displayName}</strong> shot - ${shotOutcome}<p><br>
            <p>${displayName} accuracy: ${pickedPlayer.percentages[type]}%<br></p>
            `;
            shotsDiv.appendChild(shotDiv);

            if (shotOutcome === "Missed!") {
              miss++;
              taley += 1;
            } else {
              made++;
              taley = 0;
            }

            if (i === shot - 1) {
              results.innerHTML += `
                <p>Final Results:</p>
                <p>Missed: ${miss}</p>
                <p>Made: ${made}</p>
                <p>Total Accuracy: ${(made / shot) * 100}%</p>
              `;
              if (taley >= 3) {
                results.innerHTML += `
                <p> ${pickedPlayer.name} missed 3 shots in a row. They should practice more!</p>
              `;
                break;
              }
            }
          }
        }
      }

      const simulate = document.getElementById("simulate");
      simulate.addEventListener("click", shoot);

      const simulateRound = document.getElementById("simulateRound");
      simulateRound.addEventListener("click", shootAround);
    })
    .catch((error) => {
      console.error("Error loading player data:", error);
    });
});

function determineShotType(player) {
  const randomNumber = Math.random() * 100;
  const chance = player.chances;

  const ThreePointer = chance.three_pointers;
  const MidRange = ThreePointer + chance.mid_range;
  const Paint = MidRange + chance.paint;

  if (randomNumber <= ThreePointer) {
    return ["Three Pointer", "three_pointers"];
  } else if (randomNumber <= MidRange) {
    return ["Mid-Range", "mid_range"];
  } else if (randomNumber <= Paint) {
    return ["Paint", "paint"];
  }

  return ["Unknown", "unknown_type"];
}

function outcome(type, player) {
  const accuracy = player.percentages[type];
  const randomNumber = Math.random() * 100;

  console.log("Type:", type);
  console.log("Player Percentages:", player.percentages);

  if (randomNumber <= accuracy) {
    return "Shot made!";
  } else {
    return "Missed!";
  }
}
