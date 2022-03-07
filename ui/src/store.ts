import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

// interfaces
import TabNavItem from "./interfaces/TabNavItem";
import Profile from "./interfaces/Profile";
import Report from "./interfaces/Report";
import WarrantReport from "./interfaces/Report/Warrant";

const CUSTOM_TAB_LIMIT = 8;

// define your typings for the store state
export interface State
{
	auth: boolean;
	lastTabId: number;
	curTabId: string;
	tabs: TabNavItem[];
	profile: Profile;
	latest:
	{
		reports: Report[];
		warrants: WarrantReport[];
	}
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state:
	{
		auth: true,
		lastTabId: 0,
		curTabId: "tab-0",
		tabs:
		[
			{ id: "tab-0", label: "Home", component: "mdt-home-tab", closable: false }
		],
		profile:
		{
			id: 0,
			username: "Username",
			role: "Role",
			avatar: "1",
			description: "Description",
			notes: "Notes"
		},
		latest:
		{
			reports:
			[
				{ id: 0, created: 1646678952973, type: "incident", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "incident", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "arrest",   title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "incident", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "incident", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "incident", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "arrest",   title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "arrest",   title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "citation", title: "Robbery", summary: "Some summary about some report" },
				{ id: 0, created: 1646678952973, type: "citation", title: "Robbery", summary: "Some summary about some report" }
			],
			warrants:
			[
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true },
				{ id: 0, created: 1646678952973, type: "warrant", title: "Robbery", summary: "1st Degree Murder, Resisting Arrest, Robbery", active: true }				
			]
		}
	},
	mutations:
	{
		/**
		 * Add new tab
		 * @param state application state
		 */
		newTab(state: State)
		{
			const id = ++state.lastTabId;

			state.tabs[state.tabs.length] =
			{
				id: `tab-${id}`,
				label: "New Tab",
				component: "mdt-new-tab",
				closable: true
			}

			state.curTabId = `tab-${id}`;
		},
		/**
		 * Close tab
		 * @param state application state
		 */
		closeTab(state: State, payload: { id: string })
		{
			// loop through each tab starting from the end
			for (let i = state.tabs.length - 1; i > 0; i--)
			{
				console.log(i);
				// check for a match
				if (state.tabs[i].id == payload.id)
				{
					// remove tab
					state.tabs.splice(i, 1);

					// change index if tab is selected
					if (state.curTabId == payload.id)
					{
						state.curTabId = state.tabs[i - 1].id;
					}
					
					break;
				}
			}
		},
		/**
		 * Update tab
		 * @param state application state
		 */
		updateTab(state: State, payload: { id: string })
		{
			state.curTabId = payload.id;
		}
	},
	getters:
	{
		/**
		 * Check if a tab can be opened
		 * @param state application state
		 * @returns Whether a new tab can be opened or not
		 */
		canOpenTab(state: State): boolean
		{
			return !state.auth || state.tabs.length >= CUSTOM_TAB_LIMIT;
		}
	}
});

export function useStore()
{
	return baseUseStore(key);
}