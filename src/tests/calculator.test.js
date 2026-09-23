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
const { spawnSync } = require('node:child_process');
const { calculate, OPERATIONS } = require('../calculator');

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

test.describe('modulo', () => {
  test('calcula o resto da divisão', () => {
    assert.equal(calculate(10, 'modulo', 3), 1);
  });

  test('lança erro ao calcular módulo por zero', () => {
    assert.throws(
      () => calculate(10, 'modulo', 0),
      /Módulo por zero não é permitido\./
    );
  });
});

test.describe('exponentiation', () => {
  test('eleva um número a outro', () => {
    assert.equal(calculate(2, 'exponentiation', 3), 8);
  });

  test('aceita expoente zero', () => {
    assert.equal(calculate(7, 'exponentiation', 0), 1);
  });
});

test.describe('square root', () => {
  test('calcula a raiz quadrada de um número positivo', () => {
    assert.equal(calculate(81, 'squareRoot'), 9);
  });

  test('lança erro para raiz quadrada de número negativo', () => {
    assert.throws(
      () => calculate(-1, 'squareRoot'),
      /Raiz quadrada de número negativo não é permitida\./
    );
  });
});

test.describe('operação inválida', () => {
  test('lança erro para operação desconhecida', () => {
    assert.throws(
      () => calculate(1, 'operacao-inexistente', 2),
      /Operação desconhecida/
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

    assert.equal(OPERATIONS['%'], 'modulo');
    assert.equal(OPERATIONS.mod, 'modulo');
    assert.equal(OPERATIONS['módulo'], 'modulo');

    assert.equal(OPERATIONS['**'], 'exponentiation');
    assert.equal(OPERATIONS.pow, 'exponentiation');
    assert.equal(OPERATIONS['potência'], 'exponentiation');

    assert.equal(OPERATIONS.sqrt, 'squareRoot');
    assert.equal(OPERATIONS.squareroot, 'squareRoot');
    assert.equal(OPERATIONS['raiz-quadrada'], 'squareRoot');
  });
});

test.describe('CLI', () => {
  test('aceita raiz quadrada como operação unária', () => {
    const result = spawnSync(process.execPath, ['src/calculator.js', 'sqrt', '9'], {
      encoding: 'utf8',
      cwd: process.cwd(),
    });

    assert.equal(result.status, 0);
    assert.equal(result.stdout.trim(), '3');
  });

  test('rejeita segundo operando em raiz quadrada', () => {
    const result = spawnSync(process.execPath, ['src/calculator.js', '9', 'sqrt', '3'], {
      encoding: 'utf8',
      cwd: process.cwd(),
    });

    assert.equal(result.status, 1);
    assert.match(result.stderr, /aceita apenas um número/);
  });
});
