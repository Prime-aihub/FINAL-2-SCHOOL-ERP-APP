/* =====================================
   THEME SYSTEM
===================================== */

const themeToggle =
document.getElementById("themeToggle");

if(localStorage.getItem("quizTheme")==="light"){
    document.body.classList.add("light");
}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
        localStorage.setItem("quizTheme","light");
        showToast("☀ Light Theme Activated");
    }else{
        localStorage.setItem("quizTheme","dark");
        showToast("🌙 Dark Theme Activated");
    }

});

/* =====================================
   QUIZ DATA
===================================== */

const quizData = {

iq:[

{
question:"Which number comes next? 2, 4, 8, 16, ?",
options:["20","24","32","64"],
answer:"32"
},

{
question:"If all roses are flowers, all flowers are plants. Roses are?",
options:["Plants","Trees","Animals","Fruits"],
answer:"Plants"
},

{
question:"Which shape has 8 sides?",
options:["Hexagon","Octagon","Pentagon","Heptagon"],
answer:"Octagon"
},

{
question:"What is half of 100?",
options:["25","40","50","60"],
answer:"50"
},

{
question:"Which is the odd one out?",
options:["Dog","Cat","Lion","Car"],
answer:"Car"
},

{
question:"Which month has 28 days?",
options:["February","All Months","June","December"],
answer:"All Months"
},

{
question:"5 x 5 + 5 = ?",
options:["25","30","35","20"],
answer:"30"
},

{
question:"Mirror of LEFT?",
options:["RIGHT","LEFT","UP","DOWN"],
answer:"RIGHT"
},

{
question:"Complete: A,C,E,G,?",
options:["I","J","K","L"],
answer:"I"
},

{
question:"Which is largest?",
options:["1","100","1000","10"],
answer:"1000"
}

],

logical:[

{
question:"If A>B and B>C then?",
options:["A>C","A<C","B>A","C>A"],
answer:"A>C"
},

{
question:"Find next: 1,3,5,7,?",
options:["8","9","10","11"],
answer:"9"
},

{
question:"Sun rises in?",
options:["West","East","North","South"],
answer:"East"
},

{
question:"Logical opposite of Hot?",
options:["Warm","Cold","Boiling","Dry"],
answer:"Cold"
},

{
question:"Which does not belong?",
options:["Apple","Banana","Car","Orange"],
answer:"Car"
},

{
question:"Which is a mammal?",
options:["Shark","Whale","Fish","Snake"],
answer:"Whale"
},

{
question:"What comes after Tuesday?",
options:["Friday","Wednesday","Monday","Sunday"],
answer:"Wednesday"
},

{
question:"2+2x2=?",
options:["8","6","4","2"],
answer:"6"
},

{
question:"Odd number?",
options:["2","4","8","7"],
answer:"7"
},

{
question:"Capital of India?",
options:["Mumbai","Delhi","Pune","Jaipur"],
answer:"Delhi"
}

],

aptitude:[
{
question:"10% of 200?",
options:["10","20","30","40"],
answer:"20"
},
{
question:"25 x 4?",
options:["50","100","75","125"],
answer:"100"
},
{
question:"15+35?",
options:["40","45","50","55"],
answer:"50"
},
{
question:"100/5?",
options:["10","20","30","40"],
answer:"20"
},
{
question:"Square of 12?",
options:["144","124","132","120"],
answer:"144"
},
{
question:"20% of 500?",
options:["50","100","150","200"],
answer:"100"
},
{
question:"7x8?",
options:["54","56","64","48"],
answer:"56"
},
{
question:"9²=?",
options:["81","72","90","99"],
answer:"81"
},
{
question:"1000-250?",
options:["650","700","750","800"],
answer:"750"
},
{
question:"5³=?",
options:["100","125","150","75"],
answer:"125"
}

],

puzzle:[

{
question:"I have keys but no locks. I have space but no room. What am I?",
options:["Keyboard","House","Car","Phone"],
answer:"Keyboard"
},

{
question:"What has hands but cannot clap?",
options:["Clock","Robot","Monkey","Toy"],
answer:"Clock"
},

{
question:"What gets wetter as it dries?",
options:["Towel","Water","Rain","Soap"],
answer:"Towel"
},

{
question:"Which word becomes shorter when you add two letters?",
options:["Short","Long","Small","Tall"],
answer:"Short"
},

{
question:"What comes once in a minute, twice in a moment, never in a thousand years?",
options:["M","A","T","N"],
answer:"M"
},

{
question:"What has one eye but cannot see?",
options:["Needle","Cat","Cyclops","Camera"],
answer:"Needle"
},

{
question:"Forward I am heavy, backward I am not. What am I?",
options:["Ton","Stone","Rock","Iron"],
answer:"Ton"
},

{
question:"What has a neck but no head?",
options:["Bottle","Shirt","Snake","Tree"],
answer:"Bottle"
},

{
question:"Which month has 28 days?",
options:["February","All Months","January","June"],
answer:"All Months"
},

{
question:"What has four wheels and flies?",
options:["Garbage Truck","Car","Bus","Train"],
answer:"Garbage Truck"
}

],

brain:[

{
question:"What is 11 × 11?",
options:["111","121","131","141"],
answer:"121"
},

{
question:"If today is Monday, what day comes after 10 days?",
options:["Thursday","Friday","Saturday","Sunday"],
answer:"Thursday"
},

{
question:"Which number is missing? 2,4,6,8,?",
options:["9","10","12","14"],
answer:"10"
},

{
question:"How many sides do two triangles have together?",
options:["5","6","7","8"],
answer:"6"
},

{
question:"Which is fastest?",
options:["Light","Sound","Train","Car"],
answer:"Light"
},

{
question:"What is the square root of 81?",
options:["8","9","10","11"],
answer:"9"
},

{
question:"5+5+5+5=?",
options:["15","20","25","30"],
answer:"20"
},

{
question:"Which is bigger?",
options:["0.9","0.99","0.999","0.9999"],
answer:"0.9999"
},

{
question:"How many hours in 2 days?",
options:["24","36","48","72"],
answer:"48"
},

{
question:"What is half of 90?",
options:["35","40","45","50"],
answer:"45"
}

],

stem:[

{
question:"STEM stands for?",
options:[
"Science Technology Engineering Mathematics",
"Science Teaching English Math",
"Study Tech Engineering Model",
"None"
],
answer:"Science Technology Engineering Mathematics"
},

{
question:"Water freezes at?",
options:["0°C","10°C","50°C","100°C"],
answer:"0°C"
},

{
question:"Planet known as Red Planet?",
options:["Earth","Mars","Venus","Jupiter"],
answer:"Mars"
},

{
question:"Robot is controlled by?",
options:["Programming","Magic","Fuel","Paint"],
answer:"Programming"
},

{
question:"Which gas do plants absorb?",
options:["Oxygen","Hydrogen","Carbon Dioxide","Nitrogen"],
answer:"Carbon Dioxide"
},

{
question:"How many planets in solar system?",
options:["7","8","9","10"],
answer:"8"
},

{
question:"Which is a renewable energy source?",
options:["Coal","Solar","Diesel","Petrol"],
answer:"Solar"
},

{
question:"CPU means?",
options:[
"Central Processing Unit",
"Computer Power Unit",
"Central Program Unit",
"Control Processing Unit"
],
answer:"Central Processing Unit"
},

{
question:"Largest organ in human body?",
options:["Heart","Skin","Brain","Liver"],
answer:"Skin"
},

{
question:"Which science studies living things?",
options:["Physics","Chemistry","Biology","Astronomy"],
answer:"Biology"
}

],

ai:[

{
question:"AI stands for?",
options:[
"Artificial Intelligence",
"Automated Internet",
"Advanced Interface",
"Artificial Integration"
],
answer:"Artificial Intelligence"
},

{
question:"ChatGPT is an example of?",
options:[
"AI Assistant",
"Calculator",
"Browser",
"Operating System"
],
answer:"AI Assistant"
},

{
question:"AI learns from?",
options:[
"Data",
"Magic",
"Electricity",
"Paint"
],
answer:"Data"
},

{
question:"Which company created ChatGPT?",
options:[
"Google",
"Microsoft",
"OpenAI",
"Apple"
],
answer:"OpenAI"
},

{
question:"AI can help in?",
options:[
"Education",
"Healthcare",
"Business",
"All of These"
],
answer:"All of These"
},

{
question:"Machine Learning is a part of?",
options:[
"AI",
"Math",
"Physics",
"Biology"
],
answer:"AI"
},

{
question:"AI chatbot communicates using?",
options:[
"Language",
"Fuel",
"Paint",
"Wood"
],
answer:"Language"
},

{
question:"AI uses patterns in?",
options:[
"Data",
"Water",
"Food",
"Paper"
],
answer:"Data"
},

{
question:"Which field uses AI heavily?",
options:[
"Robotics",
"Agriculture",
"Medicine",
"All of These"
],
answer:"All of These"
},

{
question:"Future technology?",
options:[
"AI",
"Stone Tools",
"Typewriter",
"Cassette"
],
answer:"AI"
}

],

space:[

{
question:"Closest star to Earth?",
options:[
"Sun",
"Sirius",
"Polaris",
"Alpha Centauri"
],
answer:"Sun"
},

{
question:"First man on Moon?",
options:[
"Neil Armstrong",
"Buzz Aldrin",
"Yuri Gagarin",
"Kalpana Chawla"
],
answer:"Neil Armstrong"
},

{
question:"Earth is the ___ planet from Sun.",
options:["2nd","3rd","4th","5th"],
answer:"3rd"
},

{
question:"Largest planet?",
options:[
"Earth",
"Mars",
"Jupiter",
"Saturn"
],
answer:"Jupiter"
},

{
question:"Galaxy containing Earth?",
options:[
"Milky Way",
"Andromeda",
"Whirlpool",
"Sombrero"
],
answer:"Milky Way"
},

{
question:"Planet with rings?",
options:[
"Saturn",
"Mars",
"Venus",
"Mercury"
],
answer:"Saturn"
},

{
question:"ISRO belongs to?",
options:[
"India",
"USA",
"Russia",
"Japan"
],
answer:"India"
},

{
question:"Moon revolves around?",
options:[
"Earth",
"Sun",
"Mars",
"Venus"
],
answer:"Earth"
},

{
question:"Astronomy studies?",
options:[
"Space",
"Animals",
"Plants",
"Chemicals"
],
answer:"Space"
},

{
question:"Rocket launches into?",
options:[
"Ocean",
"Space",
"Forest",
"Desert"
],
answer:"Space"
}

]

};



