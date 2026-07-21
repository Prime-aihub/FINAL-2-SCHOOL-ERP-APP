import { auth, db } from "../js/firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();
    const admissionNo = document.getElementById("admissionNo").value.trim();
    const studentClass = document.getElementById("studentClass").value.trim();
    const section = document.getElementById("section").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const parentName = document.getElementById("parentName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const uid = userCredential.user.uid;

        await setDoc(doc(db, "users", uid), {

            role: "student",
            name: studentName,
            email: email

        });

        await setDoc(doc(db, "students", uid), {

            uid,
            studentName,
            admissionNo,
            studentClass,
            section,
            parentName,
            mobile,
            email,
            createdAt: new Date().toISOString()

        });

        alert("✅ Student created successfully!");

        studentForm.reset();

    } catch (error) {

        alert(error.message);

    }

});