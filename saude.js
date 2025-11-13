const blocos = document.querySelectorAll('.bloco');

function animarScroll() {
    blocos.forEach(bloco => {
        const topo = bloco.getBoundingClientRect().top;
        const alturaTela = window.innerHeight * 0.85;
        if (topo < alturaTela) {
            bloco.classList.add('mostrar');
        } else {
            bloco.classList.remove('mostrar');
        }
    })
}

window.addEventListener('scroll', animarScroll);
window.addEventListener('load', animarScroll); 