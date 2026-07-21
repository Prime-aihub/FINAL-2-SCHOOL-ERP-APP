import { db } from "../js/firebase.js";

import {

doc,
getDoc

}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const teacherId = params.get("id");

async function loadTeacher(){

try{

const teacherRef = doc(db,"teachers",teacherId);

const teacherSnap = await getDoc(teacherRef);

if(!teacherSnap.exists()){

alert("Teacher not found");

window.location.href="teachers.html";

return;

}

const teacher = teacherSnap.data();

document.getElementById("teacherName").textContent =
teacher.teacherName || "-";

document.getElementById("employeeId").textContent =
teacher.employeeId || "-";

document.getElementById("department").textContent =
teacher.department || "-";

document.getElementById("qualification").textContent =
teacher.qualification || "-";

document.getElementById("experience").textContent =
teacher.experience || "-";

document.getElementById("email").textContent =
teacher.email || "-";

document.getElementById("mobile").textContent =
teacher.mobile || "-";

document.getElementById("gender").textContent =
teacher.gender || "-";

document.getElementById("joiningDate").textContent =
teacher.joiningDate || "-";

document.getElementById("address").textContent =
teacher.address || "-";

}

catch(error){

console.error(error);

alert(error.message);

}

}

loadTeacher();