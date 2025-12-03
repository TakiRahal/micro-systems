import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './src/environments')
  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      federation({
        name: 'HostApp',
        remotes: {
          UserApp: env.VITE_USER_APP_URL || 'http://localhost:5001/assets/remoteEntry.js',
          OfferApp: env.VITE_OFFER_APP_URL || 'http://localhost:5002/assets/remoteEntry.js'
        },
        exposes: {
          './Box': './src/components/atoms/box/components/box.tsx',
          './Button': './src/components/atoms/button/components/button.tsx',
          './IconButton': './src/components/atoms/button/components/icon-button.tsx',
          './Stack': './src/components/atoms/stack/components/stack.tsx',
          './FieldInput': './src/components/atoms/field-input/components/field-input.tsx',
          './Container': './src/components/atoms/container/components/container.tsx',
          './Grid': './src/components/atoms/grid/components/grid.tsx',
          './List': './src/components/atoms/list/components/list.tsx',
          './ListItem': './src/components/atoms/list-item/components/list-item.tsx',
          './ListItemAvatar': './src/components/atoms/list-item-avatar/components/list-item-avatar.tsx',
          './ListItemText': './src/components/atoms/list-item-text/components/list-item-text.tsx',
          './Typography': './src/components/atoms/typography/components/typography.tsx',
          './Divider': './src/components/atoms/divider/components/divider.tsx',
          './Avatar': './src/components/atoms/avatar/components/avatar.tsx',
          './Card': './src/components/molecules/card/components/card.tsx',
          './Dialog': './src/components/molecules/dialog/components/dialog.tsx',
          './PageContainer': './src/components/organisms/page-container/components/page-container.tsx',
          './CircularProgress': './src/components/atoms/circular-progress/components/circular-progress.tsx',
          './Snackbar': './src/components/molecules/snack-bar/components/snack-bar.tsx',
          './ApiService': './src/config/api-service.ts',
          './DataTable': './src/components/organisms/data-table/components/data-table.tsx',
          './Formik': './src/config/formik/index.tsx'
        },
        shared: ['react', 'react-dom', '@tanstack/react-query', '@tanstack/react-router', 'yup']
      })
    ].filter(Boolean), 
    resolve: {
      alias: {
        '@atoms': './src/components/atoms',
        '@molecules': './src/components/molecules',
        '@templates': './src/components/templates'
      },  
    },
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: Number(env.VITE_APP_PORT) || 5000,
      strictPort: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8081',
          changeOrigin: true,
        },
        '/path-user-logout': {
          target: 'http://localhost:8081',
          changeOrigin: true,
        },
        '/authorization': {
          target: 'http://localhost:8081',
          changeOrigin: true,
        },
        '/oauth2': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          xfwd: true,
        },
        '/realms': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          xfwd: true,
        },
      }
    },
    envDir: './src/environments'
  }

})