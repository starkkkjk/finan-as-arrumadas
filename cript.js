/* ======================================================
   SMART FINANCE PLANNER
   Desenvolvido em JavaScript ES6
   Autor: ChatGPT
====================================================== */

/* ======================================================
   VARIÁVEIS GLOBAIS
====================================================== */

let pizzaChart = null;
let barraChart = null;
let linhaChart = null;

/* ======================================================
   INICIALIZAÇÃO
====================================================== */

document.addEventListener("DOMContentLoaded", iniciarSistema);

function iniciarSistema() {

    carregarAno();

    configurarLoading();

    configurarHeader();

    configurarEventos();

    configurarInputs();

    revealElements();

    calcular();

}

/* ======================================================
   LOADING
====================================================== */

function configurarLoading() {

    window.addEventListener("load", () => {

        const loading = document.getElementById("loading");

        if (!loading) return;

        setTimeout(() => {

            loading.style.opacity = "0";

            setTimeout(() => {

                loading.style.display = "none";

            }, 400);

        }, 1000);

    });

}

/* ======================================================
   HEADER
====================================================== */

function configurarHeader() {

    window.addEventListener("scroll", () => {

        const header = document.getElementById("header");

        if (header) {

            if (window.scrollY > 60) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        }

        revealElements();

    });

}

/* ======================================================
   BOTÕES
====================================================== */

function configurarEventos() {

    const botao = document.getElementById("calcular");

    if (botao) {
        botao.addEventListener("click", calcular);
    }

}

/* ======================================================
   INPUTS AUTOMÁTICOS
====================================================== */

function configurarInputs() {

    document.querySelectorAll("input").forEach(input => {

        input.addEventListener("input", calcular);

    });

}

/* ======================================================
   SCROLL SUAVE
====================================================== */

function scrollSimulador() {

    const simulador = document.getElementById("simulador");

    if (!simulador) return;

    simulador.scrollIntoView({

        behavior: "smooth"

    });

}

/* ======================================================
   ANO
====================================================== */

function carregarAno() {

    const ano = document.getElementById("ano");

    if (ano) {

        ano.textContent = new Date().getFullYear();

    }

}

/* ======================================================
   FUNÇÕES DOS INPUTS
====================================================== */

function receitaInput() {
    return document.getElementById("receita");
}

function aluguelInput() {
    return document.getElementById("aluguel");
}

function mercadoInput() {
    return document.getElementById("mercado");
}

function transporteInput() {
    return document.getElementById("transporte");
}

function internetInput() {
    return document.getElementById("internet");
}

function lazerInput() {
    return document.getElementById("lazer");
}

function assinaturasInput() {
    return document.getElementById("assinaturas");
}

function metaInput() {
    return document.getElementById("meta");
}

function mesesInput() {
    return document.getElementById("meses");
}

/* ======================================================
   LEITURA SEGURA DOS INPUTS
====================================================== */

function valor(input) {

    if (!input) return 0;

    const numero = parseFloat(input.value);

    if (isNaN(numero)) return 0;

    return Math.max(0, numero);

}

/* ======================================================
   FUNÇÃO PRINCIPAL
====================================================== */

function calcular() {

    const receita = valor(receitaInput());

    const aluguel = valor(aluguelInput());

    const mercado = valor(mercadoInput());

    const transporte = valor(transporteInput());

    const internet = valor(internetInput());

    const lazer = valor(lazerInput());

    const assinaturas = valor(assinaturasInput());

    const meta = valor(metaInput());

    let meses = parseInt(valor(mesesInput()));

    if (meses <= 0) meses = 1;

    const despesas =
        aluguel +
        mercado +
        transporte +
        internet +
        lazer +
        assinaturas;

    const saldo = receita - despesas;

    const economia = saldo * meses;

    let porcentagem = 0;

    if (meta > 0) {

        porcentagem = Math.min(
            (economia / meta) * 100,
            100
        );

    }

    atualizarCards(
        receita,
        despesas,
        saldo
    );

    resultado(
        receita,
        despesas,
        saldo,
        economia,
        meta,
        meses
    );

    barra(porcentagem);

    analise(
        receita,
        despesas,
        saldo,
        economia,
        meta,
        meses
    );

    criarGraficos(
        aluguel,
        mercado,
        transporte,
        internet,
        lazer,
        assinaturas,
        economia,
        meta,
        meses
    );

}/* ======================================================
   FORMATAÇÃO DE MOEDA
====================================================== */

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {

        style: "currency",
        currency: "BRL"

    });

}

