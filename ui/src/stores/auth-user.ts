import { defineStore } from "pinia";

interface State
{
	userId: number | null;
	avatar: string | null;
	username: string | null;
	role: string | null;
}

interface Profile
{
	avatar: string;
	username: string;
	role: string;
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
		},
		roleUppercase: (state) =>
		{
			if (state.role == null)
			{
				return "Unknown";
			}

			return state.role.charAt(0).toUpperCase() + state.role.slice(1).toLowerCase();
		},
		profile(): Profile
		{
			return {
				avatar: this.avatar ?? "1",
				username: this.username ?? "Unknown",
				role: this.roleUppercase
			}
		}
	}
});