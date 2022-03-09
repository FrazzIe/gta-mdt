<style>
	.search-container
	{
		display: flex;

		height: 100%;

		flex-direction: column;

		box-sizing: border-box;

		padding: 1.5rem 0px 1.5rem 0px;
	}

	.search-input
	{
		padding: 0px 1.5rem 0px 1.5rem;
	}

	.search-label
	{
		padding: 0px 1.5rem 0px 1.5rem;
		margin: 0;
	}

	.search-results
	{
		padding: 0px 1.5rem 0px 1.5rem;
		margin: 0;
	}

	/* 
		Note: Fixes list prefix extra height
	*/
	.search-results .n-list-item .n-list-item__prefix
	{
		line-height: 0;
	}

	.search-results .search-avatar
	{
		--n-avatar-size-override: 5rem;		
	}

	.search-results .search-avatar-text
	{
		font-size: 2rem;
	}

	.search-results .search-content
	{
		display: flex;

		flex-direction: column;
	}

	.search-results .search-content .header
	{
		margin: 0;
	}

	.search-pagination
	{
		display: flex;

		align-items: center;
		justify-content: center;

		padding: 1.5rem 1.5rem 0px 1.5rem;
	}
</style>

<template>
	<div class="search-container">
		<n-form-item class="search-input" label="Record Search">
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

		<h3 class="search-label">Search results</h3>

		<n-scrollbar>
			<n-list class="search-results">
				<n-list-item v-for="i in 20" :key="i">
					<template #prefix>
						<n-avatar class="search-avatar">
							<span class="search-avatar-text">FL</span>
						</n-avatar>
					</template>					

					<div class="search-content">
						<n-h5 class="header">First Last</n-h5>
						<div>ID: 101010101010</div>
						<div>Male — 15/07/1999</div>
					</div>
				</n-list-item>
			</n-list>
		</n-scrollbar>

		<div class="search-pagination">
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