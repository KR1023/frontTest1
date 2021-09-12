module.exports={
	outputDir: "../src/main/resources/static",
	indexPath: "../static/index.html",
    devServer: {
            // compress: true,
            // disabledHostCheck: true,
            proxy: "http://localhost:8888", changeOrigin: true
    },
    chainWebpack: config =>{
	const svgRule = config.module.rule("svg");
	svgRule.uses.clear();
	svgRule.use("vue-svg-loader").loader("vue-svg-loader");
	}
};