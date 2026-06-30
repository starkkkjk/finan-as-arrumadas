# Smart Finance Planner

## 📖 Sobre o Projeto

O **Smart Finance Planner** é uma aplicação web desenvolvida com **HTML5**, **CSS3** e **JavaScript** para auxiliar no planejamento financeiro pessoal.

O sistema permite simular receitas e despesas, calcular a economia mensal, acompanhar o progresso em direção a uma meta financeira e visualizar os resultados por meio de gráficos interativos.

Este projeto demonstra a aplicação de conceitos de matemática financeira, programação web e visualização de dados em uma interface moderna inspirada no estilo **Gamer Premium Corporativo**.

---

## ✨ Funcionalidades

* Tela de carregamento (Loading Screen)
* Interface responsiva
* Simulação financeira
* Cálculo automático de:

  * Receita
  * Despesas
  * Saldo mensal
  * Economia acumulada
* Barra de progresso da meta financeira
* Atualização dinâmica dos indicadores
* Simulação de cenários financeiros

  * Redução de gastos com lazer
  * Cancelamento de assinaturas
  * Aumento salarial
* Relatórios gráficos utilizando Chart.js
* Rolagem suave entre seções
* Header dinâmico
* Animações de entrada dos elementos
* Atualização automática do ano no rodapé

---

## 🖥️ Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES6)
* Chart.js
* Font Awesome
* Google Fonts (Poppins)

---

## 📂 Estrutura do Projeto

```text
SmartFinancePlanner/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 Como Executar

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/smart-finance-planner.git
```

2. Acesse a pasta do projeto:

```bash
cd smart-finance-planner
```

3. Abra o arquivo `index.html` em qualquer navegador moderno.

Ou utilize uma extensão como **Live Server** no Visual Studio Code.

---

## 📊 Como Funciona

O usuário informa:

* Receita mensal
* Despesas
* Valor da meta
* Prazo em meses

O sistema calcula automaticamente:

```text
Saldo = Receita − Despesas

Economia Total = Saldo × Meses
```

Depois compara o valor economizado com a meta definida e informa se ela poderá ser atingida.

---

## 📈 Gráficos

O projeto utiliza **Chart.js** para gerar:

* Gráfico de Pizza

  * Distribuição das despesas

* Gráfico de Barras

  * Economia acumulada × Meta

* Gráfico de Linha

  * Evolução da economia ao longo dos meses

---

## 🎯 Exemplo

### Entrada

```text
Receita: R$ 2.500

Despesas:
Aluguel: R$ 800
Mercado: R$ 750
Transporte: R$ 250
Internet: R$ 150
Lazer: R$ 350
Assinaturas: R$ 100

Meta:
Notebook: R$ 4.800

Prazo:
12 meses
```

### Resultado

```text
Despesas Totais:
R$ 2.400

Saldo:
R$ 100

Economia em 12 meses:
R$ 1.200

Meta alcançada?
❌ Não
```

---

## 📚 Conceitos Aplicados

* Matemática Financeira
* Planejamento Financeiro
* Manipulação do DOM
* Eventos JavaScript
* Responsividade
* UX/UI
* Visualização de Dados
* Programação Orientada a Eventos

---

## 🔮 Melhorias Futuras

* Login de usuários
* Armazenamento em LocalStorage
* Exportação em PDF
* Exportação para Excel
* Histórico de simulações
* Metas múltiplas
* Investimentos com juros compostos
* Integração com APIs financeiras
* Tema claro/escuro
* Dashboard administrativo

---

## 👨‍💻 Autor

Desenvolvido como projeto de estudo utilizando HTML5, CSS3, JavaScript e Chart.js para demonstrar conceitos de desenvolvimento web e planejamento financeiro.

---

## 📄 Licença

Este projeto está disponível para fins de estudo e aprendizado. Você pode utilizá-lo, modificá-lo e adaptá-lo conforme necessário.
