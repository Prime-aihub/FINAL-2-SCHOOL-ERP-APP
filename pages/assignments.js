const homeworkForm=document.querySelector("#homeworkForm"),formCard=document.querySelector("#formCard"),list=document.querySelector("#homeworkList"),notice=document.querySelector("#notice");

let homework=JSON.parse(localStorage.getItem("teacherHomework")||"[]");

const today=new Date().toISOString().slice(0,10);

function escapeText(value){
  const el=document.createElement("div");
  el.textContent=value;
  return el.innerHTML;
}

function render(){
  const q=document.querySelector("#searchHomework").value.toLowerCase();

  const shown=homework.filter(item=>
    `${item.subject} ${item.className} ${item.details}`
    .toLowerCase()
    .includes(q)
  );

  list.innerHTML=shown.length
    ?shown.map(item=>`
      <article class="homework-item">
        <h3>${escapeText(item.subject)}
          <span class="meta">• ${escapeText(item.className)}</span>
        </h3>
        <p>${escapeText(item.details)}</p>
        <span class="meta">Due: ${item.dueDate}</span>
      </article>
    `).join("")
    :`<p class="empty">No homework created yet.</p>`;

  document.querySelector("#totalCount").textContent=homework.length;
  document.querySelector("#todayCount").textContent=
    homework.filter(item=>item.dueDate===today).length;
  document.querySelector("#upcomingCount").textContent=
    homework.filter(item=>item.dueDate>today).length;
}

document.querySelector("#showForm").onclick=()=>{
  formCard.classList.remove("hidden");
};

document.querySelector("#closeForm").onclick=()=>{
  formCard.classList.add("hidden");
};

homeworkForm.onsubmit=e=>{
  e.preventDefault();

  homework.unshift({
    subject:subject.value.trim(),
    className:className.value,
    dueDate:dueDate.value,
    details:details.value.trim()
  });

  localStorage.setItem("teacherHomework",JSON.stringify(homework));

  homeworkForm.reset();
  formCard.classList.add("hidden");
  notice.textContent="Homework saved.";

  render();
};

document.querySelector("#searchHomework").oninput=render;

render();