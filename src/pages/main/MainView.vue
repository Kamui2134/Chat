<script>
import { deleteCookie } from '@/scripts/WorkWithCookies.js'
import AdminPanel from '@/components/AdminPanel.vue'

export default {
	data() {
		return {
			userData: {
				username: 'Sasha',
				role: 'admin',
				adminData: {
					users: [
						{
							name: 'Sasha',
							channels: [{ title: 'Java for Kids' }, { title: 'gg wp ' }],
						},
						{
							name: 'Gosha',
							channels: [
								{ title: 'Javascript' },
								{ title: 'THE WORLD' },
								{ title: 'THE WORLD' },
								{ title: 'THE WORLD' },
								{ title: 'THE WORLD' },
								{ title: 'THE WORLD' },
							],
						},
					],
					allChannels: [
						{
							id: 0,
							title: 'Java for Kids',
							messages: [
								{ sender: 'Gosha', message: 'привет' },
								{ sender: 'Sasha', message: 'Ну здарова' },
							],
						},
						{ id: 1, title: 'Java for People' },
						{ id: 2, title: 'Java not for Kids' },
					],
				},
				userChannels: [
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for PEOPLE',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 2,
						title:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 3,
						title: 'Java for not Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 4,
						title: 'GG WP',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},

					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for not Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 0,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
					{
						id: 1,
						title: 'Java for Kids',
						messages: [
							{ sender: 'Gosha', message: 'привет' },
							{ sender: 'Sasha', message: 'Ну здарова' },
						],
					},
				],
			},
			chatIsOpen: false,
			currentChatIndex: 0,
			newMessage: '',
			active: false,
		}
	},
	methods: {
		deleteJWT() {
			deleteCookie('jwt')
		},
		openChannel(id) {
			this.chatIsOpen = true
			this.currentChatIndex = id
		},
		dispatchMessage() {
			if (this.newMessage === '') {
				return
			}
			this.userData.userChannels[this.currentChatIndex].messages.push({
				sender: 'Sasha',
				message: this.newMessage,
			})
			this.newMessage = ''
		},
	},
	components: {
		AdminPanel,
	},
}
</script>

<template>
	<button
		class="admin-button"
		v-if="userData.role === 'admin'"
		@click="this.active = !this.active"
	>
		<h3 class="admin-button__text">быть админом</h3>
	</button>
	<div class="main-container">
		<ul class="main-container__channels">
			<li
				class="main-container__channel"
				v-for="channel in this.userData.userChannels"
				:key="channel.id"
				@click="openChannel(channel.id)"
			>
				{{ channel.title }}
			</li>
		</ul>
		<div class="main-container__chat-container">
			<div v-show="chatIsOpen" class="chat">
				<h3 class="chat__title">
					{{ this.userData.userChannels[currentChatIndex].title }}
				</h3>
				<ul class="chat__messages">
					<li
						class="chat__message"
						v-for="(message, index) in this.userData.userChannels[
							currentChatIndex
						].messages"
						:key="index"
					>
					{{ message.sender }}:&nbsp;{{ message.message }}
					</li>
				</ul>
				<div class="chat__dispatch">
					<input class="chat__input" v-model="newMessage" placeholder="Напишите сообщение..."/>
					<img src="/send-message.png" class="chat__confirm-button" @click="dispatchMessage()"/>
				</div>
			</div>
		</div>
	</div>
	<AdminPanel
		:users="userData.adminData.users"
		:channels="userData.adminData.allChannels"
		:active="active"
		@click="active = !active"
	/>
	<!-- <button @click="deleteJWT()">deleteJWT</button> -->
</template>

<style>
.main-container {
	display: flex;
	flex-direction: row;
	width: 80vw;
	height: 90vh;
	background: #fff;
	border-radius: 10px;
	overflow: hidden;
}

.main-container__channels {
	position: relative;
	width: 25%;
	background: #efefef;
	padding: 8px;
	margin: 0;
	list-style-type: none;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 8px;
	overflow-y: auto;
	-ms-overflow-style: none; /* IE и Edge */
	scrollbar-width: none; /* Firefox */
}
.main-container__channels::-webkit-scrollbar { /* Скрываем scrollbar для Chrome, Safari и Opera */
	display: none;
}
.main-container__channel {
	background: #fff;
	color: #283747;
	font-family: Roboto, serif;
	font-weight: 500;
	font-size: 16px;
	padding: 4px;
	border-radius: 5px;
	word-wrap: break-word;
	text-align: center;
	cursor: pointer;
}

.main-container__chat-container {
	width: 75%;
	background: #fff;
}

.chat {
	width: 100%;
	height: 100%;
}

.chat__title {
	width: 100%;
	font-size: 16px;
	height: 40px;
	background: #fff;
	text-align: center;
	font-family: Roboto, sans-serif;
	font-weight: 500;
	color: #283747;
	padding: 12px;
	border-bottom: 2px #efefef solid;
	white-space: nowrap; /* Отключаем автоматический перенос текста */
    overflow: hidden; /* Скрываем часть текста, если он не помещается */
    text-overflow: ellipsis; /* Добавляем многоточие для обрезанного текста */
    min-width: 0; /* Разрешаем сжатие элемента */
}

.chat__messages {
	width: 100%;
	height: calc(100% - (40px + 40px));
	padding-inline-start: 0px;
	padding: 16px;
	overflow-y: auto;
}
.chat__message {
	list-style-type: none;
	font-size: 14px;
	font-family: Roboto, sans-serif;
	font-weight: 500;
	color: #575757;
	word-break: break-word;
	cursor: pointer;
}
.chat__dispatch {
	width: 100%;
	height: 40px;
	background: #fff;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-top: 2px #efefef solid;
	padding-right: 4px; 
}
.chat__input {
	height: 100%;
	border: 0;
	flex-grow: 1;
	outline: none;
	color: #575757;
	font-size: 16px;
	padding: 4px;
	font-family: Roboto, sans-serif;
}
.chat__confirm-button {
	display: block;
	height: 80%;
	cursor: pointer;
}

.admin-button {
	position: absolute;
	top: 15px;
	right: 20px;
	background: #fff;
	padding: 4px 8px;
	border-radius: 5px;
	border: 0;
	cursor: pointer;
	transition: transform 0.5s ease;
}
.admin-button:hover {
	transform: scale(1.1);
}
.admin-button__text {
	text-transform: uppercase;
	background-image: linear-gradient(152deg, #f39c13 25%, #a569bd 90%);
	background-clip: text;
	background-size: 400%;
	font-family: Roboto, serif;
	font-weight: 600;
	font-size: 16px;
	color: transparent;
	animation: bg-animation 1s infinite alternate;
}

@keyframes bg-animation {
	0% {
		background-position: left;
	}
	100% {
		background-position: right;
	}
}
</style>
