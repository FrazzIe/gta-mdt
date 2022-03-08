
import { Store } from "vuex"

// interfaces
import TabNavItem from "./interfaces/tabs/TabNavItem";
import TabNavData from "./interfaces/tabs/TabNavData";
import Profile from "./interfaces/Profile";
import Report from "./interfaces/report";
import WarrantReport from "./interfaces/report/Warrant";

declare module "@vue/runtime-core"
{
	// declare your own store states
	interface State
	{
		auth: boolean;
		lastTabId: number;
		curTabId: string;
		tabs: TabNavItem[];
		tabsData: TabNavData;
		profile: Profile;
		latest:
		{
			reports: Report[];
			warrants: WarrantReport[];
		}
	}

	// provide typings for `this.$store`
	interface ComponentCustomProperties
	{
		$store: Store<State>
	}
}