const input = document.getElementById("input");
const output = document.getElementById("output");

// Comandos simulados
const comandos = {
    'echo "hello world"': "Hello World",
    "date": new Date().toString(),
    "whoami": "guest_user",
    "pwd": "/home/guest_user",
    "uptime": "up 3 days, 4 hours, 12 minutes",
    "dance": "💃🕺🎵 Simulação de dança em execução... 💃🕺🎵",
    "attack simulate": "Iniciando ataque simulado...\n[#####---------] 50%\nAtaque concluído com sucesso (simulação).",
    "matrix": "Exibindo códigos caindo... (simulação)",
    "clear": function(){ output.innerHTML = ""; return ""; },
    "help": "Comandos disponíveis: echo \"hello world\", date, whoami, pwd, uptime, dance, attack simulate, matrix, clear"
};

// Envia comando ao pressionar Enter
input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        const comando = input.value.trim().toLowerCase();
        let resposta;
        if(comandos[comando]){
            if(typeof comandos[comando] === "function") {
                resposta = comandos[comando]();
            } else {
                resposta = comandos[comando];
            }
        } else {
            resposta = "Comando não reconhecido. Digite 'help' para ver os comandos.";
        }

        output.innerHTML += `$ ${input.value}\n${resposta}\n\n`;
        input.value = "";
        output.scrollTop = output.scrollHeight;
    }
});
