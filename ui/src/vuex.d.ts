
import { Store } from "vuex"

// interfaces
import TabNavItem from "./interfaces/TabNavItem";
import Profile from "./interfaces/Profile";

declare module "@vue/runtime-core"
{
	// declare your own store states
	interface State
	{
		auth: boolean;
		lastTabId: number;
		curTabId: string;
		tabs: TabNavItem[];
		profile: Profile;
	}

	// provide typings for `this.$store`
	interface ComponentCustomProperties
	{
		$store: Store<State>
	}
}