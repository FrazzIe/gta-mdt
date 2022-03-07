<style>
	/* Main */

	.home-container
	{
		--content-padding: 0px 1em 1em 1em;

		display: grid;
		
		height: 100%;

		grid-template-areas: 
			" search     "
			" nav        "
			" profile    "
			" warrants   "
			" reports    "
			" statistics ";

		gap: 1.5rem;
		padding: 1.5rem;

		overflow: auto;

		box-sizing: border-box;
	}

	.home-container .pad-content
	{		
		padding: var(--content-padding);
	}

	/* Content Areas */

	/* Search Area */

	.home-container .search-area
	{
		grid-area: search;
	}	

	.home-container .search-area .search-content
	{
		display: flex;

		height: 100%;

		align-items: center;
		justify-content: center;
	}

	/* Button Navigation Area */

	.home-container .nav-area
	{
		grid-area: nav;
	}	

	.home-container .nav-area .nav-content
	{
		--user-nav-buttons-gap: 0.5em;

		display: flex;

		height: 100%;

		flex-direction: row;
		flex-wrap: wrap;

		gap: var(--user-nav-buttons-gap);
	}

	.home-container .nav-area .nav-content > button
	{
		flex-basis: calc(100% * (1/4) - var(--user-nav-buttons-gap));
		flex-grow: 1;
	}

	/* Profile Area */

	.home-container .profile-area
	{
		grid-area: profile;
	}	

	.home-container .profile-area .profile-container
	{
		display: flex;

		gap: 1em;
	}

	.home-container .profile-area .profile-avatar
	{
		--n-avatar-size-override: 5rem;
	}

	.home-container .profile-area .profile-avatar-text
	{
		font-size: 2rem;
	}

	.home-container .profile-area .profile-content
	{
		display: flex;

		flex-direction: column;
		flex-grow: 1;

		justify-content: center;
	}

	.home-container .profile-area .profile-username
	{
		font-size: 1.5rem;
	}

	/* Warrant Area */

	.home-container .warrant-area
	{
		grid-area: warrants;
	}	

	.home-container .warrant-area .warrant-list
	{
		margin: 0;
	}

	/* 
		Note: Fixes list prefix extra height
	*/
	.home-container .warrant-area .warrant-list .n-list-item .n-list-item__prefix
	{
		line-height: 0;
	}

	.home-container .warrant-area .warrant-list .warrant-avatar
	{
		--n-avatar-size-override: 5rem;		
	}

	.home-container .warrant-area .warrant-list .warrant-avatar-text
	{
		font-size: 2rem;
	}

	/* Reports Area */

	.home-container .report-area
	{
		grid-area: reports;
	}

	.home-container .report-area .report-list
	{
		margin: 0;
	}

	.home-container .statistics-area
	{
		grid-area: statistics;
	}

	/* Media queries */

	@media only screen and (min-width: 900px)
	{
		.home-container
		{
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 0.5fr 1.5fr 1fr 1fr;
			grid-template-areas: 
				" nav        search   "
				" warrants   warrants "
				" reports    reports  "
				" statistics profile  ";
		}
	}

	@media screen and (min-width: 1400px)
	{
		.home-container
		{
			grid-template-columns: 1fr 1.5fr 1fr;
			grid-template-rows: 0.5fr 1fr 1fr;
			grid-template-areas: 
				" nav      warrants search     "
				" reports  warrants profile    "
				" reports  warrants statistics ";
		}
	}
</style>

<template>
	<mdt-login v-if="!auth"></mdt-login>

	<div class="home-container">
		<n-card
			class="nav-area" 
			title="Explore" 
			hoverable
			content-style="padding: var(--content-padding);"
		>
			<div class="nav-content">
				<n-button v-for="(nav, idx) in navBtns" :key="idx">{{ nav.label }}</n-button>
			</div>
		</n-card>

		<n-card 
			class="search-area" 
			title="Record Search" 
			hoverable 
			content-style="padding: var(--content-padding);"
		>
			<div class="search-content">
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
			class="warrant-area" 
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
				<n-list class="warrant-list pad-content">
					<n-list-item v-for="(warrant, idx) in warrants" :key="idx">
						<template #prefix>
							<n-avatar class="warrant-avatar">
								<span class="warrant-avatar-text">{{ warrant.firstName[0] }}{{ warrant.lastName[0] }}</span>
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
			class="profile-area" 
			title="Profile" 
			hoverable 
			content-style="padding: var(--content-padding);"
		>
			<div class="profile-container">
				<n-avatar class="profile-avatar">
					<span class="profile-avatar-text">EM</span>
				</n-avatar>

				<div class="profile-content">
					<n-text class="profile-username">Username</n-text>
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
			class="report-area" 
			title="Reports" 
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
				<n-list class="report-list pad-content">
					<n-list-item v-for="(report, idx) in reports" :key="idx">
						<n-thing :title="report.title" :description="`${report.type.charAt(0).toUpperCase()}${report.type.slice(1)} — ${report.timestamp.toLocaleString('en-US')}`">
							{{ report.summary }}
						</n-thing>
					</n-list-item>
				</n-list>
			</n-scrollbar>
		</n-card>

		<n-card 
			class="statistics-area" 
			title="Statistics" 
			hoverable 
			content-style="padding: var(--content-padding);"
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
			];
			const reports: any =
			[
				{ title: "Robbery", timestamp: new Date(Date.now()), type: "incident", summary: "Some summary about some report" },
				{ title: "Robbery", timestamp: new Date(Date.now()), type: "incident", summary: "Some summary about some report" },
				{ title: "Robbery", timestamp: new Date(Date.now()), type: "arrest", summary: "Some summary about some report" },
				{ title: "Robbery", timestamp: new Date(Date.now()), type: "incident", summary: "Some summary about some report" },
				{ title: "Robbery", timestamp: new Date(Date.now()), type: "incident", summary: "Some summary about some report" },
				{ title: "Robbery", timestamp: new Date(Date.now()), type: "incident", summary: "Some summary about some report" },
				{ title: "Robbery", timestamp: new Date(Date.now()), type: "arrest", summary: "Some summary about some report" },
				{ title: "Robbery", timestamp: new Date(Date.now()), type: "arrest", summary: "Some summary about some report" },
				{ title: "Robbery", timestamp: new Date(Date.now()), type: "citation", summary: "Some summary about some report" },
				{ title: "Robbery", timestamp: new Date(Date.now()), type: "citation", summary: "Some summary about some report" }
			];

			return { navBtns, warrants, reports }
		}
	});
</script>