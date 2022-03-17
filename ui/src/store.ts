import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

// interfaces
import TabNavItem from "./interfaces/tabs/TabNavItem";
import TabNavData from "./interfaces/tabs/TabNavData";
import TabOptions from "./interfaces/tabs/TabOptions";
import TabOpenOptions from "./interfaces/tabs/TabOpenOptions";
import Profile from "./interfaces/Profile";

const CUSTOM_TAB_LIMIT = 8;

// define your typings for the store state
export interface State
{
	auth: boolean;
	lastTabId: number;
	curTabId: string;
	tabs: TabNavItem[];
	tabsData: TabNavData;
	profile: Profile;
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
		tabsData: 
		{
			"tab-0": {}
		},
		profile:
		{
			id: 0,
			username: "Username",
			role: "Role",
			avatar: "1",
			description: "Description",
			notes: "Notes"
		}
	},
	mutations:
	{
		/**
		 * Open a new specific tab
		 * @param state application state
		 */
		openTab(state: State, payload: TabOpenOptions)
		{
			// check if a tab can be opened
			if (!state.auth || state.tabs.length > CUSTOM_TAB_LIMIT)
			{
				return;
			}

			const id = `tab-${++state.lastTabId}`;

			state.tabs[state.tabs.length] =
			{
				id,
				label: payload.label,
				component: payload.component,
				closable: true
			}

			state.tabsData[id] = payload.data ?? {};

			state.curTabId = id;
		},
		/**
		 * Close tab
		 * @param state application state
		 */
		closeTab(state: State, payload: TabOptions)
		{
			// loop through each tab starting from the end
			for (let i = state.tabs.length - 1; i > 0; i--)
			{
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
		updateTab(state: State, payload: TabOptions)
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
			return state.auth && state.tabs.length <= CUSTOM_TAB_LIMIT;
		}
	}
});

export function useStore()
{
	return baseUseStore(key);
}