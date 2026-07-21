import { auth, db } from "./js/firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    collection,
    doc,
    getDoc,
getDocs,
onSnapshot,
query,
where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const welcomeStudent =
document.getElementById("welcomeStudent");

const topStudentName =
document.getElementById("topStudentName");

const topStudentClass =
document.getElementById("topStudentClass");

const topStudentPhoto =
document.getElementById("topStudentPhoto");

const studentName =
document.getElementById("studentName");

const studentClass =
document.getElementById("studentClass");

const studentSection =
document.getElementById("studentSection");

const studentAdmissionNo =
document.getElementById("studentAdmissionNo");

const studentPhoto =
document.getElementById("studentPhoto");

const studentAttendance =
document.getElementById("studentAttendance");

const presentDays =
document.getElementById("presentDays");

const absentDays =
document.getElementById("absentDays");

const attendanceAlert =
document.getElementById("attendanceAlert");

const aiGreeting =
document.getElementById("aiGreeting");

onAuthStateChanged(auth, async user => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {

        const userSnap = await getDoc(
            doc(db, "users", user.uid)
        );

        if (!userSnap.exists()) {
            throw new Error("User profile not found.");
        }

        const userData = userSnap.data();

        let studentId = user.uid;

        /*
          Parent support:
          parents/{parentUID} must contain:
          studentId : "student Firebase UID"
        */

        if (userData.role === "parent") {

            const parentSnap = await getDoc(
                doc(db, "parents", user.uid)
            );

            if (!parentSnap.exists()) {
                throw new Error("Parent profile not found.");
            }

            studentId = parentSnap.data().studentId;
        }

        const studentSnap = await getDoc(
            doc(db, "students", studentId)
        );

        if (!studentSnap.exists()) {
            throw new Error("Student profile not found.");
        }

        const student = studentSnap.data();

        updateStudentProfile(
            student,
            userData.role
        );

        await loadAttendance(studentId);

        loadHomeworkForStudent(student);

    } catch (error) {

        console.error(error);

        if (attendanceAlert) {
            attendanceAlert.textContent =
            "Unable to load student profile.";
        }
    }

});

function updateStudentProfile(student, role) {

    const name =
    student.studentName ||
    student.name ||
    "Student";

    const className =
    student.studentClass ||
    student.class ||
    "-";

    const section =
    student.section ||
    "-";

    const admissionNo =
    student.admissionNo ||
    student.rollNo ||
    "-";

    const photo =
    student.photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=ffffff`;

    if (role === "parent") {
        welcomeStudent.textContent =
        `Attendance for ${name}`;
    } else {
        welcomeStudent.textContent =
        `Welcome Back, ${name} 👋`;
    }

    topStudentName.textContent = name;
    topStudentClass.textContent =
    `Class ${className}-${section}`;

    studentName.textContent = name;
    studentClass.textContent = className;
    studentSection.textContent = section;
    studentAdmissionNo.textContent = admissionNo;

    topStudentPhoto.src = photo;
    studentPhoto.src = photo;

    if (aiGreeting) {
        aiGreeting.textContent =
        `Hello ${name} 👋 Ask me anything about your studies.`;
    }

}

async function loadAttendance(studentId) {

    const attendanceQuery = query(
        collection(db, "attendance"),
        where("studentId", "==", studentId)
    );

    const snapshot = await getDocs(
        attendanceQuery
    );

    const records = snapshot.docs.map(item =>
        item.data()
    );

    const present = records.filter(record =>
        record.status === "Present"
    ).length;

    const absent = records.filter(record =>
        record.status === "Absent"
    ).length;

    const total = present + absent;

    const percentage = total
        ? Math.round((present / total) * 100)
        : 0;

    presentDays.textContent = present;
    absentDays.textContent = absent;
    studentAttendance.textContent =
    `${percentage}%`;

    const today =
    new Date().toISOString().slice(0, 10);

    const todayRecord = records.find(record =>
        record.date === today
    );

    if (!todayRecord) {

        attendanceAlert.textContent =
        "Today’s attendance has not been marked yet.";

        attendanceAlert.className =
        "attendance-alert";

        return;
    }

    if (todayRecord.status === "Absent") {

        attendanceAlert.textContent =
        "Alert: Student is marked Absent today.";

        attendanceAlert.className =
        "attendance-alert absent";

        return;
    }

    attendanceAlert.textContent =
    "Good news: Student is marked Present today.";

    attendanceAlert.className =
    "attendance-alert present";
}

function escapeText(value) {

    const element =
    document.createElement("div");

    element.textContent = value || "";

    return element.innerHTML;

}

function loadHomeworkForStudent(student) {

    const className =
    String(
        student.studentClass ||
        student.class ||
        ""
    );

    const section =
    String(student.section || "");

    const homeworkQuery = query(
        collection(db, "homework"),
        where("className", "==", className)
    );

    onSnapshot(homeworkQuery, snapshot => {

        const homework = snapshot.docs
        .map(item => ({
            id: item.id,
            ...item.data()
        }))
        .filter(item =>
            String(item.section) === section
        )
        .sort((a, b) =>
            (a.dueDate || "").localeCompare(
                b.dueDate || ""
            )
        );

        const homeworkList =
        document.getElementById(
            "studentHomeworkList"
        );

        const pendingCount =
        document.getElementById(
            "pendingHomeworkCount"
        );

        pendingCount.textContent =
        homework.length;

        homeworkList.innerHTML =
        homework.length
            ? homework.slice(0, 5).map(item => `
                <li>
                    <strong>${escapeText(item.subject)}</strong>
                    - ${escapeText(item.details)}
                    <br>
                    <small>Due: ${item.dueDate}</small>
                </li>
            `).join("")

            : `<li>No homework for Class ${className}-${section}.</li>`;

    });

}