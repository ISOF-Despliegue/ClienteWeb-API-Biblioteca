const API = "http://localhost:3000/loan";


document.getElementById("loanDate").valueAsDate = new Date();

document.addEventListener("DOMContentLoaded", () => {
    loadAvailableBooks();
    getLoans();
});

// ==================== GET ALL ====================
async function getLoans() {
    const res = await fetch(API);
    const loans = await res.json();

    const container = document.getElementById("loans");
    container.innerHTML = "";

    loans.forEach(loan => {
        const div = document.createElement("div");
        div.classList.add("book");

        div.innerHTML = `
    <strong>Libro:</strong> ${loan.book?.title ?? "Libro eliminado"}
    <br>
    <strong>Prestatario:</strong> ${loan.borrowerName}
    <br>
    <strong>Fecha:</strong> ${loan.loanDate}
    <br>
    Estado: ${loan.returned
                ? "<span style='color:green;'>✅ Devuelto</span>"
                : "<span style='color:red;'>📕 Activo</span>"
            }

    <div class="actions">
      <button onclick="getLoanById(${loan.id})">Ver</button>

      ${loan.returned
                ? ""
                : `<button onclick="returnLoan(${loan.id})">Devolver</button>`
            }

      <button onclick="deleteLoan(${loan.id})">Eliminar</button>
    </div>
  `;

        container.appendChild(div);
    });
}

// ==================== CREATE ====================
document.getElementById("loanForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const bookId = Number(document.getElementById("bookId").value);
    const borrowerName = document.getElementById("borrowerName").value;
    const loanDate = document.getElementById("loanDate").value;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ bookId, borrowerName, loanDate })
    });

    e.target.reset();
    loadAvailableBooks(); // actualizar dropdown
    getLoans();
});

// ==================== GET BY ID ====================
async function getLoanById(id) {
    const res = await fetch(`${API}/${id}`);
    const loan = await res.json();
    alert(JSON.stringify(loan, null, 2));
}

// ==================== RETURN ====================
async function returnLoan(id) {
    await fetch(`${API}/${id}/return`, {
        method: "PATCH"
    });

    getLoans();
    loadAvailableBooks();
}

// ==================== DELETE ====================
async function deleteLoan(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    getLoans();
}

// ==================== Cargar Books ====================
async function loadAvailableBooks() {
    const res = await fetch("http://localhost:3000/books");
    const books = await res.json();

    const select = document.getElementById("bookId");
    select.innerHTML = `<option value="">Selecciona un libro</option>`;

    books
        .filter(book => book.available)
        .forEach(book => {
            const option = document.createElement("option");
            option.value = book.id;
            option.textContent = book.title;
            select.appendChild(option);
        });
}