<style>

</style>

<template>
	<div>Home</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";

	export default defineComponent({
		computed:
		{
			...mapState(["auth"])
		},
		setup()
		{
			return { }
		}
	});
</script>