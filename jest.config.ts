import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testRegex: '(/tests/.*(test|spec))\\.[jt]sx?$',
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
};
export default config;
