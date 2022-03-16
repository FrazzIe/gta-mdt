<style>
	/* Main */

	.home-tab
	{
		display: grid;
		
		height: 100%;

		grid-template-areas: 
			" search     "
			" nav        "
			" profile    "
			" warrants   "
			" reports    "
			" statistics ";

		gap: var(--app-tabs-content-padding);
		padding: var(--app-tabs-content-padding);

		overflow: auto;

		box-sizing: border-box;
	}

	/* Content Areas */

	/* Search Area */

	.home-tab--area--search
	{
		grid-area: search;
	}	

	.home-tab--area--search .search-content
	{
		display: flex;

		height: 100%;

		align-items: center;
		justify-content: center;
	}

	/* Button Navigation Area */

	.home-tab--area--nav
	{
		grid-area: nav;
	}	

	.home-tab--area--nav .nav-content
	{
		--user-nav-buttons-gap: 0.5rem;

		display: flex;

		height: 100%;

		flex-direction: row;
		flex-wrap: wrap;

		gap: var(--user-nav-buttons-gap);
	}

	.home-tab--area--nav .nav-content > button
	{
		flex-basis: calc(100% * (1/4) - var(--user-nav-buttons-gap));
		flex-grow: 1;
	}

	/* Profile Area */

	.home-tab--area--profile
	{
		grid-area: profile;
	}	

	.home-tab--area--profile .profile-container
	{
		display: flex;

		gap: 1rem;
	}

	.home-tab--area--profile .profile-avatar
	{
		--n-avatar-size-override: 5rem;
	}

	.home-tab--area--profile .profile-avatar-text
	{
		font-size: 2rem;
	}

	.home-tab--area--profile .profile-content
	{
		display: flex;

		flex-direction: column;
		flex-grow: 1;

		justify-content: center;
	}

	.home-tab--area--profile .profile-username
	{
		font-size: 1.5rem;
	}

	/* Warrant Area */

	.home-tab--area--warrant
	{
		grid-area: warrants;
	}	

	/* 
		Note: Fixes list prefix extra height
	*/
	.home-tab--area--warrant .warrant-list .n-list-item .n-list-item__prefix
	{
		line-height: 0;
	}

	.home-tab--area--warrant .warrant-list .warrant-avatar
	{
		--n-avatar-size-override: 5rem;		
	}

	.home-tab--area--warrant .warrant-list .warrant-avatar-text
	{
		font-size: 2rem;
	}

	/* Reports Area */

	.home-tab--area--report
	{
		grid-area: reports;
	}

	.home-tab--area--statistics
	{
		grid-area: statistics;
	}

	/* Media queries */

	@media only screen and (min-width: 900px)
	{
		.home-tab
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
		.home-tab
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

	<div class="home-tab">
		<n-card
			class="home-tab--area--nav" 
			title="Explore" 
			hoverable
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			<div class="nav-content">
				<n-button v-for="(nav, idx) in navBtns" :key="idx">{{ nav.label }}</n-button>
			</div>
		</n-card>

		<n-card 
			class="home-tab--area--search" 
			title="Record Search" 
			hoverable 
			content-style="padding: var(--app-tile-padding-lrb);"
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
				<n-button text @click="openSearchTab">
					<template #icon>
						<n-icon>
							<i-tabler-external-link/>
						</n-icon>
					</template>
				</n-button>
			</template>
		</n-card>

		<n-card 
			class="home-tab--area--warrant" 
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
				<n-list class="warrant-list app-pad-tile-list app-margin-0">
					<n-list-item v-for="(warrant, idx) in latestWarrants" :key="idx">
						<template #prefix>
							<n-avatar class="warrant-avatar">
								<span class="warrant-avatar-text">FL</span>
							</n-avatar>
						</template>					

						<n-thing title="First Last" :description="formatTimestamp(warrant.created)">
							{{ warrant.summary }}
						</n-thing>
					</n-list-item>
				</n-list>
			</n-scrollbar>

		</n-card>

		<n-card 
			class="home-tab--area--profile" 
			title="Profile" 
			hoverable 
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			<div class="profile-container">
				<n-avatar class="profile-avatar" :src="profile.avatar" @error="onProfileAvatarError" v-if="profileAvatarLoadFailed"></n-avatar>				
				<n-avatar class="profile-avatar" v-else>
					<n-icon>
						<i-tabler-user/>
					</n-icon>
				</n-avatar>

				<div class="profile-content">
					<n-text class="profile-username">{{ profile.username }}</n-text>
					<n-space>
						<n-tag type="info">{{ profile.role }}</n-tag>
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
				<n-button text @click="$store.commit('openTab', { label: 'Profile', component: 'mdt-profile-tab' })">
					<template #icon>
						<n-icon>
							<i-tabler-external-link/>
						</n-icon>
					</template>
				</n-button>
			</template>
		</n-card>

		<n-card 
			class="home-tab--area--report" 
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
				<n-list class="app-pad-tile-list app-margin-0">
					<n-list-item v-for="(report, idx) in latestReports" :key="idx">
						<n-thing :title="report.title" :description="reportSubtitle(report.type, report.created)">
							{{ report.summary }}
						</n-thing>
					</n-list-item>
				</n-list>
			</n-scrollbar>
		</n-card>

		<n-card 
			class="home-tab--area--statistics" 
			title="Statistics" 
			hoverable 
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			Content
		</n-card>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";
	import { useStore } from "../../store";

	// interfaces
	import TabOpenOptions from "../../interfaces/tabs/TabOpenOptions";

	// components
	import MdtLogin from "../MdtLogin.vue";

	export default defineComponent({
		components:
		{
			MdtLogin
		},
		props:
		{
			tabId:
			{
				type: String,
				required: true
			}
		},
		methods:
		{
			onProfileAvatarError()
			{
				this.profileAvatarLoadFailed = true;
			},
			formatTimestamp(num: number): string
			{
				return new Date(num).toLocaleString("en-US");
			},
			reportSubtitle(type: string, num: number)
			{
				return `${type.charAt(0).toUpperCase()}${type.slice(1)} — ${this.formatTimestamp(num)}`;
			},
			openSearchTab()
			{
				const options: TabOpenOptions = 
				{
					label: "Search",
					component: "mdt-search-tab"
				};

				this.$store.commit("openTab", options);
			}
		},
		setup()
		{
			const store = useStore();

			let profileAvatarLoadFailed = ref(false);

			const navBtns: any =
			[
				{ label: "Warrants", component: "" },
				{ label: "Reports", component: "" },
				{ label: "Records", component: "" },
				{ label: "Search", component: "" },
				{ label: "Profile", component: "" },
				{ label: "Admin", component: "" }
			];

			return { 
				profileAvatarLoadFailed,
				navBtns,
				auth: store.state.auth,
				profile: store.state.profile,
				latestReports: store.state.latest.reports,
				latestWarrants: store.state.latest.warrants
			}
		}
	});
</script>