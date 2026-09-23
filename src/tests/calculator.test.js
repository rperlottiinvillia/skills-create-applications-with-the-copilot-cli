/**
 * calculator.test.js
 *
 * Testes unitários para src/calculator.js usando o test runner nativo do
 * Node.js (node:test), sem necessidade de instalar dependências externas.
 *
 * Executar com: npm test
 * (ou diretamente: node --test src/tests)
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate, OPERATIONS, modulo, power, squareRoot } = require('../calculator');

// Exemplos baseados na imagem images/calc-basic-operations.png:
//   2 + 3, 10 - 4, 45 * 2, 20 / 5
test('addition: 2 + 3 = 5 (exemplo da imagem)', () => {
  assert.equal(calculate(2, 'addition', 3), 5);
});

test('subtraction: 10 - 4 = 6 (exemplo da imagem)', () => {
  assert.equal(calculate(10, 'subtraction', 4), 6);
});

test('multiplication: 45 * 2 = 90 (exemplo da imagem)', () => {
  assert.equal(calculate(45, 'multiplication', 2), 90);
});

test('division: 20 / 5 = 4 (exemplo da imagem)', () => {
  assert.equal(calculate(20, 'division', 5), 4);
});

// Exemplos baseados na imagem images/calc-extended-operations.png:
//   modulo with 5 % 2, power with 2 ^ 3, square root with √16
test('modulo: 5 % 2 = 1 (exemplo da imagem)', () => {
  assert.equal(modulo(5, 2), 1);
});

test('power: 2 ^ 3 = 8 (exemplo da imagem)', () => {
  assert.equal(power(2, 3), 8);
});

test('squareRoot: √16 = 4 (exemplo da imagem)', () => {
  assert.equal(squareRoot(16), 4);
});

test.describe('addition', () => {
  test('soma dois números positivos', () => {
    assert.equal(calculate(4, 'addition', 2), 6);
  });

  test('soma números negativos', () => {
    assert.equal(calculate(-5, 'addition', -3), -8);
  });

  test('soma com zero', () => {
    assert.equal(calculate(0, 'addition', 7), 7);
  });

  test('soma números decimais', () => {
    assert.equal(calculate(1.5, 'addition', 2.25), 3.75);
  });
});

test.describe('subtraction', () => {
  test('subtrai dois números positivos', () => {
    assert.equal(calculate(8, 'subtraction', 3), 5);
  });

  test('resultado negativo quando subtraendo é maior', () => {
    assert.equal(calculate(3, 'subtraction', 8), -5);
  });

  test('subtrai com zero', () => {
    assert.equal(calculate(9, 'subtraction', 0), 9);
  });

  test('subtrai números negativos', () => {
    assert.equal(calculate(-4, 'subtraction', -4), 0);
  });
});

test.describe('multiplication', () => {
  test('multiplica dois números positivos', () => {
    assert.equal(calculate(5, 'multiplication', 6), 30);
  });

  test('multiplica por zero', () => {
    assert.equal(calculate(123, 'multiplication', 0), 0);
  });

  test('multiplica números negativos', () => {
    assert.equal(calculate(-3, 'multiplication', -3), 9);
  });

  test('multiplica número positivo por negativo', () => {
    assert.equal(calculate(4, 'multiplication', -2), -8);
  });
});

test.describe('division', () => {
  test('divide dois números positivos', () => {
    assert.equal(calculate(10, 'division', 2), 5);
  });

  test('divide resultando em número decimal', () => {
    assert.equal(calculate(10, 'division', 3), 10 / 3);
  });

  test('divide números negativos', () => {
    assert.equal(calculate(-12, 'division', 4), -3);
  });

  test('lança erro ao dividir por zero (caso extremo)', () => {
    assert.throws(
      () => calculate(1, 'division', 0),
      /Divisão por zero não é permitida\./
    );
  });
});

test.describe('operação inválida', () => {
  test('lança erro para operação desconhecida', () => {
    assert.throws(
      () => calculate(1, 'modulo', 2),
      /Operação desconhecida/
    );
  });
});

test.describe('modulo', () => {
  test('resto da divisão de dois números positivos', () => {
    assert.equal(modulo(10, 3), 1);
  });

  test('resto quando o dividendo é menor que o divisor', () => {
    assert.equal(modulo(3, 10), 3);
  });

  test('resto com números negativos', () => {
    assert.equal(modulo(-10, 3), -1);
  });

  test('lança erro ao calcular módulo por zero', () => {
    assert.throws(
      () => modulo(1, 0),
      /Módulo por zero não é permitido\./
    );
  });
});

test.describe('power', () => {
  test('eleva um número positivo a uma potência positiva', () => {
    assert.equal(power(2, 10), 1024);
  });

  test('qualquer número elevado a zero é 1', () => {
    assert.equal(power(5, 0), 1);
  });

  test('expoente negativo retorna fração', () => {
    assert.equal(power(2, -1), 0.5);
  });

  test('base negativa com expoente par', () => {
    assert.equal(power(-2, 2), 4);
  });
});

test.describe('squareRoot', () => {
  test('raiz quadrada de um número positivo', () => {
    assert.equal(squareRoot(9), 3);
  });

  test('raiz quadrada de zero', () => {
    assert.equal(squareRoot(0), 0);
  });

  test('raiz quadrada de número decimal', () => {
    assert.equal(squareRoot(2), Math.sqrt(2));
  });

  test('lança erro para números negativos', () => {
    assert.throws(
      () => squareRoot(-4),
      /Não é possível calcular a raiz quadrada de um número negativo\./
    );
  });
});

test.describe('mapa de aliases de operadores (OPERATIONS)', () => {
  test('símbolos e nomes em inglês/português mapeiam para a operação correta', () => {
    assert.equal(OPERATIONS['+'], 'addition');
    assert.equal(OPERATIONS.add, 'addition');
    assert.equal(OPERATIONS.soma, 'addition');

    assert.equal(OPERATIONS['-'], 'subtraction');
    assert.equal(OPERATIONS.subtract, 'subtraction');
    assert.equal(OPERATIONS['subtração'], 'subtraction');

    assert.equal(OPERATIONS['*'], 'multiplication');
    assert.equal(OPERATIONS.x, 'multiplication');
    assert.equal(OPERATIONS['multiplicação'], 'multiplication');

    assert.equal(OPERATIONS['/'], 'division');
    assert.equal(OPERATIONS.divide, 'division');
    assert.equal(OPERATIONS['divisão'], 'division');
  });
});
