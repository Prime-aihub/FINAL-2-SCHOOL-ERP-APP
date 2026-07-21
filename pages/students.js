import { db } from "../js/firebase.js";

import {
    collection,
    getDocs,
    doc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const table = document.getElementById("studentTable");
const searchBox = document.getElementById("searchStudent");

let allStudents = [];

async function loadStudents() {

    table.innerHTML = "";
    allStudents = [];

    const querySnapshot = await getDocs(collection(db, "students"));

    querySnapshot.forEach((doc) => {

        const student = doc.data();
        allStudents.push({
    id: doc.id,
    ...student
});
        // Support different field names
        const admissionNo = student.admissionNo || "";
        const name = student.name || student.studentName || "";
        const studentClass = student.class || student.className || student.studentClass || "";
        const section = student.section || "";
        const email = student.email || "";

        table.innerHTML += `
        <tr>

            <td>${admissionNo}</td>
            <td>${name}</td>
            <td>${studentClass}</td>
            <td>${section}</td>
            <td>${email}</td>

            <td>

                <button class="view-btn"
                    onclick="viewStudent('${doc.id}')">
                    <i class="fas fa-eye"></i>
                </button>

                <button class="edit-btn"
                    onclick="editStudent('${doc.id}')">
                    <i class="fas fa-pen"></i>
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent('${doc.id}')">
                    <i class="fas fa-trash"></i>
                </button>

            </td>

        </tr>
        `;

    });

}

loadStudents();

window.viewStudent = function(id){

    window.location.href =
        "student-profile.html?id=" + id;

};

window.editStudent = function(id){

    window.location.href =
    "edit-student.html?id=" + id;

};

window.deleteStudent = async function(id){

    const ok = confirm(
        "Are you sure you want to delete this student?"
    );

    if(!ok) return;

    try{

        await deleteDoc(doc(db,"students",id));

        alert("Student deleted successfully.");

        loadStudents();

    }
    catch(error){

        console.error(error);

        alert("Failed to delete student.");

    }

};

searchBox.addEventListener("keyup", function(){

    const keyword = this.value.toLowerCase();

    table.innerHTML = "";

    allStudents.forEach((student)=>{

        const admissionNo =
            (student.admissionNo || "").toLowerCase();

        const name =
            (student.name ||
            student.studentName ||
            "").toLowerCase();

        const studentClass =
            (student.class ||
            student.className ||
            student.studentClass ||
            "").toLowerCase();

        const section =
            (student.section || "").toLowerCase();

        const email =
            (student.email || "").toLowerCase();

        if(

            admissionNo.includes(keyword) ||

            name.includes(keyword) ||

            studentClass.includes(keyword) ||

            section.includes(keyword) ||

            email.includes(keyword)

        ){

            table.innerHTML += `

            <tr>

            <td>${student.admissionNo || ""}</td>

            <td>${student.name || student.studentName || ""}</td>

            <td>${student.class || student.className || student.studentClass || ""}</td>

            <td>${student.section || ""}</td>

            <td>${student.email || ""}</td>

            <td>

            <button
            class="view-btn"
            onclick="viewStudent('${student.id}')">

            <i class="fas fa-eye"></i>

            </button>

            <button
            class="edit-btn"
            onclick="editStudent('${student.id}')">

            <i class="fas fa-pen"></i>

            </button>

            <button
            class="delete-btn"
            onclick="deleteStudent('${student.id}')">

            <i class="fas fa-trash"></i>

            </button>

            </td>

            </tr>

            `;

        }

    });

});