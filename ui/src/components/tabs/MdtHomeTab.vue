<style>
	/* Home Grid */

	.home-grid
	{
		--home-grid-content-padding: 0px 1em 1em 1em;

		display: grid;
		
		height: 100%;

		grid-template-areas: 
			" search     "
			" nav        "
			" user       "
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

	.home-grid-nav
	{
		grid-area: nav;
	}

	.home-grid-content-padding
	{		
		padding: var(--home-grid-content-padding);
	}

	/* Search Area */

	.home-search
	{
		display: flex;

		height: 100%;

		align-items: center;
		justify-content: center;
	}

	/* Button Navigation Area */

	.home-nav-buttons
	{
		--user-nav-buttons-gap: 0.5em;

		display: flex;

		height: 100%;

		flex-direction: row;
		flex-wrap: wrap;

		gap: var(--user-nav-buttons-gap);
	}

	.home-nav-buttons > button
	{
		flex-basis: calc(100% * (1/4) - var(--user-nav-buttons-gap));
		flex-grow: 1;
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

	/* Warrant Area */

	.home-warrants-list
	{
		margin: 0;
	}

	.home-warrants-avatar
	{
		--n-avatar-size-override: 5rem;		
	}

	.home-warrants-avatar-text
	{
		font-size: 2rem;
	}

	/* Home Grid Media Queries */

	@media only screen and (min-width: 900px)
	{
		.home-grid
		{
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 0.5fr 1.5fr 1fr 1fr;
			grid-template-areas: 
				" nav        search   "
				" warrants   warrants "
				" reports    reports  "
				" statistics user     ";
		}
	}

	@media screen and (min-width: 1400px)
	{
		.home-grid
		{
			grid-template-columns: 1fr 1.5fr 1fr;
			grid-template-rows: 0.5fr 1fr 1fr;
			grid-template-areas: 
				" nav      warrants search     "
				" reports  warrants user       "
				" reports  warrants statistics ";
		}
	}
</style>

<template>
	<mdt-login v-if="!auth"></mdt-login>

	<div class="home-grid">
		<n-card
			class="home-grid-nav" 
			title="Explore" 
			hoverable
			content-style="padding: var(--home-grid-content-padding);"
		>
			<div class="home-nav-buttons">
				<n-button v-for="(nav, idx) in navBtns" :key="idx">{{ nav.label }}</n-button>
			</div>
		</n-card>

		<n-card 
			class="home-grid-search" 
			title="Record Search" 
			hoverable 
			content-style="padding: var(--home-grid-content-padding);"
		>
			<div class="home-search">
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
			</div>


			<template #header-extra>
				<n-button text>
					<template #icon>
						<n-icon>
							<i-tabler-external-link/>
						</n-icon>
					</template>
				</n-button>
			</template>
		</n-card>

		<n-card 
			class="home-grid-warrants" 
			title="Warrants" 
			hoverable 
			content-style="padding: 0; overflow-y: auto;"
		>
			<template #header-extra>
				<n-button text>
					<template #icon>
						<n-icon>
							<i-tabler-external-link/>
						</n-icon>
					</template>
				</n-button>
			</template>

			<n-scrollbar>
				<n-list class="home-warrants-list home-grid-content-padding">
					<n-list-item v-for="(warrant, idx) in warrants" :key="idx">
						<template #prefix>
							<n-avatar class="home-warrants-avatar">
								<span class="home-warrants-avatar-text">{{ warrant.firstName[0] }}{{ warrant.lastName[0] }}</span>
							</n-avatar>
						</template>					

						<n-thing :title="`${warrant.firstName} ${warrant.lastName}`" :description="warrant.timestamp.toLocaleString('en-US')">
							{{ warrant.charge }}
						</n-thing>
					</n-list-item>
				</n-list>
			</n-scrollbar>

		</n-card>

		<n-card 
			class="home-grid-user" 
			title="Profile" 
			hoverable 
			content-style="padding: var(--home-grid-content-padding);"
		>
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

			<template #action>
				<n-space justify="end">
					<n-button tertiary type="error">
						Logout
					</n-button>
				</n-space>
			</template>

			<template #header-extra>
				<n-button text>
					<template #icon>
						<n-icon>
							<i-tabler-external-link/>
						</n-icon>
					</template>
				</n-button>
			</template>
		</n-card>

		<n-card 
			class="home-grid-reports" 
			title="Reports" 
			hoverable 
			content-style="padding: var(--home-grid-content-padding);"
		>
			Content

			<template #header-extra>
				<n-button text>
					<template #icon>
						<n-icon>
							<i-tabler-external-link/>
						</n-icon>
					</template>
				</n-button>
			</template>
		</n-card>

		<n-card 
			class="home-grid-statistics" 
			title="Statistics" 
			hoverable 
			content-style="padding: var(--home-grid-content-padding);"
		>
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
			const navBtns: any =
			[
				{ label: "Warrants", component: "" },
				{ label: "Reports", component: "" },
				{ label: "Records", component: "" },
				{ label: "Search", component: "" },
				{ label: "Profile", component: "" },
				{ label: "Admin", component: "" }
			];
			const warrants: any = 
			[
				{ firstName: "Eric", lastName: "Milton", timestamp: new Date(Date.now()), charge: "1st Degree Murder, Resisting Arrest, Robbery, 1st Degree Murder, Resisting Arrest, Robbery" },
				{ firstName: "Eric", lastName: "Milton", timestamp: new Date(Date.now()), charge: "1st Degree Murder, Resisting Arrest, Robbery" },
				{ firstName: "Eric", lastName: "Milton", timestamp: new Date(Date.now()), charge: "1st Degree Murder, Resisting Arrest, Robbery" },
				{ firstName: "Eric", lastName: "Milton", timestamp: new Date(Date.now()), charge: "1st Degree Murder, Resisting Arrest, Robbery" },
				{ firstName: "Eric", lastName: "Milton", timestamp: new Date(Date.now()), charge: "1st Degree Murder, Resisting Arrest, Robbery" },
				{ firstName: "Eric", lastName: "Milton", timestamp: new Date(Date.now()), charge: "1st Degree Murder, Resisting Arrest, Robbery" },
				{ firstName: "Eric", lastName: "Milton", timestamp: new Date(Date.now()), charge: "1st Degree Murder, Resisting Arrest, Robbery" },
				{ firstName: "Eric", lastName: "Milton", timestamp: new Date(Date.now()), charge: "1st Degree Murder, Resisting Arrest, Robbery" },
				{ firstName: "Eric", lastName: "Milton", timestamp: new Date(Date.now()), charge: "1st Degree Murder, Resisting Arrest, Robbery" },
				{ firstName: "Eric", lastName: "Milton", timestamp: new Date(Date.now()), charge: "1st Degree Murder, Resisting Arrest, Robbery" }
			]
			return { navBtns, warrants }
		}
	});
</script>