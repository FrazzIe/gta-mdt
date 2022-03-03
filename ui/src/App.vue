<style>
	#app
	{
		font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
	}

	.mdt-container
	{
		position: absolute;

		width: 70%;
		height: 80%;

		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);

		/* background-color: cadetblue; */
		/* border: 1px solid cornflowerblue; */
	}

	.mdt-container .el-main
	{
		padding: 0;
	}

	.el-header
	{
		border: 1px solid var(--el-border-color-base);
		border-bottom: none;
	}

	.el-main
	{
		border: 1px solid var(--el-border-color-base);
	}

	.el-main .el-tabs
	{
		height: max-content;
	}

	.el-main .el-tabs.el-tabs--border-card
	{
		border: none;
		box-shadow: none;
	}
</style>

<template>
	<el-container class="mdt-container">
		<el-header>
		</el-header>
		<el-main>
			<el-tabs type="border-card">
				<el-tab-pane v-for="i in 40" :label="'Tab ' + i">
					Content
				</el-tab-pane>
			</el-tabs>
		</el-main>
	</el-container>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		setup()
		{
			return {}
		}
	});
</script>