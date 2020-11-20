import { spawnSync } from 'child_process';
import { cyan, red, green } from 'chalk';
const ora = require('ora');

const REGEX_AK = new RegExp(
  '(AKID[a-zA-Z0-9]{32})([^a-zA-Z0-9]|$)|([a-zA-Z0-9]{32})([^a-zA-Z0-9]|$)',
  'g',
);

function scan(cwd = process.cwd(), reg = REGEX_AK) {
  console.log('\n');
  const spinner = ora(cyan('Start sensitive info checking\n')).start();
  const { stdout } = spawnSync('git', ['diff', '--cached', 'HEAD'], { cwd });
  const diffLines = stdout
    .toString()
    .split('\n')
    .map((s) => s.trim());

  let exist = false;
  diffLines.forEach((line) => {
    const res = line.match(reg);
    if (res) {
      exist = true;
      spinner.fail(line.replace(res[0], red(res[0])));
    }
  });

  if (exist) {
    console.log('\n');
    spinner.fail(
      red(`Sensitive info check failed! Please remove sensitive info!`),
    );
    process.exitCode = 1;
    return false;
  } else {
    spinner.succeed(green('Sensitive info check pass'));
    process.exitCode = 0;
    return true;
  }
}

export { scan, REGEX_AK };
