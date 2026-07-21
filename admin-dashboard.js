/* ==========================================
   MAIAMMA SCHOOL HUB
   ADMIN DASHBOARD JS
========================================== */

import { db } from "./js/firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ==========================
   THEME TOGGLE
========================== */

const themeToggle =
document.getElementById("themeToggle");

const savedTheme =
localStorage.getItem("maiamma-admin-theme");

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
                    "maiamma-admin-theme",
                    "dark"
                );

            }else{

                localStorage.setItem(
                    "maiamma-admin-theme",
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
   TOAST NOTIFICATIONS
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
   SCHOOL STORE TABLE
========================== */

const tableRows =
document.querySelectorAll(
    ".admin-table tbody tr"
);

tableRows.forEach(row => {

    row.addEventListener(
        "click",
        () => {

            const product =
            row.children[0].innerText;

            showToast(
                product +
                " Analytics Loaded"
            );
        }
    );
});

/* ==========================
   ANALYTICS BOXES
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
   AI ADMIN ASSISTANT
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

            if(e.key === "Enter"){

                const text =
                this.value.trim();

                if(!text) return;

                addAdminMessage(
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

function addAdminMessage(text){

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
    "I can help with admissions, finance, transport, inventory, teachers and school analytics.";

    const q =
    question.toLowerCase();

    if(q.includes("admission")){

        answer =
        "45 new admissions received. 32 approved and 13 pending.";

    }

    else if(q.includes("finance")){

        answer =
        "Total fee collection is ₹42.5 Lakhs with ₹5.2 Lakhs pending.";

    }

    else if(q.includes("teacher")){

        answer =
        "85 teachers are registered. 82 are present today.";

    }

    else if(q.includes("student")){

        answer =
        "Current student strength is 1,250.";

    }

    else if(q.includes("transport")){

        answer =
        "22 buses are active across 18 routes.";

    }

    else if(q.includes("store")){

        answer =
        "Books currently generate the highest store revenue.";
    }

    response.innerHTML =
    answer;

    aiChat.insertBefore(
        response,
        aiInput
    );
}

/* ==========================
   KPI CARD INTERACTIONS
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
                " Details Loading..."
            );
        }
    );
});

/* ==========================
   SAMPLE ADMIN ALERTS
========================== */

setTimeout(() => {

    showToast(
        "🎓 New Admission Application Received"
    );

},3000);

setTimeout(() => {

    showToast(
        "💰 Fee Collection Updated"
    );

},7000);

setTimeout(() => {

    showToast(
        "🚌 Transport Report Generated"
    );

},11000);

setTimeout(() => {

    showToast(
        "📊 Monthly Analytics Ready"
    );

},15000);

/* ==========================
   SCHOOL DATA OBJECT
========================== */

const schoolData = {

    schoolName:
    "MAIAMMA School Hub",

    students:
    1250,

    teachers:
    85,

    buses:
    22,

    annualRevenue:
    "₹48 Lakhs",

    performance:
    "98%"
};

console.log(
    "Admin Dashboard Loaded",
    schoolData
);

/* ==========================
   FUTURE ERP MODULES
========================== */

/*

Future Backend APIs

fetchAdmissions()
approveAdmissions()

fetchStudents()
manageStudents()

fetchTeachers()
manageTeachers()

fetchFinance()
generateInvoices()

fetchTransport()
trackBuses()

fetchInventory()
updateInventory()

fetchStoreOrders()

generateAnalytics()

aiAdminReports()

whiteLabelManager()

multiSchoolManagement()

*/

/* ==========================
   PAGE READY
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Admin Dashboard Ready"
        );

        showToast(
            "Welcome Administrator 👑"
        );
    }
);

/* ==========================
   LIVE FIRESTORE STATISTICS
========================== */

async function loadDashboardStats() {

     console.log("🔥 loadDashboardStats started");

    try {

        const studentSnapshot =
            await getDocs(collection(db, "students"));

        console.log(studentSnapshot);
console.log("Students:", studentSnapshot.size);    

        const teacherSnapshot =
            await getDocs(collection(db, "teachers"));

        const totalStudents =
            studentSnapshot.size;

        const totalTeachers =
            teacherSnapshot.size;

        document.getElementById("studentCount").innerText =
            totalStudents;

        document.getElementById("studentCount2").innerText =
            totalStudents;

        document.getElementById("teacherCount").innerText =
            totalTeachers;

        document.getElementById("activeStudentCount").innerText =
            totalStudents;

        document.getElementById("newAdmissionCount").innerText =
            totalStudents;

    }

    catch(error){

        console.error(
            "Dashboard Error:",
            error
        );

    }

}

loadDashboardStats();