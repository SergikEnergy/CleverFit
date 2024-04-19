import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    testEnvironment: 'node',
    preset: 'ts-jest/presets/default-esm',
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '^@redux/(.*)$': '<rootDir>/src/redux/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+\\.ts?$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: './tsconfig.json',
            },
        ],
    },
};

export default jestConfig;
