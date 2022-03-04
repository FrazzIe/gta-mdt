import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

// interfaces
import TabNavItem from "./interfaces/TabNavItem";

// define your typings for the store state
export interface State
{
	auth: boolean;
	lastTabId: number;
	tabs: TabNavItem[];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state:
	{
		auth: false,
		lastTabId: 0,
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
		newTab(state)
		{
			state.tabs[state.tabs.length] = 
			{ 
				id: `tab-${++state.lastTabId}`,
				label: "New Tab",
				component: "mdt-new",
				closable: true
			};
		}
	}
});

export function useStore()
{
	return baseUseStore(key);
}