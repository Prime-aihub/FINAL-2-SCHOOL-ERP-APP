import { auth, db } from "../js/firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const teacherForm = document.getElementById("teacherForm");

teacherForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const teacherName = document.getElementById("teacherName").value;
    const employeeId = document.getElementById("employeeId").value;
    const department = document.getElementById("department").value;
    const qualification = document.getElementById("qualification").value;
    const experience = document.getElementById("experience").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const gender = document.getElementById("gender").value;
    const joiningDate = document.getElementById("joiningDate").value;
    const address = document.getElementById("address").value;

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const uid = userCredential.user.uid;

        await setDoc(doc(db, "users", uid), {

            role: "teacher",

            name: teacherName,

            email: email

        });

        await setDoc(doc(db, "teachers", uid), {

            uid,

            teacherName,

            employeeId,

            department,

            qualification,

            experience,

            mobile,

            email,

            gender,

            joiningDate,

            address,

            createdAt: new Date().toISOString()

        });

        alert("Teacher Added Successfully!");

        teacherForm.reset();

        window.location.href = "teachers.html";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});