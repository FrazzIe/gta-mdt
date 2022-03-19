<style>
	.profile-tab
	{
		display: grid;

		height: 100%;

		grid-template-areas: 
			" header  "
			" notes   "
			" reports ";
		grid-template-rows: 0fr;

		padding: var(--app-tabs-content-padding);
		gap: var(--app-tabs-content-padding);

		overflow: auto;

		box-sizing: border-box;
	}

	/* Header Area */

	.profile-tab--header
	{
		position: relative;
		display: flex;

		gap: 1rem;
		grid-area: header;
	}

	.profile-tab--header  .profile-avatar
	{
		--n-avatar-size-override: 6rem;
	}

	.profile-tab--header  .profile-info
	{
		display: flex;

		flex-direction: column;
		flex-grow: 1;
	}

	.profile-tab--header .profile-username
	{
		font-size: 1.5rem;
	}

	/* Notes Area */

	.profile-tab--notes
	{
		grid-area: notes;
	}

	.profile-tab--notes .notes-input
	{
		height: 100%;
	}
	
	/* > div:first-child ? */
	.profile-tab--notes .notes-input > div:first-child
	{
		resize: none !important;
	}

	/* Reports Area */

	.profile-tab--reports
	{
		grid-area: reports;
	}

	@media screen and (min-width: 1200px)
	{
		.profile-tab
		{
			grid-template-areas: 
			" header reports  "
			" notes  reports ";

			grid-template-columns: 1.2fr 0.8fr;
			grid-template-rows: 0fr;
		}
	}

	@media screen and (min-width: 1400px)
	{
		.profile-tab
		{
			grid-template-columns: 1.5fr 0.8fr;
		}
	}
</style>

<template>
	<div class="profile-tab">
		<!-- Header Tile -->
		<div class="profile-tab--header">
			<n-avatar class="profile-avatar">
				<n-icon>
					<i-tabler-user/>
				</n-icon>
			</n-avatar>

			<div class="profile-info">
				<span class="profile-username">{{ profile.username }}</span>
				<n-space>
					<n-tag type="info">{{ profile.role }}</n-tag>
				</n-space>					
			</div>
		</div>

		<!-- Notes Tile -->
		<n-card class="profile-tab--notes" title="Notes">
			<n-input class="notes-input" type="textarea" placeholder="Enter notes..."></n-input>
		</n-card>

		<!-- Reports Tile -->
		<n-card 
			class="profile-tab--reports" 
			title="Reports"
			hoverable 
			content-style="padding: 0; overflow-y: auto;"
		>
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
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";
	import { useStore } from "../../store";

	// interfaces
	import Report from "../../interfaces/report";

	export default defineComponent({
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
			const store = useStore();

			// Loading
			const loading =
			{
				reports: true
			};

			// Reports Tile
			const latestReports = ref<Report[]>([
				{ id: 0, created: 1646678952973, type: "incident", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "incident", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "arrest",   title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "citation", title: "Robbery", summary: "Some summary about some report" }
			]);

			return {
				loading,
				latestReports,
				profile: store.state.profile,
			};
		}
	});
</script>