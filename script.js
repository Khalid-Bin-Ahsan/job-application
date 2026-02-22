let interviewList = [];
let RejectedList = [];
let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectFilterBtn = document.getElementById("reject-filter-btn");

const allCardsCount = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
// console.log(allCardsCount.children.length);
// console.log(mainContainer);

function calculateCount() {
  total.innerText = allCardsCount.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = RejectedList.length;
}
calculateCount();

// bg-[#3b82f6] text-white
// text-[#64748B]

function toggleStyle(id) {
  // removing bg color of preselected one
  allFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");
  interviewFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");
  rejectFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");
  // making all same as base
  allFilterBtn.classList.add("text-[#64748B]");
  interviewFilterBtn.classList.add("text-[#64748B]");
  rejectFilterBtn.classList.add("text-[#64748B]");

  //   adding bg on current button
  const selected = document.getElementById(id);
  selected.classList.remove("text-[#64748B]");
  selected.classList.add("bg-[#3b82f6]", "text-white");
}
