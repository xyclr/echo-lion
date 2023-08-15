import path, { dirname } from 'path';
import { fileURLToPath } from 'url'
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import alias from '@rollup/plugin-alias';
import typescript from "@rollup/plugin-typescript";


const resolve = (p) => {
    return path.resolve(dirname(fileURLToPath(import.meta.url)), p)
};
const builds = {
    'runtime-cjs-prod': {
        entry: resolve('src/index.ts'),
        dest: name => `dist/${name}.js`,
        format: 'cjs',
        env: 'production',
        external: []
    },
    'runtime-esm-prd': {
        entry: resolve('src/index.ts'),
        dest: name => `dist/${name}.js`,
        format: 'esm',
        env: 'production',
        external: []
    },
    'runtime-umd-prd': {
        entry: resolve('src/index.ts'),
        dest: name => `dist/${name}.js`,
        format: 'umd',
        env: 'production',
        external: []
    }
}
const getConfig = (name) => {
    const opts = builds[name];
    const config = {
        input: opts.entry,
        external: opts.external,
        plugins: [
            commonjs(),
            babel(),
            // 设置全局路径别名
            alias({
                entries: {
                    'src': resolve('src'),
                }
            }),
            typescript({
                tsconfig: resolve('./tsconfig.json')
            })
        ].concat(opts.plugins, []),
        output: {
            file: opts.dest(name),
            format: opts.format,
            name: opts.name || 'Nice_utils',
        }
    }
    return config;
}


export default Object.keys(builds).map(getConfig)
