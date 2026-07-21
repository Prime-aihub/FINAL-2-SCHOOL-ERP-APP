/* =====================================
   MAIAMMA STEM ECOSYSTEM
===================================== */

/* =====================================
   THEME SYSTEM
===================================== */

const themeToggle =
document.getElementById("themeToggle");

if(localStorage.getItem("stemTheme")==="light"){

    document.body.classList.add("light");

}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        localStorage.setItem(
            "stemTheme",
            "light"
        );

        showToast(
            "☀ Light Theme Activated"
        );

    }else{

        localStorage.setItem(
            "stemTheme",
            "dark"
        );

        showToast(
            "🌙 Dark Theme Activated"
        );

    }

});

/* =====================================
   HERO BUTTON
===================================== */

const exploreBtn =
document.getElementById("exploreBtn");

if(exploreBtn){

    exploreBtn.addEventListener(
        "click",
        ()=>{

        document
        .querySelector(".program-grid")
        .scrollIntoView({

            behavior:"smooth"

        });

    });

}

/* =====================================
   ANIMATED COUNTERS
===================================== */

function animateCounter(
    elementId,
    target,
    speed=20
){

    const element =
    document.getElementById(
        elementId
    );

    if(!element) return;

    let count = 0;

    const increment =
    Math.ceil(target/100);

    const counter =
    setInterval(()=>{

        count += increment;

        if(count >= target){

            count = target;

            clearInterval(counter);

        }

        element.innerText =
        count.toLocaleString()+"+";

    },speed);

}

window.addEventListener(
"load",
()=>{

    animateCounter(
        "schoolCount",
        250
    );

    animateCounter(
        "studentCount",
        25000,
        5
    );

});

/* =====================================
   PROGRAM CARD CLICK
===================================== */

document
.querySelectorAll(".program-card")
.forEach(card=>{

card.addEventListener(
"click",
()=>{

showToast(

card.querySelector("h3")
.innerText +

" Selected"

);

});

});

/* =====================================
   ANALYTICS CARD CLICK
===================================== */

document
.querySelectorAll(".analytics-card")
.forEach(card=>{

card.addEventListener(
"click",
()=>{

showToast(
"📊 Analytics Loading..."
);

});

});

/* =====================================
   SUCCESS STORIES
===================================== */

document
.querySelectorAll(".success-card")
.forEach(card=>{

card.addEventListener(
"click",
()=>{

showToast(
"🏆 Success Story Opened"
);

});

});

/* =====================================
   AI STEM ADVISOR
===================================== */

const advisorBtn =
document.getElementById(
"advisorBtn"
);

if(advisorBtn){

advisorBtn.addEventListener(
"click",
askAdvisor
);

}

function askAdvisor(){

const input =
document.getElementById(
"advisorInput"
);

if(!input){

return;

}

const question =
input.value.trim();

if(question===""){

showToast(
"Please enter a question"
);

return;

}

let response =
"";

if(
question.toLowerCase()
.includes("ai")
){

response =
"🤖 Recommended: AI Starter Kit + Machine Learning Kit";

}
else if(
question.toLowerCase()
.includes("drone")
){

response =
"🛸 Recommended: Drone Assembly Kit + Flight Training Kit";

}
else if(
question.toLowerCase()
.includes("space")
){

response =
"🚀 Recommended: Astronomy Kit + Rocketry Kit";

}
else if(
question.toLowerCase()
.includes("robot")
){

response =
"🔧 Recommended: Arduino Kit + Robotics Lab Kit";

}
else{

response =
"🌟 Recommended: Complete STEM Innovation Package";

}

showToast(response);

input.value="";

}

/* =====================================
   TABLE INTERACTION
===================================== */

document
.querySelectorAll("tbody tr")
.forEach(row=>{

row.addEventListener(
"click",
()=>{

showToast(
"📦 Order Details Viewed"
);

});

});

/* =====================================
   TOAST SYSTEM
===================================== */

function showToast(message){

const toast =
document.getElementById(
"toast"
);

if(!toast) return;

toast.innerText =
message;

toast.style.display =
"block";

setTimeout(()=>{

toast.style.display =
"none";

},3000);

}

/* =====================================
   STEM DASHBOARD READY
===================================== */

window.addEventListener(
"DOMContentLoaded",
()=>{

console.log(
"MAIAMMA STEM Ecosystem Ready"
);

showToast(
"🚀 STEM Ecosystem Loaded"
);

});
