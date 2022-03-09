<style>
	.new-tab
	{
		position: absolute;
		display: flex;

		width: 90%;

		top: 50%;
		left: 50%;

		flex-direction: column;

		transform: translate(-50%, -50%);

		gap: 1rem;
	}

	.new-tab--logo
	{
		display: flex;

		justify-content: center;
	}

	.new-tab--recent
	{
		display: flex;

		flex-direction: column;

		gap: 0.5em;
	}

	.new-tab--recent--tabs
	{
		display: grid;

		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr;

		gap: var(--app-tabs-content-padding);
	}

	.new-tab--recent--tabs-item
	{
		display: flex;

		flex-direction: column;

		align-items: center;
		justify-content: center;
	}


	/* Media queries */

	@media screen and (min-width: 1400px)
	{
		.new-tab
		{
			width: 50%;
		}
	}
</style>

<template>
	<div class="new-tab">
		<!-- Login Logo -->
		<div class="new-tab--logo">
			<n-icon size="8em">
				<i-tabler-new-section/>
			</n-icon>
		</div>

		<n-form-item label="Record Search">
			<n-input-group>
				<n-input type="text" placeholder="Citizen ID, Name..." size="large">
					<template #prefix>
						<n-icon size="1.5rem">
							<i-tabler-user-search />
						</n-icon>
					</template>
				</n-input>
				<n-button type="primary" size="large">Search</n-button>
			</n-input-group>
		</n-form-item>

		
		<div class="new-tab--recent">
			<div>Recent Tabs</div>
			<div class="new-tab--recent--tabs">
				<n-card v-for="(tab, idx) in recentTabs" :key="idx" size="small" hoverable>
					<n-button text :block="true">
						<div class="new-tab--recent--tabs-item">
							<n-icon size="4rem">
								<component :is="`icon-${tab.icon}`"/>
							</n-icon>

							<span>{{ tab.title }}</span>
						</div>
					</n-button>				
				</n-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	// components
	import IconUserSearch from "~icons/tabler/user-search";
	import IconFileSearch from "~icons/tabler/file-search";
	import IconFileText from "~icons/tabler/file-text";
	import IconSearch from "~icons/tabler/search";

	export default defineComponent({
		components:
		{
			IconUserSearch,
			IconFileSearch,
			IconFileText,
			IconSearch
		},
		props:
		{
			tabId:
			{
				type: String,
				required: true
			}
		},
		setup()
		{
			const recentTabs =
			[
				{ title: "Eric Milton", component: "", icon: "user-search" },
				{ title: "Warrants", component: "", icon: "file-search"},
				{ title: "Reports", component: "", icon: "file-text"},
				{ title: "Search", component: "", icon: "search"}
			];

			return { recentTabs };
		}
	});
</script>