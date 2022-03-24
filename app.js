const addExpenseBtn = document.getElementById("addExpense");

let localExpense = JSON.parse(localStorage.getItem("localExpense")) || [];

addExpenseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;
  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;

  if (type === "" || date === "" || name.length === 0 || amount === "") {
    alert("Please fill up the required fields");
    return;
  } else if (isNaN(amount)) {
    alert("Please enter a number for amount");
    clearInput();
    return;
  }

  const expense = {
    type,
    date,
    name,
    amount,
    id: localExpense.length + 1,
  };

  localExpense.push(expense);
  localStorage.setItem("localExpense", JSON.stringify(localExpense));
  console.log(localExpense.length);

  document.getElementById("expenseForm").reset();

  showExpenses();
});

function clearInput() {
  document.getElementById("amount").value = "";
}

function createDataRow(expense) {
  const expenseRowEl = document.createElement("tr");
  const expenseTypeData = document.createElement("td");
  const expenseNameData = document.createElement("td");
  const expenseDateData = document.createElement("td");
  const expenseAmountData = document.createElement("td");
  const expenseDeleteOption = document.createElement("td");
  const deleteLink = document.createElement("a");
  expenseTypeData.textContent = expense.type;
  expenseNameData.textContent = expense.name;
  expenseDateData.textContent = expense.date;
  expenseAmountData.textContent = "$ " + expense.amount;
  deleteLink.textContent = "Delete";
  deleteLink.classList.add("deleteButton");
  expenseRowEl.appendChild(expenseTypeData);
  expenseRowEl.appendChild(expenseNameData);
  expenseRowEl.appendChild(expenseDateData);
  expenseRowEl.appendChild(expenseAmountData);
  expenseDeleteOption.appendChild(deleteLink);
  expenseRowEl.appendChild(expenseDeleteOption);

  console.log(expense.id);

  deleteLink.addEventListener("click", function () {
    deleteExpense(expense.id);
  });

  return expenseRowEl;
}

console.log(createDataRow(localExpense[0]).innerHTML);

function showExpenses() {
  const tableData = document.getElementById("tableData");

  tableData.innerHTML = "";

  for (let i = 0; i < localExpense.length; i++) {
    tableData.appendChild(createDataRow(localExpense[i]));
  }
}

// // filter method
function deleteExpense(idToDelete) {
  localExpense = localExpense.filter((expense) => expense.id != idToDelete);
  localStorage.setItem("localExpense", JSON.stringify(localExpense));
  showExpenses();

  console.log(localExpense);
}

showExpenses();
