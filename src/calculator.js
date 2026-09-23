#!/usr/bin/env node

/**
 * calculator.js
 *
 * Aplicação de calculadora CLI em Node.js.
 * Suporta operações aritméticas básicas e avançadas:
 *   - addition       (+ , add,      soma)
 *   - subtraction    (- , subtract, subtracao/subtração)
 *   - multiplication (* , multiply, multiplicacao/multiplicação)
 *   - division       (/ , divide,   divisao/divisão)
 *   - modulo         (% , mod,      modulo/módulo)
 *   - exponentiation (**, pow,      potencia/potência)
 *   - square root    (sqrt, raiz,   squareroot)
 *
 * Uso:
 *   node src/calculator.js <numero1> <operador> <numero2>
 *   node src/calculator.js <operador-unario> <numero>
 *
 * Exemplos:
 *   node src/calculator.js 4 + 2
 *   node src/calculator.js 10 divide 3
 *   node src/calculator.js sqrt 9
 */

// Mapeia os aliases de cada operador para uma operação canônica.
const OPERATIONS = {
  '+': 'addition',
  add: 'addition',
  addition: 'addition',
  soma: 'addition',

  '-': 'subtraction',
  sub: 'subtraction',
  subtract: 'subtraction',
  subtraction: 'subtraction',
  subtracao: 'subtraction',
  'subtração': 'subtraction',

  '*': 'multiplication',
  x: 'multiplication',
  multiply: 'multiplication',
  multiplication: 'multiplication',
  multiplicacao: 'multiplication',
  'multiplicação': 'multiplication',

  '/': 'division',
  divide: 'division',
  division: 'division',
  divisao: 'division',
  'divisão': 'division',

  '%': 'modulo',
  mod: 'modulo',
  modulo: 'modulo',
  'módulo': 'modulo',

  '**': 'exponentiation',
  pow: 'exponentiation',
  power: 'exponentiation',
  exponentiation: 'exponentiation',
  potencia: 'exponentiation',
  'potência': 'exponentiation',

  sqrt: 'squareRoot',
  squareroot: 'squareRoot',
  'square-root': 'squareRoot',
  raiz: 'squareRoot',
  'raiz-quadrada': 'squareRoot',
};

/**
 * Executa a operação aritmética indicada sobre um ou dois números.
 * @param {number} a - Primeiro operando.
 * @param {string} operation - Operação canônica.
 * @param {number} [b] - Segundo operando, quando aplicável.
 * @returns {number} Resultado da operação.
 */
function calculate(a, operation, b) {
  switch (operation) {
    case 'addition':
      return a + b;
    case 'subtraction':
      return a - b;
    case 'multiplication':
      return a * b;
    case 'division':
      if (b === 0) {
        throw new Error('Divisão por zero não é permitida.');
      }
      return a / b;
    case 'modulo':
      if (b === 0) {
        throw new Error('Módulo por zero não é permitido.');
      }
      return a % b;
    case 'exponentiation':
      return a ** b;
    case 'squareRoot':
      if (a < 0) {
        throw new Error('Raiz quadrada de número negativo não é permitida.');
      }
      return Math.sqrt(a);
    default:
      throw new Error(`Operação desconhecida: "${operation}"`);
  }
}

/**
 * Ponto de entrada da CLI: lê os argumentos, valida e imprime o resultado.
 */
function main() {
  const args = process.argv.slice(2);
  const unaryOperations = new Set(['squareRoot']);
  let rawA;
  let rawOperator;
  let rawB;

  if (args.length === 2) {
    [rawOperator, rawA] = args;
  } else if (args.length === 3) {
    [rawA, rawOperator, rawB] = args;
  } else {
    console.error('Uso: node src/calculator.js <numero1> <operador> <numero2>');
    console.error('   ou: node src/calculator.js <operador-unario> <numero>');
    console.error('Operadores suportados: + - * / % ** sqrt (e aliases em inglês/português)');
    process.exitCode = 1;
    return;
  }

  const operation = OPERATIONS[rawOperator.toLowerCase()];

  if (!operation) {
    console.error(`Operador inválido: "${rawOperator}".`);
    console.error('Operadores suportados: + - * / % ** sqrt (e aliases em inglês/português)');
    process.exitCode = 1;
    return;
  }

  const a = Number(rawA);

  if (Number.isNaN(a)) {
    console.error(`Entrada inválida: "${rawA}" não é um número válido.`);
    process.exitCode = 1;
    return;
  }

  const b = rawB === undefined ? undefined : Number(rawB);

  if (!unaryOperations.has(operation) && rawB === undefined) {
    console.error(`A operação "${rawOperator}" exige dois números.`);
    process.exitCode = 1;
    return;
  }

  if (rawB !== undefined && Number.isNaN(b)) {
    console.error(`Entrada inválida: "${rawB}" não é um número válido.`);
    process.exitCode = 1;
    return;
  }

  if (unaryOperations.has(operation) && rawB !== undefined) {
    console.error(`A operação "${rawOperator}" aceita apenas um número.`);
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(a, operation, b);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { calculate, OPERATIONS };
