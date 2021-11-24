var view = {
    exibirResultado: function(msg) {
        var resultado = document.getElementById("resultado");
        resultado.innerHTML = msg;
    },
    
    exibirSobre: function(msg) {
        var sobre = document.getElementById("sobre");
        sobre.innerHTML = msg;
    },

    exibirErro: function(erro) {
        var erroDigitacao = document.getElementById(erro);
        erroDigitacao.setAttribute("class", "campoErro");
    },

    limparErro: function(erro) {
        var limparDigitacao = document.getElementById(erro);
        limparDigitacao.setAttribute("class", "campoPadrao");
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
            view.exibirSobre("Abaixo do Peso");
        } else if (imc < 24.9) {
            view.exibirSobre("Normal");
        } else if (imc < 29.9) {
            view.exibirSobre("Sobrepeso");
        } else if (imc < 39.9) {
            view.exibirSobre("Obesidade");
        } else {
            view.exibirSobre("Obesidade Grave")
        };
    }
};

var controller = {
    analisarPesoAltura: function(peso, altura) {
        var formatacaoPeso = new RegExp(/^\d{1,3}[.,]?\d{0,2}$/);
        var resultadoFormatacaoPeso = peso.match(formatacaoPeso);

        var formatacaoAltura = new RegExp(/^[0-2]{1}[.,]?\d{0,2}$/);
        var resultadoFormatacaoAltura = altura.match(formatacaoAltura);
        
        if ((resultadoFormatacaoPeso !== null) && (resultadoFormatacaoAltura !== null)) {
            model.calcularResultado(peso, altura)
        } else {
            if (resultadoFormatacaoPeso === null) {
                view.exibirErro("peso");
            };
            if (resultadoFormatacaoAltura === null) {
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
    view.exibirResultado("00.00");
    view.exibirSobre("Sobre o seu IMC:");
    view.limparErro("peso");
    view.limparErro("altura");
    limparInput();
};

function limparInput() {
    var inputAlvo = document.getElementsByClassName("normal");
    inputAlvo[0].onfocus = "teste";
    console.log(inputAlvo);
}