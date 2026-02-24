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

/* =========================
   COUNT CALCULATION
========================= */
function calculateCount() {
  total.innerText = allCardsSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

/* =========================
   EMPTY SECTION HANDLER
========================= */
function checkEmpty(cardsLength) {
  if (cardsLength === 0) {
    emptySection.classList.remove("hidden");
  } else {
    emptySection.classList.add("hidden");
  }
}

/* =========================
   FILTER BUTTON STYLE
========================= */
function toggleStyle(id) {
  // reset all buttons
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

/* =========================
   SHOW ALL
========================= */
function showAll() {
  filteredSection.classList.add("hidden");
  allCardsSection.classList.remove("hidden");

  availableCountText.innerText = `${allCardsSection.children.length} Jobs`;
  checkEmpty(allCardsSection.children.length);
}

/* =========================
   RENDER FILTERED CARDS
========================= */
function renderFiltered(list) {
  allCardsSection.classList.add("hidden");
  filteredSection.classList.remove("hidden");

  filteredSection.innerHTML = "";

  list.forEach((job) => {
    let div = document.createElement("div");
    div.className = "card flex justify-between p-6 bg-white rounded-lg";

    div.innerHTML = `
      <div class="space-y-4">
        <h2 class="companyName text-[#002C5C] font-extrabold text-xl">
          ${job.companyName}
        </h2>
        <p class="role text-[#64748B]">${job.role}</p>
        <p class="salary text-[#64748B]">${job.salary}</p>
        <h2 class="status text-[#002C5C] font-medium bg-[#EEF4FF] rounded-md border p-2 w-[120px]">
          ${job.status}
        </h2>
        <p class="description text-[#323B49]">${job.description}</p>
      </div>
    `;

    filteredSection.appendChild(div);
  });

  availableCountText.innerText = `${list.length} Jobs`;
  checkEmpty(list.length);
}

/* =========================
   MAIN CLICK EVENT
========================= */
document.addEventListener("click", function (event) {
  /* ===== INTERVIEW BUTTON ===== */
  if (event.target.classList.contains("interview-btn")) {
    const card = event.target.closest(".card");

    const jobData = extractCardData(card);
    jobData.status = "Interviewed";

    if (
      !interviewList.find((item) => item.companyName === jobData.companyName)
    ) {
      interviewList.push(jobData);
    }

    card.querySelector(".status").innerText = "Interviewed";
    calculateCount();

    if (currentTab === "interview") renderFiltered(interviewList);
  }

  /* ===== REJECT BUTTON ===== */
  if (event.target.classList.contains("reject-btn")) {
    const card = event.target.closest(".card");

    const jobData = extractCardData(card);
    jobData.status = "Rejected";

    if (
      !rejectedList.find((item) => item.companyName === jobData.companyName)
    ) {
      rejectedList.push(jobData);
    }

    card.querySelector(".status").innerText = "Rejected";
    calculateCount();

    if (currentTab === "rejected") renderFiltered(rejectedList);
  }

  /* ===== DELETE BUTTON ===== */
  if (event.target.closest(".button-delete")) {
    const card = event.target.closest(".card");
    const companyName = card.querySelector(".companyName").innerText;

    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName,
    );
    rejectedList = rejectedList.filter(
      (item) => item.companyName !== companyName,
    );

    card.remove();

    calculateCount();

    if (currentTab === "all") {
      showAll();
    } else if (currentTab === "interview") {
      renderFiltered(interviewList);
    } else if (currentTab === "rejected") {
      renderFiltered(rejectedList);
    }
  }
});

/* =========================
   EXTRACT CARD DATA
========================= */
function extractCardData(card) {
  return {
    companyName: card.querySelector(".companyName").innerText,
    role: card.querySelector(".role").innerText,
    salary: card.querySelector(".salary").innerText,
    status: card.querySelector(".status").innerText,
    description: card.querySelector(".description").innerText,
  };
}

/* =========================
   INITIAL LOAD
========================= */
showAll();
