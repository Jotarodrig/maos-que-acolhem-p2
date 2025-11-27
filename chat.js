let temaAtual = 'filmes';


document.querySelectorAll('.sala').forEach(sala => {
  sala.addEventListener('click', () => {
    document.querySelectorAll('.sala').forEach(s => s.classList.remove('active'));
    sala.classList.add('active');
    temaAtual = sala.dataset.tema;
    carregarMensagens();
  });
});

const mensagensEl = document.getElementById('mensagens');
const form = document.getElementById('chat-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const texto = document.getElementById('mensagem').value.trim();

  if (!nome || !texto) return;

  const fd = new FormData();
  fd.append('nome', nome);
  fd.append('mensagem', texto);
  fd.append('tema', temaAtual);

  await fetch('php/salvar_mensagem.php', { method: 'POST', body: fd });

  document.getElementById('mensagem').value = '';
  carregarMensagens();
});

async function carregarMensagens() {
  try {
    const res = await fetch(`php/carregar_mensagens.php?tema=${temaAtual}`);
    const msgs = await res.json();

    mensagensEl.innerHTML = msgs.map(msg => `
      <div class="mensagem ${msg.nome === document.getElementById('nome').value ? 'you' : ''}">
        <div class="meta">${msg.nome}</div>
        <div class="texto">${msg.mensagem}</div>
      </div>
    `).join('');

    mensagensEl.scrollTop = mensagensEl.scrollHeight;
  } catch {
    mensagensEl.innerHTML = '<p>🔄 Carregando mensagens...</p>';
  }
}

setInterval(carregarMensagens, 3000);
carregarMensagens();