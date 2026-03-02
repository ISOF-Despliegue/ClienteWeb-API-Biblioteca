const API_URL = "http://localhost:3000/author";

// ===============================
// OBTENER AUTORES
// ===============================
async function getAuthors() {
  const response = await fetch(API_URL);
  const authors = await response.json();

  const container = document.getElementById("authors");
  container.innerHTML = "";

  authors.forEach(author => {
    const div = document.createElement("div");
    div.classList.add("book");

    div.innerHTML = `
      <strong>${author.name}</strong> (${author.birthYear}) - ${author.country}
      <div class="actions">
        <button onclick="editAuthor(${author.id})">Editar</button>
        <button onclick="deleteAuthor(${author.id})">Eliminar</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// ===============================
// POST AUTOR
// ===============================
document.getElementById("authorForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const birthYear = document.getElementById("birthYear").value;
  const country = document.getElementById("country").value;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, birthYear, country })
  });

  e.target.reset();
  getAuthors();
});

// ===============================
// ELIMINAR AUTOR
// ===============================
async function deleteAuthor(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  getAuthors();
}

// ===============================
// IR A EDITAR
// ===============================
function editAuthor(id) {
  window.location.href = `edit.html?id=${id}`;
}