/* ==========================================
   MAIAMMA SCHOOL HUB
   SUPER ADMIN DASHBOARD JS
========================================== */

/* ==========================
   THEME TOGGLE
========================== */

const themeToggle =
document.getElementById("themeToggle");

const savedTheme =
localStorage.getItem(
    "maiamma-super-admin-theme"
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
                    "maiamma-super-admin-theme",
                    "dark"
                );

            }else{

                localStorage.setItem(
                    "maiamma-super-admin-theme",
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
   SIDEBAR ACTIVE MENU
========================== */

const menuItems =
document.querySelectorAll(
    ".sidebar-menu li"
);

menuItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            menuItems.forEach(menu => {

                menu.classList.remove(
                    "active"
                );

            });

            item.classList.add(
                "active"
            );
        }
    );
});

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
   BUTTON ACTIONS
========================== */

const buttons =
document.querySelectorAll(
    ".action-btn"
);

buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showToast(
                button.innerText +
                " Opened"
            );
        }
    );
});

/* ==========================
   KPI CARD ACTIONS
========================== */

const statCards =
document.querySelectorAll(
    ".stat-card"
);

statCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const title =
            card.querySelector("p")
            .innerText;

            showToast(
                title +
                " Analytics Loading..."
            );
        }
    );
});

/* ==========================
   TABLE ROW ACTIONS
========================== */

const schoolRows =
document.querySelectorAll(
    ".super-table tbody tr"
);

schoolRows.forEach(row => {

    row.addEventListener(
        "click",
        () => {

            const school =
            row.children[0].innerText;

            showToast(
                school +
                " Profile Opened"
            );
        }
    );
});

/* ==========================
   ANALYTICS BOX ACTIONS
========================== */

const analyticsBoxes =
document.querySelectorAll(
    ".analytics-box"
);

analyticsBoxes.forEach(box => {

    box.addEventListener(
        "click",
        () => {

            showToast(
                box.innerText
            );
        }
    );
});

/* ==========================
   AI SUPER ADMIN
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
    "I can help with schools, subscriptions, revenue, AI analytics and white-label operations.";

    const q =
    question.toLowerCase();

    if(
        q.includes("revenue")
    ){

        answer =
        "Platform revenue has grown 18% this quarter.";

    }

    else if(
        q.includes("school")
    ){

        answer =
        "245 schools are currently active on the platform.";

    }

    else if(
        q.includes("subscription")
    ){

        answer =
        "11 subscription renewals are due this month.";

    }

    else if(
        q.includes("ai")
    ){

        answer =
        "AI Tutor is currently the most used AI service.";

    }

    else if(
        q.includes("stem")
    ){

        answer =
        "STEM ecosystem orders increased by 23% this quarter.";
    }

    response.innerHTML =
    answer;

    aiChat.insertBefore(
        response,
        aiInput
    );
}

/* ==========================
   PLATFORM ALERTS
========================== */

setTimeout(() => {

    showToast(
        "🏫 New School Registration Received"
    );

},3000);

setTimeout(() => {

    showToast(
        "💰 Monthly Revenue Report Ready"
    );

},7000);

setTimeout(() => {

    showToast(
        "🤖 AI Usage Analytics Updated"
    );

},11000);

setTimeout(() => {

    showToast(
        "🎨 White Label Deployment Completed"
    );

},15000);

/* ==========================
   PLATFORM DATA
========================== */

const platformData = {

    schools:245,

    students:185420,

    teachers:12845,

    annualRevenue:"₹2.8 Cr",

    aiSessions:85600,

    stemOrders:1280,

    websites:188
};

console.log(
    "Super Admin Dashboard Loaded",
    platformData
);

/* ==========================
   FUTURE MODULES
========================== */

/*

Future Integrations

manageSchools()
manageSubscriptions()

whiteLabelManager()

domainManager()

websiteBuilder()

manageRevenue()

manageAIEcosystem()

manageSTEMOrders()

manageInventory()

platformAnalytics()

auditLogs()

rolePermissions()

superAdminInsights()

*/

/* ==========================
   PAGE READY
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Super Admin Dashboard Ready"
        );

        showToast(
            "Welcome Super Admin 👑"
        );
    }
);