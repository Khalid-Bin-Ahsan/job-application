let interviewList = [];
let rejectedList = [];

const total = document.getElementById("totalCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectFilterBtn = document.getElementById("reject-filter-btn");

const allCardsSection = document.getElementById("allCards");
const filteredSection = document.getElementById("filtered-section");
const emptySection = document.getElementById("empty-card-body");
const availableCountText = document.querySelector(".available p:last-child");

let currentTab = "all";

document.querySelectorAll(".card").forEach((card) => {
  card.classList.add(
    "transition",
    "duration-300",
    "hover:shadow-xl",
    "hover:-translate-y-1",
  );
});

function calculateCount() {
  total.innerText = allCardsSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

function checkEmpty(count) {
  if (count === 0) {
    emptySection.classList.remove("hidden");
  } else {
    emptySection.classList.add("hidden");
  }
}

function toggleStyle(id) {
  [allFilterBtn, interviewFilterBtn, rejectFilterBtn].forEach((btn) => {
    btn.classList.remove("bg-[#3b82f6]", "text-white");
    btn.classList.add("text-[#64748B]");
  });

  const selected = document.getElementById(id);
  selected.classList.remove("text-[#64748B]");
  selected.classList.add("bg-[#3b82f6]", "text-white");

  if (id === "all-filter-btn") {
    currentTab = "all";
    showAll();
  } else if (id === "interview-filter-btn") {
    currentTab = "interview";
    renderFiltered(interviewList);
  } else if (id === "reject-filter-btn") {
    currentTab = "rejected";
    renderFiltered(rejectedList);
  }
}

function showAll() {
  filteredSection.classList.add("hidden");
  allCardsSection.classList.remove("hidden");

  availableCountText.innerText = `${allCardsSection.children.length} Jobs`;
  checkEmpty(allCardsSection.children.length);
}

function renderFiltered(list) {
  allCardsSection.classList.add("hidden");
  filteredSection.classList.remove("hidden");

  // 🔥 FIXED CONTAINER CLASSES
  filteredSection.className = "container mx-auto my-[60px] w-[80%] space-y-4";

  filteredSection.innerHTML = "";

  list.forEach((job) => {
    let div = createCard(job);
    filteredSection.appendChild(div);
  });

  // 🔥 FORMAT: "2 of 8 Jobs"
  availableCountText.innerText = `${list.length} of ${allCardsSection.children.length} Jobs`;

  checkEmpty(list.length);
}

function createCard(job) {
  let div = document.createElement("div");
  div.className =
    "card flex justify-between p-6 bg-white rounded-lg transition duration-300 hover:shadow-xl hover:-translate-y-1";

  div.innerHTML = `
    <div class="space-y-4">
      <h2 class="companyName text-[#002C5C] font-extrabold text-xl">
        ${job.companyName}
      </h2>
      <p class="role text-[#64748B]">${job.role}</p>
      <p class="salary text-[#64748B]">${job.salary}</p>
      <h2 class="status font-medium rounded-md border p-2 w-[120px] ${getStatusStyle(job.status)}">
        ${job.status}
      </h2>
      <p class="description text-[#323B49]">${job.description}</p>
      <div class="cardBtn flex gap-2">
        <button type="button"
          class="interview-btn border-2 border-green-500 hover:bg-green-600 hover:text-white rounded-md p-2 text-green-500 font-semibold">
          INTERVIEW
        </button>
        <button type="button"
          class="reject-btn border-2 border-red-500 hover:bg-red-500 hover:text-white rounded-md p-2 text-red-500 font-semibold">
          REJECTED
        </button>
      </div>
    </div>

    <div class="button-delete flex items-center justify-center h-10 w-10 hover:bg-red-700 rounded-full cursor-pointer">
      <button>
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  `;

  return div;
}

function getStatusStyle(status) {
  if (status === "Interviewed")
    return "bg-green-100 text-green-700 border-green-300";
  if (status === "Rejected") return "bg-red-100 text-red-700 border-red-300";
  return "bg-[#EEF4FF] text-[#002C5C]";
}

document.addEventListener("click", function (event) {
  const card = event.target.closest(".card");
  if (!card) return;

  const companyName = card.querySelector(".companyName").innerText;

  if (event.target.classList.contains("interview-btn")) {
    moveToInterview(card, companyName);
  }

  if (event.target.classList.contains("reject-btn")) {
    moveToRejected(card, companyName);
  }

  if (event.target.closest(".button-delete")) {
    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName,
    );
    rejectedList = rejectedList.filter(
      (item) => item.companyName !== companyName,
    );
    card.remove();
    calculateCount();
    refreshCurrentTab();
  }
});

function extractData(card) {
  return {
    companyName: card.querySelector(".companyName").innerText,
    role: card.querySelector(".role").innerText,
    salary: card.querySelector(".salary").innerText,
    description: card.querySelector(".description").innerText,
  };
}

function moveToInterview(card, name) {
  rejectedList = rejectedList.filter((item) => item.companyName !== name);

  const data = extractData(card);
  data.status = "Interviewed";

  interviewList = interviewList.filter((item) => item.companyName !== name);
  interviewList.push(data);

  // 🔥 UPDATE ALL TAB ORIGINAL CARD
  updateAllTabStatus(name, "Interviewed");

  updateCardStatus(card, "Interviewed");
  calculateCount();
  refreshCurrentTab();
}

function moveToRejected(card, name) {
  interviewList = interviewList.filter((item) => item.companyName !== name);

  const data = extractData(card);
  data.status = "Rejected";

  rejectedList = rejectedList.filter((item) => item.companyName !== name);
  rejectedList.push(data);

  // 🔥 UPDATE ALL TAB ORIGINAL CARD
  updateAllTabStatus(name, "Rejected");

  updateCardStatus(card, "Rejected");
  calculateCount();
  refreshCurrentTab();
}

function updateCardStatus(card, status) {
  const statusEl = card.querySelector(".status");
  statusEl.innerText = status;
  statusEl.className =
    "status font-medium rounded-md border p-2 w-[120px] " +
    getStatusStyle(status);
}

function refreshCurrentTab() {
  if (currentTab === "all") showAll();
  if (currentTab === "interview") renderFiltered(interviewList);
  if (currentTab === "rejected") renderFiltered(rejectedList);
}

function updateAllTabStatus(companyName, status) {
  const allCards = allCardsSection.querySelectorAll(".card");

  allCards.forEach((card) => {
    const name = card.querySelector(".companyName").innerText;
    if (name === companyName) {
      const statusEl = card.querySelector(".status");
      statusEl.innerText = status;
      statusEl.className =
        "status font-medium rounded-md border p-2 w-[120px] " +
        getStatusStyle(status);
    }
  });
}

calculateCount();
showAll();
