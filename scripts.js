document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.list');
    const items = document.querySelectorAll('.item');
    // Adicionei a verificação aqui para garantir que os elementos existem antes de continuar
    if (!list || items.length === 0) return; 

    const pontos = document.querySelectorAll('.ponto');
    const numeroIndicador = document.querySelector('.numeros');

    let ativo = 0;
    const total = items.length; // 3

    function update(direction) {
        // Remove 'ativo' do ponto anterior
        const atualPonto = document.querySelector('.ponto.ativo');
        if (atualPonto) atualPonto.classList.remove('ativo');

        // Atualiza o índice (matemática para loop infinito)
        ativo = (ativo + direction + total) % total;

        // Calcula o deslocamento horizontal (transform: translateX)
        const deslocamento = -(ativo * (100 / total));
        list.style.transform = `translateX(${deslocamento}%)`;

        // Atualiza os pontos e números
        pontos[ativo].classList.add('ativo');
        numeroIndicador.textContent = String(ativo + 1).padStart(2, '0');
    }

    // --- ESTADO INICIAL GARANTIDO (DENTRO DO DOMContentLoaded) ---

    // 1. Garante que o índice JS começa em zero.
    ativo = 0;
    
    // 2. Define a posição inicial em 0% (Slide 1).
    list.style.transform = `translateX(0%)`;
    
    // 3. Define o indicador inicial.
    // Primeiro limpa para evitar duplicidade de 'ativo' se o HTML já tiver a classe
    pontos.forEach(p => p.classList.remove('ativo')); 
    pontos[0].classList.add('ativo');
    numeroIndicador.textContent = '01';

    // 4. Inicia o loop automático (A PRIMEIRA chamada para update(1) ocorrerá após 5s).
    setInterval(() => update(1), 5000);
});



