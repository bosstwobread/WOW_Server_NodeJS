module.exports = {
    apps: [{
        name: "wow-web",
        script: "./bin/www",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}