/* =====================================
   VARIABLES
===================================== */

let currentCategory = "";
let currentQuestion = 0;
let score = 0;
let timer = 30;
let interval = null;

/* =====================================
   ELEMENTS
===================================== */

const questionText =
document.getElementById("questionText");

const answersContainer =
document.getElementById("answersContainer");

const timerDisplay =
document.getElementById("timer");

const scoreDisplay =
document.getElementById("score");

const levelDisplay =
document.getElementById("level");

const consoleOutput =
document.getElementById("consoleOutput");

const progressFill =
document.getElementById("progressFill");

const nextBtn =
document.getElementById("nextBtn");

/* =====================================
   CATEGORY CLICK
===================================== */

document
.querySelectorAll(".challenge-card")
.forEach(card=>{

card.addEventListener("click",()=>{

currentCategory =
card.dataset.category;

currentQuestion = 0;
score = 0;

scoreDisplay.innerText = score;

startQuiz();

});

});

/* =====================================
   START QUIZ
===================================== */

function startQuiz(){

showQuestion();

}

/* =====================================
   SHOW QUESTION
===================================== */

function showQuestion(){

clearInterval(interval);

const data =
quizData[currentCategory];

const q =
data[currentQuestion];

questionText.innerText =
q.question;

answersContainer.innerHTML = "";

q.options.forEach(option=>{

const btn =
document.createElement("button");

btn.classList.add("answer-btn");

btn.innerText = option;

btn.onclick = ()=>checkAnswer(
option,
q.answer
);

answersContainer.appendChild(btn);

});

timer = 30;

timerDisplay.innerText = timer;

interval =
setInterval(updateTimer,1000);

updateProgress();

}

