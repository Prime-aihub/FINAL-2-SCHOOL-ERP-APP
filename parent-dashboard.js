/* ==========================================
   MAIAMMA SCHOOL HUB
   PARENT DASHBOARD JS
========================================== */

/* ==========================
   THEME TOGGLE
========================== */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("maiamma-parent-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    updateThemeIcon();
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem(
            "maiamma-parent-theme",
            "dark"
        );

    } else {

        localStorage.setItem(
            "maiamma-parent-theme",
            "light"
        );
    }

    updateThemeIcon();
});

function updateThemeIcon() {

    const icon = themeToggle.querySelector("i");

    if (
        document.body.classList.contains("dark-mode")
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

        menuItems.forEach(menu =>
            menu.classList.remove("active")
        );

        item.classList.add("active");
    });
});

/* ==========================
   ATTENDANCE ANIMATION
========================== */

window.addEventListener("load", () => {

    const progressCircle =
    document.querySelector(".progress-circle");

    if (progressCircle) {

        progressCircle.style.transform =
        "scale(0.7)";

        setTimeout(() => {

            progressCircle.style.transition =
            "all 0.6s ease";

            progressCircle.style.transform =
            "scale(1)";

        }, 300);
    }
});

/* ==========================
   AI PARENT ASSISTANT
========================== */

const aiInput =
document.querySelector(".ai-chat input");

const aiContainer =
document.querySelector(".ai-chat");

if (aiInput) {

    aiInput.addEventListener("keypress", function(e) {

        if (e.key === "Enter") {

            const message =
            this.value.trim();

            if (!message) return;

            addUserMessage(message);

            this.value = "";

            setTimeout(() => {

                addAIResponse(message);

            }, 800);
        }
    });
}

function addUserMessage(text) {

    const userMsg =
    document.createElement("div");

    userMsg.className =
    "user-message";

    userMsg.innerHTML = text;

    aiContainer.insertBefore(
        userMsg,
        aiInput
    );
}

function addAIResponse(question) {

    const response =
    document.createElement("div");

    response.className =
    "ai-message";

    let answer =
    "I can help with attendance, fees, homework, transport and academic reports.";

    const q = question.toLowerCase();

    if (q.includes("attendance")) {

        answer =
        "Current attendance is 96%. Excellent performance.";

    } else if (q.includes("fee")) {

        answer =
        "Pending fee amount is ₹5,000. Due date is 30 June 2026.";

    } else if (q.includes("homework")) {

        answer =
        "There are 2 pending assignments and 3 completed tasks.";

    } else if (q.includes("result")) {

        answer =
        "Overall academic score is currently 89%.";

    } else if (q.includes("transport")) {

        answer =
        "School bus ETA is approximately 8 minutes.";

    }

    response.innerHTML = answer;

    aiContainer.insertBefore(
        response,
        aiInput
    );

    aiContainer.scrollTop =
    aiContainer.scrollHeight;
}

/* ==========================
   TOAST NOTIFICATIONS
========================== */

function showToast(message) {

    const toast =
    document.createElement("div");

    toast.className =
    "toast-notification";

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
   SAMPLE ALERTS
========================== */

setTimeout(() => {

    showToast(
        "📢 New Homework Assigned"
    );

}, 3000);

setTimeout(() => {

    showToast(
        "🚌 School Bus Reached School"
    );

}, 8000);

/* ==========================
   STORE ITEM CLICK
========================== */

const storeItems =
document.querySelectorAll(".store-item");

storeItems.forEach(item => {

    item.addEventListener("click", () => {

        const itemName =
        item.querySelector("p").innerText;

        showToast(
            itemName +
            " Store Module Opening..."
        );
    });
});

/* ==========================
   ACTION BUTTON EVENTS
========================== */

const actionButtons =
document.querySelectorAll(".action-btn");

actionButtons.forEach(button => {

    button.addEventListener("click", () => {

        showToast(
            button.innerText +
            " Clicked"
        );
    });
});

/* ==========================
   LIVE CLOCK
========================== */

function updateDashboardTime() {

    const currentTime =
    new Date();

    const timeString =
    currentTime.toLocaleTimeString();

    const timeBox =
    document.getElementById(
        "dashboardTime"
    );

    if (timeBox) {

        timeBox.innerText =
        timeString;
    }
}

setInterval(
    updateDashboardTime,
    1000
);

/* ==========================
   STUDENT DATA OBJECT
========================== */

const studentData = {

    studentName:
    "Aarav Sharma",

    class:
    "7th Standard",

    section:
    "A",

    rollNumber:
    "21",

    attendance:
    "96%",

    academicScore:
    "89%",

    pendingFees:
    "₹5000"
};

console.log(
    "MAIAMMA Parent Dashboard Loaded",
    studentData
);

/* ==========================
   FUTURE MODULE PLACEHOLDERS
========================== */

/*
Future Backend APIs

fetchAttendance()
fetchHomework()
fetchResults()
fetchFees()
fetchTransport()
fetchMessages()
fetchStoreProducts()
fetchAIResponses()

*/

/* ==========================
   PAGE LOADED
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Parent Dashboard Ready"
        );

        showToast(
            "Welcome Back Parent 👋"
        );
    }
);