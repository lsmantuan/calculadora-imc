var view = {
    exibirResultado: function(imc) {
        var resultadoIMC = document.getElementById("imc");
        resultadoIMC.innerHTML = imc;
    },
    
    exibirSobre: function(titulo, sobre) {
        var resultadoTitulo = document.getElementById("titulo");
        var resultadoSobre = document.getElementById("sobre");
        resultadoTitulo.innerHTML = titulo;
        resultadoSobre.innerHTML = sobre;
    },

    exibirErro: function(erro) {
        var erroDigitacao = document.getElementById(erro);
        erroDigitacao.setAttribute("class", "campoErro");
    },

    limparErro: function(erro) {
        var limparDigitacao = document.getElementById(erro);
        limparDigitacao.setAttribute("class", "campoPadrao");
    },

    alterarImagem: function(tipo) {
        var imagem = document.getElementById("imagem");
        imagem.style.backgroundImage = "url(/imagens/" + tipo + ".png)";
    }
};

var model = {
    calcularResultado: function(peso, altura) { 
        var resultado = Number(peso) / Math.pow(Number(altura), 2);
        view.exibirResultado(resultado.toFixed(2));
        this.processarSobre(resultado);
    },

    processarSobre: function(imc) {
        if (imc < 18.5) {
            view.exibirSobre("Abaixo do Normal", "Procure um médico. Algumas pessoas têm um baixo peso por características do seu organismo e tudo bem, mas outras podem estar enfrentando problemas.");
            view.alterarImagem("abaixo");
        } else if (imc < 24.9) {
            view.exibirSobre("Normal", "Que bom que você está com o peso normal! E o melhor jeito de continuar assim é mantendo um estilo de vida ativo e uma alimentação equilibrada.");
            view.alterarImagem("normal");
        } else if (imc < 29.9) {
            view.exibirSobre("Sobrepeso", "Ele é, na verdade, uma pré-obesidade e muitas pessoas nessa faixa já apresentam doenças associadas, como diabetes e hipertensão.");
            view.alterarImagem("sobrepeso");
        } else if (imc < 34.9) {
            view.exibirSobre("Obesidade Grau I", "Sinal de alerta! Chegou na hora de se cuidar, mesmo que seus exames sejam normais. Vamos dar início a mudanças hoje! Cuide de sua alimentação.");
            view.alterarImagem("obesidade");
        } else if (imc < 39.9) {
            view.exibirSobre("Obesidade Grau II", "Mesmo que seus exames aparentem estar normais, é hora de se cuidar, iniciando mudanças no estilo de vida com o acompanhamento próximo de profissionais de saúde.");            
            view.alterarImagem("obesidade");
        } else {
            view.exibirSobre("Obesidade Grau III", "Aqui o sinal é vermelho, com forte probabilidade de já existirem doenças muito graves associadas. O tratamento deve ser ainda mais urgente.")
            view.alterarImagem("obesidade");
        };
    }
};

var controller = {
    analisarPesoAltura: function(peso, altura) {
        var formatacaoPeso = new RegExp(/^\d{1,3}[.,]?\d{0,2}$/);
        var resultadoFormatacaoPeso = formatacaoPeso.test(peso);

        var formatacaoAltura = new RegExp(/^[0-2]{1}[.,]?\d{0,2}$/);
        var resultadoFormatacaoAltura = formatacaoAltura.test(altura);
        
        if ((resultadoFormatacaoPeso === true) && (resultadoFormatacaoAltura === true)) {
            model.calcularResultado(peso, altura)
        } else {
            if (resultadoFormatacaoPeso === false) {
                view.exibirErro("peso");
            };
            if (resultadoFormatacaoAltura === false) {
                view.exibirErro("altura");
            };
        };        
    }
};

function calcularIMC() {
    var pesoInformado = document.getElementById("peso");
    var peso = pesoInformado.value;
    var alturaInformada = document.getElementById("altura");
    var altura = alturaInformada.value;
    controller.analisarPesoAltura(peso, altura);
};

function limparIMC() {
    var pesoInformado = document.getElementById("peso");
    pesoInformado.value = "";
    var alturaInformada = document.getElementById("altura");
    alturaInformada.value = "";
    view.exibirResultado("0");
    view.exibirSobre("IMC", "Descubra o seu Índice de Massa Corporal (IMC) digitando seu peso (kg) e altura (m) e em seguida clicando no botão calcular!");
    view.limparErro("peso");
    view.limparErro("altura");
    view.alterarImagem("inativo");
};

window.onload = function() { 
    var input = document.getElementsByClassName("campoPadrao");
    for (let i = 0; i < input.length; i++) {
    input[i].onfocus = limparInput;
    }
};

function limparInput(event) {
    var classAlvo = event.target.className;
    var idAlvo = event.target.id;
    if (classAlvo === "campoErro") {
        var input = document.getElementById(idAlvo);
        input.setAttribute("class", "campoPadrao");        
    }
};