// Theme System

const themeToggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
        ? "dark"
        : "light"
    );

    showToast("Theme Updated");
});

// Toast

function showToast(message){

    const toast = document.getElementById("toast");

    toast.innerText = message;
    toast.style.display = "block";

    setTimeout(()=>{
        toast.style.display = "none";
    },3000);
}

// Category Clicks

document.querySelectorAll(".category-card")
.forEach(card=>{

    card.addEventListener("click",()=>{

        showToast(card.innerText + " Opened");
    });
});

// AI Assistant

function askAI(){

    const question =
        document.getElementById("aiInput").value;

    if(question===""){
        showToast("Enter a question");
        return;
    }

    showToast("AI Assistant Processing...");
}