<style>
	.record-tab
	{
		padding: var(--app-tabs-content-padding);
	}

	/* Header Area */

	.record-tab--header
	{
		position: relative;
		display: flex;

		gap: 1rem;
	}

	.record-tab--header  .record-avatar
	{
		--n-avatar-size-override: 6rem;
	}

	.record-tab--header  .record-info
	{
		display: flex;

		flex-direction: column;
		flex-grow: 1;
	}

	.record-tab--header .record-username
	{
		font-size: 1.5rem;
	}
</style>

<template>
	<div class="record-tab">
		<div class="record-tab--header">
			<n-avatar class="record-avatar">
				<n-icon>
					<i-tabler-user/>
				</n-icon>
			</n-avatar>

			<div class="record-info">
				<span class="record-username">Eric Milton</span>
				<span>ID: 12D7237237</span>
				<span>Male — 15/07/1999 (22)</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

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
			return { };
		}
	});
</script>