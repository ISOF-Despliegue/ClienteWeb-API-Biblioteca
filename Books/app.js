const API = "http://localhost:3000/books";

// ==================== GET ALL ====================
async function getBooks() {
  const res = await fetch(API);
  const books = await res.json();
  const container = document.getElementById("books");
  container.innerHTML = "";

  books.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("book");

    div.innerHTML = `
      <strong>${book.title}</strong> (${book.publishedYear}) - ${book.genre}
      <br>
      Disponible: ${book.available ? "✅" : "❌"}
      <div class="actions">
        <button onclick="getBookById(${book.id})">Ver</button>
        <button onclick="deleteBook(${book.id})">Eliminar</button>
        <button onclick="editBook(${book.id})">Editar</button>
        <button onclick="toggleAvailability(${book.id}, ${book.available})">
          Cambiar disponibilidad
        </button>
      </div>
    `;

    container.appendChild(div);
  });
}

// ==================== GET BY ID ====================
async function getBookById(id) {
  const res = await fetch(`${API}/${id}`);
  const book = await res.json();
  alert(JSON.stringify(book, null, 2));
}
// ==================== PUT ====================
async function updateBook() {
  if (!id) return;

  const updatedBook = {
    title: document.getElementById("title").value,
    genre: document.getElementById("genre").value,
    publishedYear: Number(document.getElementById("year").value),
    available: true
  };

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedBook)
  });

  window.location.href = "index.html";
}
// ==================== POST ====================
document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const year = document.getElementById("year").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, genre, publishedYear: Number(year) })
  });

  e.target.reset();
  getBooks();
});


// ==================== DELETE ====================
async function deleteBook(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  getBooks();
}

// ==================== PATCH availability ====================
async function toggleAvailability(id, current) {
  await fetch(`${API}/${id}/availability`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ available: !current })
  });

  getBooks();
}

// ===============================
// IR A EDITAR
// ===============================
function editBook(id) {
  window.location.href = `edit.html?id=${id}`;
}