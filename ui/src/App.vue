<style>
	#app
	{
		--app-tabs-padding-top: 0.5em;
		--app-tabs-tab-height: 42px;
		--app-tabs-tab-border-radius: 0;
		--app-tabs-height-offset: calc(var(--app-tabs-padding-top) + var(--app-tabs-tab-height));
	}
	
	/* App layout */

	.app-container
	{
		position: absolute;

		width: 70%;
		height: 80%;

		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);
	}

	/* Tabulation */

	.app-tabs
	{
		padding-top: var(--app-tabs-padding-top);
	}

	.app-tabs .app-tabs-prefix
	{
		padding-left: 16px;
	}

	.app-tabs .app-tabs-pane-content
	{
		position: absolute;

		height: calc(100% - var(--app-tabs-height-offset));

		padding: 0.5em;

		/* background-color: cadetblue; */

		box-sizing: border-box;
	}
</style>

<template>
	<n-config-provider :theme="darkTheme">
		<n-card class="app-container" content-style="padding: 0;">
			<n-tabs
				class="app-tabs" 
				tab-style="border-radius: var(--app-tabs-border-radius); height: var(--app-tabs-tab-height);" 
				pane-class="app-tabs-pane-content" 
				type="card" 
				size="large" 
				closable 
				:addable="addableTab" 
				@add="onNewTab"
			>
				<template #prefix>
					<span class="app-tabs-prefix">Mobile Data Terminal</span>
				</template>

				<n-tab-pane v-for="(pane, idx) in tabs" :key="idx" :name="pane.id" :tab="pane.label" :closable="pane.closable" display-directive="show:lazy">
					Dynamic Content
				</n-tab-pane>
			</n-tabs>
		</n-card>
	</n-config-provider>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";

	// components
	// TODO

	// theme
	import { darkTheme } from "naive-ui";
	
	export default defineComponent({
		computed:
		{
			addableTab()
			{
				return { disabled: !this.$store.state.auth };
			},
			...mapState(["auth", "tabs"])
		},
		methods:
		{
			/**
			 * Add new tab
			 */
			onNewTab()
			{
				this.$store.commit("newTab");
			}
		},
		setup()
		{
			return {
				darkTheme
			}
		}
	});
</script>