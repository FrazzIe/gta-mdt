<style>
	.search-tab
	{
		display: grid;

		height: 100%;

		grid-template-areas: 
			" search  "
			" results "
			" results ";
		grid-template-columns: 1fr;
		grid-template-rows: 0fr 1fr;

		padding: var(--app-tabs-content-padding);
		gap: var(--app-tabs-content-padding);

		overflow-y: auto;

		box-sizing: border-box;
	}

	.search-tab--search
	{
		grid-area: search;
	}

	.search-tab--results
	{
		grid-area: results;
	}

	.search-tab--results .result-tabs
	{
		display: flex;

		flex-direction: column;

		height: 100%;
	}

	.search-tab--results .result-tabs .n-tabs-nav-scroll-content .n-tabs-wrapper
	{
		gap: 1.5rem;
		padding-right: 16px;
	}

	.search-tab--results .result-pane
	{
		flex: 1;

		padding: 0;

		overflow-y: auto;
		
		box-sizing: border-box;
	}

	.search-tab--pagination
	{
		display: flex;

		align-items: center;
		justify-content: center;
	}
</style>

<template>
	<div class="search-tab">
		<div class="search-tab--search">
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
		</div>

		<n-card 
			class="search-tab--results"
			content-style="padding: 0; overflow-y: auto;"
		>
			<n-tabs 
				class="result-tabs" 
				pane-class="result-pane" 
				type="line" 
				display-directive="show:lazy" 
				justify-content="end" 
				tab-style="padding: 0.8rem;"
			>
				<template #prefix>
					<span class="app-tabs-prefix">Search results</span>
				</template>

				<n-tab-pane name="tab-0" tab="Persons">
					<n-scrollbar>
						<n-spin class="app-spin-scroll" :show="false">
							<n-list class="app-pad-tile-list app-margin-0">
								<n-list-item v-for="i in 8">
									<n-thing title="Your lookking for">
										<template #description>
											Is it me
										</template>

										Hello
									</n-thing>
								</n-list-item>
							</n-list>
						</n-spin>						
					</n-scrollbar>
				</n-tab-pane>
			</n-tabs>
		</n-card>

		<div class="search-tab--pagination">
			<n-pagination :page="1" :page-count="100" />
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";

	export default defineComponent({
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
			const page = ref(2);

			const results =
			[
				{ }
			]

			// results
			// [ "person" | "weapon" | "plate" ]: PersonResult | WeaponResult | PlateResult
			return { page };
		}
	});
</script>