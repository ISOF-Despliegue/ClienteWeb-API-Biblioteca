const API_URL = "http://localhost:3000/author";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("ID:", id);

// ===============================
// CARGAR AUTOR
// ===============================
async function loadAuthor() {
  const response = await fetch(`${API_URL}/${id}`);
  const author = await response.json();

  document.getElementById("name").value = author.name;
  document.getElementById("birthYear").value = author.birthYear;
  document.getElementById("country").value = author.country;
}

loadAuthor();

// ===============================
// ACTUALIZAR AUTOR
// ===============================
async function updateAuthor() {
  const name = document.getElementById("name").value;
  const birthYear = Number(document.getElementById("birthYear").value);
  const country = document.getElementById("country").value;

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, birthYear, country })
  });

  const data = await response.json();
  console.log(data);

if (!name || !country || isNaN(birthYear)) {
  alert("Datos inválidos");
  return;
}

  window.location.href = "index.html";
}
// ===============================
function goBack() {
  window.location.href = "index.html";
}