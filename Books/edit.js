const API_URL = "http://localhost:3000/books";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// ===============================
// CARGAR LIBRO
// ===============================
async function loadBook() {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    alert("No se encontró el libro");
    return;
  }

  const book = await response.json();
  document.getElementById("title").value = book.title;
  document.getElementById("genre").value = book.genre;
  document.getElementById("year").value = book.publishedYear;
}

loadBook();

// ===============================
// ACTUALIZAR LIBRO
// ===============================
async function updateBook() {
  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const year = Number(document.getElementById("year").value);

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, genre, publishedYear: year })
  });

  window.location.href = "index.html";
}

// ===============================
function goBack() {
  window.location.href = "index.html";
}