/* =====================================
   TIMER
===================================== */

function updateTimer(){

timer--;

timerDisplay.innerText = timer;

if(timer<=0){

clearInterval(interval);

consoleOutput.innerHTML =
"⌛ Time Up!";

nextQuestion();

}

}

/* =====================================
   CHECK ANSWER
===================================== */

function checkAnswer(selected,correct){

clearInterval(interval);

if(selected===correct){

score += 5;

scoreDisplay.innerText = score;

consoleOutput.innerHTML =
"✅ AWESOME! Correct Answer";

showToast("Correct +5");

}else{

consoleOutput.innerHTML =
"❌ WRONG Answer";
}

updateLevel();

}

/* =====================================
   LEVEL SYSTEM
===================================== */

function updateLevel(){

let level = 1;

if(score>=10) level=2;
if(score>=20) level=3;
if(score>=30) level=4;
if(score>=40) level=5;
if(score>=50) level=6;

levelDisplay.innerText =
level;

}

/* =====================================
   NEXT QUESTION
===================================== */

nextBtn.addEventListener(
"click",
nextQuestion
);

function nextQuestion(){

currentQuestion++;

const data =
quizData[currentCategory];

if(currentQuestion>=data.length){

finishQuiz();
return;
}

showQuestion();

}

/* =====================================
   PROGRESS
===================================== */

function updateProgress(){

const data =
quizData[currentCategory];

const percent =
((currentQuestion+1)
/data.length)*100;

progressFill.style.width =
percent+"%";

}

/* =====================================
   FINISH QUIZ
===================================== */

function finishQuiz(){

document
.getElementById("resultSection")
.style.display="block";

document
.getElementById("finalScore")
.innerText =
score + " Points";

document
.getElementById("resultMessage")
.innerText =
"Excellent Work!";

}

/* =====================================
   TOAST
===================================== */

function showToast(message){

const toast =
document.getElementById("toast");

toast.innerText = message;

toast.style.display = "block";

setTimeout(()=>{

toast.style.display = "none";

},2500);

}

/* =====================================
   AI ASSISTANT
===================================== */

function askAI(){

const text =
document.getElementById("aiInput").value;

if(text===""){
showToast("Enter Question");
return;
}

showToast(
"AI Tutor Processing..."
);

}

