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
			{ id: "0-home", label: "Home", component: "mdt-home", closable: false }
		]
	}
});

export function useStore()
{
	return baseUseStore(key);
}