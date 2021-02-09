module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: '../backend/public',
  devServer: { 
    proxy: { 
      '/': { 
        target: 'http://localhost:3000/',
        changeOrigin: true, 
      } 
    } 
  },
}
