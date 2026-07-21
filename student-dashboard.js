/* ==========================================
   MAIAMMA SCHOOL HUB
   STUDENT DASHBOARD JS
========================================== */

/* ==========================
   THEME TOGGLE
========================== */

const themeToggle = document.getElementById("themeToggle");

const savedTheme =
localStorage.getItem("maiamma-student-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    updateThemeIcon();
}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            localStorage.setItem(
                "maiamma-student-theme",
                "dark"
            );

        } else {

            localStorage.setItem(
                "maiamma-student-theme",
                "light"
            );
        }

        updateThemeIcon();
    });
}

function updateThemeIcon() {

    const icon =
    document.querySelector("#themeToggle i");

    if (!icon) return;

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

/* ==========================
   SIDEBAR ACTIVE MENU
========================== */

const menuItems =
document.querySelectorAll(".sidebar-menu li");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(menu => {

            menu.classList.remove("active");

        });

        item.classList.add("active");
    });
});

/* ==========================
   TOAST SYSTEM
========================== */

function showToast(message) {

    const toast =
    document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3500);
}

/* ==========================
   AI TUTOR
========================== */

const aiInput =
document.querySelector(".ai-chat input");

const aiChat =
document.querySelector(".ai-chat");

if (aiInput) {

    aiInput.addEventListener(
        "keypress",
        function (e) {

            if (e.key === "Enter") {

                const message =
                this.value.trim();

                if (!message) return;

                addStudentMessage(message);

                this.value = "";

                setTimeout(() => {

                    addAIResponse(message);

                }, 800);
            }
        }
    );
}

function addStudentMessage(text) {

    const div =
    document.createElement("div");

    div.className =
    "user-message";

    div.innerHTML = text;

    aiChat.insertBefore(
        div,
        aiInput
    );
}

function addAIResponse(question) {

    const reply =
    document.createElement("div");

    reply.className =
    "ai-message";

    let response =
    "I can help you with homework, exams, science, maths and learning tips.";

    const q =
    question.toLowerCase();

    if (
        q.includes("math")
    ) {

        response =
        "Math Tip: Practice algebra daily for 15 minutes.";

    }

    else if (
        q.includes("science")
    ) {

        response =
        "Science Tip: Focus on concepts before memorizing facts.";

    }

    else if (
        q.includes("exam")
    ) {

        response =
        "Exam Preparation: Revise weak subjects first.";

    }

    else if (
        q.includes("homework")
    ) {

        response =
        "You currently have 3 homework tasks pending.";
    }

    else if (
        q.includes("attendance")
    ) {

        response =
        "Your attendance is currently 96%. Excellent work!";
    }

    reply.innerHTML =
    response;

    aiChat.insertBefore(
        reply,
        aiInput
    );
}

/* ==========================
   PROGRESS ANIMATION
========================== */

window.addEventListener(
    "load",
    () => {

        const fills =
        document.querySelectorAll(
            ".progress-fill"
        );

        fills.forEach(fill => {

            const width =
            fill.style.width;

            fill.style.width = "0";

            setTimeout(() => {

                fill.style.transition =
                "1s ease";

                fill.style.width =
                width;

            }, 400);
        });
    }
);

/* ==========================
   QUIZ BUTTON
========================== */

const quizBtn =
document.querySelector(
    ".action-btn"
);

if (quizBtn) {

    quizBtn.addEventListener(
        "click",
        () => {

            showToast(
                "🧠 Smart Quiz Starting..."
            );
        }
    );
}

/* ==========================
   BADGE CLICK
========================== */

const badges =
document.querySelectorAll(
    ".badge-card"
);

badges.forEach(badge => {

    badge.addEventListener(
        "click",
        () => {

            showToast(
                badge.innerText
            );
        }
    );
});

/* ==========================
   FUTURE LEARNING CARDS
========================== */

const futureCards =
document.querySelectorAll(
    ".future-card"
);

futureCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            showToast(
                card.innerText +
                " Module Coming Soon"
            );
        }
    );
});

/* ==========================
   STUDENT DATA
========================== */

const studentData = {

    name:
    "Aarav Sharma",

    class:
    "7th Standard",

    section:
    "A",

    rollNo:
    "21",

    attendance:
    "96%",

    score:
    "89%",

    rewardPoints:
    850
};

console.log(
    "Student Dashboard Loaded",
    studentData
);

/* ==========================
   SAMPLE NOTIFICATIONS
========================== */

setTimeout(() => {

    showToast(
        "📚 Homework Due Tomorrow"
    );

}, 3000);

setTimeout(() => {

    showToast(
        "🏆 New Badge Unlocked"
    );

}, 7000);

setTimeout(() => {

    showToast(
        "🧠 Daily IQ Quiz Available"
    );

}, 11000);

/* ==========================
   FUTURE API PLACEHOLDERS
========================== */

/*

Future Integrations

fetchStudentProfile()
fetchAttendance()
fetchHomework()
fetchAssignments()
fetchResults()
fetchExams()
fetchAchievements()
fetchQuizData()
fetchAITutor()

*/

/* ==========================
   PAGE READY
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Student Dashboard Ready"
        );

        showToast(
            "Welcome Back Student 👋"
        );
    }
);