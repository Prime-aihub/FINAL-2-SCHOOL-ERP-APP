import { auth, db } from "../js/firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  writeBatch
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const rows = document.querySelector("#attendanceRows");
const search = document.querySelector("#searchStudent");
const date = document.querySelector("#attendanceDate");
const notice = document.querySelector("#notice");
const saveButton = document.querySelector("#saveAttendance");

let students = [];
let teacher = {};

date.value = new Date().toISOString().slice(0, 10);

onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location.href = "../login.html";
    return;
  }

  try {
    const teacherSnap = await getDoc(doc(db, "teachers", user.uid));

    if (teacherSnap.exists()) {
      teacher = teacherSnap.data();
    }

    await loadStudents();

  } catch (error) {
    console.error(error);
    notice.textContent = "Unable to load attendance data.";
  }
});

async function loadStudents() {
  rows.innerHTML = `
    <tr>
      <td colspan="5">Loading students...</td>
    </tr>
  `;

  const snapshot = await getDocs(collection(db, "students"));

  students = snapshot.docs.map(studentDoc => {
    const data = studentDoc.data();

    return {
      id: studentDoc.id,
      uid: data.uid || studentDoc.id,
      name: data.studentName || data.name || "Student",
      admission: data.admissionNo || "-",
      status: "Present"
    };
  });

  students.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  render();
}

function render() {
  const query = search.value.toLowerCase();

  const visibleStudents = students.filter(student =>
    `${student.name} ${student.admission}`
      .toLowerCase()
      .includes(query)
  );

  rows.innerHTML = visibleStudents.length
    ? visibleStudents.map((student, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.admission}</td>

        <td>
          <input
            type="radio"
            name="${student.id}"
            data-id="${student.id}"
            value="Present"
            ${student.status === "Present" ? "checked" : ""}
          >
        </td>

        <td>
          <input
            type="radio"
            name="${student.id}"
            data-id="${student.id}"
            value="Absent"
            ${student.status === "Absent" ? "checked" : ""}
          >
        </td>
      </tr>
    `).join("")
    : `
      <tr>
        <td colspan="5">No students found.</td>
      </tr>
    `;

  document.querySelector("#total").textContent = students.length;

  document.querySelector("#present").textContent =
    students.filter(student => student.status === "Present").length;

  document.querySelector("#absent").textContent =
    students.filter(student => student.status === "Absent").length;
}

rows.addEventListener("change", event => {
  const studentId = event.target.dataset.id;

  if (!studentId) return;

  const student = students.find(item => item.id === studentId);

  if (student) {
    student.status = event.target.value;
  }

  render();
});

search.addEventListener("input", render);

document.querySelector("#markAll").addEventListener("click", () => {
  students.forEach(student => {
    student.status = "Present";
  });

  render();
});

saveButton.addEventListener("click", async () => {
  if (!auth.currentUser) return;

  if (!students.length) {
    notice.textContent = "No students available.";
    return;
  }

  saveButton.disabled = true;
  saveButton.textContent = "Saving...";

  try {
    const batch = writeBatch(db);
    const selectedDate = date.value;

    students.forEach(student => {
      const attendanceId = `${selectedDate}_${student.uid}`;

      const attendanceRef = doc(
        db,
        "attendance",
        attendanceId
      );

      batch.set(attendanceRef, {
        attendanceId: attendanceId,
        date: selectedDate,

        studentId: student.uid,
        studentName: student.name,
        admissionNo: student.admission,

        status: student.status,

        teacherId: auth.currentUser.uid,
        teacherName: teacher.teacherName || teacher.name || "Teacher",

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });

    await batch.commit();

    const presentCount = students.filter(
      student => student.status === "Present"
    ).length;

    const absentCount = students.filter(
      student => student.status === "Absent"
    ).length;

    document.querySelector("#saveStatus").textContent = "Saved";

    notice.textContent =
      `Saved successfully: ${presentCount} present, ${absentCount} absent.`;

  } catch (error) {
    console.error(error);

    notice.textContent =
      "Attendance could not be saved. Check Firestore rules.";
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = "Save attendance";
  }
});