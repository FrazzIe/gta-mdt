import { defineStore } from "pinia";
import { useAuthUserStore } from "./auth-user";

// interfaces
import TabNavItem from "../interfaces/tabs/TabNavItem";
import TabNavData from "../interfaces/tabs/TabNavData";
import TabOptions from "../interfaces/tabs/TabOptions";
import TabOpenOptions from "../interfaces/tabs/TabOpenOptions";

const TAB_ID_PREFIX = "tab-";
const TAB_LIMIT = 8;

interface State
{
	lastId: number;
	curId: string;
	tabs: TabNavItem[];
	tabsData: TabNavData;
}

export const useTabStore = defineStore("main/tab", {
	state: (): State =>
	{
		const lastId = 0;
		const curId = `${TAB_ID_PREFIX}${lastId}`;

		return {
			lastId,
			curId,
			tabs:
			[
				{ id: curId, label: "Home", component: "mdt-home-tab", closable: false }
			],
			tabsData: {}
		};
	},
	getters:
	{
		/**
		 * Check if a tab can be opened
		 * @param state store state
		 * @returns Whether a new tab can be opened or not
		 */
		canOpenTab(state: State): boolean
		{
			const authUserStore = useAuthUserStore();

			return authUserStore.loggedIn && state.tabs.length <= TAB_LIMIT;
		}		
	},
	actions:
	{
		/**
		 * Open a new specific tab
		 */
		openTab(payload: TabOpenOptions)
		{
			const authUserStore = useAuthUserStore();

			// check if a tab can be opened
			if (!authUserStore.loggedIn || this.tabs.length > TAB_LIMIT)
			{
				return;
			}

			const id = `${TAB_ID_PREFIX}${++this.lastId}`;

			this.tabs[this.tabs.length] =
			{
				id,
				label: payload.label,
				component: payload.component,
				closable: true
			}

			this.tabsData[id] = payload.data ?? {};

			this.curId = id;
		},
		 /**
		  * Close tab
		  */
		closeTab(payload: TabOptions)
		{
			// loop through each tab starting from the end
			for (let i = this.tabs.length - 1; i > 0; i--)
			{
				// check for a match
				if (this.tabs[i].id == payload.id)
				{
					// remove tab
					this.tabs.splice(i, 1);

					// change index if tab is selected
					if (this.curId == payload.id)
					{
						this.curId = this.tabs[i - 1].id;
					}
					
					break;
				}
			}
		},
		/**
		 * Update tab
		 */
		updateTab(payload: TabOptions)
		{
			this.curId = payload.id;
		}		
	}
});