<style>
	.app-login-container
	{
		position: absolute;

		width: 25%;

		top: 50%;
		left: 50%;

		transform: translate(-50%, -50%);
	}

	.app-login-container .logo
	{
		display: flex;

		justify-content: center;
	}
</style>

<template>
	<div class="app-login-container">
		<!-- Login Logo-->
		<div class="logo">
			<n-icon size="8em">
				<i-tabler-user/>
			</n-icon>
		</div>

		<!-- Login Form -->
		<n-form :model="loginForm">
			<n-form-item label="Username" path="usernmae">
				<n-input v-model:value="loginForm.username" placeholder="Enter username"></n-input>
			</n-form-item>

			<n-form-item label="Password" path="password">
				<n-input type="password" v-model:value="loginForm.password" placeholder="Enter password"></n-input>
			</n-form-item>

			<n-button>Login</n-button>
		</n-form>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";

	export default defineComponent({
		setup()
		{
			const loginForm = ref({
				username: "",
				password: ""
			});

			return {
				loginForm
			}
		}
	});
</script>