const envelope = document.getElementById("envelope");
const card = document.getElementById("card");
const cardWrapper = document.getElementById("cardWrapper");
const birthdayWords = document.getElementById("birthdayWords");
const instructions = document.getElementById("instructions");
const confetti = document.getElementById("confetti");

let envelopeOpened = false;
let currentPage = 0;
let isTurning = false;

envelope.addEventListener("click", function () {
    if (envelopeOpened) return;

    envelopeOpened = true;
    envelope.classList.add("open");
    instructions.textContent = "Watch the card come out 💌";

    setTimeout(function () {
        cardWrapper.style.zIndex = "6";
    }, 1750);

    setTimeout(function () {
        birthdayWords.classList.add("animate");
        instructions.textContent = "Tap the card to open 💌";
    }, 3500);
});

card.addEventListener("click", function (event) {
    event.stopPropagation();

    if (!envelopeOpened || isTurning) return;

    isTurning = true;

    if (currentPage === 0) {
        const frontCover = document.querySelector(".card-front");
        const page1 = document.querySelector(".page-1");

        page1.classList.add("active");
        frontCover.classList.add("opening");

        createConfetti();

        instructions.textContent = "Tap to turn the page ➡️";

        requestAnimationFrame(function () {
            card.classList.add("open");
        });

        setTimeout(function () {
            frontCover.classList.remove("opening");
            currentPage = 1;
            isTurning = false;
        }, 1200);

        return;
    }

    if (currentPage === 1) {
        turnPage(1, 2);
        return;
    }

    if (currentPage === 2) {
        turnPage(2, 3);
        return;
    }

    if (currentPage === 3) {
        turnBackToFront();
        return;
    }
});

function turnPage(fromPage, toPage) {
    const current = document.querySelector(".page-" + fromPage);
    const next = document.querySelector(".page-" + toPage);

    if (!current || !next) {
        isTurning = false;
        return;
    }

    next.classList.add("next-page");

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            current.classList.add("turning");
        });
    });

    setTimeout(function () {
        current.classList.remove("turning");
        current.classList.remove("active");

        next.classList.remove("next-page");
        next.classList.add("active");

        currentPage = toPage;
        isTurning = false;
    }, 850);
}

function turnBackToFront() {
    const page3 = document.querySelector(".page-3");
    const frontCover = document.querySelector(".card-front");

    if (!page3 || !frontCover) {
        isTurning = false;
        return;
    }

    frontCover.classList.add("return-page");

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            page3.classList.add("turning");
        });
    });

    setTimeout(function () {
        page3.classList.remove("turning");
        page3.classList.remove("active");

        frontCover.classList.remove("return-page");
        card.classList.remove("open");

        currentPage = 0;
        instructions.textContent = "Tap the card to open 💌";
        isTurning = false;
    }, 850);
}

function createConfetti() {
    const pieces = 140;

const colours = [
    "#166534",
    "#15803d",
    "#16a34a",
    "#4ade80",
    "#86efac",
    "#a7f3d0",
    "#d1fae5",
    "#ffffff"
];
    for (let i = 0; i < pieces; i++) {
        const piece = document.createElement("span");

        piece.classList.add("confetti-piece");

        piece.style.left = Math.random() * 100 + "%";

        piece.style.backgroundColor =
            colours[Math.floor(Math.random() * colours.length)];

        const size = Math.random() * 8 + 5;

        piece.style.width = size + "px";
        piece.style.height = size * 1.5 + "px";

        piece.style.animationDuration =
            Math.random() * 2 + 2 + "s";

        piece.style.animationDelay =
            Math.random() * 0.4 + "s";

        piece.style.setProperty(
            "--drift",
            Math.random() * 400 - 200 + "px"
        );

        confetti.appendChild(piece);

        setTimeout(function () {
            piece.remove();
        }, 4500);
    }
}