const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    module:{
        rules:[//Cargar todos loaders
            {
                test: /\.html$/, //Regex archivos html
                use: [
                    {
                        loader: "html-loader", //HTML->JS
                        options:{minimize:true}
                    }

                    //test -> que buscar
                    //use -> Loader a ejecutar
                ]
            },
            {
                test: /\.js$/,  
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader"
                }
            },
            {
                test: /\.scss$/, 
                use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg)$/,
                use:[
                    'file-loader'
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/index.html", //Html base
            filename:"./index.html" //Html generado
        }),

        new MiniCssExtractPlugin({
            template:"[name].css",
            filename:"[id].css"
        })
    ]
}