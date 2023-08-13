const staffNames = document.getElementById("staffNames");
const staff = [
  "Ana",
  "Ariana",
  "Geovana",
  "Feliciana",
  "Domitilia",
  "Elisabete",
  "Subarna",
  "Sumitra",
  "Binita",
  "Nadia",
  "karina",
  "Jamaica",
  "Akram",
  "Bijay",
  "Dipan",
  "Carla",
  "Carol",
  "Sujina",
  "Mônica",
  "Sushmita",
  "Juliana",
  "Eliseu",
  "Paulo",
  "Elivelton",
  "Sudeep",
  "Pawan",
  "Ali",
  "Yago",
];
const totalPx = document.getElementById("totalPx");
let numberOfPx = staff.length;
totalPx.innerText = `${numberOfPx} px`;
let normal = [];
var DiariaQtd = 0;
var DiariaValue = 0;
var Globaltips = 0;
const submitBtn = document.getElementById("submitBtn");
const showResult = document.getElementById("showResult");
const addAbsence = document.getElementById("addAbsence");

submitBtn.addEventListener("click", () => {
  const totalTips = document.getElementById("totalTips").value;
  Globaltips = totalTips;
  showResult.innerHTML = `${(totalTips / staff.length).toFixed(2)} € each!`;
  console.log("ok n-2");
  equalTips();
});

staff.forEach((px) => {
  normal.push({ name: px, n: 0 });
});

addAbsence.addEventListener("click", () => {
  createSelect();
  document.getElementById("staffNames").innerHTML = "";
  document.getElementById("recalculate").style.display = "block";
});

function createSelect() {
  const newRow = document.createElement("p");
  newRow.className = "questionRow";
  const newLabel = document.createElement("label");
  newLabel.innerText = "Who?";
  const newInput = document.createElement("select");
  for (let i = 0; i < normal.length; i++) {
    const option = document.createElement("option");
    option.innerText = normal[i].name;
    option.value = normal[i].name;
    newInput.appendChild(option);
  }
  const daysOff = document.createElement("input");
  //aqui abaixo vão ficar as mudanças que serão feitas com muito cuidado e atenção....................
  var i = 0;

  var possibility = "normal";

  const absenceDiv = document.createElement("div");
  const minusButton = document.createElement("button");
  minusButton.innerText = "<";
  const plusButton = document.createElement("button");
  plusButton.innerText = ">";
  const displayAbsences = document.createElement("div");
  displayAbsences.innerHTML = possibility;
  absenceDiv.className = "displayAbsences";

  minusButton.addEventListener("click", () => {
    if (i <= -1) {
    } else {
      i--;
    }
    changeDisplay();
  });
  plusButton.addEventListener("click", () => {
    if (i >= 6) {
      i = 6;
    } else {
      i++;
    }
    changeDisplay();
  });

  function changeDisplay() {
    switch (i) {
      case -1:
        possibility = "extra day";
        break;
      case 0:
        possibility = "normal";
        break;
      case 1:
        possibility = "1 day less";
        break;
      case 2:
        possibility = "2 days less";
        break;
      case 3:
        possibility = "3 days less";
        break;
      case 4:
        possibility = "4 days less";
        break;
      case 5:
        possibility = "5 days less";
        break;
      case 6:
        possibility = "week lost";
        break;
      default:
    }
    displayAbsences.innerHTML = possibility;
  }

  absenceDiv.append(minusButton, displayAbsences, plusButton);

  //aqui acima estão as mudanças que foram feitas com muito cuidado e atenção..........................
  daysOff.type = "number";
  const okBtn = document.createElement("button");
  okBtn.innerText = "\u2714";
  okBtn.addEventListener("click", () => {
    const userToAdjust = normal.find((px) => px.name === newInput.value);
    adjustAbsences(userToAdjust, i);
    removeQuestion(newRow);
    const infoDiv = document.createElement("div");
    infoDiv.innerText = `*${newInput.value} -> ${possibility}`;
    staffNames.appendChild(infoDiv);
  });
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "X";
  removeBtn.addEventListener("click", function () {
    removeQuestion(newRow);
  });
  const underDiv = document.createElement("div");
  underDiv.className = "underDiv";
  underDiv.append(okBtn, removeBtn);
  newRow.append(newLabel, newInput, absenceDiv, underDiv);
  showResult.append(newRow);
}

function removeQuestion(newRow) {
  showResult.removeChild(newRow);
}

function recalculate(arr) {
  let totalDiarias = 0;
  arr.forEach((px) => {
    px.n = 7 - px.n;
    totalDiarias += px.n;
  });
  const valorDiarias = Globaltips / totalDiarias;
  DiariaValue += valorDiarias;
  showStaffList();
}

function adjustAbsences(Px, newN) {
  Px.n = Number(newN);
  console.table(Px, newN);
  console.log("ok n-3");
}

const recalc = document.getElementById("recalculate");
recalc.addEventListener("click", () => {
  recalculate(normal);
});

function countingDays() {
  normal.forEach((px) => {
    DiariaQtd += px.n;
  });
}

function showStaffList() {
  staffNames.innerHTML = "";
  countingDays();
  console.log(DiariaQtd, Globaltips, normal);
  normal.forEach((px) => {
    const newLi = document.createElement("li");
    const name = document.createElement("p");
    name.className = "pxName";
    name.innerText = px.name;
    const value = document.createElement("p");
    value.className = "pxValue";
    ammount = Number((Globaltips / DiariaQtd) * px.n).toFixed(2);
    value.innerText = `${ammount} €`;
    const checkbox = document.createElement("input");
    checkbox.className = "pxCheckbox";
    checkbox.type = "checkbox";
    newLi.append(checkbox, name, value);
    staffNames.append(newLi);
    console.table(normal);
  });
}

function equalTips() {
  const Names = document.getElementById("staffNames");
  normal.forEach((px) => {
    const newLine = document.createElement("li");
    const name = document.createElement("p");
    name.innerText = px.name;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    newLine.append(checkbox, name);
    Names.appendChild(newLine);
  });
}
