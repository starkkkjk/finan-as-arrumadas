/* ==========================================
   SMART FINANCE PLANNER
========================================== */

// ------------------------
// LOADING
// ------------------------

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
    }, 1200);
});

// ------------------------
// HEADER
// ------------------------

window.addEventListener("scroll", () => {

    const header = document.getElementById("header");

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    revealElements();

});

// ------------------------
// SCROLL
// ------------------------

function scrollSimulador() {

    document
        .getElementById("simulador")
        .scrollIntoView({
            behavior: "smooth"
        });

}

// ------------------------
// ANO
// ------------------------

document.getElementById("ano").innerHTML =
    new Date().getFullYear();


// ------------------------
// VARIÁVEIS
// ------------------------

let pizzaChart;
let barraChart;
let linhaChart;


// ------------------------
// CALCULAR
// ------------------------

document
    .getElementById("calcular")
    .addEventListener("click", calcular);

calcular();

function calcular() {

    let receita = Number(receitaInput().value);

    let aluguel = Number(aluguelInput().value);

    let mercado = Number(mercadoInput().value);

    let transporte = Number(transporteInput().value);

    let internet = Number(internetInput().value);

    let lazer = Number(lazerInput().value);

    let assinaturas = Number(assinaturasInput().value);

    let meta = Number(metaInput().value);

    let meses = Number(mesesInput().value);

    let despesas =
        aluguel +
        mercado +
        transporte +
        internet +
        lazer +
        assinaturas;

    let saldo = receita - despesas;

    let economia = saldo * meses;

    let porcentagem =
        Math.min(
            (economia / meta) * 100,
            100
        );

    atualizarCards(receita, despesas, saldo);

    resultado(receita,
        despesas,
        saldo,
        economia,
        meta,
        meses);

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

}


// ------------------------
// RESULTADO
// ------------------------

function resultado(
    receita,
    despesas,
    saldo,
    economia,
    meta,
    meses
) {

    let texto = `
    <strong>Receita:</strong> R$ ${receita.toFixed(2)}<br>
    <strong>Despesas:</strong> R$ ${despesas.toFixed(2)}<br>
    <strong>Saldo Mensal:</strong> R$ ${saldo.toFixed(2)}<br><br>
    <strong>Economia em ${meses} meses:</strong> R$ ${economia.toFixed(2)}
    <br><br>
    `;

    if (economia >= meta) {

        texto +=
            "✅ Você conseguirá comprar o notebook.";

    } else {

        let falta = meta - economia;

        texto +=
            `❌ Faltarão R$ ${falta.toFixed(2)} para atingir a meta.`;

    }

    document
        .getElementById("resultadoBox")
        .innerHTML = texto;

}


// ------------------------
// CARDS
// ------------------------

function atualizarCards(receita, despesas, saldo) {

    document.getElementById("cardReceita").innerHTML =
        `R$ ${receita.toFixed(2)}`;

    document.getElementById("cardDespesa").innerHTML =
        `R$ ${despesas.toFixed(2)}`;

    document.getElementById("cardSaldo").innerHTML =
        `R$ ${saldo.toFixed(2)}`;

}


// ------------------------
// BARRA
// ------------------------

function barra(valor) {

    const barra = document.getElementById("barraProgresso");

    barra.style.width = valor + "%";

    barra.innerHTML = valor.toFixed(0) + "%";

}


// ------------------------
// ANÁLISE
// ------------------------

function analise(
    receita,
    despesas,
    saldo,
    economia,
    meta,
    meses
) {

    let html = "";

    html += `
    <div>
        <h3>Receita</h3>
        <p>R$ ${receita.toFixed(2)}</p>
    </div>`;

    html += `
    <div>
        <h3>Despesas</h3>
        <p>R$ ${despesas.toFixed(2)}</p>
    </div>`;

    html += `
    <div>
        <h3>Saldo</h3>
        <p>R$ ${saldo.toFixed(2)}</p>
    </div>`;

    html += `
    <div>
        <h3>Economia Final</h3>
        <p>R$ ${economia.toFixed(2)}</p>
    </div>`;

    html += `
    <div>
        <h3>Meta</h3>
        <p>R$ ${meta.toFixed(2)}</p>
    </div>`;

    html += `
    <div>
        <h3>Prazo</h3>
        <p>${meses} meses</p>
    </div>`;

    document
        .getElementById("analiseMatematica")
        .innerHTML = html;

}


// ------------------------
// CENÁRIOS
// ------------------------

function reduzirLazer(percentual) {

    let input = lazerInput();

    input.value =
        (Number(input.value) *
            (1 - percentual / 100))
        .toFixed(2);

    calcular();

}

function cancelarAssinaturas() {

    assinaturasInput().value = 0;

    calcular();

}

function aumentarSalario() {

    receitaInput().value =
        Number(receitaInput().value) + 500;

    calcular();

}


// ------------------------
// GRÁFICOS
// ------------------------

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

    if (pizzaChart) pizzaChart.destroy();
    if (barraChart) barraChart.destroy();
    if (linhaChart) linhaChart.destroy();

    pizzaChart = new Chart(

        document.getElementById("pizza"),

        {

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

                datasets: [{

                    data: [

                        aluguel,
                        mercado,
                        transporte,
                        internet,
                        lazer,
                        assinaturas

                    ]

                }]

            }

        }

    );

    barraChart = new Chart(

        document.getElementById("barra"),

        {

            type: "bar",

            data: {

                labels: [

                    "Economia",
                    "Meta"

                ],

                datasets: [{

                    label: "R$",

                    data: [

                        economia,
                        meta

                    ],

                    backgroundColor: [

                        "#00E5FF",
                        "#00d26a"

                    ]

                }]

            }

        }

    );

    let acumulado = [];

    let valor = economia / meses;

    for (let i = 1; i <= meses; i++) {

        acumulado.push(valor * i);

    }

    linhaChart = new Chart(

        document.getElementById("linha"),

        {

            type: "line",

            data: {

                labels: acumulado.map((_, i) => i + 1),

                datasets: [{

                    label: "Economia",

                    data: acumulado,

                    borderColor: "#00E5FF",

                    fill: false,

                    tension: .3

                }]

            }

        }

    );

}


// ------------------------
// REVEAL
// ------------------------

function revealElements() {

    const reveals =
        document.querySelectorAll(".reveal");

    reveals.forEach(el => {

        const top =
            el.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            el.style.opacity = 1;
            el.style.transform = "translateY(0)";

        }

    });

}

document.querySelectorAll(".reveal").forEach(el => {

    el.style.opacity = 0;
    el.style.transform = "translateY(50px)";
    el.style.transition = ".7s";

});

revealElements();


// ------------------------
// INPUTS
// ------------------------

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