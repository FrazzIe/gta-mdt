<style>
	#app
	{
		--app-tabs-padding-top: 0.5rem;
		--app-tabs-tab-height: 42px;
		--app-tabs-tab-border-radius: 0;
		--app-tabs-height-offset: calc(var(--app-tabs-padding-top) + var(--app-tabs-tab-height));

		--app-tabs-content-padding: 1.5rem;
		--app-tabs-content-padding-lr: 0px var(--app-tabs-content-padding);
		--app-tabs-content-padding-tb: var(--app-tabs-content-padding) 0px;

		--app-tile-padding: 1rem;
		--app-tile-padding-lrb: 0px var(--app-tile-padding) var(--app-tile-padding) var(--app-tile-padding);
		--app-tile-padding-lr: 0px var(--app-tile-padding);
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

	.app-pad-tile-list
	{
		padding: var(--app-tile-padding-lr);
	}

	.app-pad-tab-content
	{
		padding: var(--app-tabs-content-padding);
	}

	.app-pad-tab-content.tb
	{
		padding: var(--app-tabs-content-padding-tb);
	}

	.app-pad-tab-content.lr
	{
		padding: var(--app-tabs-content-padding-lr);
	}

	.app-margin-0
	{
		margin: 0 !important;
	}

	/* Fix for n-spin, ensure spinner is centered with scrollable content */
	.app-spin-scroll
	{
		position: inherit !important;
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

	.app-tabs .app-tabs-suffix
	{
		padding-right: 16px;
	}

	.app-tabs .app-tabs-pane-content
	{
		position: absolute;

		height: calc(100% - var(--app-tabs-height-offset));

		padding: 0;

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
				:value="curTabId"
				@add="newTab"
				@close="closeTab"
				@update:value="updateTab"
			>
				<template #prefix>
					<span class="app-tabs-prefix">Mobile Data Terminal</span>
				</template>

				<n-tab-pane v-for="(pane, idx) in tabs" :key="idx" :name="pane.id" :tab="pane.label" :closable="pane.closable" display-directive="show:lazy">
					<component :is="pane.component" :tab-id="pane.id"></component>
				</n-tab-pane>

				<template #suffix>
					<div class="app-tabs-suffix">
						Empty
					</div>
				</template>
			</n-tabs>
		</n-card>
	</n-config-provider>
</template>

<script lang="ts">
	import { defineComponent, computed } from "vue";
	import { useTabStore } from "./stores/main-tab";


	// components
	import MdtHomeTab from "./components/tabs/MdtHomeTab.vue";
	import MdtNewTab from "./components/tabs/MdtNewTab.vue";
	import MdtSearchTab from "./components/tabs/MdtSearchTab.vue";
	import MdtProfileTab from "./components/tabs/MdtProfileTab.vue";
	import MdtRecordTab from "./components/tabs/MdtRecordTab.vue";

	// theme
	import { darkTheme } from "naive-ui";

	export default defineComponent({
		components:
		{
			MdtHomeTab,
			MdtNewTab,
			MdtSearchTab,
			MdtProfileTab,
			MdtRecordTab
		},
		setup()
		{
			const tabStore = useTabStore();

			// Methods

			/**
			 * Open a new tab
			 */
			const newTab = () => tabStore.openTab({ label: "New Tab", component: "mdt-new-tab" });

			/**
			 * Close an existing tab
			 */
			const closeTab = (id: string) => tabStore.closeTab({ id });

			/**
			 * Update an existing tab
			 */
			const updateTab = (id: string) => tabStore.updateTab({ id });

			// Computed

			// addable tab data binding
			const addableTab = computed((): { disabled: boolean } =>
			{
				const addable = { disabled: true };

				if (!tabStore.canOpenTab)
				{
					return addable;
				}

				addable.disabled = false;

				return addable;
			});

			// active tab
			const curTabId = computed(() => tabStore.curId);

			// collection of tabs
			const tabs = computed(() => tabStore.tabs);

			return {				
				newTab,
				closeTab,
				updateTab,				
				darkTheme,
				addableTab,
				curTabId,
				tabs
			}
		}
	});
</script>