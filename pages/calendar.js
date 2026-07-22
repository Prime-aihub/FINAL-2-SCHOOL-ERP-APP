/* ==========================================
   MAIAMMA SCHOOL HUB
   CALENDAR JS
========================================== */

const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

/* ===========================
   HOLIDAYS
=========================== */

const holidays = {

    "2026-0-26":{
        title:"Republic Day",
        date:"26 January 2026",
        image:"../images/republic.jpg",
        icon:"🇮🇳",
        description:"National Holiday"
    },

    "2026-7-15":{
        title:"Independence Day",
        date:"15 August 2026",
        image:"../images/independence.jpg",
        icon:"🇮🇳",
        description:"National Holiday"
    },

    "2026-7-27":{
        title:"Ganesh Chaturthi",
        date:"27 August 2026",
        image:"../images/ganesh.jpg",
        icon:"🪔",
        description:"Public Holiday"
    },

    "2026-9-2":{
        title:"Gandhi Jayanti",
        date:"02 October 2026",
        image:"../images/gandhi.jpg",
        icon:"🙏",
        description:"National Holiday"
    },

    "2026-9-20":{
        title:"Diwali",
        date:"20 October 2026",
        image:"../images/diwali.jpg",
        icon:"🪔",
        description:"Festival Holiday"
    },

    "2026-11-25":{
        title:"Christmas",
        date:"25 December 2026",
        image:"../images/christmas.jpg",
        icon:"🎄",
        description:"Festival Holiday"
    }

};

/* ===========================
   MONTHS
=========================== */

const months=[

"January","February","March","April",
"May","June","July","August",
"September","October","November","December"

];

/* ===========================
   CALENDAR
=========================== */

function renderCalendar(){

    calendarDays.innerHTML="";

    monthYear.innerHTML=
    months[currentMonth]+" "+currentYear;

    const firstDay=
    new Date(currentYear,currentMonth,1).getDay();

    const totalDays=
    new Date(currentYear,currentMonth+1,0).getDate();

    for(let i=0;i<firstDay;i++){

        calendarDays.innerHTML+="<div></div>";

    }

    for(let day=1;day<=totalDays;day++){

        const box=document.createElement("div");

        box.innerHTML=day;

        const key=
        currentYear+"-"+currentMonth+"-"+day;

        if(
        day===today.getDate() &&
        currentMonth===today.getMonth() &&
        currentYear===today.getFullYear()
        ){

            box.classList.add("today");

        }

        if(holidays[key]){

            box.classList.add("holiday");

            box.innerHTML=
            day+
            "<span class='event-icon'>"+
            holidays[key].icon+
            "</span>";

            box.onclick=()=>showHoliday(key);

        }

        calendarDays.appendChild(box);

    }

}

/* ===========================
   POPUP
=========================== */

const popup=document.getElementById("popup");

function showHoliday(key){

    document.getElementById("popupImage").src=
    holidays[key].image;

    document.getElementById("popupTitle").innerHTML=
    holidays[key].icon+" "+holidays[key].title;

    document.getElementById("popupDate").innerHTML=
    holidays[key].date;

    document.getElementById("popupDescription").innerHTML=
    holidays[key].description;

    popup.style.display="flex";

}

document
.getElementById("closePopup")
.onclick=()=>{

    popup.style.display="none";

};

popup.onclick=(e)=>{

    if(e.target===popup){

        popup.style.display="none";

    }

};

/* ===========================
   MONTH BUTTONS
=========================== */

document
.getElementById("prevMonth")
.onclick=()=>{

    currentMonth--;

    if(currentMonth<0){

        currentMonth=11;
        currentYear--;

    }

    renderCalendar();

};

document
.getElementById("nextMonth")
.onclick=()=>{

    currentMonth++;

    if(currentMonth>11){

        currentMonth=0;
        currentYear++;

    }

    renderCalendar();

};

/* ===========================
   THEME
=========================== */

const themeBtn=
document.getElementById("themeToggle");

themeBtn.onclick=()=>{

    document.body.classList.toggle("dark-mode");

    themeBtn.innerHTML=

    document.body.classList.contains("dark-mode")

    ?"<i class='fas fa-sun'></i>"

    :"<i class='fas fa-moon'></i>";

};

/* ===========================
   START
=========================== */

renderCalendar();
