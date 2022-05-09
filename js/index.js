import { calc_btn } from "./buttons.js";

//elementos
const input_container = document.querySelector(".input__container");
const output_operation = document.querySelector(".operation .val");
const output_result = document.querySelector(".res .val")

//operadores
const operators = ["+", "-", "/", "*"];

const potenciacao = "potenciacao(", fatoracao = "fatoracao";

//operacao e formula irao guardar toda a operação que o usuário fizer

let data = {
	operation: [],
	formula: []
}

//variaveis aleatorias

let ans = 0;


//cria os botoes da calculadora

function createCalcBtn () {
	const btn_row_limit = 8;
	let btn_now = 0;

	calc_btn.forEach( btn => {
		if (btn_now % btn_row_limit == 0) {
			input_container.innerHTML += `<div class="row"> </div>`;
		}

		const row = document.querySelector(".row:last-child");
		row.innerHTML += `<button id="${btn.name}">
		${btn.symbol}
		</button>`;

		btn_now++;
	})
}

createCalcBtn();

//ouvir os clicks do usuário

input_container.addEventListener("click", e => {

	const target_btn = e.target;

	calc_btn.forEach( btn => {
		if(btn.name == target_btn.id) calculate(btn);
	})

})

//calculadora

function calculate(btn) {
	if(btn.type == "number"){
		//adiciona o número
		data.operation.push(btn.symbol);
		data.formula.push(btn.formula);

	} else if(btn.type == "operator"){
		//adiciona o operador
		data.operation.push(btn.symbol);
		data.formula.push(btn.formula);

	} else if(btn.type == "trigo_function"){
		//funções trigonometricas

		data.operation.push(btn.symbol + "(")
		data.formula.push(btn.formula)

	
	} else if(btn.type == "math_function"){
		let symbol;
		let formula;

		//fatoração
		if(btn.name == "factorial"){
			symbol = "!";
			formula = btn.formula;

			data.operation.push(symbol);
			data.formula.push(formula);

		}
		//potenciação
		else if (btn.name == "power"){
			symbol = "^(";
			formula = btn.formula;

			data.operation.push(symbol);
			data.formula.push(formula);

		}
		//elevado ao quadrado
		else if (btn.name == "square"){
			symbol = "^(";
			formula = btn.formula;

			data.operation.push(symbol);
			data.formula.push(formula);

			data.operation.push("2)");
			data.formula.push("2)");

		}
		//outras funções matemáticas
		else {
			symbol = btn.symbol + "(";
			formula = btn.formula + "(";

			data.operation.push(symbol);
			data.formula.push(formula)
		}
	} else if(btn.type == "key"){

		//limpa
		if(btn.name == "clear"){

			data.operation = []
			data.formula = []

			updateRes(0);

		}
		//apaga o ultimo numero digitado
		if(btn.name == "delete"){
			data.operation.pop();
			data.formula.pop();
		}
	
	} else if(btn.type == "calculate"){
		
		//faz a operação usando eval
		let formula_str = data.formula.join("");

		let result = eval(formula_str);

		updateRes(result);
	
	}

	updateOp(data.operation.join(""));
}

//função para atualizar as operações e o resultado

function updateOp(operation){
	output_operation.innerHTML = operation
}

function updateRes(result){
	output_result.innerHTML = result
}



// gamma function (tirei do stack overflow também)

/*

function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
		n--;
		var x = p[0];
		for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
	}
		var t = n + g + 0.5;
		return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}*/