import { InvalidOptionArgumentError, program } from 'commander';
import * as chalk from 'chalk';
import { prompt } from 'inquirer';

const LEVEL_MAP: { [propName: string]: string } = {
  strong: 'h',
  middle: 'm',
  simple: 'l',
  number: 'n',
};

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER = '0123456789';
const SPECIAL = '~!@#$%^&*_-';

function _parseInt(value: any) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidOptionArgumentError('Not a number.');
  }
  return parsedValue;
}

function generateStrongPwd(length = 8) {
  let password = '';
  let character = '';
  while (password.length < length) {
    const entity1 = Math.ceil(ALPHABET.length * Math.random() * Math.random());
    const entity2 = Math.ceil(SPECIAL.length * Math.random() * Math.random());
    const entity3 = Math.ceil(NUMBER.length * Math.random() * Math.random());

    let hold = ALPHABET.charAt(entity1);
    hold = password.length % 2 === 0 ? hold.toUpperCase() : hold;
    character += hold;
    character += SPECIAL.charAt(entity2);
    character += NUMBER.charAt(entity3);
    password = character;
  }
  password = password
    .split('')
    .sort(function() {
      return 0.5 - Math.random();
    })
    .join('');

  return password.substr(0, length);
}

function generateMiddlePwd(length = 8) {
  let password = '';
  let character = '';
  while (password.length < length) {
    const entity1 = Math.ceil(ALPHABET.length * Math.random() * Math.random());
    const entity2 = Math.ceil(NUMBER.length * Math.random() * Math.random());

    let hold = ALPHABET.charAt(entity1);

    hold = 0.5 - Math.random() > 0 ? hold.toUpperCase() : hold;
    character += hold;
    character += NUMBER.charAt(entity2);
    password = character;
  }
  password = password
    .split('')
    .sort(function() {
      return 0.5 - Math.random();
    })
    .join('');

  return password.substr(0, length);
}

function generateSimplePwd(opt?: { isNumber?: boolean; length?: number }) {
  const { isNumber = false, length = 8 } = opt || {};
  const PWD_CHARS = isNumber ? NUMBER : `${NUMBER}${ALPHABET}`;

  return Array(length)
    .fill(PWD_CHARS)
    .map((item) => {
      return item[Math.floor(Math.random() * item.length)];
    })
    .join('');
}

function generatePwdByType(opt?: { length?: number; type?: string }) {
  const { length = 8, type } = opt || {};
  let pwd = '';
  switch (type) {
    case 'h':
      pwd = generateStrongPwd(length);
      break;
    case 'm':
      pwd = generateMiddlePwd(length);
      break;
    case 'l':
      pwd = generateSimplePwd({ length });
      break;
    case 'n':
      pwd = generateSimplePwd({ length, isNumber: true });
      break;
    default:
      pwd = generateStrongPwd(length);
  }
  return pwd;
}

async function run() {
  const questions = [
    {
      type: 'list',
      name: 'type',
      message: 'Please choose password type',
      choices: ['strong', 'middle', 'simple', 'number'],
    },
  ];

  program
    .option('-t, --type <type>', 'password type, support: h, m, l, n')
    .option('-l, --length <length>', 'password length', _parseInt, 8)
    .action(async ({ length, type }: { length: number; type?: string }) => {
      let pwd = '';
      if (!type) {
        const answers = await prompt(questions);
        type = LEVEL_MAP[answers.type];
      }
      pwd = generatePwdByType({ length, type });

      console.log(
        `${chalk.bgGreen(chalk.black(' RESULT '))} ${chalk.green(pwd)}`,
      );
    });

  program.on('--help', () => {
    console.log('');
    console.log('Example call:');
    console.log('  $ yp --help');
  });

  program.parse(process.argv);
}

export {
  ALPHABET,
  NUMBER,
  SPECIAL,
  generateStrongPwd,
  generateMiddlePwd,
  generateSimplePwd,
  generatePwdByType,
  run,
};
