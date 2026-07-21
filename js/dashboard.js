import { db } from "./firebase.js";

import {
    collection,
    getCountFromServer
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function loadDashboard() {

    try {

        const studentCount =
            await getCountFromServer(collection(db, "students"));

        const teacherCount =
            await getCountFromServer(collection(db, "teachers"));

        const parentCount =
            await getCountFromServer(collection(db, "parents"));

        const classCount =
            await getCountFromServer(collection(db, "classes"));

        document.getElementById("studentCount").innerText =
            studentCount.data().count;

        document.getElementById("teacherCount").innerText =
            teacherCount.data().count;

        document.getElementById("parentCount").innerText =
            parentCount.data().count;

        document.getElementById("classCount").innerText =
            classCount.data().count;

    } catch (error) {

        console.log(error);

    }

}

loadDashboard();