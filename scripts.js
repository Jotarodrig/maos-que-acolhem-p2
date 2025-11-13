const previaButton = document.getElementById('previa')
const proximoButton = document.getElementById('proximo')
const items = document.querySelectorAll('.item')
const pontos = document.querySelectorAll('.ponto')
const numeroIndicador = document.querySelector('.numeros')
const list = document.querySelector('.list')
const botoesSaibaMais = document.querySelectorAll('.btn')



let ativo = 0;
const total = items.length
let timer;


function update(direction){
document.querySelector('.item.ativo').classList.remove('ativo');
document.querySelector('.ponto.ativo').classList.remove('ativo');

    if(direction > 0) {
        ativo = ativo +1

        if(ativo === total){
            ativo = 0
        }
    }
    else if(direction < 0){
        ativo = ativo -1

        if(ativo < 0){
            ativo = total -1
        }
    }

   items[ativo].classList.add('ativo')
    pontos[ativo].classList.add('ativo')

    numeroIndicador.textContent = String(ativo + 1).padStart(2,'0')
}

     

timer = setInterval(() => {
     update(1)
 }, 5000);

function autoplay() {
    clearInterval(timer);
    timer = setInterval(() => update(+1), 5000)
}

previaButton.addEventListener('click', function ()  {
    update(-1)
})

proximoButton.addEventListener('click', function () {
    update(+1)
})


document.addEventListener("DOMContentLoaded", () => {
  const carregarComponente = async (seletor, arquivo) => {
    const elemento = document.querySelector(seletor);
    if (elemento) {
      try {
        const resposta = await fetch(arquivo);
        const html = await resposta.text();
        elemento.innerHTML = html;
      } catch (erro) {
        console.error(`Erro ao carregar ${arquivo}:`, erro);
      }
    }
  };

  carregarComponente("header", "components/header.html");
  carregarComponente("footer", "components/footer.html");
});

botoesSaibaMais.forEach((botao, index) => {
  botao.addEventListener('click', () => {
    switch(index) {
      case 0:
        window.location.href = 'historia.html';
        break;
        case 1:
          window.location.href = 'historia.html';
          break;
          case 2:
            window.location.href = 'sobre.html';
            break;
    }
  })
} )




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

