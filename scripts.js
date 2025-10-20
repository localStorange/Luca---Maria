const botao = document.getElementById("btn-musica");
const musica = document.getElementById("musica");
let tocando = false;

// Primeiro: garantir que a música está carregada
musica.load();

botao.addEventListener('click', function() {
    // Para e reinicia a música
    musica.pause();
    musica.currentTime = 0;
    
    // Tenta tocar
    const promise = musica.play();
    
    if (promise !== undefined) {
        promise.then(() => {
            // Funcionou!
            botao.textContent = "⏸️ Pausar música";
            tocando = true;
        }).catch(error => {
            // Se falhar, tenta uma estratégia diferente
            console.log("Tentativa 1 falhou, tentando método 2...");
            tocarMusicaFallback();
        });
    }
});

function tocarMusicaFallback() {
    // Método alternativo: para e tenta novamente
    musica.pause();
    musica.currentTime = 0;
    
    // Pequeno delay para garantir
    setTimeout(() => {
        musica.play()
            .then(() => {
                botao.textContent = "⏸️ Pausar música";
                tocando = true;
            })
            .catch(error => {
                console.log("Método 2 também falhou");
                alert("Para tocar a música, você precisa permitir áudio neste site. Tente atualizar a página e clicar novamente.");
            });
    }, 100);
}

// Evento para pausar
botao.addEventListener('click', function() {
    if (tocando) {
        musica.pause();
        botao.textContent = "🎵 Tocar música";
        tocando = false;
    }
});

// Quando a música terminar
musica.addEventListener('ended', function() {
    botao.textContent = "🎵 Tocar música";
    tocando = false;
});