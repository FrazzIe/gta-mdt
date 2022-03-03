import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

// define your typings for the store state
export interface State
{
	auth: boolean;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state:
	{
		auth: false
	}
});

export function useStore()
{
	return baseUseStore(key);
}