import { db } from "../js/firebase.js";

import {

collection,
getDocs,
deleteDoc,
doc

}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const teacherTableBody =
document.getElementById("teacherTableBody");

const searchTeacher =
document.getElementById("searchTeacher");

let teachers=[];

async function loadTeachers(){

teacherTableBody.innerHTML="";

const snapshot=
await getDocs(collection(db,"teachers"));

teachers=[];

snapshot.forEach(docSnap=>{

teachers.push({

id:docSnap.id,

...docSnap.data()

});

});

displayTeachers(teachers);

}

function displayTeachers(data){

teacherTableBody.innerHTML="";

data.forEach(teacher=>{

teacherTableBody.innerHTML+=`

<tr>

<td>${teacher.employeeId||""}</td>

<td>${teacher.teacherName||""}</td>

<td>${teacher.department||""}</td>

<td>${teacher.email||""}</td>

<td>${teacher.mobile||""}</td>

<td>

<button class="actionBtn view"

onclick="window.location='teacher-profile.html?id=${teacher.id}'">

<i class="fas fa-eye"></i>

</button>

<button class="actionBtn edit"

onclick="window.location='edit-teacher.html?id=${teacher.id}'">

<i class="fas fa-edit"></i>

</button>

<button class="actionBtn delete"

onclick="deleteTeacher('${teacher.id}')">

<i class="fas fa-trash"></i>

</button>

</td>

</tr>

`;

});

}

window.deleteTeacher=async(id)=>{

if(confirm("Delete Teacher?")){

await deleteDoc(doc(db,"teachers",id));

loadTeachers();

}

};

searchTeacher.addEventListener("keyup",()=>{

const value=

searchTeacher.value.toLowerCase();

const filtered=

teachers.filter(t=>

(t.teacherName||"").toLowerCase().includes(value)||

(t.employeeId||"").toLowerCase().includes(value)||

(t.department||"").toLowerCase().includes(value)||

(t.email||"").toLowerCase().includes(value)

);

displayTeachers(filtered);

});

loadTeachers();