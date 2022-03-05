<style>
	/* Home Grid */

	.home-grid
	{
		display: grid;
		
		height: 100%;

		grid-template-areas: 
			" search     "
			" user       "   
			" settings   "
			" warrants   "
			" reports    "
			" statistics ";

		gap: 1.5rem;
		padding: 1.5rem;

		overflow: auto;

		box-sizing: border-box;
	}

	/* Home Grid Areas */

	.home-grid-reports
	{
		grid-area: reports;
	}

	.home-grid-warrants
	{
		grid-area: warrants;
	}

	.home-grid-statistics
	{
		grid-area: statistics;
	}

	.home-grid-search
	{
		grid-area: search;
	}

	.home-grid-user
	{
		grid-area: user;
	}

	.home-grid-settings
	{
		grid-area: settings;
	}

	/* Profile Area */

	.home-user-thing
	{
		display: flex;

		gap: 1em;
	}

	.home-user-thing .hut-avatar
	{
		--n-avatar-size-override: 5rem;
	}

	.home-user-thing .hut-avatar-text
	{
		font-size: 2rem;
	}

	.home-user-thing .hut-content
	{
		display: flex;

		flex-direction: column;
		flex-grow: 1;

		justify-content: center;
	}

	.home-user-thing .hut-content .hut-username
	{
		font-size: 1.5rem;
	}

	/* Home Grid Media Queries */

	@media only screen and (min-width: 500px)
	{
		.home-grid
		{
			grid-template-columns: 1.5fr 1fr;
			grid-template-rows: 0.5fr 1.5fr 1fr;
			grid-template-areas: 
				" search     search     "
				" user       settings   "
				" warrants   warrants   "
				" reports    reports    "
				" statistics statistics ";
		}
	}

	@media only screen and (min-width: 900px)
	{
		.home-grid
		{
			grid-template-columns: 1.2fr 1fr;
			grid-template-rows: 0.5fr 1.5fr 0.5fr 1fr 1fr;
			grid-template-areas: 
				" warrants   search "
				" warrants   user "
				" warrants   settings "
				" reports    reports "
				" statistics statistics ";
		}
	}

	@media screen and (min-width: 1200px)
	{
		.home-grid
		{
			grid-template-columns: 1fr 1.5fr 1fr;
			grid-template-rows: 0.5fr 1.5fr 1fr;
			grid-template-areas: 
				" reports warrants   search "
				" reports warrants   user "
				" reports statistics settings ";
		}
	}
</style>

<template>
	<mdt-login v-if="!auth"></mdt-login>

	<div class="home-grid">
		<n-card class="home-grid-search" title="Record Search" hoverable>
			<n-input-group>
				<n-input type="text" placeholder="Citizen ID, Name...">
					<template #prefix>
						<n-icon size="1.5rem">
							<i-tabler-user-search />
						</n-icon>
					</template>
				</n-input>
				<n-button type="primary">Search</n-button>
			</n-input-group>
		</n-card>

		<n-card class="home-grid-warrants" title="Warrants" hoverable>
			Content
		</n-card>

		<n-card class="home-grid-user" title="Profile" hoverable>
			<div class="home-user-thing">
				<n-avatar class="hut-avatar">
					<span class="hut-avatar-text">EM</span>
				</n-avatar>

				<div class="hut-content">
					<n-text class="hut-username">Username</n-text>
					<n-space>
						<n-tag type="info">Role</n-tag>
					</n-space>					
				</div>		
			</div>
		</n-card>

		<n-card class="home-grid-settings" title="Settings" hoverable>
			Content
		</n-card>

		<n-card class="home-grid-reports" title="Reports" hoverable>
			Content
		</n-card>

		<n-card class="home-grid-statistics" title="Statistics" hoverable>
			Content
		</n-card>
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