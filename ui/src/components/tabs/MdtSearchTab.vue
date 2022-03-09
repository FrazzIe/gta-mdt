<style>
	.search-tab
	{
		display: flex;

		height: 100%;

		flex-direction: column;

		box-sizing: border-box;

		padding: var(--app-tabs-content-padding-tb);
	}

	.search-tab--input
	{
		padding: var(--app-tabs-content-padding-lr);
	}

	.search-tab--results-label
	{
		padding: var(--app-tabs-content-padding-lr);
		margin: 0;
	}

	.search-tab--results
	{
		padding: var(--app-tabs-content-padding-lr);
		margin: 0;
	}

	/* 
		Note: Fixes list prefix extra height
	*/
	.search-tab--results .n-list-item .n-list-item__prefix
	{
		line-height: 0;
	}

	.search-tab--results-item .avatar
	{
		--n-avatar-size-override: 5rem;		
	}

	.search-tab--results-item .avatar-text
	{
		font-size: 2rem;
	}

	.search-tab--results-item .content
	{
		display: flex;

		flex-direction: column;
	}

	.search-tab--results-item .content .header
	{
		margin: 0;
	}

	.search-tab--pagination
	{
		display: flex;

		align-items: center;
		justify-content: center;

		padding: var(--app-tabs-content-padding) var(--app-tabs-content-padding) 0px var(--app-tabs-content-padding);
	}
</style>

<template>
	<div class="search-tab">
		<n-form-item class="search-tab--input" label="Record Search">
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

		<h3 class="search-tab--results-label">Search results</h3>

		<n-scrollbar>
			<n-list class="search-tab--results">
				<n-list-item class="search-tab--results-item" v-for="i in 20" :key="i">
					<template #prefix>
						<n-avatar class="avatar">
							<span class="avatar-text">FL</span>
						</n-avatar>
					</template>					

					<div class="content">
						<n-h5 class="header">First Last</n-h5>
						<div>ID: 101010101010</div>
						<div>Male — 15/07/1999</div>
					</div>
				</n-list-item>
			</n-list>
		</n-scrollbar>

		<div class="search-tab--pagination">
			<n-pagination v-model:page="page" :page-count="100" />
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
			return { page };
		}
	});
</script>