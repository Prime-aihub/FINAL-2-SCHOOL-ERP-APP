const toggle =
document.getElementById("themeToggle");

const savedTheme =
localStorage.getItem("theme");

if(savedTheme){

    document.documentElement
    .setAttribute("data-theme",savedTheme);

    toggle.innerHTML =
    savedTheme === "dark"
    ? "☀️"
    : "🌙";
}

toggle.addEventListener("click",()=>{

    const current =
    document.documentElement
    .getAttribute("data-theme");

    const next =
    current === "dark"
    ? "light"
    : "dark";

    document.documentElement
    .setAttribute("data-theme",next);

    localStorage
    .setItem("theme",next);

    toggle.innerHTML =
    next === "dark"
    ? "☀️"
    : "🌙";

});