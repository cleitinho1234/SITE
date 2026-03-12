const botoes = document.querySelectorAll('#botoes-problemas button');
const solucao = document.getElementById('solucao');
const inputProblema = document.getElementById('input-problema');
const btnBuscar = document.getElementById('btn-buscar');

const modal = document.getElementById('modal');
const textoSolucao = document.getElementById('texto-solucao');
const fechar = document.getElementById('fechar');

// Problemas e soluções simuladas
const dados = {
    "nao-liga": {
        "Samsung Galaxy S22": "1️⃣ Pressione o botão de energia por 10 segundos.\n2️⃣ Se não ligar, conecte ao carregador original.\n3️⃣ Se ainda não ligar, tente reiniciar forçado.",
        "iPhone 14": "1️⃣ Segure o botão lateral + volume por 10 segundos até aparecer o logo da Apple.\n2️⃣ Se não ligar, conecte ao carregador original."
    },
    "tela-travando": {
        "Samsung Galaxy S22": "1️⃣ Reinicie o aparelho.\n2️⃣ Se persistir, limpe cache do sistema.\n3️⃣ Evite apps pesados em segundo plano.",
        "iPhone 14": "1️⃣ Reinicie o aparelho.\n2️⃣ Atualize o iOS.\n3️⃣ Feche apps desnecessários."
    },
    "bateria": {
        "Samsung Galaxy S22": "1️⃣ Reduza brilho.\n2️⃣ Feche apps em segundo plano.\n3️⃣ Ative economia de bateria.",
        "iPhone 14": "1️⃣ Ative modo de baixo consumo.\n2️⃣ Verifique apps que gastam muita bateria.\n3️⃣ Ajuste brilho automático."
    }
};

// Função para mostrar o modal
function mostrarModal(texto) {
    textoSolucao.textContent = texto;
    modal.style.display = "block";
}

// Fechar modal ao clicar no X
fechar.onclick = function() {
    modal.style.display = "none";
}

// Fechar modal ao clicar fora da caixinha
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Gerar botões de modelos e abrir modal
function gerarSolucao(problema) {
    let modelos = dados[problema];
    let html = `<h3>Selecione seu modelo:</h3>`;
    for (let modelo in modelos) {
        html += `<button onclick="mostrarModal(\`${modelos[modelo]}\`)">${modelo}</button>`;
    }
    return html;
}

// Clique nos botões de problema
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
    for (let chave in dados) {
        if (texto.includes(chave.replace("-", " "))) {
            solucao.innerHTML = gerarSolucao(chave);
            encontrado = true;
            break;
        }
    }
    if (!encontrado) {
        solucao.innerHTML = "Não encontramos uma solução rápida para esse problema. Tente escolher acima.";
    }
});
