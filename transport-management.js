/* ==========================================
   MAIAMMA SCHOOL HUB
   TRANSPORT MANAGEMENT JS
========================================== */

/* ==========================
   THEME SYSTEM
========================== */

const themeToggle =
document.getElementById(
    "themeToggle"
);

const savedTheme =
localStorage.getItem(
    "maiamma-theme"
);

if(savedTheme === "dark"){

    document.body.classList.add(
        "dark-mode"
    );

    updateThemeIcon();
}

if(themeToggle){

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );

            if(
                document.body.classList.contains(
                    "dark-mode"
                )
            ){

                localStorage.setItem(
                    "maiamma-theme",
                    "dark"
                );

            }else{

                localStorage.setItem(
                    "maiamma-theme",
                    "light"
                );
            }

            updateThemeIcon();
        }
    );
}

function updateThemeIcon(){

    const icon =
    document.querySelector(
        "#themeToggle i"
    );

    if(!icon) return;

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    ){

        icon.classList.remove(
            "fa-moon"
        );

        icon.classList.add(
            "fa-sun"
        );

    }else{

        icon.classList.remove(
            "fa-sun"
        );

        icon.classList.add(
            "fa-moon"
        );
    }
}

/* ==========================
   TOAST SYSTEM
========================== */

function showToast(message){

    const toast =
    document.createElement("div");

    toast.className =
    "toast";

    toast.innerText =
    message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    },100);

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

        setTimeout(() => {

            toast.remove();

        },300);

    },3500);
}

/* ==========================
   ADD BUS BUTTON
========================== */

const addBusBtn =
document.querySelector(
    ".add-btn"
);

if(addBusBtn){

    addBusBtn.addEventListener(
        "click",
        () => {

            showToast(
                "🚌 New Bus Registration Form Opening..."
            );
        }
    );
}

/* ==========================
   BUS VIEW BUTTONS
========================== */

const viewButtons =
document.querySelectorAll(
    ".view-btn"
);

viewButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const row =
            button.closest("tr");

            const busNo =
            row.children[0].innerText;

            showToast(
                busNo +
                " Details Opened"
            );
        }
    );
});

/* ==========================
   TABLE ROW CLICK
========================== */

const transportRows =
document.querySelectorAll(
    ".transport-table tbody tr"
);

transportRows.forEach(row => {

    row.addEventListener(
        "click",
        () => {

            const name =
            row.children[0].innerText;

            console.log(
                "Selected:",
                name
            );
        }
    );
});

/* ==========================
   TRACKING CARDS
========================== */

const trackingCards =
document.querySelectorAll(
    ".tracking-card"
);

trackingCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const bus =
            card.querySelector(
                "h3"
            ).innerText;

            showToast(
                bus +
                " Live Tracking Opened"
            );
        }
    );
});

/* ==========================
   AI ASSISTANT
========================== */

const aiInput =
document.querySelector(
    ".ai-chat input"
);

const aiChat =
document.querySelector(
    ".ai-chat"
);

if(aiInput){

    aiInput.addEventListener(
        "keypress",
        function(e){

            if(
                e.key === "Enter"
            ){

                const text =
                this.value.trim();

                if(!text) return;

                addUserMessage(
                    text
                );

                this.value = "";

                setTimeout(() => {

                    addAIResponse(
                        text
                    );

                },800);
            }
        }
    );
}

function addUserMessage(text){

    const msg =
    document.createElement(
        "div"
    );

    msg.className =
    "user-message";

    msg.innerHTML =
    text;

    aiChat.insertBefore(
        msg,
        aiInput
    );
}

function addAIResponse(question){

    const response =
    document.createElement(
        "div"
    );

    response.className =
    "ai-message";

    let answer =
    "I can help optimize routes, predict delays and monitor transport performance.";

    const q =
    question.toLowerCase();

    if(
        q.includes("route")
    ){

        answer =
        "Route A currently has the highest student load.";

    }

    else if(
        q.includes("delay")
    ){

        answer =
        "No major delays detected across active routes.";

    }

    else if(
        q.includes("driver")
    ){

        answer =
        "22 drivers are currently assigned to active buses.";

    }

    else if(
        q.includes("bus")
    ){

        answer =
        "22 buses are registered in the transport system.";

    }

    else if(
        q.includes("student")
    ){

        answer =
        "860 students are assigned to transport services.";
    }

    response.innerHTML =
    answer;

    aiChat.insertBefore(
        response,
        aiInput
    );
}

/* ==========================
   SAMPLE NOTIFICATIONS
========================== */

setTimeout(() => {

    showToast(
        "🚌 Bus MH20-001 Departed"
    );

},3000);

setTimeout(() => {

    showToast(
        "📍 Route A Updated"
    );

},7000);

setTimeout(() => {

    showToast(
        "🚦 Traffic Alert Detected"
    );

},11000);

setTimeout(() => {

    showToast(
        "👨‍🎓 Student Pickup Completed"
    );

},15000);

/* ==========================
   TRANSPORT DATA
========================== */

const transportData = {

    buses:22,

    routes:18,

    drivers:22,

    students:860
};

console.log(
    "Transport Module Loaded",
    transportData
);

/* ==========================
   FUTURE API MODULES
========================== */

/*

Future Integrations

fetchBuses()

fetchRoutes()

fetchDrivers()

assignStudents()

liveGPSTracking()

routeOptimization()

fuelAnalytics()

maintenanceSchedules()

parentNotifications()

transportReports()

*/

/* ==========================
   PAGE READY
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showToast(
            "Transport Module Ready 🚌"
        );
    }
);