import { auth, db } from "./js/firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* =====================================
   MAIAMMA SCHOOL HUB LOGIN
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const loginIdentifier =
        document.getElementById("email");

    const password =
        document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");

    const loginBtn =
        document.getElementById("loginBtn");

    /* ==========================
       PASSWORD TOGGLE
    ========================== */

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

        } else {

            password.type = "password";

        }

    });

    /* ==========================
       LOGIN
    ========================== */

    loginBtn.addEventListener("click", async () => {

        const email = loginIdentifier.value.trim();
        const pass = password.value;

        if (email === "" || pass === "") {

            alert("Please enter email and password.");
            return;

        }

        try {

            const userCredential =
                await signInWithEmailAndPassword(auth, email, pass);

            const uid = userCredential.user.uid;

            // Read user document
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {

                alert("User profile not found.");
                return;

            }

            const user = userSnap.data();

            switch (user.role) {

                case "admin":
                    window.location.href = "admin-dashboard.html";
                    break;

                case "teacher":
                    window.location.href = "teacher-dashboard.html";
                    break;

                case "student":
                    window.location.href = "student-dashboard.html";
                    break;

                case "parent":
                    window.location.href = "parent-dashboard.html";
                    break;

                default:
                    alert("Invalid user role.");

            }

        } catch (error) {

            console.error(error);

            switch (error.code) {

                case "auth/invalid-credential":
                    alert("Invalid email or password.");
                    break;

                case "auth/user-not-found":
                    alert("User not found.");
                    break;

                case "auth/wrong-password":
                    alert("Incorrect password.");
                    break;

                default:
                    alert(error.message);

            }

        }

    });

});