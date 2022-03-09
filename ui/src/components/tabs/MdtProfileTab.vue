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

	.profile-tab .pad-content
	{		
		padding: var(--app-tile-padding-lrb);
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

	.profile-tab--reports .report-list
	{
		margin: 0;
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

		<n-card class="profile-tab--notes" title="Notes">
			<n-input class="notes-input" type="textarea" placeholder="Enter notes..."></n-input>
		</n-card>

		<n-card 
			class="profile-tab--reports" 
			title="Reports"
			hoverable 
			content-style="padding: 0; overflow-y: auto;"
		>
			<n-scrollbar>
				<n-list class="report-list pad-content">
					<n-list-item v-for="(report, idx) in latestReports" :key="idx">
						<n-thing :title="report.title" :description="reportSubtitle(report.type, report.created)">
							{{ report.summary }}
						</n-thing>
					</n-list-item>
				</n-list>
			</n-scrollbar>
		</n-card>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useStore } from "../../store";

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
			return {
				profile: store.state.profile,
				latestReports: store.state.latest.reports
			};
		}
	});
</script>