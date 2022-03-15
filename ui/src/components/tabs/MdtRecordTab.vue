<style>
	.record-tab
	{
		display: grid;

		height: 100%;

		grid-template-areas: 
			" reports reports header  header  header header "
			" reports reports notes   notes   assets assets "
			" reports reports notes   notes   assets assets "
			" reports reports caution caution assets assets ";
		grid-template-columns: repeat(6, 1fr);
		grid-template-rows: 0.5fr 1.5fr 1.5fr 0.5fr;

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

	.record-tab--header .record-avatar
	{
		--n-avatar-size-override: 6rem;
	}

	.record-tab--header .record-info
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

	/* Reports Area */

	.record-tab--reports
	{
		grid-area: reports;
	}

	.record-tab--reports .report-content
	{
		display: flex;
		
		height: 100%;

		flex-direction: column;
	}

	.record-tab--assets
	{
		grid-area: assets;
	}

	.record-tab--assets .asset-tabs
	{
		display: flex;

		height: 100%;

		flex-direction: column;
	}

	.record-tab--assets .asset-pane
	{
		flex: 1;

		padding: 0;

		overflow-y: auto;
		
		box-sizing: border-box;
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

		<n-card 
			class="profile-tab--notes" 
			title="Notes"
			hoverable
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			<n-input class="notes-input" type="textarea" placeholder="Enter notes..."></n-input>
		</n-card>

		<n-card 
			class="record-tab--caution" 
			title="Caution codes"
			hoverable
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			<n-checkbox-group class="caution-list" v-model:value="codes" @update:value="updateCodes">
				<n-checkbox v-for="code in codeList" :label="code.label" :value="code.key"></n-checkbox>
			</n-checkbox-group>
		</n-card>
		
		<n-card 
			class="record-tab--reports" 
			title="Reports"
			hoverable 
			content-style="padding: 0; overflow-y: auto;"
		>
			<div class="report-content">
				<div class="pad-content">
					<n-input type="text" placeholder="Title, Name...">
						<template #prefix>
							<n-icon size="1.2rem">
								<i-tabler-search />
							</n-icon>
						</template>
					</n-input>
				</div>

				<n-divider class="app-margin-0" />

				<n-scrollbar>
					<n-list class="app-pad-tile-list app-margin-0">
						<n-list-item v-for="(report, idx) in reports.latest" :key="idx">
							<n-thing :title="report.title" :description="reportSubtitle(report.type, report.created)">
								{{ report.summary }}
							</n-thing>
						</n-list-item>
					</n-list>
				</n-scrollbar>
			</div>

			<template #header-extra>
				<n-popselect v-model:value="reports.filter" multiple :options="reports.filterOptions">
					<n-button text icon-placement="right">
						<template #icon>
							<n-icon>
								<i-tabler-filter />
							</n-icon>
						</template>

						Filter
					</n-button>
				</n-popselect>
			</template>
		</n-card>

		<n-card 
			class="record-tab--assets" 
			title="Assets"
			hoverable
			content-style="padding: 0; overflow-y: auto;"
		>
			<n-tabs class="asset-tabs" justify-content="space-evenly" type="line" pane-class="asset-pane" display-directive="show:lazy">
				<n-tab-pane v-for="(assetType, idx) in assets" :name="`tab-${idx}`" :tab="assetType.label">
					<n-scrollbar>
						<n-list class="app-pad-tile-list app-margin-0">
							<n-list-item v-for="(asset, idx) in assetType.data" :key="idx">
								<n-thing title="x" description="y" />
							</n-list-item>							
						</n-list>
					</n-scrollbar>
				</n-tab-pane>
			</n-tabs>
		</n-card>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref, reactive } from "vue";
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

			// Caution codes
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

			// Reports filtering
			const filter = ref<string[] | null>(null);
			const filterOptions = 
			[
				{ label: "Arrest", value: "arrest" },
				{ label: "Citation", value: "citation" },
				{ label: "Warrant", value: "warrant" },
				{ label: "Incident", value: "incident" }
			];

			// Reports
			const reports = reactive({
				latest: store.state.latest.reports,
				filter,
				filterOptions
			});

			// Assets
			const assets = reactive([
				{ label: "Weapons", data: [] },
				{ label: "Vehicles", data: [] },
				{ label: "Properties", data: [] }
			]);

			return { 
				codes,
				codeList,
				reports,
				assets
			};
		}
	});
</script>