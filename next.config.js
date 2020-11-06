// 'fs'によるエラーが出た際に追加する

module.exports = {
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
            fs: 'empty'
            }
        }
    
        return config
    }
}