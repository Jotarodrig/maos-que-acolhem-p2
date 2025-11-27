const STORAGE_KEY = "mq_posts";


const exemploPosts = [
  {
    titulo: "Lembranças da Dona Helena",
    categoria: "Lembranças",
    texto: "Hoje reunimos histórias da Dona Helena, que trouxe fotos de sua juventude. Relembramos músicas que marcaram sua vida e percebemos como contar histórias fortalece vínculos e bem-estar.",
    data: "01/11/2025"
  },
  {
    titulo: "Roda de música e canto",
    categoria: "Atividades",
    texto: "Na tarde de ontem fizemos uma roda de música: violão, canções populares e muita alegria. Muitos residentes cantaram junto e isso melhorou o humor de todos. Obrigado aos voluntários!",
    data: "29/10/2025"
  },
  {
    titulo: "Dica de Saúde: hidratação no verão",
    categoria: "Saúde",
    texto: "Lembramos a importância de beber água regularmente, mesmo sem sede. Dicas práticas: copos visíveis, horários de hidratação e frutas ricas em água nas refeições.",
    data: "25/10/2025"
  }
];


function inicializarStorage() {
  const cur = localStorage.getItem(STORAGE_KEY);
  if (!cur) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exemploPosts));
  }
}


function carregarPosts() {
  const listaEl = document.getElementById("lista-posts");
  if (!listaEl) return;

  const posts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  listaEl.innerHTML = "";

  if (posts.length === 0) {
    listaEl.innerHTML = "<p>Nenhum post encontrado. Crie o primeiro!</p>";
    return;
  }

  posts.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "post-card";
    card.innerHTML = `
      <h3>${escapeHtml(p.titulo)}</h3>
      <div class="post-meta">${escapeHtml(p.categoria)} • ${escapeHtml(p.data || "")}</div>
      <div class="post-excerpt">${escapeHtml(p.texto.substring(0, 200))}${p.texto.length>200? '...':''}</div>
      <div class="post-actions">
        <a class="btn" href="post.html?id=${i}">Ler mais</a>
      </div>
    `;
    listaEl.appendChild(card);
  });
}


function salvarPost() {
  const titulo = document.getElementById("post-titulo").value.trim();
  const categoria = document.getElementById("post-categoria").value;
  const texto = document.getElementById("post-texto").value.trim();

  if (!titulo || !texto) {
    alert("Por favor preencha título e texto.");
    return;
  }

  const posts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  posts.unshift({
    titulo,
    categoria,
    texto,
    data: new Date().toLocaleDateString()
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));


  document.getElementById("post-titulo").value = "";
  document.getElementById("post-texto").value = "";
  document.getElementById("post-categoria").value = "Lembranças";

  carregarPosts();
  
  window.scrollTo({ top: 0, behavior: "smooth" });
}


function carregarPostIndividual() {
  const container = document.getElementById("post-container");
  if (!container) return;

  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get("id"), 10);

  const posts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (!posts || isNaN(id) || id < 0 || id >= posts.length) {
    container.innerHTML = `<div class="post-card"><h3>Post não encontrado</h3><p>Este post não existe mais.</p><p><a class="btn" href="index-blog.html">Voltar ao blog</a></p></div>`;
    return;
  }

  const p = posts[id];
  container.innerHTML = `
    <article class="post-card" aria-live="polite">
      <h1 style="font-size:1.6rem">${escapeHtml(p.titulo)}</h1>
      <div class="post-meta">${escapeHtml(p.categoria)} • ${escapeHtml(p.data||"")}</div>
      <div style="margin-top:12px; font-size:1.05rem; white-space:pre-wrap">${escapeHtml(p.texto)}</div>
      <p style="margin-top:18px"><a class="btn" href="index-blog.html">Voltar ao blog</a></p>
    </article>
  `;
}


function escapeHtml(str){
  if(!str) return "";
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'", "&#039;");
}


document.addEventListener("DOMContentLoaded", () => {
  inicializarStorage();

  
  if (document.getElementById("lista-posts")) {
    carregarPosts();

    const btn = document.getElementById("btnPublicar");
    if (btn) btn.addEventListener("click", salvarPost);

    
    const txt = document.getElementById("post-texto");
    if (txt) {
      txt.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "Enter") salvarPost();
      });
    }
  }

  
  if (document.getElementById("post-container")) {
    carregarPostIndividual();
  }
});
