
// ----------------------
// MODAL FUNKTIONEN
// ----------------------
function openModal(id) {
    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// Buttons zum Öffnen der Modals
document.getElementById("openNutsGame").onclick = () => openModal("nutsBallModal");
document.getElementById("openUrmelSnack2").onclick = () => openModal("urmelSnack2Modal");


// ----------------------
// NUTS BALLSPIEL
// ----------------------
let nutsInterval = null;
let nutsLives = 3;
let nutsPoints = 0;

function updateNutsScore() {
    const scoreEl = document.getElementById("nutsScore");
    const hearts = "💖".repeat(Math.max(0, nutsLives));
    scoreEl.textContent = `Punkte: ${nutsPoints} | Leben: ${hearts}`;
}

function startNutsGame() {
    const area = document.getElementById("nutsGameArea");
    const scoreEl = document.getElementById("nutsScore");

    area.innerHTML = "";
    nutsLives = 3;
    nutsPoints = 0;
    updateNutsScore();

    if (nutsInterval) clearInterval(nutsInterval);

    nutsInterval = setInterval(() => {
        if (nutsLives <= 0) {
            clearInterval(nutsInterval);
            scoreEl.textContent = `Spiel vorbei! Punkte: ${nutsPoints}`;
            return;
        }

        const ball = document.createElement("div");
        const isGood = Math.random() > 0.25;

        ball.style.position = "absolute";
        ball.style.width = "32px";
        ball.style.height = "32px";
        ball.style.borderRadius = "50%";
        ball.style.top = "-40px";
        ball.style.left = Math.random() * 90 + "%";
        ball.style.cursor = "pointer";
        ball.style.background = isGood ? "#22c55e" : "#ef4444";
        ball.style.boxShadow = "0 0 12px rgba(0,0,0,0.6)";
        ball.dataset.good = isGood ? "1" : "0";

        ball.addEventListener("click", () => {
            if (ball.dataset.good === "1") {
                nutsPoints += 10;
            } else {
                nutsLives -= 1;
            }
            updateNutsScore();
            ball.remove();
        });

        area.appendChild(ball);

        let y = -40;
        const fall = setInterval(() => {
            y += 4;
            ball.style.top = y + "px";
            if (y > area.clientHeight) {
                clearInterval(fall);
                ball.remove();
            }
        }, 40);
    }, 700);
}

document.getElementById("startNutsGame").onclick = startNutsGame;


// ----------------------
// URMEL SNACK-JAGD 2.0
// ----------------------
let urmel2Interval = null;
let urmel2Lives = 3;
let urmel2Points = 0;

function updateUrmelSnack2Score() {
    const scoreEl = document.getElementById("urmelSnack2Score");
    const hearts = "💖".repeat(Math.max(0, urmel2Lives));
    scoreEl.textContent = `Punkte: ${urmel2Points} | Leben: ${hearts}`;
}

function startUrmelSnack2() {
    const area = document.getElementById("urmelSnack2Area");
    const scoreEl = document.getElementById("urmelSnack2Score");

    area.innerHTML = "";
    urmel2Lives = 3;
    urmel2Points = 0;
    updateUrmelSnack2Score();

    if (urmel2Interval) clearInterval(urmel2Interval);

    urmel2Interval = setInterval(() => {
        if (urmel2Lives <= 0) {
            clearInterval(urmel2Interval);
            scoreEl.textContent = `Snack-Jagd vorbei! Punkte: ${urmel2Points}`;
            return;
        }

        const snack = document.createElement("div");
        const isReal = Math.random() > 0.3;

        snack.style.position = "absolute";
        snack.style.width = "34px";
        snack.style.height = "34px";
        snack.style.borderRadius = "8px";
        snack.style.top = Math.random() * 75 + "%";
        snack.style.left = isReal ? "-40px" : "100%";
        snack.style.cursor = "pointer";
        snack.style.background = isReal ? "#facc15" : "#64748b";
        snack.style.boxShadow = "0 0 12px rgba(0,0,0,0.6)";
        snack.dataset.real = isReal ? "1" : "0";

        snack.addEventListener("click", () => {
            if (snack.dataset.real === "1") {
                urmel2Points += 15;
            } else {
                urmel2Lives -= 1;
            }
            updateUrmelSnack2Score();
            snack.remove();
        });

        area.appendChild(snack);

        let x = isReal ? -40 : area.clientWidth + 40;
        const dir = isReal ? 4 : -4;

        const move = setInterval(() => {
            x += dir;
            snack.style.left = x + "px";
            if (x < -60 || x > area.clientWidth + 60) {
                clearInterval(move);
                snack.remove();
            }
        }, 40);
    }, 800);
}

document.getElementById("startUrmelSnack2").onclick = startUrmelSnack2;


