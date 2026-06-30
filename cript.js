/* ======================================================
   SMART FINANCE PLANNER
   Desenvolvido em JavaScript ES6
   Autor: ChatGPT (Corrigido)
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
window.addEventListener("load", iniciarSistema);

function iniciarSistema() {
    carregarAno();
    configurarLoading();
    configurarHeader();
    configurarEventos();
    configurarInputs();
    
    // Configura os estilos iniciais da animação de reveal com segurança
    document.querySelectorAll(".reveal").forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(50px)";
        item.style.transition = "all .8s ease";
    });

    // Inicia o Observer para as animações de reveal
    configurarObserver();
    
    revealElements();
    calcular();
}

/* ======================================================
   LOADING
====================================================== */
function configurarLoading() {
    const loading = document.getElementById("loading");
    if (!loading) return;

    setTimeout(() => {
        loading.style.opacity = "0";
        setTimeout(() => {
            loading.style.display = "none";
        }, 400);
    }, 1000);
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
    simulador.scrollIntoView({ behavior: "smooth" });
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
const receitaInput = () => document.getElementById("receita");
const aluguelInput = () => document.getElementById("aluguel");
const mercadoInput = () => document.getElementById("mercado");
const transporteInput = () => document.getElementById("transporte");
const internetInput = () => document.getElementById("internet");
const lazerInput = () => document.getElementById("lazer");
const assinaturasInput = () => document.getElementById("assinaturas");
const metaInput = () => document.getElementById("meta");
const mesesInput = () => document.getElementById("meses");

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

    const despesas = aluguel + mercado + transporte + internet + lazer + assinaturas;
    const saldo = receita - despesas;
    const economia = saldo * meses;

    let porcentagem = 0;
    if (meta > 0) {
        porcentagem = Math.min((economia / meta) * 100, 100);
    }

    atualizarCards(receita, despesas, saldo);
    resultado(receita, despesas, saldo, economia, meta, meses);
    barra(porcentagem);
    analise(receita, despesas, saldo, economy = economia, meta, meses);
    criarGraficos(aluguel, mercado, transporte, internet, lazer, assinaturas, economia, meta, meses);
}

/* ======================================================
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
function resultado(receita, despesas, saldo, economia, meta, meses) {
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
        html += `<div class="alerta erro">⚠️ Suas despesas são maiores que sua renda.</div>`;
    } else if (meta === 0) {
        html += `<div class="alerta">Informe uma meta financeira.</div>`;
    } else if (economia >= meta) {
        html += `<div class="alerta sucesso">🎉 Parabéns! Você atingirá sua meta financeira.</div>`;
    } else {
        const falta = meta - economia;
        html += `<div class="alerta aviso">Ainda faltarão <strong>${formatarMoeda(falta)}</strong> para atingir sua meta.</div>`;
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

    if (cardReceita) cardReceita.textContent = formatarMoeda(receita);
    if (cardDespesa) cardDespesa.textContent = formatarMoeda(despesas);
    if (cardSaldo) cardSaldo.textContent = formatarMoeda(saldo);
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
    } else if (valor < 70) {
        progresso.style.background = "#FFC107";
    } else {
        progresso.style.background = "#00C853";
    }
}

/* ======================================================
   ANÁLISE MATEMÁTICA
====================================================== */
function analise(receita, despesas, saldo, economia, meta, meses) {
    const area = document.getElementById("analiseMatematica");
    if (!area) return;

    const percentualDespesas = receita > 0 ? (despesas / receita) * 100 : 0;
    const percentualEconomia = receita > 0 ? (saldo / receita) * 100 : 0;
    let recomendacao = "";

    if (saldo < 0) {
        recomendacao = "⚠️ Você está gastando mais do que ganha.";
    } else if (percentualEconomia >= 30) {
        recomendacao = "Excelente! Sua capacidade de economia é alta.";
    } else if (percentualEconomia >= 20) {
        recomendacao = "Bom planejamento financeiro.";
    } else if (percentualEconomia >= 10) {
        recomendacao = "Você pode economizar mais reduzindo despesas.";
    } else {
        recomendacao = "Sua margem de economia está muito baixa.";
    }

    area.innerHTML = `
        <div class="analise-item"><strong>Receita</strong><span>${formatarMoeda(receita)}</span></div>
        <div class="analise-item"><strong>Despesas</strong><span>${formatarMoeda(despesas)}</span></div>
        <div class="analise-item"><strong>Saldo</strong><span>${formatarMoeda(saldo)}</span></div>
        <div class="analise-item"><strong>Economia Final</strong><span>${formatarMoeda(economia)}</span></div>
        <div class="analise-item"><strong>Meta</strong><span>${formatarMoeda(meta)}</span></div>
        <div class="analise-item"><strong>Prazo</strong><span>${meses} meses</span></div>
        <hr>
        <div class="analise-item"><strong>Comprometimento da renda</strong><span>${percentualDespesas.toFixed(1)}%</span></div>
        <div class="analise-item"><strong>Capacidade de economia</strong><span>${percentualEconomia.toFixed(1)}%</span></div>
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