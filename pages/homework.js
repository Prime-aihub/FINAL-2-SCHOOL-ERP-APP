import { auth, db } from "../js/firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const homeworkForm =
document.querySelector("#homeworkForm");

const formCard =
document.querySelector("#formCard");

const list =
document.querySelector("#homeworkList");

const notice =
document.querySelector("#notice");

const showFormButton =
document.querySelector("#showForm");

const closeFormButton =
document.querySelector("#closeForm");

const searchHomework =
document.querySelector("#searchHomework");

let homework = [];
let teacher = {};

const today =
new Date().toISOString().slice(0, 10);

onAuthStateChanged(auth, async user => {

  if (!user) {
    window.location.href = "../login.html";
    return;
  }

  try {

    const teacherSnap = await getDoc(
      doc(db, "teachers", user.uid)
    );

    if (teacherSnap.exists()) {
      teacher = teacherSnap.data();
    }

    await loadHomework();

  } catch (error) {

    console.error(error);

    notice.textContent =
    "Unable to load homework.";

  }

});

function escapeText(value) {

  const element =
  document.createElement("div");

  element.textContent = value || "";

  return element.innerHTML;

}

async function loadHomework() {

  list.innerHTML =
  `<p class="empty">Loading homework...</p>`;

  const homeworkQuery = query(
    collection(db, "homework"),
    where("teacherId", "==", auth.currentUser.uid)
  );

  const snapshot = await getDocs(
    homeworkQuery
  );

  homework = snapshot.docs.map(item => ({
    id: item.id,
    ...item.data()
  }));

  homework.sort((a, b) =>
    (a.dueDate || "").localeCompare(
      b.dueDate || ""
    )
  );

  render();

}

function render() {

  const keyword =
  searchHomework.value
  .toLowerCase()
  .trim();

  const shown = homework.filter(item =>
    `${item.subject} ${item.className} ${item.section} ${item.details}`
    .toLowerCase()
    .includes(keyword)
  );

  list.innerHTML = shown.length
    ? shown.map(item => `
      <article class="homework-item">

        <h3>
          ${escapeText(item.subject)}
          <span class="meta">
            • Class ${escapeText(item.className)}-${escapeText(item.section)}
          </span>
        </h3>

        <p>${escapeText(item.details)}</p>

        <span class="meta">
          Due: ${item.dueDate}
        </span>

      </article>
    `).join("")

    : `<p class="empty">No homework created yet.</p>`;

  document.querySelector("#totalCount").textContent =
  homework.length;

  document.querySelector("#todayCount").textContent =
  homework.filter(item =>
    item.dueDate === today
  ).length;

  document.querySelector("#upcomingCount").textContent =
  homework.filter(item =>
    item.dueDate > today
  ).length;

}

showFormButton.onclick = () => {
  formCard.classList.remove("hidden");
};

closeFormButton.onclick = () => {
  formCard.classList.add("hidden");
};

homeworkForm.onsubmit = async event => {

  event.preventDefault();

  const saveButton =
  homeworkForm.querySelector(
    'button[type="submit"]'
  );

  saveButton.disabled = true;
  saveButton.textContent = "Saving...";

  try {

    await addDoc(
      collection(db, "homework"),
      {
        subject:
        document.querySelector("#subject")
        .value.trim(),

        className:
        document.querySelector("#className")
        .value,

        section:
        document.querySelector("#section")
        .value,

        dueDate:
        document.querySelector("#dueDate")
        .value,

        details:
        document.querySelector("#details")
        .value.trim(),

        teacherId:
        auth.currentUser.uid,

        teacherName:
        teacher.teacherName ||
        teacher.name ||
        "Teacher",

        createdAt:
        serverTimestamp()
      }
    );

    homeworkForm.reset();

    formCard.classList.add("hidden");

    notice.textContent =
    "Homework published successfully.";

    await loadHomework();

  } catch (error) {

    console.error(error);

    notice.textContent =
    "Homework could not be saved.";

  } finally {

    saveButton.disabled = false;
    saveButton.textContent =
    "Save Homework";

  }

};

searchHomework.oninput = render;