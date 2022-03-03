<style>
	#app
	{
		font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
	}

	#app .el-container
	{
		position: absolute;

		width: 70%;
		height: 80%;

		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);
	}

	.el-header
	{
		display: flex;

		border: 1px solid var(--el-border-color-base);
		border-bottom: none;

		align-items: center;

		color: var(--el-color-info-dark-2);
		font-size: 1.5rem;
	}

	.el-main
	{
		padding: 0;

		border: 1px solid var(--el-border-color-base);
		border-top: none;
	}

	/*
		Tab navigation tweaks
	*/

	.el-main .el-tabs .el-tabs__nav-prev
	{
		left: 0.3em;
		line-height: 52px;
	}

	.el-main .el-tabs :is(.el-tabs__nav-prev, .el-tabs__nav-next) .el-icon,
	.el-main .el-tabs :is(.el-tabs__nav-prev, .el-tabs__nav-next) .el-icon svg
	{
		width: 1.5em;
		height: 1.5em;
	}

	.el-main .el-tabs .el-tabs__nav-next
	{
		right: 0.3em;
		line-height: 52px;
	}

	.el-main .el-tabs.el-tabs--border-card
	{
		border: none;
		box-shadow: none;
	}

	
	.el-main .el-tabs.el-tabs--card .el-tabs__nav
	{
		display: flex;
		gap: 5px;

		border: none;
		border-radius: 0;

		padding: 0px 0.4em;
	}

	.el-main .el-tabs.el-tabs--card .el-tabs__item
	{
		border-top: 1px solid var(--el-border-color-light);
		border-left: 1px solid var(--el-border-color-light);
		border-right: 1px solid var(--el-border-color-light);
	}
</style>

<template>
	<el-container class="mdt-container">
		<el-header>
			Mobile Data Terminal
		</el-header>
		<el-main>
			<el-tabs type="card">
				<el-tab-pane v-for="i in 40" label="Overview">
					Content
				</el-tab-pane>
				<el-tab-pane label="+">
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