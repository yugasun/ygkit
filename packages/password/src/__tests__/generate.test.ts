import {
  ALPHABET,
  NUMBER,
  SPECIAL,
  generateStrongPwd,
  generateMiddlePwd,
  generateSimplePwd,
  generatePwdByType,
} from '..';

describe('@ygkit/password', () => {
  const strongPwdReg = new RegExp(
    `[${`${NUMBER}${ALPHABET}${ALPHABET.toUpperCase()}${SPECIAL}`}]{8,64}`,
  );

  const middlePwdReg = new RegExp(
    `[${`${NUMBER}${ALPHABET}${ALPHABET.toUpperCase()}`}]{8,64}`,
  );

  const simplePwdReg = new RegExp(`[${`${NUMBER}${ALPHABET}`}]{8,64}`);

  const numberPwdReg = new RegExp(`[${`${NUMBER}`}]{8,64}`);

  test('[default] should generate password', async () => {
    const pwd = generatePwdByType();

    expect(pwd.length).toBe(8);
    expect(strongPwdReg.test(pwd)).toBe(true);
  });

  test('[strong] should generate strong password', async () => {
    const pwd = generateStrongPwd();

    expect(pwd.length).toBe(8);
    expect(strongPwdReg.test(pwd)).toBe(true);
  });
  test('[strong] should generate strong password with length 10', async () => {
    const pwd = generateStrongPwd(10);

    expect(pwd.length).toBe(10);
    expect(strongPwdReg.test(pwd)).toBe(true);
  });

  test('[middle] should generate middle password', async () => {
    const pwd = generateMiddlePwd();

    expect(pwd.length).toBe(8);
    expect(middlePwdReg.test(pwd)).toBe(true);
  });
  test('[middle] should generate middle password with length 10', async () => {
    const pwd = generateMiddlePwd(10);

    expect(pwd.length).toBe(10);
    expect(middlePwdReg.test(pwd)).toBe(true);
  });

  test('[simple] should generate simple password', async () => {
    const pwd = generateSimplePwd();

    expect(pwd.length).toBe(8);
    expect(simplePwdReg.test(pwd)).toBe(true);
  });
  test('[simple] should generate simple password with length 10', async () => {
    const pwd = generateSimplePwd({ length: 10 });

    expect(pwd.length).toBe(10);
    expect(simplePwdReg.test(pwd)).toBe(true);
  });
  test('[number] should generate number password with length 10', async () => {
    const pwd = generateSimplePwd({ isNumber: true });

    expect(pwd.length).toBe(8);
    expect(numberPwdReg.test(pwd)).toBe(true);
  });

  test('[number] should generate number password with length 10', async () => {
    const pwd = generateSimplePwd({ isNumber: true, length: 10 });

    expect(pwd.length).toBe(10);
    expect(numberPwdReg.test(pwd)).toBe(true);
  });
});
