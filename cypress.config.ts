import {defineConfig} from 'cypress';

export default defineConfig({
  
  e2e: {
    'baseUrl': 'http://localhost:4200',
    video: false
  },
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
    video: false
  }
  
})