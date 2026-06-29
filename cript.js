function calcularSimulacao() {
    // 1. Captura os valores que o usuário digitou no formulário HTML
    const salario = parseFloat(document.getElementById('salario').value) || 0;
    const aluguel = parseFloat(document.getElementById('aluguel').value) || 0;
    const supermercado = parseFloat(document.getElementById('supermercado').value) || 0;
    const transporte = parseFloat(document.getElementById('transporte').value) || 0;
    const internet = parseFloat(document.getElementById('internet').value) || 0;
    const lazer = parseFloat(document.getElementById('lazer').value) || 0;
    const assinaturas = parseFloat(document.getElementById('assinaturas').value) || 0;

    // 2. Operações matemáticas básicas (Soma e Subtração)
    const totalDespesas = aluguel + supermercado + transporte + internet + lazer + assinaturas;
    const saldoMensal = salario - totalDespesas;
    const metaMensalNecessaria = 400.00; // Valor fixo baseado em R$ 4800 / 12 meses

    // 3. Imprime os dados calculados de volta na tela, formatados com duas casas decimais
    document.getElementById('outReceita').innerText = salario.toFixed(2);
    document.getElementById('outDespesas').innerText = totalDespesas.toFixed(2);
    document.getElementById('outSaldo').innerText = saldoMensal.toFixed(2);

    // 4. Análise de dados (Estrutura condicional para verificar a meta)
    const divStatus = document.getElementById('statusMeta');
    
    if (saldoMensal >= metaMensalNecessaria) {
        // Cenário onde sobra dinheiro suficiente
        divStatus.className = "status sucesso";
        divStatus.innerHTML = `✅ Meta Alcançada!<br>Seu saldo atual permite guardar os R$ 400.00 necessários e comprar o notebook em 12 meses.`;
    } else {
        // Cenário de déficit (falta dinheiro)
        const deficit = metaMensalNecessaria - saldoMensal;
        divStatus.className = "status erro";
        divStatus.innerHTML = `❌ Saldo Insuficiente!<br>Faltam R$ ${deficit.toFixed(2)} por mês para atingir a meta. Tente reduzir os gastos flexíveis (Lazer ou Assinaturas).`;
    }

    // 5. Exibe o bloco de resultados oculto
    document.getElementById('painelResultados').style.display = 'block';
}