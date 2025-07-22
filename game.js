var timer;
var point = 0;
var hitr_n = 0;
var totalBubbles = 0;

// Generate random number to hit
function getnewhit() {
    hitr_n = Math.floor(Math.random() * 5);
    document.querySelector("#hitval").textContent = hitr_n;
}

// Update score
function score() {
    point += 5;
    document.querySelector("#scores").textContent = point;
}

// Generate bubbles
function makebubble() {
    var clutter = "";
    for (var i = 1; i <= totalBubbles; i++) {
        var r_n = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${r_n}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = clutter;
}

// Start timer
function runtimer() {
    var timerinterval = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timer").textContent = timer;
        } else {
            clearInterval(timerinterval);
            document.querySelector("#pbtm").innerHTML = `<h1>GAME OVER....!</h1>`;
            setTimeout(() => {
                document.querySelector("#namePrompt").classList.remove("hidden");
            }, 1000);
        }
    }, 1000);
}

// Handle bubble clicks
document.querySelector("#pbtm").addEventListener("click", function (dts) {
    var click_num = Number(dts.target.textContent);
    if (click_num === hitr_n) {
        score();
        getnewhit();
        makebubble();
    }
});

// Handle difficulty buttons
document.querySelectorAll(".diff-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        const diff = btn.getAttribute("data-diff");

        if (diff === "easy") {
            timer = 90;
            totalBubbles = 80;
        } else if (diff === "medium") {
            timer = 60;
            totalBubbles = 121;
        } else if (diff === "hard") {
            timer = 45;
            totalBubbles = 161;
        }

        document.querySelector("#startScreen").style.display = "none";
        document.querySelector("#timer").textContent = timer;
        point = 0;
        document.querySelector("#scores").textContent = 0;
        getnewhit();
        makebubble();
        runtimer();
    });
});

// Save score
document.getElementById("saveScoreBtn").addEventListener("click", function () {
    let name = document.getElementById("playerName").value.trim();
    if (!name) return alert("Please enter your name!");

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score: point });

    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    showLeaderboard();
});

// Show leaderboard
function showLeaderboard() {
    document.getElementById("namePrompt").classList.add("hidden");
    document.getElementById("leaderboard").classList.remove("hidden");

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";

    leaderboard.forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
        scoreList.appendChild(li);
    });
}

document.getElementById("viewLeaderboardBtn").addEventListener("click", function () {
    document.getElementById("startScreen").style.display = "none";
    showLeaderboard();
});