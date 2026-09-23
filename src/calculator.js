#!/usr/bin/env node

/**
 * calculator.js
 *
 * Aplicação de calculadora CLI em Node.js.
 * Suporta as quatro operações aritméticas básicas:
 *   - addition       (+ , add,      soma)
 *   - subtraction    (- , subtract, subtracao/subtração)
 *   - multiplication (* , multiply, multiplicacao/multiplicação)
 *   - division       (/ , divide,   divisao/divisão)
 *
 * Uso:
 *   node src/calculator.js <numero1> <operador> <numero2>
 *
 * Exemplos:
 *   node src/calculator.js 4 + 2
 *   node src/calculator.js 10 divide 3
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
};

/**
 * Executa a operação aritmética indicada sobre dois números.
 * @param {number} a - Primeiro operando.
 * @param {string} operation - Operação canônica (addition, subtraction, multiplication, division).
 * @param {number} b - Segundo operando.
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
    default:
      throw new Error(`Operação desconhecida: "${operation}"`);
  }
}

/**
 * Retorna o resto da divisão de a por b.
 * @param {number} a - Dividendo.
 * @param {number} b - Divisor.
 * @returns {number} Resto da divisão de a por b.
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Módulo por zero não é permitido.');
  }
  return a % b;
}

/**
 * Retorna a base elevada ao expoente informado.
 * @param {number} base - Base da potência.
 * @param {number} exponent - Expoente.
 * @returns {number} Resultado de base elevada a exponent.
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Retorna a raiz quadrada de n.
 * @param {number} n - Número do qual se deseja calcular a raiz quadrada.
 * @returns {number} Raiz quadrada de n.
 * @throws {Error} Se n for negativo, pois a raiz quadrada não é definida nos reais.
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Não é possível calcular a raiz quadrada de um número negativo.');
  }
  return Math.sqrt(n);
}

/**
 * Ponto de entrada da CLI: lê os argumentos, valida e imprime o resultado.
 */
function main() {
  const [rawA, rawOperator, rawB] = process.argv.slice(2);

  if (rawA === undefined || rawOperator === undefined || rawB === undefined) {
    console.error('Uso: node src/calculator.js <numero1> <operador> <numero2>');
    console.error('Operadores suportados: + - * / (ou addition, subtraction, multiplication, division)');
    process.exitCode = 1;
    return;
  }

  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error(`Entrada inválida: "${Number.isNaN(a) ? rawA : rawB}" não é um número válido.`);
    process.exitCode = 1;
    return;
  }

  const operation = OPERATIONS[rawOperator.toLowerCase()];

  if (!operation) {
    console.error(`Operador inválido: "${rawOperator}".`);
    console.error('Operadores suportados: + - * / (ou addition, subtraction, multiplication, division)');
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

module.exports = { calculate, OPERATIONS, modulo, power, squareRoot };
