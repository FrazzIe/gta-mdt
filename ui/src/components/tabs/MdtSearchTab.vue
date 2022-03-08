<style>

</style>

<template>
	<div>
		Search
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