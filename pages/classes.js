// ===============================
// Firebase Imports
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// ===============================
// Firebase Config
// (Use your existing config)
// ===============================

const firebaseConfig = {
  apiKey: "AIzaSyA5okPgG0LaZ9zr-LUPyZGrGcHxs4VKK70",
  authDomain: "maiamma-school-erp.firebaseapp.com",
  projectId: "maiamma-school-erp",
  storageBucket: "maiamma-school-erp.firebasestorage.app",
  messagingSenderId: "692499577063",
  appId: "1:692499577063:web:a92e6d46cad6ddba304a42",
  measurementId: "G-6Q6PQ9E2R2"
};


// ===============================
// Initialize Firebase
// ===============================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);


// ===============================
// HTML Elements
// ===============================

const classForm = document.getElementById("classForm");

const classModal = document.getElementById("classModal");

const searchInput = document.getElementById("searchInput");

const teacherSelect = document.getElementById("classTeacher");

const tableBody = document.getElementById("classesTableBody");

const totalClasses = document.getElementById("totalClasses");

const totalSections = document.getElementById("totalSections");

const activeClasses = document.getElementById("activeClasses");

const assignedTeachers = document.getElementById("assignedTeachers");

let classesData = [];

let selectedDocId = null;


// ===============================
// Admin Authentication
// ===============================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "../login.html";

    }

});


// ===============================
// Load Teachers Dropdown
// ===============================

async function loadTeachers() {

    teacherSelect.innerHTML = `
        <option value="">
            Select Teacher
        </option>
    `;

    const snapshot = await getDocs(collection(db, "teachers"));

    snapshot.forEach((docSnap) => {

        const teacher = docSnap.data();

        teacherSelect.innerHTML += `

            <option value="${teacher.teacherName}">

                ${teacher.teacherName}

            </option>

        `;

    });

}


// ===============================
// Load Classes
// ===============================

async function loadClasses() {

    tableBody.innerHTML = "";

    classesData = [];

    let classCount = 0;

    let sectionCount = 0;

    let activeCount = 0;

    let teacherCount = 0;

    const snapshot = await getDocs(collection(db, "classes"));

    snapshot.forEach((docSnap) => {

        const data = docSnap.data();

        data.id = docSnap.id;

        classesData.push(data);

        classCount++;

        if (data.section) sectionCount++;

        if (data.status === "Active") activeCount++;

        if (data.classTeacher) teacherCount++;

        tableBody.innerHTML += `

<tr>

<td>${classCount}</td>

<td>${data.className}</td>

<td>${data.section}</td>

<td>${data.classTeacher || "-"}</td>

<td>${data.roomNo || "-"}</td>

<td>${data.capacity || "-"}</td>

<td>

<span class="${data.status === "Active"
? "status-active"
: "status-inactive"}">

${data.status}

</span>

</td>

<td>

<button
class="action-btn view-btn"
data-id="${data.id}">

<i class="fa fa-eye"></i>

</button>

<button
class="action-btn edit-btn"
data-id="${data.id}">

<i class="fa fa-edit"></i>

</button>

<button
class="action-btn delete-btn"
data-id="${data.id}">

<i class="fa fa-trash"></i>

</button>

</td>

</tr>

`;

    });

    totalClasses.textContent = classCount;

    totalSections.textContent = sectionCount;

    activeClasses.textContent = activeCount;

    assignedTeachers.textContent = teacherCount;

}


// ===============================
// Initial Load
// ===============================

loadTeachers();

loadClasses();

// ===============================
// Open Add Class Modal
// ===============================

document.getElementById("addClassBtn").addEventListener("click", () => {

    selectedDocId = null;

    classForm.reset();

    document.getElementById("modalTitle").innerText = "Add New Class";

    classModal.classList.add("show");

});


// ===============================
// Close Modal
// ===============================

document.getElementById("closeModal").addEventListener("click", () => {

    classModal.classList.remove("show");

});

window.addEventListener("click", (e) => {

    if (e.target === classModal) {

        classModal.classList.remove("show");

    }

});


// ===============================
// Save / Update Class
// ===============================

classForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const classData = {

        className: document.getElementById("className").value.trim(),

        section: document.getElementById("section").value,

        classTeacher: document.getElementById("classTeacher").value,

        roomNo: document.getElementById("roomNo").value.trim(),

        capacity: Number(document.getElementById("capacity").value),

        academicYear: document.getElementById("academicYear").value.trim(),

        status: document.getElementById("status").value

    };

    try{

        if(selectedDocId){

            await updateDoc(doc(db,"classes",selectedDocId),classData);

            alert("Class updated successfully.");

        }else{

            await addDoc(collection(db,"classes"),classData);

            alert("Class added successfully.");

        }

        classForm.reset();

        classModal.classList.remove("show");

        selectedDocId = null;

        loadClasses();

    }catch(error){

        console.error(error);

        alert(error.message);

    }

});


// ===============================
// Edit / Delete Buttons
// ===============================

tableBody.addEventListener("click", async(e)=>{

    const button=e.target.closest("button");

    if(!button) return;

    const id=button.dataset.id;

    const selected=classesData.find(c=>c.id===id);

    if(button.classList.contains("edit-btn")){

        selectedDocId=id;

        document.getElementById("modalTitle").innerText="Edit Class";

        document.getElementById("className").value=selected.className;

        document.getElementById("section").value=selected.section;

        document.getElementById("classTeacher").value=selected.classTeacher;

        document.getElementById("roomNo").value=selected.roomNo;

        document.getElementById("capacity").value=selected.capacity;

        document.getElementById("academicYear").value=selected.academicYear;

        document.getElementById("status").value=selected.status;

        classModal.classList.add("show");

    }

    if(button.classList.contains("delete-btn")){

        const confirmDelete=confirm(
            `Delete ${selected.className} ${selected.section}?`
        );

        if(confirmDelete){

            await deleteDoc(doc(db,"classes",id));

            alert("Class deleted successfully.");

            loadClasses();

        }

    }

    if(button.classList.contains("view-btn")){

        alert(
`Class : ${selected.className}
Section : ${selected.section}
Teacher : ${selected.classTeacher}
Room : ${selected.roomNo}
Capacity : ${selected.capacity}
Academic Year : ${selected.academicYear}
Status : ${selected.status}`
        );

    }

});


// ===============================
// Search
// ===============================

searchInput.addEventListener("keyup",()=>{

    const value=searchInput.value.toLowerCase();

    const rows=tableBody.querySelectorAll("tr");

    rows.forEach(row=>{

        row.style.display=row.innerText
            .toLowerCase()
            .includes(value)
            ? ""
            : "none";

    });

});


// ===============================
// Reset Button
// ===============================

classForm.addEventListener("reset",()=>{

    selectedDocId=null;

});


// ===============================
// Refresh
// ===============================

window.refreshClasses=function(){

    loadClasses();

};


// ===============================
// Logout
// ===============================

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        auth.signOut().then(()=>{

            window.location.href="../login.html";

        });

    });

}