<style>

</style>

<template>
	<mdt-login v-if="!auth"></mdt-login>
	<div v-else>
		Home
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { mapState } from "vuex";

	// components
	import MdtLogin from "../MdtLogin.vue";

	export default defineComponent({
		components:
		{
			MdtLogin
		},
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