const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
	devServer: {
		proxy: "https://hjvapokvksuwtchyqkzx.supabase.co/rest/v1/" // Backend API root url
	}
})
