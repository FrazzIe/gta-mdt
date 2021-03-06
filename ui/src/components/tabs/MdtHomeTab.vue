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

	.home-tab--area--warrant .warrant-list .warrant-avatar.skeleton
	{
		width: var(--n-avatar-size-override);
		height: var(--n-avatar-size-override);
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

	.home-tab--area--statistics .statistics-content
	{
		display: grid;

		height: 100%;

		grid-template-columns: 1fr 1fr 1fr;

		justify-items: center;

		gap: 1rem;
	}

	.home-tab--area--statistics .statistics-item
	{
		display: flex;

		flex-direction: column;
		
		justify-content: center;
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
	<mdt-login v-if="!loggedIn"></mdt-login>

	<div class="home-tab" v-else>
		<!-- Button Navigation Tile -->
		<n-card
			class="home-tab--area--nav" 
			title="Explore" 
			hoverable
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			<div class="nav-content">
				<n-button v-for="(nav, idx) in navigationButtons" :key="idx">{{ nav.label }}</n-button>
			</div>
		</n-card>

		<!-- Record Search Tile -->
		<n-card 
			class="home-tab--area--search" 
			title="Record Search" 
			hoverable 
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			<template #header-extra>
				<n-button text @click="openTab({ label: 'Search', component: 'mdt-search-tab' })">
					<template #icon>
						<n-icon>
							<i-tabler-external-link/>
						</n-icon>
					</template>
				</n-button>
			</template>

			<div class="search-content">
				<n-input-group>
					<n-input type="text" placeholder="Citizen ID, Name..." v-model:value="search">
						<template #prefix>
							<n-icon size="1.5rem">
								<i-tabler-user-search />
							</n-icon>
						</template>
					</n-input>
					<n-button type="primary" @click="openTab({ label: 'Search', component: 'mdt-search-tab', data: { search } })">Search</n-button>
				</n-input-group>
			</div>
		</n-card>

		<!-- Active Warrants Tile -->
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
				<n-spin class="app-spin-scroll" :show="loading.warrants">
					<n-list class="warrant-list app-pad-tile-list app-margin-0">
						<template v-if="loading.warrants">
							<n-list-item v-for="idx in 10" :key="idx">
								<template #prefix>
									<n-skeleton class="warrant-avatar skeleton" :sharp="false"></n-skeleton>
								</template>

								<n-thing>
									<template #header>
										<n-skeleton text width="8rem" :sharp="false" :animated="false"/>
									</template>

									<template #description>
										<n-skeleton text width="50%" :sharp="false" :animated="false"/>
									</template>

									<n-skeleton text :sharp="false" :animated="false"/>
									<n-skeleton text width="60%" :sharp="false" :animated="false"/>
								</n-thing>
							</n-list-item>
						</template>

						<template v-else>
							<n-list-item v-for="(warrant, idx) in activeWarrants" :key="idx">
								<template #prefix>
									<n-avatar class="warrant-avatar">
										<span class="warrant-avatar-text">FL</span>
									</n-avatar>
								</template>				

								<n-thing title="First Last" :description="formatTimestamp(warrant.created)">
									{{ warrant.summary }}
								</n-thing>
							</n-list-item>
						</template>
						
					</n-list>
				</n-spin>
			</n-scrollbar>

		</n-card>

		<!-- User Profile Tile -->
		<n-card 
			class="home-tab--area--profile" 
			title="Profile" 
			hoverable 
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			<template #header-extra>
				<n-button text @click="openTab({ label: 'Profile', component: 'mdt-profile-tab' })">
					<template #icon>
						<n-icon>
							<i-tabler-external-link/>
						</n-icon>
					</template>
				</n-button>
			</template>

			<div class="profile-container">
				<n-avatar class="profile-avatar" :src="profile.avatar" @error="hideAvatar" v-if="avatarHidden"></n-avatar>				
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
		</n-card>

		<!-- Latest Reports Tile -->
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
				<n-spin class="app-spin-scroll" :show="loading.reports">
					<n-list class="app-pad-tile-list app-margin-0">
							<template v-if="loading.reports">
								<n-list-item v-for="idx in 10" :key="idx">
									<n-thing>
										<template #header>
											<n-skeleton text width="8rem" :sharp="false" :animated="false"/>
										</template>

										<template #description>
											<n-skeleton text width="50%" :sharp="false" :animated="false"/>
										</template>

										<n-skeleton text :sharp="false" :animated="false"/>
										<n-skeleton text width="60%" :sharp="false" :animated="false"/>
									</n-thing>
								</n-list-item>
							</template>

							<template v-else>
								<n-list-item v-for="(report, idx) in latestReports" :key="idx">
									<n-thing :title="report.title" :description="reportSubtitle(report.type, report.created)">
										{{ report.summary }}
									</n-thing>
								</n-list-item>
							</template>						
					</n-list>
				</n-spin>
			</n-scrollbar>
		</n-card>

		<!-- Statistics Tile -->
		<n-card 
			class="home-tab--area--statistics" 
			title="Statistics" 
			hoverable 
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			<div class="statistics-content">
				<n-statistic class="statistics-item" v-for="(statistic, idx) in statistics" :key="idx" :label="statistic.label" :value="statistic.count"/>
			</div>
		</n-card>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref, computed } from "vue";
	import { useAuthUserStore } from "../../stores/auth-user";
	import { useTabStore } from "../../stores/main-tab";

	// interfaces
	import TabOpenOptions from "../../interfaces/tabs/TabOpenOptions";
	import NavButton from "../../interfaces/NavButton";
	import Statistic from "../../interfaces/Statistic";
	import Report from "../../interfaces/report";
	import WarrantReport from "../../interfaces/report/Warrant";

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
			formatTimestamp(num: number): string
			{
				return new Date(num).toLocaleString("en-US");
			},
			reportSubtitle(type: string, num: number)
			{
				return `${type.charAt(0).toUpperCase()}${type.slice(1)} — ${this.formatTimestamp(num)}`;
			}
		},
		setup()
		{
			const authUserStore = useAuthUserStore();
			const tabStore = useTabStore();

			// Methods

			/**
			 * Open a tab
			 */
			const openTab = (options: TabOpenOptions) => tabStore.openTab(options);

			/**
			 * Hide avatar
			 */
			const hideAvatar = () => avatarHidden.value = true;

			// Computed

			// Check user auth
			const loggedIn = computed(() => authUserStore.loggedIn);

			// Useful user profile details
			const profile = computed(() => authUserStore.profile);

			// Variables

			// Loading
			const loading =
			{
				reports: true,
				warrants: true
			};

			// Button Navigation Tile
			const navigationButtons: NavButton[] =
			[
				// { label: "Warrants", component: "" },
				// { label: "Reports", component: "" },
				// { label: "Records", component: "" },
				{ label: "Search", component: "mdt-search-tab" },
				{ label: "Profile", component: "mdt-profile-tab" },
				// { label: "Admin", component: "" }
			];

			// Search Tile
			const search = ref<string>("");

			// User Tile
			const avatarHidden = ref<boolean>(false);

			// Active Warrants Tile
			const activeWarrants = ref<WarrantReport[]>([
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true }
			]);

			// Reports Tile
			const latestReports = ref<Report[]>([
				{ id: 0, created: 1646678952973, type: "incident", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "incident", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "arrest",   title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "citation", title: "Robbery", summary: "Some summary about some report" }
			]);

			// Statistics Tile
			const statistics = ref<Statistic[]>([
				{ label: "Reports", count: 2000 },
				{ label: "Users", count: 2000 },
				{ label: "Records", count: 2000 },
				{ label: "LEO", count: 20 },
				{ label: "EMS", count: 3 },
				{ label: "DOJ", count: 2 }
			]);

			return { 
				openTab,
				hideAvatar,
				loggedIn,
				profile,
				loading,
				navigationButtons,
				search,
				avatarHidden,
				activeWarrants,
				latestReports,
				statistics
			}
		}
	});
</script>