/* ======================================================
   RESULTADO DA SIMULAÇÃO
====================================================== */

function resultado(
    receita,
    despesas,
    saldo,
    economia,
    meta,
    meses
) {

    const box = document.getElementById("resultadoBox");

    if (!box) return;

    let html = `
        <h2>Resultado da Simulação</h2>

        <p><strong>Receita:</strong> ${formatarMoeda(receita)}</p>

        <p><strong>Despesas:</strong> ${formatarMoeda(despesas)}</p>

        <p><strong>Saldo Mensal:</strong> ${formatarMoeda(saldo)}</p>

        <hr>

        <p><strong>Economia em ${meses} meses:</strong></p>

        <h2>${formatarMoeda(economia)}</h2>

        <br>
    `;

    if (saldo < 0) {

        html += `
            <div class="alerta erro">

                ⚠️ Suas despesas são maiores que sua renda.

            </div>
        `;

    } else if (meta === 0) {

        html += `
            <div class="alerta">

                Informe uma meta financeira.

            </div>
        `;

    } else if (economia >= meta) {

        html += `
            <div class="alerta sucesso">

                🎉 Parabéns!

                Você atingirá sua meta financeira.

            </div>
        `;

    } else {

        const falta = meta - economia;

        html += `
            <div class="alerta aviso">

                Ainda faltarão
                <strong>${formatarMoeda(falta)}</strong>

                para atingir sua meta.

            </div>
        `;

    }

    box.innerHTML = html;

}

/* ======================================================
   CARDS
====================================================== */

function atualizarCards(receita, despesas, saldo) {

    const cardReceita = document.getElementById("cardReceita");
    const cardDespesa = document.getElementById("cardDespesa");
    const cardSaldo = document.getElementById("cardSaldo");

    if (cardReceita)
        cardReceita.textContent = formatarMoeda(receita);

    if (cardDespesa)
        cardDespesa.textContent = formatarMoeda(despesas);

    if (cardSaldo)
        cardSaldo.textContent = formatarMoeda(saldo);

}

/* ======================================================
   BARRA DE PROGRESSO
====================================================== */

function barra(valor) {

    const progresso = document.getElementById("barraProgresso");

    if (!progresso) return;

    valor = Math.max(0, Math.min(valor, 100));

    progresso.style.width = valor + "%";

    progresso.textContent = valor.toFixed(0) + "%";

    if (valor < 30) {

        progresso.style.background = "#ff5252";

    }

    else if (valor < 70) {

        progresso.style.background = "#FFC107";

    }

    else {

        progresso.style.background = "#00C853";

    }

}

/* ======================================================
   ANÁLISE MATEMÁTICA
====================================================== */

function analise(
    receita,
    despesas,
    saldo,
    economia,
    meta,
    meses
) {

    const area = document.getElementById("analiseMatematica");

    if (!area) return;

    const percentualDespesas =
        receita > 0
            ? (despesas / receita) * 100
            : 0;

    const percentualEconomia =
        receita > 0
            ? (saldo / receita) * 100
            : 0;

    let recomendacao = "";

    if (saldo < 0) {

        recomendacao =
            "⚠️ Você está gastando mais do que ganha.";

    }

    else if (percentualEconomia >= 30) {

        recomendacao =
            "Excelente! Sua capacidade de economia é alta.";

    }

    else if (percentualEconomia >= 20) {

        recomendacao =
            "Bom planejamento financeiro.";

    }

    else if (percentualEconomia >= 10) {

        recomendacao =
            "Você pode economizar mais reduzindo despesas.";

    }

    else {

        recomendacao =
            "Sua margem de economia está muito baixa.";

    }

    area.innerHTML = `

        <div class="analise-item">
            <strong>Receita</strong>
            <span>${formatarMoeda(receita)}</span>
        </div>

        <div class="analise-item">
            <strong>Despesas</strong>
            <span>${formatarMoeda(despesas)}</span>
        </div>

        <div class="analise-item">
            <strong>Saldo</strong>
            <span>${formatarMoeda(saldo)}</span>
        </div>

        <div class="analise-item">
            <strong>Economia Final</strong>
            <span>${formatarMoeda(economia)}</span>
        </div>

        <div class="analise-item">
            <strong>Meta</strong>
            <span>${formatarMoeda(meta)}</span>
        </div>

        <div class="analise-item">
            <strong>Prazo</strong>
            <span>${meses} meses</span>
        </div>

        <hr>

        <div class="analise-item">

            <strong>Comprometimento da renda</strong>

            <span>${percentualDespesas.toFixed(1)}%</span>

        </div>

        <div class="analise-item">

            <strong>Capacidade de economia</strong>

            <span>${percentualEconomia.toFixed(1)}%</span>

        </div>

        <hr>

        <p>${recomendacao}</p>

    `;

}

