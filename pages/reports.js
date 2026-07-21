const demoStudents = [
  {
    name: "Rahul Verma",
    admission: "ST001",
    attendance: "96%",
    performance: "Excellent",
    status: "On Track"
  },
  {
    name: "Aarav Sharma",
    admission: "ST002",
    attendance: "88%",
    performance: "Good",
    status: "On Track"
  },
  {
    name: "Siya Patil",
    admission: "ST003",
    attendance: "75%",
    performance: "Average",
    status: "Needs Support"
  }
];

const reportRows = document.querySelector("#reportRows");
const classFilter = document.querySelector("#classFilter");
const reportMonth = document.querySelector("#reportMonth");
const notice = document.querySelector("#notice");

reportMonth.value = new Date().toISOString().slice(0, 7);

function renderReport() {
  const selectedClass = classFilter.value;

  const homework = JSON.parse(
    localStorage.getItem("teacherHomework") || "[]"
  );

  const assignments = JSON.parse(
    localStorage.getItem("teacherAssignments") || "[]"
  );

  const classHomework = homework.filter(
    item => item.className === selectedClass
  );

  const classAssignments = assignments.filter(
    item => item.className === selectedClass
  );

  reportRows.innerHTML = demoStudents.map(student => {
    const badgeClass =
      student.status === "On Track" ? "good" : "average";

    return `
      <tr>
        <td>${student.name}</td>
        <td>${student.admission}</td>
        <td>${student.attendance}</td>
        <td>${student.performance}</td>
        <td>
          <span class="badge ${badgeClass}">
            ${student.status}
          </span>
        </td>
      </tr>
    `;
  }).join("");

  document.querySelector("#studentCount").textContent =
    demoStudents.length;

  document.querySelector("#attendanceRate").textContent = "86%";

  document.querySelector("#homeworkCount").textContent =
    classHomework.length;

  document.querySelector("#assignmentCount").textContent =
    classAssignments.length;

  document.querySelector("#reportInfo").textContent =
    `Class ${selectedClass} • ${reportMonth.value}`;
}

document.querySelector("#generateReport").addEventListener("click", () => {
  renderReport();

  notice.textContent =
    "Report generated successfully.";
});

document.querySelector("#printReport").addEventListener("click", () => {
  window.print();
});

renderReport();