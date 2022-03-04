import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

// interfaces
import TabNavItem from "./interfaces/TabNavItem";

// define your typings for the store state
export interface State
{
	auth: boolean;
	lastTabId: number;
	curTabId: string;
	tabs: TabNavItem[];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state:
	{
		auth: false,
		lastTabId: 0,
		curTabId: "tab-0",
		tabs:
		[
			{ id: "tab-0", label: "Home", component: "mdt-home-tab", closable: false }
		]
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
	}
});

export function useStore()
{
	return baseUseStore(key);
}