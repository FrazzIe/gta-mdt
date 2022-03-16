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

	.record-tab--header .record-avatar.skeleton
	{
		width: var(--n-avatar-size-override);
		height: var(--n-avatar-size-override);
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

	/* Notes Area */

	.record-tab--notes
	{
		grid-area: notes;
	}

	.record-tab--notes .notes-input
	{
		height: 100%;
	}

	.record-tab--notes .skeleton-container
	{
		display: flex;
		
		height: 100%;
		
		flex-direction: column;
		
		justify-content: space-around;
		
		gap: 0.5rem;
	}

	.record-tab--notes .skeleton
	{
		flex: 1;
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
			<n-skeleton class="record-avatar skeleton" :sharp="false" v-if="loading.account" />
			<n-avatar class="record-avatar" v-else>
				<n-icon>
					<i-tabler-user/>
				</n-icon>
			</n-avatar>

			<div class="record-info" v-if="loading.account">
				<span class="record-username">
					<n-skeleton text width="50%" :sharp="false" />
				</span>

				<span>
					<n-skeleton text width="25%" :sharp="false" />
				</span>

				<span>
					<n-skeleton text width="30%" :sharp="false" />
				</span>
			</div>

			<div class="record-info" v-else>
				<span class="record-username">Eric Milton</span>
				<span>ID: 12D7237237</span>
				<span>Male — 15/07/1999 (22)</span>
			</div>
			
			<n-skeleton class="record-wanted" text width="25%" :sharp="false" v-if="loading.account" />
			<n-element class="record-wanted" tag="span" v-else>WANTED</n-element>
		</div>

		<n-card 
			class="record-tab--notes" 
			title="Notes"
			hoverable
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			<div class="skeleton-container" v-if="loading.account">
				<n-skeleton class="skeleton" text :repeat="8" :sharp="false" />
			</div>
			
			<n-input class="notes-input" type="textarea" placeholder="Enter notes..." v-else></n-input>
		</n-card>

		<n-card 
			class="record-tab--caution" 
			title="Caution codes"
			hoverable
			content-style="padding: var(--app-tile-padding-lrb);"
		>
			<n-spin :show="loading.account">
				<n-checkbox-group class="caution-list" v-model:value="codes" @update:value="updateCodes" :disabled="loading.account">
					<n-checkbox v-for="code in codeList" :label="code.label" :value="code.key" :disabled="loading.account"></n-checkbox>
				</n-checkbox-group>
			</n-spin>
		</n-card>
		
		<n-card 
			class="record-tab--reports" 
			title="Reports"
			hoverable 
			content-style="padding: 0; overflow-y: auto;"
		>
			<div class="report-content">
				<div class="pad-content">
					<n-input type="text" placeholder="Title, Name..." :disabled="loading.reports">
						<template #prefix>
							<n-icon size="1.2rem">
								<i-tabler-search />
							</n-icon>
						</template>
					</n-input>
				</div>

				<n-divider class="app-margin-0" />
				
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

										<n-skeleton text  :sharp="false" :animated="false"/>
										<n-skeleton text width="60%" :sharp="false" :animated="false"/>
									</n-thing>
								</n-list-item>
							</template>

							<template v-else>
								<n-list-item v-for="(report, idx) in reports.list" :key="idx">
									<n-thing :title="report.title" :description="reportSubtitle(report.type, report.created)">
										{{ report.summary }}
									</n-thing>
								</n-list-item>
							</template>
						</n-list>
					</n-spin>
				</n-scrollbar>
			</div>

			<template #header-extra>
				<n-popselect v-model:value="reports.filter" multiple :options="reports.filterOptions" :disabled="loading.reports">
					<n-button text icon-placement="right" :disabled="loading.reports">
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

	// interfaces
	import Report from "./../../interfaces/report";

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

			// Loading
			const loading =
			{
				account: true,
				reports: true,
				assets: true
			};

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
			const reportList = ref<Report[]>([
				{ id: 0, created: 1646678952973, type: "incident", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "arrest",   title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "arrest",   title: "Robbery", summary: "Some summary about some report" }
			]);
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
				list: reportList,
				filter,
				filterOptions
			});

			// Assets
			const assets = reactive([
				{
					label: "Weapons",
					data: []
				},
				{
					label: "Vehicles",
					data: []
				},
				{
					label: "Properties",
					data: []
				}
			]);

			return { 
				loading,
				codes,
				codeList,
				reports,
				assets
			};
		}
	});
</script>