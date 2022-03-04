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
			{ id: "tab-0", label: "Home", component: "mdt-home", closable: false }
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
				component: "mdt-new",
				closable: true
			}

			state.curTabId = `tab-${id}`;
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