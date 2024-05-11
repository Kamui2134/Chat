<script>
import { setCookie } from '@/scripts/WorkWithCookies.js'
import router from '@/router/router.js'

export default {
	data() {
		return {
			userName: '',
			password: '',
			error: '',
		}
	},
	methods: {
		registration() {
			fetch('http://localhost:8082/registration', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userName: this.userName,
					password: this.password,
				}),
			}) // Замените URL на ваш адрес сервера
				.then(response => {
					if (!response.ok) {
						// Проверяем, успешно ли выполнен запрос
						throw new Error('Network response was not ok') // Если запрос не удался, выбрасываем ошибку
					}
					return response.json() // Преобразуем ответ в формат JSON
				})
				.then(data => {
					// Обработка пришедших данных
					console.log('Полученные данные:', data)
					if (data.error === undefined) {
						setCookie('jwt', data)
					} else {
						this.error=data.error
						alert(this.error)
					}
				})
				.catch(error => {
					// Обработка ошибки
					console.error('Произошла ошибка при запросе данных:', error)
					// Дополнительные действия при ошибке...
				})
			router.replace({ path: '/' })
		},
	},
}
</script>
<template>
	<div class="registration-container">
		<h2 class="title">Регистрация</h2>
		<div class="registration-container__inputs">
			<h3></h3>
			<input
				class="registration-container__input"
				type="text"
				name="username"
				v-model="userName"
				placeholder="Введите имя"
			/>
			<h3></h3>
			<input
				class="registration-container__input"
				type="password"
				name="password"
				v-model="password"
				placeholder="Введите пароль"
			/>
			<h3></h3>
		</div>
		<div class="checkbox-container">
			<input
				class="checkbox-container__checkbox"
				type="checkbox"
				name="remember"
				checked
			/>
			<label class="checkbox-container__label" for="label"
				>Запомнить меня</label
			>
		</div>
		<button class="button" @click="registration()">Продолжить</button>
	</div>
</template>
<style>
:root {
	--bg-color: #fff;
	--text-color: #5d5d5d;
}
.registration-container {
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 20vw;
	height: auto;
	border-radius: 10px;
	background-color: var(--bg-color);
	padding: 16px;
}
.title {
	font-family: 'Roboto', sans-serif;
	font-weight: 700;
	color: #004152;
	padding-bottom: 24px;
}
.registration-container__inputs {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 12px;
}
.registration-container__input {
	height: 40px;
	margin-bottom: 16px;
	font-family: 'Roboto', sans-serif;
	border: none;
	border-bottom: 1px solid rgba(33, 37, 41, 0.4);
	font-size: 16px;
	color: #1f5967;
}
.registration-container__input::placeholder {
	color: #212529fc;
	opacity: 0.4;
}
.registration-container__input:focus {
	outline: none;
}
.checkbox-container {
	display: flex;
	align-items: flex-end;
	justify-content: flex-start;
	width: 100%;
	margin-bottom: 32px;
}
.checkbox-container__checkbox {
	margin: 0 4px 4px 0;
	float: left;
}
.checkbox-container__label {
	font-family: 'Roboto', sans-serif;
	font-size: 16px;
	color: #212529;
	opacity: 0.4;
}
.button {
	background: #02c3f4;
	height: 40px;
	width: 120px;
	border: none;
	border-radius: 5px;
	font-family: 'Roboto', sans-serif;
	color: #fff;
	font-weight: 500;
}
</style>
