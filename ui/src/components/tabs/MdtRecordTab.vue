<style>
	.record-tab
	{
		display: grid;

		height: 100%;

		grid-template-areas: 
			" header  header  "
			" notes   caution "
			" reports assets  ";
		grid-template-rows: 0fr;

		padding: var(--app-tabs-content-padding);
		gap: var(--app-tabs-content-padding);

		box-sizing: border-box;
	}

	.record-tab .pad-content
	{		
		padding: var(--app-tile-padding-lrb);
	}

	/* Header Area */

	.record-tab--header
	{
		position: relative;
		display: flex;

		gap: 1rem;
		grid-area: header;
	}

	.record-tab--header  .record-avatar
	{
		--n-avatar-size-override: 6rem;
	}

	.record-tab--header  .record-info
	{
		display: flex;

		flex-direction: column;
		flex-grow: 1;
	}

	.record-tab--header .record-username
	{
		font-size: 1.5rem;
	}

	.record-tab--header .record-wanted
	{
		align-self: center;

		color: var(--warning-color);
		font-size: 2rem;		
	}

	/* Caution Code Area */
	.record-tab--caution
	{
		grid-area: caution;
	}

	.record-tab--caution .caution-list
	{
		display: flex;

		flex-direction: column;
	}

	.record-tab--assets
	{
		grid-area: assets;
	}
</style>

<template>
	<div class="record-tab">
		<div class="record-tab--header">
			<n-avatar class="record-avatar">
				<n-icon>
					<i-tabler-user/>
				</n-icon>
			</n-avatar>

			<div class="record-info">
				<span class="record-username">Eric Milton</span>
				<span>ID: 12D7237237</span>
				<span>Male — 15/07/1999 (22)</span>
			</div>

			<n-element class="record-wanted" tag="span">WANTED</n-element>
		</div>

		<n-card class="profile-tab--notes" title="Notes">
			<n-input class="notes-input" type="textarea" placeholder="Enter notes..."></n-input>
		</n-card>

		<n-card class="record-tab--caution" title="Caution codes">
			<n-checkbox-group class="caution-list" v-model:value="codes" @update:value="updateCodes">
				<n-checkbox v-for="code in codeList" :label="code.label" :value="code.key"></n-checkbox>
			</n-checkbox-group>
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

		<n-card class="record-tab--assets" title="Assets">

		</n-card>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";
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
			updateCodes(value: (string | number)[])
			{
				this.codes = value;
			},
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
			const codes = ref<(string | number)[] | null>(null);
			const codeList =
			[
				{ label: "Violent", key: "V" },
				{ label: "Police Hater", key: "PH" },
				{ label: "Escape Risk", key: "E" },
				{ label: "Mental Instability", key: "M" },
				{ label: "Suicidal Tendencies", key: "ST" },
				{ label: "Gang", key: "G" },
				{ label: "Convicted Violent Felon", key: "C" }
			];

			return { 
				codes,
				codeList,
				latestReports: store.state.latest.reports
			};
		}
	});
</script>