/* ======================================================
   CENÁRIOS AUTOMÁTICOS
====================================================== */

function reduzirLazer(percentual = 20) {

    const input = lazerInput();

    if (!input) return;

    let valorAtual = valor(input);

    valorAtual *= (1 - percentual / 100);

    input.value = valorAtual.toFixed(2);

    calcular();

}

function cancelarAssinaturas() {

    const input = assinaturasInput();

    if (!input) return;

    input.value = 0;

    calcular();

}

function aumentarSalario(valorExtra = 500) {

    const input = receitaInput();

    if (!input) return;

    input.value = valor(input) + valorExtra;

    calcular();

}

/* ======================================================
   RESETAR FORMULÁRIO
====================================================== */

function limparFormulario() {

    document.querySelectorAll("input").forEach(input => {

        input.value = 0;

    });

    calcular();

}/* ======================================================
   GRÁFICOS (Chart.js)
====================================================== */

function criarGraficos(
    aluguel,
    mercado,
    transporte,
    internet,
    lazer,
    assinaturas,
    economia,
    meta,
    meses
) {

    // Verifica se o Chart.js foi carregado
    if (typeof Chart === "undefined") {
        console.warn("Chart.js não foi encontrado.");
        return;
    }

    // Canvas
    const pizzaCanvas = document.getElementById("pizza");
    const barraCanvas = document.getElementById("barra");
    const linhaCanvas = document.getElementById("linha");

    if (!pizzaCanvas || !barraCanvas || !linhaCanvas) {
        return;
    }

    // Remove gráficos antigos
    if (pizzaChart) {
        pizzaChart.destroy();
    }

    if (barraChart) {
        barraChart.destroy();
    }

    if (linhaChart) {
        linhaChart.destroy();
    }

    /* =============================================
       CONFIGURAÇÃO GLOBAL
    ============================================= */

    Chart.defaults.color = "#FFFFFF";

    Chart.defaults.font.family = "Poppins";

    Chart.defaults.plugins.legend.labels.color = "#FFFFFF";

    /* =============================================
       GRÁFICO DE PIZZA
    ============================================= */

    pizzaChart = new Chart(pizzaCanvas, {

        type: "pie",

        data: {

            labels: [

                "Aluguel",
                "Mercado",
                "Transporte",
                "Internet",
                "Lazer",
                "Assinaturas"

            ],

            datasets: [

                {

                    data: [

                        aluguel,
                        mercado,
                        transporte,
                        internet,
                        lazer,
                        assinaturas

                    ],

                    backgroundColor: [

                        "#00E5FF",
                        "#00C853",
                        "#FFC107",
                        "#FF7043",
                        "#AB47BC",
                        "#EF5350"

                    ],

                    borderColor: "#1b1b1b",

                    borderWidth: 2,

                    hoverOffset: 20

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                title: {

                    display: true,

                    text: "Distribuição das Despesas",

                    color: "#FFFFFF",

                    font: {

                        size: 18

                    }

                },

                legend: {

                    position: "bottom"

                }

            },

            animation: {

                duration: 1800

            }

        }

    });

    /* =============================================
       GRÁFICO DE BARRAS
    ============================================= */

    barraChart = new Chart(barraCanvas, {

        type: "bar",

        data: {

            labels: [

                "Economia",

                "Meta"

            ],

            datasets: [

                {

                    label: "Valor (R$)",

                    data: [

                        economia,

                        meta

                    ],

                    backgroundColor: [

                        "#00E5FF",

                        "#00C853"

                    ],

                    borderRadius: 10,

                    borderSkipped: false

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        callback: function(value) {

                            return "R$ " + value;

                        }

                    }

                }

            },

            plugins: {

                title: {

                    display: true,

                    text: "Economia x Meta",

                    font: {

                        size: 18

                    }

                },

                legend: {

                    display: false

                }

            },

            animation: {

                duration: 1800

            }

        }

    });

    /* =============================================
       PREPARAÇÃO DO GRÁFICO DE LINHA
    ============================================= */

    const acumulado = [];

    const labels = [];

    const valorMensal = meses > 0
        ? economia / meses
        : 0;

    for (let i = 1; i <= meses; i++) {

        acumulado.push(valorMensal * i);

        labels.push(i + "º mês");

    }

    // O gráfico de linha continua na Parte 3B...
}/* ======================================================
   GRÁFICO DE LINHA
====================================================== */

    linhaChart = new Chart(linhaCanvas, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {

                    label: "Economia Acumulada",

                    data: acumulado,

                    borderColor: "#00E5FF",

                    backgroundColor: "rgba(0,229,255,.15)",

                    fill: true,

                    tension: 0.35,

                    borderWidth: 3,

                    pointRadius: 5,

                    pointHoverRadius: 8,

                    pointBackgroundColor: "#00E5FF"

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {

                intersect: false,

                mode: "index"

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        callback: function(value){

                            return "R$ " + value;

                        }

                    }

                }

            },

            plugins: {

                title: {

                    display: true,

                    text: "Evolução da Economia",

                    font: {

                        size: 18

                    }

                }

            },

            animation: {

                duration: 1800

            }

        }

    });

}

