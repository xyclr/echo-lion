import path, {dirname} from 'path';
import resolve from '@rollup/plugin-node-resolve'; // 处理外部依赖
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import esbuild from 'rollup-plugin-esbuild';
import { terser } from 'rollup-plugin-terser';

const packageDir = path.resolve(__dirname);
const name = path.basename(packageDir);
const packageDirDist = `${packageDir}/dist`;

export const common = {
    input: `${packageDir}/src/index.ts`,
    output: {
        name: `ECHOLION_${name.toLocaleUpperCase()}`,
        footer: '/* follow me on Github! @xyclr */'
    },
    // external: opts.external,
    plugins: [
        esbuild({
            include: /\.[jt]sx?$/,
            exclude: /node_modules/,
            minify: process.env.NODE_ENV === 'production',
            target: 'es2015',
            jsx: 'transform',
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
            tsconfig: 'tsconfig.json',
            loaders: {
                '.json': 'json',
                '.js': 'jsx'
            }
        }),
        alias({
            entries: {
                'src': resolve('src'),
            }
        }),
        resolve({
            preferBuiltins: true
        }),
        commonjs(),
        // nodePolyfills(),
        // json(),
        // size()
    ],
}

export const cjsPack = {
    ...common,
    output: {
        file: `${packageDirDist}/${name}.cjs.js`,
        format: 'cjs',
        ...common.output
    }
}

export const umdPack = {
    ...common,
    output: {
        file: `${packageDirDist}/${name}.umd.js`,
        format: 'umd',
        ...common.output
    }
}

export const esmPack = {
    ...common,
    plugins: [terser()],
    output: {
        file: `${packageDirDist}/${name}.esm.js`,
        format: 'esm',
        ...common.output
    }
}

export const iifePack = {
    ...common,
    output: {
        file: `${packageDirDist}/${name}.iife.js`,
        format: 'iife',
        ...common.output
    },
    context: 'window',
    plugins: [
        ...common.plugins,
        terser()
    ]
}
