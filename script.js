

const baseUrl = "http://localhost:8083/users/2/transactions"; 


//------------------------------------------------------------------------------------
// Add a transaction to a user.

document.getElementById("addTransactionBtn").addEventListener("click", async () => {

    const itemName = document.getElementById("itemInput").value;
    const itemAmount = document.getElementById("amountInput").value;
    const categoryName = document.getElementById("categoryInput").value;
    const description = document.getElementById("descInput").value;
    const date = document.getElementById("dateInput").value;

    const transaction = {
        item: itemName,
        amount: parseFloat(itemAmount),
        category: categoryName,
        description: description,
        date: date
    };

    const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction)
    });

    const result = await response.text();
    alert(result);


    document.getElementById("itemInput").value = "";
    document.getElementById("amountInput").value = "";
    document.getElementById("categoryInput").value = "";
    document.getElementById("descInput").value = "";
    document.getElementById("dateInput").value = "";

});

//------------------------------------------------------------------------------------
// Clear button to clear the fields in the add text box.

document.getElementById("clearBtn").addEventListener("click", async () => {

    document.getElementById("itemInput").value = "";
    document.getElementById("amountInput").value = "";
    document.getElementById("categoryInput").value = "";
    document.getElementById("descInput").value = "";
    document.getElementById("dateInput").value = "";

});




//------------------------------------------------------------------------------------
// Search an item transaction for a user.

document.getElementById("searchItemBtn").addEventListener("click", async () => {
    const item = document.getElementById("searchItemInput").value;
    const response = await fetch(`${baseUrl}/search/${item}`);
    const transactions = await response.json();

    const list = document.getElementById("searchList");
    list.innerHTML = transactions
        .map(
            (t) => `
        <div class="search-card">
          <div class="search-header">
            <span class="search-item-name">${t.item}</span>
            <span class="search-amount">$${t.amount}</span>
          </div>
          <div class="search-details">
            <span class="search-category">${t.category}</span>
            <span class="search-date">${t.date}</span>
          </div>
          <div class="search-description">${t.description}</div>
        </div>
      `
        )
        .join("");
});

flatpickr("#dateInput", {
  dateFormat: "m-d-Y"
});


//--------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(baseUrl);
  const transactions = await response.json();

  const list = document.getElementById("transactionList");

  list.innerHTML = transactions
    .map(
      (t) => `
        <div class="transaction-card">
          <div class="transaction-header">
            <span class="item-name">${t.item}</span>
            <span class="amount">$${t.amount}</span>
          </div>
          <div class="transaction-details">
            <span class="category">${t.category}</span>
            <span class="date">${t.date}</span>
          </div>
          <div class="description">${t.description}</div>
        </div>
      `
    )
    .join("");
});


