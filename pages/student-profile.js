import { db } from "../js/firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const snap = await getDoc(doc(db,"students",id));

if(snap.exists()){

    const student = snap.data();

    document.getElementById("admissionNo").textContent =
        student.admissionNo || "";

    document.getElementById("name").textContent =
        student.name || student.studentName || "";

    document.getElementById("studentClass").textContent =
        student.class ||
        student.className ||
        student.studentClass ||
        "";

    document.getElementById("section").textContent =
        student.section || "";

    document.getElementById("email").textContent =
        student.email || "";

}