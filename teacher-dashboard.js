/* ==========================================
   MAIAMMA SCHOOL HUB
   TEACHER DASHBOARD JS
========================================== */

/* ==========================
   THEME TOGGLE
========================== */

const themeToggle =
document.getElementById("themeToggle");

const savedTheme =
localStorage.getItem("maiamma-teacher-theme");

if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    updateThemeIcon();
}

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );

            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {

                localStorage.setItem(
                    "maiamma-teacher-theme",
                    "dark"
                );

            } else {

                localStorage.setItem(
                    "maiamma-teacher-theme",
                    "light"
                );
            }

            updateThemeIcon();
        }
    );
}

function updateThemeIcon() {

    const icon =
    document.querySelector(
        "#themeToggle i"
    );

    if (!icon) return;

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        icon.classList.remove(
            "fa-moon"
        );

        icon.classList.add(
            "fa-sun"
        );

    } else {

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
   TOAST NOTIFICATION
========================== */

function showToast(message) {

    const toast =
    document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    }, 100);

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3500);
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
                " Activated"
            );
        }
    );
});

/* ==========================
   AI TEACHER ASSISTANT
========================== */

const aiInput =
document.querySelector(
    ".ai-chat input"
);

const aiChat =
document.querySelector(
    ".ai-chat"
);

if (aiInput) {

    aiInput.addEventListener(
        "keypress",
        function(e){

            if (
                e.key === "Enter"
            ) {

                const text =
                this.value.trim();

                if (!text) return;

                addTeacherMessage(
                    text
                );

                this.value = "";

                setTimeout(() => {

                    addAIResponse(
                        text
                    );

                }, 800);
            }
        }
    );
}

function addTeacherMessage(text){

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
    "I can help with attendance, lesson planning, reports and parent communication.";

    const q =
    question.toLowerCase();

    if (
        q.includes("attendance")
    ) {

        answer =
        "Today's attendance rate is 96%. Two students are absent.";

    }

    else if (
        q.includes("lesson")
    ) {

        answer =
        "Suggested lesson: Interactive Science Activity with group discussion.";

    }

    else if (
        q.includes("report")
    ) {

        answer =
        "Generate performance reports based on attendance and exam results.";

    }

    else if (
        q.includes("homework")
    ) {

        answer =
        "12 homework assignments are currently active.";

    }

    else if (
        q.includes("exam")
    ) {

        answer =
        "Next exam is Science on 15 July.";
    }

    response.innerHTML =
    answer;

    aiChat.insertBefore(
        response,
        aiInput
    );
}

/* ==========================
   TABLE ROW INTERACTION
========================== */

const tableRows =
document.querySelectorAll(
    ".report-table tbody tr"
);

tableRows.forEach(row => {

    row.addEventListener(
        "click",
        () => {

            const student =
            row.children[0].innerText;

            showToast(
                student +
                " Report Selected"
            );
        }
    );
});

/* ==========================
   DASHBOARD DATA
========================== */

import { auth, db } from "./js/firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    const teacherRef = doc(db, "teachers", user.uid);

console.log("Logged in UID:", user.uid);

const teacherDoc = await getDoc(teacherRef);

console.log("Document exists:", teacherDoc.exists());

if (!teacherDoc.exists()) {

    alert("Teacher profile not found.");

    console.log("No document found in teachers collection.");

    return;

}

const teacher = teacherDoc.data();

console.log("Teacher Data:", teacher);

    const photo =
    teacher.photo || "images/default-teacher.png";

document.getElementById("teacherPhoto").src = photo;
document.getElementById("topTeacherPhoto").src = photo;

    document.querySelector("h1").innerText =
        "Teacher Dashboard";

    document.getElementById("welcomeTeacher").innerHTML =
    `Welcome Back, ${teacher.teacherName} 👋`;

document.getElementById("topTeacherName").innerText =
    teacher.teacherName;

document.getElementById("topTeacherClass").innerText =
    "Class Teacher - " + (teacher.classTeacher || "-");

document.getElementById("teacherName").innerText =
    teacher.teacherName;

document.getElementById("teacherDepartment").innerText =
    teacher.department;

document.getElementById("teacherClass").innerText =
    teacher.classTeacher || "-";

document.getElementById("teacherStudents").innerText =
    teacher.totalStudents || 0;

document.getElementById("teacherExperience").innerText =
    teacher.experience || "-";


    // ===== Dashboard Cards =====

document.getElementById("teacherName").innerText =
    teacher.teacherName;

document.getElementById("teacherDepartment").innerText =
    teacher.department;

document.getElementById("teacherClass").innerText =
    teacher.classTeacher || "-";

document.getElementById("teacherStudents").innerText =
    teacher.totalStudents || 0;

document.getElementById("teacherExperience").innerText =
    teacher.experience || "-";
    
});
/* ==========================
   SAMPLE NOTIFICATIONS
========================== */

setTimeout(() => {

    showToast(
        "📚 New Homework Submission Received"
    );

}, 3000);

setTimeout(() => {

    showToast(
        "📝 Exam Schedule Updated"
    );

}, 7000);

setTimeout(() => {

    showToast(
        "👨‍👩‍👧 Parent Message Received"
    );

}, 11000);

/* ==========================
   FUTURE API PLACEHOLDERS
========================== */

/*

Future Integrations

fetchAttendance()
submitAttendance()

createHomework()
updateHomework()

createExam()
publishResults()

sendParentMessage()

generateReports()

aiLessonPlanner()

*/

/* ==========================
   PAGE READY
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Teacher Dashboard Ready"
        );

        showToast(
            "Welcome Back Teacher 👩‍🏫"
        );
    }
);