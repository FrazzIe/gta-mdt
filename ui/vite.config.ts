import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
	plugins:
	[
		vue(),
		AutoImport({
			imports:
			[
				"vue"
			],
			resolvers:
			[
				IconsResolver()
			]
		}),
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