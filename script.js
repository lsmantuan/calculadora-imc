var view = {
    exibirResultado: function(msg) {
        var resultado = document.getElementById("resultado");
        resultado.innerHTML = msg;
    },
    
    exibirSobre: function(msg) {
        var sobre = document.getElementById("sobre");
        sobre.innerHTML = msg;
    },

    exibirErro: function(msg) {
        var sobre = document.getElementById("erro");
        sobre.innerHTML = msg;
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
            view.exibirSobre(" ");
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
        var formatacaoPeso = new RegExp(/^[0-9]{1,3},?.?\d{0,2}$/);
        var resultadoFormatacaoPeso = peso.match(formatacaoPeso);

        var formatacaoAltura = new RegExp(/^[0-2]{1},?.?\d{0,2}$/);
        var resultadoFormatacaoAltura = altura.match(formatacaoAltura);
        
        if ((resultadoFormatacaoPeso !== null) && (resultadoFormatacaoAltura !== null)) {
            model.calcularResultado(peso, altura)
        } else {
            if (resultadoFormatacaoPeso === null) {
                view.exibirErro("Erro Peso");
                console.log("Peso")
                console.log(resultadoFormatacaoPeso)      
                console.log(peso) 
                console.log(altura)               
            } else if (resultadoFormatacaoAltura === null) {
                view.exibirErro("Erro Altura");
                console.log("Altura")
                console.log(resultadoFormatacaoPeso)  
                console.log(resultadoFormatacaoAltura) 
                console.log(peso) 
                console.log(altura)                
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
}