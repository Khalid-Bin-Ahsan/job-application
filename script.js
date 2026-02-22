let interviewList = [];
let RejectedList = [];
let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allCardsCount = document.getElementById("allCards");
console.log(allCardsCount.children.length);

function calculateCount() {
  total.innerText = allCardsCount.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = RejectedList.length;
}
calculateCount();
