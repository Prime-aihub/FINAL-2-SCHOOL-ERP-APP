import { db } from "../js/firebase.js";

import {

doc,
getDoc,
updateDoc

}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const teacherId =
new URLSearchParams(window.location.search).get("id");

const teacherForm =
document.getElementById("teacherForm");

async function loadTeacher(){

const ref=
doc(db,"teachers",teacherId);

const snap=
await getDoc(ref);

if(!snap.exists()){

alert("Teacher not found");

window.location.href="teachers.html";

return;

}

const teacher=snap.data();

teacherName.value=teacher.teacherName||"";
employeeId.value=teacher.employeeId||"";
department.value=teacher.department||"";
qualification.value=teacher.qualification||"";
experience.value=teacher.experience||"";
mobile.value=teacher.mobile||"";
email.value=teacher.email||"";
gender.value=teacher.gender||"Male";
joiningDate.value=teacher.joiningDate||"";
address.value=teacher.address||"";

}

teacherForm.addEventListener("submit",async(e)=>{

e.preventDefault();

await updateDoc(doc(db,"teachers",teacherId),{

teacherName:teacherName.value,
employeeId:employeeId.value,
department:department.value,
qualification:qualification.value,
experience:experience.value,
mobile:mobile.value,
email:email.value,
gender:gender.value,
joiningDate:joiningDate.value,
address:address.value

});

alert("Teacher Updated Successfully");

window.location.href="teachers.html";

});

loadTeacher();