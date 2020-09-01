import { spawnSync } from 'child_process';
import * as chalk from 'chalk';
import ora from 'ora';

const REGEX_AK = new RegExp(
  '(AKID[a-zA-Z0-9]{32})([^a-zA-Z0-9]|$)|([a-zA-Z0-9]{32})([^a-zA-Z0-9]|$)',
  'g',
);

function scan(cwd = process.cwd(), reg = REGEX_AK) {
  console.log('\n');
  const spinner = ora(chalk.cyan('Start sensitive info checking\n')).start();
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
      spinner.fail(line.replace(res[0], chalk.red(res[0])));
    }
  });

  if (exist) {
    console.log('\n');
    spinner.fail(
      chalk.red(`Sensitive info check failed! Please remove sensitive info!`),
    );
    return false;
  } else {
    spinner.succeed(chalk.green('Sensitive info check pass'));
    return true;
  }
}

export { scan, REGEX_AK };
