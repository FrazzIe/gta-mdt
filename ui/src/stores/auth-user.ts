import { defineStore } from "pinia";

interface State
{
	userId: number | null;
	avatar: string | null;
	username: string | null;
	role: string | null;
}

export const useAuthUserStore = defineStore("auth/user", {
	state: (): State => ({
		userId: null,
		avatar: null,
		username: null,
		role: null
	}),
	getters:
	{
		loggedIn: (state) =>
		{
			return state.userId != null;
		}
	}
});