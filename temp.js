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
const filteredSection = document.getElementById("filtered-section");
// console.log(allCardsCount.children.length);
// console.log(mainContainer);

function calculateCount() {
  total.innerText = allCardsCount.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = RejectedList.length;
}
calculateCount();

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
  if (id == "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
  } else if ((id = "all-filter.btn")) {
    allCardSection.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  }
}

mainContainer.addEventListener("click", function (event) {
  console.log(event.target.classList.contains("interview-btn"));

  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".companyName").innerText;
    const role = parentNode.querySelector(".role").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const description = parentNode.querySelector(".description").innerText;

    const cardInfo = {
      companyName,
      role,
      salary,
      status,
      description,
    };
    const companyExist = interviewList.find(
      (item) => item.companyName == cardInfo.companyName,
    );
    parentNode.querySelector(".status").innerText = "Interviewed";
    if (!companyExist) {
      interviewList.push(cardInfo);
    }
    renderInterview();
  }
});

function renderInterview() {
  filteredSection.innerHTML = "";
  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.className = "card flex justify-between p-6 bg-white rounded-lg";
    div.innerHTML = `
		<div class="space-y-4">
		<h2 class="companyName text-[#002C5C] font-extrabold text-xl">
		${interview.companyName}
		</h2>
		<p class="role text-[#64748B]">React Native Developer</p>
		<p class="salary text-[#64748B]">
		Remote • Full-time • $130,000 - $175,000
		</p>
		<h2
		class="status text-[#002C5C] font-medium bg-[#EEF4FF] rounded-md border p-2 w-[120px]"
		>
		NOT APPLIED
		</h2>
		<p class="description text-[#323B49]">
		Build cross-platform mobile applications using React Native. Work
		on products used by millions of users worldwide.
		</p>
		<div class="cardBtn flex gap-2">
		<button
			type="button"
			class="interview-btn border-2 border-green-500 hover:bg-green-700 rounded-md p-2 text-green-500 font-semibold"
		>
			INTERVIEW
		</button>
		<button
			type="button"
			class="reject-btn border-2 border-red-500 hover:bg-red-300 rounded-md p-2 text-red-500 font-semibold"
		>
			REJECTED
		</button>
		</div>
	</div>
		`;
    filteredSection.appendChild(div);
  }
}
