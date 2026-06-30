/* ======================================================
   SMART FINANCE PLANNER
   Desenvolvido em JavaScript ES6
   Autor: ChatGPT (Revisado e Corrigido)
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
    analise(receita, despesas, saldo, economia, meta, meses); // Corrigido erro de digitação aqui
    criarGraficos(aluguel, mercado, transporte, internet, lazer, assinaturas, economia, meta, meses);
}

/* ======================================================
   FORMATAÇÃO DE MOEDA
====================================================== */
function formatarMoeda(valorMoeda) {
    return valorMoeda.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

/* =================================