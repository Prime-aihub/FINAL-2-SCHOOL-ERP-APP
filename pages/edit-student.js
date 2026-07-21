import { db } from "../js/firebase.js";

import {

doc,
getDoc,
updateDoc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const ref = doc(db,"students",id);

const snap = await getDoc(ref);

if(snap.exists()){

const student = snap.data();

document.getElementById("admissionNo").value =
student.admissionNo || "";

document.getElementById("name").value =
student.name || student.studentName || "";

document.getElementById("studentClass").value =
student.class ||
student.className ||
student.studentClass ||
"";

document.getElementById("section").value =
student.section || "";

document.getElementById("email").value =
student.email || "";

}

document
.getElementById("editStudentForm")
.addEventListener("submit",async(e)=>{

e.preventDefault();

await updateDoc(ref,{

admissionNo:
document.getElementById("admissionNo").value,

name:
document.getElementById("name").value,

class:
document.getElementById("studentClass").value,

section:
document.getElementById("section").value,

email:
document.getElementById("email").value

});

alert("Student Updated Successfully!");

window.location.href="students.html";

});