/* ======================================================
   REVEAL ANIMATION
====================================================== */

function revealElements() {

    const elementos = document.querySelectorAll(".reveal");

    elementos.forEach(elemento => {

        const topo = elemento.getBoundingClientRect().top;

        if (topo < window.innerHeight - 120) {

            elemento.classList.add("active");

        }

    });

}

/* ======================================================
   ANIMAÇÃO INICIAL
====================================================== */

document.querySelectorAll(".reveal").forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(50px)";

    item.style.transition = "all .8s ease";

});

/* ======================================================
   UTILIDADES
====================================================== */

function atualizarClasseReveal(){

    document.querySelectorAll(".reveal.active").forEach(item=>{

        item.style.opacity="1";

        item.style.transform="translateY(0px)";

    });

}

/* ======================================================
   OBSERVER
====================================================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(".reveal").forEach(item=>{

    observer.observe(item);

});

/* ======================================================
   ATALHOS DE TECLADO
====================================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        calcular();

    }

});

/* ======================================================
   BOTÃO VOLTAR AO TOPO
====================================================== */

window.addEventListener("scroll",()=>{

    const botao=document.getElementById("voltarTopo");

    if(!botao) return;

    if(window.scrollY>500){

        botao.classList.add("show");

    }else{

        botao.classList.remove("show");

    }

});

function voltarAoTopo(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ======================================================
   EXPORTAR DADOS
====================================================== */

function exportarResultado(){

    const texto=document.getElementById("resultadoBox");

    if(!texto) return;

    const blob=new Blob([texto.innerText],{

        type:"text/plain"

    });

    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download="planejamento-financeiro.txt";

    link.click();

}

/* ======================================================
   ESTATÍSTICAS
====================================================== */

function percentualEconomia(receita,saldo){

    if(receita<=0) return 0;

    return ((saldo/receita)*100).toFixed(1);

}

function percentualDespesas(receita,despesas){

    if(receita<=0) return 0;

    return ((despesas/receita)*100).toFixed(1);

}

/* ======================================================
   FIM DO SCRIPT
====================================================== */

console.log(
"%cSmart Finance Planner carregado com sucesso!",
"color:#00E5FF;font-size:16px;font-weight:bold;"
);