import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
	plugins:
	[
		vue(),
		Components({
			resolvers:
			[
				NaiveUiResolver(),
				IconsResolver({
					enabledCollections: ["tabler"]
				})
			]
		}),
		Icons({
			autoInstall: true
		})
	]
});