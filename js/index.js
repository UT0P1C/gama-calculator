//elementos
const input_container = document.querySelector(".input__container");
const output_operation = document.querySelector(".operation .val");
const output_result = document.querySelector(".res .val")

//operadores
const operators = ["+", "-", "/", "*"];

const POWER = "POWER(", FACTORIAL = "FACTORIAL";

//operacao e formula irao guardar toda a operação que o usuário fizer

let data = {
	operation: [],
	formula: []
}

//variaveis aleatorias

let ans = 0;


//botões da calculadora

const calc_btn = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },{
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },{
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "inv_trigo(Math.acos,",
        type : "trigo_function"
    },{
        name : "asin",
        symbol : "asin",
        formula : "inv_trigo(Math.asin,",
        type : "trigo_function"
    },{
        name : "atan",
        symbol : "atan",
        formula : "inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "factorial",
        symbol : "×!",
        formula : FACTORIAL,
        type : "math_function"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "math_function"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];

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


//Radianos e graus

let RADIAN = true;

const rad_btn = document.getElementById("rad");
const deg_btn = document.getElementById("deg");

rad_btn.classList.add("active-angle");

function angToggle(){
	rad_btn.classList.toggle("active-angle");
	deg_btn.classList.toggle("active-angle");
}

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
		else if(btn.name == "delete"){
			data.operation.pop();
			data.formula.pop();
		}

		//troca entre radiano e graus

		else if(btn.name == "rad"){
			RADIAN = true;
			angToggle();
		}
		else if (btn.name == "deg"){
			RADIAN = false;
			angToggle();
		}
	
	} else if(btn.type == "calculate"){

		let formula_str = data.formula.join("");

		//procura as funções de potenciação e fatoração

		let power_search = search(data.formula, POWER);

		let factorial_search = search(data.formula, FACTORIAL);

		//obtém a base de potenciação

		const bases = getPowerBases(data.formula, power_search);

		console.log(bases);
		
		//calcula

		let result;

		try{
			result = eval(formula_str);
		}catch ( err ) {
			if (err instanceof SyntaxError){
				result = "syntax error";

				updateRes(result);

			}
		}
	
		ans = result;
		data.operation[ result ];
		data.formula[ result ];
	
		updateRes(result);
	}


	updateOp(data.operation.join(""));
}


//pegar a base da potenciação

function getPowerBases(formula, power_search){
	let bases = []; // armazena as bases

	power_search.forEach(power_index => {
		let base = []; //base atual

		let parentheses_count = 0; // contagem dos parenteses

		let previous_index = power_index - 1; // obtém a base anterior


		while(previous_index >= 0) {
			//adiciona ou diminui a contagem de parenteses
			if(formula[previous_index] == "(" ) parentheses_count--;
			if(formula[previous_index] == ")" ) parentheses_count++;


			//verifica se é um operador ou potenciação
			let is_operator = false;

			operators.forEach( operator => {
				if(formula[previous_index] == operator) is_operator = true;

			});
			let is_power = formula[previous_index] == POWER;

			if(is_operator && parentheses_count == 0 || is_power) break;

			base.unshift(formula[previous_index]);
			previous_index--;
		}

		//joga a base para a array
		bases.push(base.join(""));
	});

	return bases;

}

//procurar fatoração e potenciação

function search(array, key){
	let search_res = [];

	array.forEach( (element, index) => {
		if(element == key) search_res.push(index);
	});

	return search_res;
}

//função para atualizar as operações e o resultado

function updateOp(operation){
	output_operation.innerHTML = operation;
}

function updateRes(result){
	output_result.innerHTML = result;
}

//fatoração

function factorial(num){
	if (num % 1 != 0 ) return gamma(num + 1);
	if (num === 0 || num === 1) return 1;

	let result = 1;
	for (let i = 1; i <= num; i++) {
		result *= i;
		if (result === Infinity) return Infinity;
	}

	return result
}

//funções trigonometricas

function trigo(callback, angle){
	if(!RADIAN){
		angle = angle * Math.PI/180;
	}
	return callback(angle);
}

function inv_trigo(callback, value){

	let angle = callback(value);

	if(!RADIAN){
		angle = angle * Math.PI/180;
	}

	return angle;
}



// gamma function ( stack overflow )

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
}