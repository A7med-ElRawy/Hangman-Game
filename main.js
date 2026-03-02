let letter = `abcdefghijklmnopqrstuvwyxz`;

let letterArray = Array.from(letter);

let letterPosition = document.querySelector(`.letters`);

letterArray.forEach((letter) => {
  let span = document.createElement(`span`);

  span.innerHTML = letter;

  span.classList.add(`letter-box`);

  letterPosition.appendChild(span);
});

let word = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
let randomName;

let randomPro;
async function loadData() {
  try {
    const response = await fetch("word.json");
    const data = await response.json();

    let categories = Object.keys(data);
    let randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    let randomWord =
      data[randomCategory][
        Math.floor(Math.random() * data[randomCategory].length)
      ];

    return { randomCategory, randomWord };
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

loadData().then(({ randomCategory, randomWord }) => {
  console.log("Category:", randomCategory);
  console.log("Word:", randomWord);

  randomName = randomCategory;

  randomPro = randomWord;

  document.querySelector(`.game-info .category span`).innerHTML = randomName;

  let letterGuessContainer = document.querySelector(".letters-guess");

  let letterSpan = Array.from(randomPro);

  letterSpan.forEach((letter) => {
    const span = document.createElement("span");

    if (letter === " ") {
      span.className = "with-space";
    }
    letterGuessContainer.appendChild(span);
  });

  let spanWord = document.querySelectorAll(".letters-guess span");
  let hangmanDraw = document.querySelector(".hangman-draw");
  let wrong = 0;
  let good = 0;
  let name = randomPro;
  let lengthWithoutSpaces = randomPro.replace(/\s/g, "").length;
  document.addEventListener("click", (e) => {
    if (e.target.className === "letter-box") {
      let theStatus = false;
      e.target.classList.add("clicked");
      const wordCheck = e.target.innerHTML.toLowerCase();
      letterSpan.forEach((word, index) => {
        if (wordCheck === word.toLowerCase()) {
          theStatus = true;
          spanWord.forEach((span, spanIndex) => {
            if (index === spanIndex) {
              span.innerHTML = word;

              good++;
              if (good === lengthWithoutSpaces) {
                setTimeout(winGame, 2000);
                document.querySelector(".letters").classList.add("finished");
                document.getElementById("success").play();
              } else {
                let successSound = document.getElementById("go");
                successSound.currentTime = 0;
                successSound.play();
              }
            }
          });
        }
      });
      if (theStatus === false) {
        wrong++;
        let failedSound = document.getElementById("agin");
        failedSound.currentTime = 0;
        failedSound.play();
        hangmanDraw.classList.add(`wrong-${wrong}`);
        if (wrong === 8) {
          setTimeout(endGame, 2000);
          document.querySelector(".letters").classList.add("finished");
          document.getElementById("fail").play();
        }
      }
    }
  });

  function endGame() {
    // Create Popup Div
    let div = document.createElement("div");
    let button=document.createElement("button");
    button.appendChild(document.createTextNode("Agin :)"))
    // Create Text
    let divText = document.createTextNode(
      `Game Over, The Word Is ${randomPro.toUpperCase()}`
    );

    // Append Text To Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = "popup";
    button.className="btn";

    // Append To The Body
    document.body.appendChild(div);
    document.body.appendChild(button);
  }

  function winGame() {
    let div = document.createElement("div");
    let divText; // define it once outside the conditions
    let button=document.createElement("button");
    button.appendChild(document.createTextNode("Agin :)"))

    // Create Text based on number of mistakes
    if (wrong >= 6 && wrong <= 7) {
      divText = document.createTextNode(
        `Congratulations, the word is ${randomPro.toUpperCase()} — You are a 😅 Barely Made It`
      );
    } else if (wrong >= 4 && wrong <= 5) {
      divText = document.createTextNode(
        `Congratulations, the word is ${randomPro.toUpperCase()} — You are a 😊 Average Player`
      );
    } else if (wrong >= 2 && wrong <= 3) {
      divText = document.createTextNode(
        `Congratulations, the word is ${randomPro.toUpperCase()} — You are a 🔥 Very Smart`
      );
    } else if (wrong === 1) {
      divText = document.createTextNode(
        `Congratulations, the word is ${randomPro.toUpperCase()} — You are a 💎 Pro`
      );
    } else if (wrong === 0) {
      divText = document.createTextNode(
        `Congratulations, the word is ${randomPro.toUpperCase()} — You are a 🏆 Legend`
      );
    }

    // Append Text To Div
    div.appendChild(divText);
    // Add Class On Div
    div.className = "popup-win";
    button.className="btn";
    // Append To The Body
    document.body.appendChild(div);
    document.body.appendChild(button);
  }
});




