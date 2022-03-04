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
		<!-- Login Logo -->
		<div class="logo">
			<n-icon size="8em">
				<i-tabler-user/>
			</n-icon>
		</div>

		<!-- Login Form -->
		<n-form ref="form" :model="login" :rules="rules">
			<n-form-item label="Username" path="username">
				<n-input v-model:value="login.username" placeholder="Enter username"></n-input>
			</n-form-item>

			<n-form-item label="Password" path="password">
				<n-input type="password" v-model:value="login.password" placeholder="Enter password"></n-input>
			</n-form-item>

			<n-button @click="submit">Login</n-button>
		</n-form>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref } from "vue";

	// interfaces
	import { FormInst, FormItemRule, FormRules, FormValidationError } from "naive-ui";

	export default defineComponent({
		methods:
		{
			submit(event: MouseEvent)
			{
				event.preventDefault();

				this.form?.validate((errors: FormValidationError[] | undefined) =>
				{
					if (!errors)
					{
						console.log("valid");
					}
					else
					{
						console.log(errors);
					}
				});
			}
		},
		setup()
		{
			const form = ref<FormInst | null>(null);
			const login = ref({
				username: "",
				password: ""
			});
			const rules: FormRules =
			{
				username:
				{
					required: true,
					trigger: ["input", "blur"],
					validator(rule: FormItemRule, value: string)
					{
						if (!value)
						{
							return new Error("A username is required");
						}
						else if (value.length < 3)
						{
							return new Error("Username must be at least 3 characters long");
						}
						else if (value.length >= 30)
						{
							return new Error("Username cannot be greater than 30 characters");
						}
						else if (!/^(?=.{1,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(value))
						{
							return new Error("Invalid username");
						}

						return true;
					}
				},
				password:
				{
					required: true,
					trigger: ["input", "blur"],
					validator(rule: FormItemRule, value: string)
					{
						if (!value)
						{
							return new Error("A password is required");
						}
						else if (value.length < 8)
						{
							return new Error("Password must be at least 8 characters long");
						}
						else if (!/(?=.*?[A-Z])/.test(value))
						{
							return new Error("Password must contain at least one uppercase letter");
						}
						else if (!/(?=.*?[a-z])/.test(value))
						{
							return new Error("Password must contain at least one lowercase letter");
						}
						else if (!/(?=.*?[0-9])/.test(value))
						{
							return new Error("Password must contain at least one number");
						}

						return true;						
					}
				}
			};

			return {
				form,
				login,
				rules
			}
		}
	});
</script>