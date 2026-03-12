const botoes = document.querySelectorAll('#botoes-problemas button');
const solucao = document.getElementById('solucao');
const inputProblema = document.getElementById('input-problema');
const btnBuscar = document.getElementById('btn-buscar');

const modal = document.getElementById('modal');
const textoSolucao = document.getElementById('texto-solucao');
const fechar = document.getElementById('fechar');
const btnCopiar = document.getElementById('btn-copiar');

const dados = {
    "nao-liga": {
        "Samsung Galaxy S22": [
            "1️⃣ Pressione o botão de energia por 10 segundos.",
            "2️⃣ Conecte ao carregador original e aguarde 5 minutos.",
            "3️⃣ Se ainda não ligar, tente reiniciar forçado segurando volume + power.",
            "⚠️ Se nada funcionar, procure um técnico autorizado."
        ],
        "iPhone 14": [
            "1️⃣ Pressione e segure o botão lateral + volume por 10 segundos até aparecer o logo da Apple.",
            "2️⃣ Conecte ao carregador original e aguarde 5 minutos.",
            "⚠️ Se nada funcionar, leve a um suporte técnico autorizado."
        ]
    },
    "tela-travando": {
        "Samsung Galaxy S22": [
            "1️⃣ Reinicie o aparelho.",
            "2️⃣ Limpe cache do sistema em Configurações > Armazenamento.",
            "3️⃣ Feche apps pesados que rodam em segundo plano.",
            "⚠️ Se o problema persistir, procure um técnico."
        ],
        "iPhone 14": [
            "1️⃣ Reinicie o aparelho.",
            "2️⃣ Atualize o iOS em Ajustes > Geral > Atualização de Software.",
            "3️⃣ Feche apps desnecessários.",
            "⚠️ Se continuar travando, leve a um suporte autorizado."
        ]
    },
    "bateria": {
        "Samsung Galaxy S22": [
            "1️⃣ Reduza o brilho da tela.",
            "2️⃣ Feche aplicativos em segundo plano.",
            "3️⃣ Ative o modo de economia de bateria.",
            "⚠️ Se mesmo assim descarregar rápido, consulte um técnico."
        ],
        "iPhone 14": [
            "1️⃣ Ative o modo de baixo consumo.",
            "2️⃣ Verifique apps que gastam muita bateria.",
            "3️⃣ Ajuste brilho automático.",
            "⚠️ Se continuar com problema, procure suporte autorizado."
        ]
    }
};

// Modal
function mostrarModal(lista) {
    textoSolucao.innerHTML = lista.map(item => `<p>${item}</p>`).join('');
    modal.style.display = "block";
}

fechar.onclick = function() { modal.style.display = "none"; }
window.onclick = function(event) { if(event.target==modal) modal.style.display="none"; }

// Copiar solução
btnCopiar.onclick = function() {
    const text = textoSolucao.innerText;
    navigator.clipboard.writeText(text).then(()=> alert("Solução copiada!"));
}

// Gerar botões de modelos
function gerarSolucao(problema) {
    let modelos = dados[problema];
    let html = `<h3>Selecione seu modelo:</h3>`;
    for(let modelo in modelos) {
        html += `<button onclick='mostrarModal(dados["${problema}"]["${modelo}"])'>${modelo}</button>`;
    }
    return html;
}

// Clique nos botões principais
botoes.forEach(btn => {
    btn.addEventListener('click', () => {
        let problema = btn.getAttribute('data-problema');
        solucao.innerHTML = gerarSolucao(problema);
    });
});

// Busca por problema digitado
btnBuscar.addEventListener('click', () => {
    let texto = inputProblema.value.toLowerCase();
    let encontrado = false;
    for(let chave in dados) {
        if(texto.includes(chave.replace("-", " "))) {
            solucao.innerHTML = gerarSolucao(chave);
            encontrado = true;
            break;
        }
    }
    if(!encontrado){
        solucao.innerHTML = "Não encontramos uma solução rápida para esse problema. Tente escolher acima.";
    }
});
