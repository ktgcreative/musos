import type { KnipConfig } from 'knip'

const config: KnipConfig = {
    $schema: 'https://unpkg.com/knip@5/schema.json',

    // Entry points - where Knip starts looking for used code
    entry: [
        // Next.js App Router entry points
        'src/app/**/page.{js,ts,jsx,tsx}',
        'src/app/**/layout.{js,ts,jsx,tsx}',
        'src/app/**/loading.{js,ts,jsx,tsx}',
        'src/app/**/error.{js,ts,jsx,tsx}',
        'src/app/**/not-found.{js,ts,jsx,tsx}',
        'src/app/**/global-error.{js,ts,jsx,tsx}',
        'src/app/**/route.{js,ts}',
        'src/app/**/default.{js,ts,jsx,tsx}',
        'src/app/**/template.{js,ts,jsx,tsx}',

        // API routes
        'src/app/api/**/route.{js,ts}',

        // Middleware
        'src/middleware.{js,ts}',

        // Config files
        'next.config.{js,ts}',
        'tailwind.config.{js,ts}',
        'postcss.config.{js,mjs}',

        // Global CSS
        'src/app/globals.css',
    ],

    // Project files to analyze
    project: [
        'src/**/*.{js,ts,jsx,tsx}',
        '!src/**/*.test.{js,ts,jsx,tsx}',
        '!src/**/*.spec.{js,ts,jsx,tsx}',
        '!src/**/__tests__/**',
        '!src/**/*.stories.{js,ts,jsx,tsx}',
    ],

    // Files and directories to ignore
    ignore: [
        '.next/**',
        'node_modules/**',
        'public/**',
        '**/*.d.ts',
        'dist/**',
        'build/**',
    ],

    // Dependencies that should be ignored (won't be flagged as unused)
    ignoreDependencies: [
        // Next.js peer dependencies
        'react',
        'react-dom',

        // PostCSS plugins that are used in config
        'autoprefixer',

        // ESLint and its configs
        'eslint',
        'eslint-config-next',

        // TypeScript
        'typescript',
        '@types/node',
        '@types/react',
        '@types/react-dom',
    ],

    // Exports that should be ignored (won't be flagged as unused)
    ignoreExportsUsedInFile: true,

    // Plugin-specific configurations
    next: {
        entry: [
            'next.config.{js,ts}',
            'src/app/**/page.{js,ts,jsx,tsx}',
            'src/app/**/layout.{js,ts,jsx,tsx}',
            'src/app/**/loading.{js,ts,jsx,tsx}',
            'src/app/**/error.{js,ts,jsx,tsx}',
            'src/app/**/not-found.{js,ts,jsx,tsx}',
            'src/app/**/route.{js,ts}',
            'src/middleware.{js,ts}',
        ],
    },

    tailwind: {
        config: ['tailwind.config.{js,ts}'],
    },

    postcss: {
        config: ['postcss.config.{js,mjs}'],
    },
}

export default config 