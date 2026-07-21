/* ==========================================
   MAIAMMA SCHOOL HUB
   ADMISSIONS MANAGEMENT JS
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

    },3000);
}

/* ==========================
   APPROVE BUTTONS
========================== */

const approveButtons =
document.querySelectorAll(
    ".approve-btn"
);

approveButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const row =
            button.closest("tr");

            const status =
            row.querySelector(".status");

            status.innerText =
            "Approved";

            status.classList.remove(
                "pending"
            );

            status.classList.add(
                "approved"
            );

            showToast(
                "Admission Approved ✅"
            );
        }
    );
});

/* ==========================
   REJECT BUTTONS
========================== */

const rejectButtons =
document.querySelectorAll(
    ".reject-btn"
);

rejectButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const row =
            button.closest("tr");

            const status =
            row.querySelector(".status");

            status.innerText =
            "Rejected";

            status.classList.remove(
                "pending"
            );

            status.classList.add(
                "rejected"
            );

            showToast(
                "Admission Rejected ❌"
            );
        }
    );
});

/* ==========================
   VIEW BUTTONS
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

            const studentName =
            row.children[1].innerText;

            showToast(
                studentName +
                " Profile Opened"
            );
        }
    );
});

/* ==========================
   NEW ADMISSION
========================== */

const addBtn =
document.querySelector(
    ".add-btn"
);

if(addBtn){

    addBtn.addEventListener(
        "click",
        () => {

            showToast(
                "New Admission Form Opening..."
            );
        }
    );
}

/* ==========================
   SEARCH FILTER
========================== */

const searchInput =
document.querySelector(
    ".filter-card input"
);

if(searchInput){

    searchInput.addEventListener(
        "keyup",
        () => {

            const filter =
            searchInput.value
            .toLowerCase();

            const rows =
            document.querySelectorAll(
                ".admission-table tbody tr"
            );

            rows.forEach(row => {

                const text =
                row.innerText
                .toLowerCase();

                if(
                    text.includes(filter)
                ){

                    row.style.display =
                    "";

                }else{

                    row.style.display =
                    "none";
                }
            });
        }
    );
}

/* ==========================
   TABLE ROW CLICK
========================== */

const rows =
document.querySelectorAll(
    ".admission-table tbody tr"
);

rows.forEach(row => {

    row.addEventListener(
        "click",
        () => {

            const student =
            row.children[1].innerText;

            console.log(
                "Selected:",
                student
            );
        }
    );
});

/* ==========================
   ADMISSION DATA
========================== */

const admissionStats = {

    totalApplications:245,

    pending:38,

    approved:172,

    rejected:35
};

console.log(
    "Admissions Module Loaded",
    admissionStats
);

/* ==========================
   FUTURE API MODULES
========================== */

/*

Future Backend Functions

fetchAdmissions()

approveAdmission()

rejectAdmission()

verifyDocuments()

scheduleInterview()

generateAdmissionID()

convertToStudent()

sendParentNotification()

exportAdmissions()

*/

/* ==========================
   PAGE READY
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showToast(
            "Admissions Module Ready 🎓"
        );
    }
);