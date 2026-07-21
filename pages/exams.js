const examForm = document.querySelector("#examForm");
const formCard = document.querySelector("#formCard");
const examRows = document.querySelector("#examRows");
const notice = document.querySelector("#notice");

let exams = JSON.parse(
  localStorage.getItem("teacherExams") || "[]"
);

const today = new Date().toISOString().slice(0, 10);

function escapeText(value) {
  const el = document.createElement("div");
  el.textContent = value;
  return el.innerHTML;
}

function renderExams() {
  const keyword = document
    .querySelector("#searchExam")
    .value
    .toLowerCase();

  const shown = exams.filter(exam =>
    `${exam.examName} ${exam.subject} ${exam.className}`
      .toLowerCase()
      .includes(keyword)
  );

  examRows.innerHTML = shown.length
    ? shown.map(exam => `
      <tr>
        <td>${escapeText(exam.examName)}</td>
        <td>${escapeText(exam.subject)}</td>
        <td>${escapeText(exam.className)}</td>
        <td>${exam.examDate}</td>
        <td>${exam.maxMarks}</td>
        <td>${escapeText(exam.duration)}</td>
      </tr>
    `).join("")
    : `
      <tr>
        <td class="empty" colspan="6">
          No exams created yet.
        </td>
      </tr>
    `;

  document.querySelector("#totalExams").textContent =
    exams.length;

  document.querySelector("#upcomingExams").textContent =
    exams.filter(exam => exam.examDate >= today).length;

  const subjects = new Set(
    exams.map(exam => exam.subject.toLowerCase())
  );

  document.querySelector("#subjectsCount").textContent =
    subjects.size;
}

document.querySelector("#showForm").onclick = () => {
  formCard.classList.remove("hidden");
};

document.querySelector("#closeForm").onclick = () => {
  formCard.classList.add("hidden");
};

examForm.onsubmit = event => {
  event.preventDefault();

  exams.unshift({
    examName: document.querySelector("#examName").value.trim(),
    subject: document.querySelector("#subject").value.trim(),
    className: document.querySelector("#className").value,
    examDate: document.querySelector("#examDate").value,
    maxMarks: document.querySelector("#maxMarks").value,
    duration: document.querySelector("#duration").value.trim()
  });

  localStorage.setItem(
    "teacherExams",
    JSON.stringify(exams)
  );

  examForm.reset();
  formCard.classList.add("hidden");

  notice.textContent = "Exam saved successfully.";

  renderExams();
};

document.querySelector("#searchExam").oninput = renderExams;

renderExams();