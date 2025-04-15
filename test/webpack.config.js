module.exports = (env) => {
    return {
        entry: {
            index: "./index.js",
        },
        output: {
            path: `${__dirname}/dist`,
            filename: "[name].bundle.js",
        },
        mode: env.prod ? "production" : "development",
        devServer: env.prod
            ? {}
            : {
                  static: {
                      directory: `${__dirname}`,
                  },
                  hot: true,
                  port: 8080,
                  open: true,
              },
        module: {
            rules: [
                {
                    test: /\index.js$/,
                    use: [
                        {
                            loader: "webpack-custom-elements",
                            options: {
                                source: "./components",
                                keepElements: false,
                            },
                        },
                    ],
                },
            ],
        },
    };
};
