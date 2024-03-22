const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf === '' || cpf.length !== 11 || !/^\d{11}$/.test(cpf)) return false;

    // Verifica se todos os dígitos são iguais, o que invalidaria o CPF
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Verifica o primeiro dígito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    // Verifica o segundo dígito
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true; // CPF válido
}

// Função para adicionar máscara ao CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    cpf = cpf.slice(0, 11); // Limita o número de dígitos para 11
    cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    return cpf;
}

// Função para limpar a tabela
function limparTabela() {
    var table = document.getElementById("minhaTabela").getElementsByTagName('tbody')[0];
    table.innerHTML = '';
}

// Função para adicionar na tabela
function adicionarNaTabela() {
    // Obtém os valores do formulário
    var nome = document.getElementById("nome").value;
    var sobrenome = document.getElementById("sobrenome").value;
    var cpf = document.getElementById("inputCPF").value;
    var faixaEtariaRadios = document.getElementsByName("faixaEtaria");
    var faixaEtaria;

    // Verifica qual opção está selecionada
    for (var i = 0; i < faixaEtariaRadios.length; i++) {
        if (faixaEtariaRadios[i].checked) {
            faixaEtaria = faixaEtariaRadios[i].value;
            break;
        }
    }

    // Cria uma nova linha na tabela
    var table = document.getElementById("minhaTabela").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    // Insere células na nova linha
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    // Adiciona os valores do formulário às células
    cell1.innerHTML = nome;
    cell2.innerHTML = sobrenome;
    cell3.innerHTML = cpf;
    cell4.innerHTML = faixaEtaria;
}

// Função a ser executada quando o documento HTML estiver totalmente carregado
document.addEventListener("DOMContentLoaded", function() {
    // Limpa a tabela quando a página é carregada
    limparTabela();

    // Adiciona o evento de clique ao botão "Enviar"
    document.getElementById("enviarButton").addEventListener("click", adicionarNaTabela);
});
