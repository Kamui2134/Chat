<script>
import { deleteCookie, getCookie } from '@/scripts/WorkWithCookies.js'
import AdminPanel from '@/components/AdminPanel.vue'

export default {
	data() {
		return {
			userData: {},
			chatIsOpen: false,
			currentChannelId: 0,
			newMessage: '',
			active: false,
			chatConnection: null,
			userDataLoaded: false,
			userId: '',
		}
	},
	methods: {
		sendMessage() {
			if (this.newMessage === '') {
				return
			}
			this.chatConnection.send(
				JSON.stringify({
					flag: 'FORWARD_MESSAGE',
					text: this.newMessage,
					channelId: this.currentChannelId,
					senderId: this.userId,
				})
			)
			this.newMessage = ''
		},
		forwardMessage(data) {
			data.channelId = Number(data.channelId)

			this.userData.userChannels[
				this.findById(this.userData.userChannels, data.channelId)
			].messages.push({ sender: data.sender, text: data.text })
		},
		deleteUserFromChannel(data) {
			if (this.userData.isAdmin === true) {
				this.userData.adminData.allUsers[
					this.findById(this.userData.adminData.allUsers, data.userId)
				].channels.splice(
					this.findById(
						this.userData.adminData.allUsers[
							this.findById(this.userData.adminData.allUsers, data.userId)
						].channels,
						data.channelId
					),
					1
				)
				return
			}
			if (this.currentChannelId === data.channelId) {
				this.currentChannelId = 0
				this.chatIsOpen = false
			}
			this.userData.userChannels.splice(
				this.findById(this.userData.userChannels, data.channelId),
				1
			)
		},
		addUserToChannel(data) {
			if (this.userData.isAdmin === true) {
				this.userData.adminData.allUsers[
					this.findById(this.userData.adminData.allUsers, data.userId)
				].channels.push(
					this.userData.adminData.allChannels[
						this.findById(this.userData.adminData.allChannels, data.channelId)
					]
				)
				return
			}
			this.userData.userChannels.push({
				id: data.id,
				title: data.title,
				messages: data.messages,
			})
		},
		deleteChannel(data) {
			if (this.userData.isAdmin === true && data.userIds != undefined) {
				for (let i = 0; i < data.userIds.length; i++) {
					this.userData.adminData.allUsers[
						this.findById(this.userData.adminData.allUsers, data.userIds[i])
					].channels.splice(
						this.findById(
							this.userData.adminData.allUsers[
								this.findById(this.userData.adminData.allUsers, data.userIds[i])
							].channels
						, data.channelId),
						1
					)
				}
				return
			}
			if (this.currentChannelId === data.channelId) {
				this.currentChannelId = 0
				this.chatIsOpen = false
			}
			this.userData.userChannels.splice(
				this.findById(this.userData.userChannels, data.channelId),
				1
			)
		},
		createChannel(data) {
			this.userData.userChannels.push({id: data.channelId, title: data.title, messages: []})
			this.userData.adminData.allChannels.push({
				id: data.channelId,
				title: data.title,
			})
		},
		deleteJWT() {
			deleteCookie('jwt')
		},
		openChannel(id) {
			this.chatIsOpen = true
			this.currentChannelId = id
		},
		findById(array, id) {
			for (var i = 0; i < array.length; i++) {
				if (array[i].id === id) {
					return i // Возвращаем индекс элемента, если его id равен заданному id
				}
			}
		},
	},
	components: {
		AdminPanel,
	},
	created: function () {
		const self = this
		this.userId = getCookie('jwt')
		fetch('http://192.168.137.1:8082/chat', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				userId: this.userId,
			}),
		})
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
				this.userData = data
				console.log(this.userData)
				this.userDataLoaded = true
			})
			.catch(error => {
				// Обработка ошибки
				console.log('Произошла ошибка при запросе данных:', error)
				// Дополнительные действия при ошибке...
			})
		console.log('Starting connection')
		this.chatConnection = new WebSocket(
			`ws://192.168.137.1:8082/chat/${this.userId}`
		)

		this.chatConnection.onopen = function () {
			console.log('Successfully connected (chatConnection)')
		}
		this.chatConnection.onmessage = function (event) {
			console.log('gg')

			const data = JSON.parse(event.data)
			console.log(data)
			switch (data.flag) {
				case 'FORWARD_MESSAGE':
					self.forwardMessage(data)
					break
				case 'DELETE_USER_FROM_CHANNEL':
					self.deleteUserFromChannel(data)
					break
				case 'ADD_USER_TO_CHANNEL':
					self.addUserToChannel(data)
					break
				case 'DELETE_CHANNEL':
					self.deleteChannel(data)
					break
				case 'CREATE_CHANNEL':
					self.createChannel(data)
					break
			}
		}
		this.chatConnection.onclose = function (error) {
			console.log(
				'Сообщений больше не будет, соединение закрылось (chatConnection)',
				error
			)
		}
		this.chatConnection.onerror = function (error) {
			console.log('Произошла ошибка (chatConnection)', error)
		}
	},
}
</script>

<template>
	<button
		class="admin-button"
		v-if="userData.isAdmin === true"
		@click="this.active = !this.active"
	>
		<h3 class="admin-button__text">быть админом</h3>
	</button>
	<div class="main-container" v-if="userDataLoaded">
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
			<div v-if="chatIsOpen" class="chat">
				<h3 class="chat__title">
					{{
						this.userData.userChannels[
							findById(this.userData.userChannels, currentChannelId)
						].title
					}}
				</h3>
				<ul class="chat__messages">
					<li
						class="chat__message"
						v-for="(message, index) in this.userData.userChannels[
							findById(this.userData.userChannels, currentChannelId)
						].messages"
						:key="index"
					>
						{{ message.sender }}:&nbsp;{{ message.text }}
					</li>
				</ul>
				<div class="chat__dispatch">
					<input
						class="chat__input"
						v-model="newMessage"
						placeholder="Напишите сообщение..."
					/>
					<img
						src="/send-message.png"
						class="chat__confirm-button"
						@click="sendMessage()"
					/>
				</div>
			</div>
		</div>
	</div>
	<AdminPanel
		v-if="userDataLoaded && userData.isAdmin"
		:users="userData.adminData === undefined ? [] : userData.adminData.allUsers"
		:channels="
			userData.adminData === undefined ? [] : userData.adminData.allChannels
		"
		:active="active"
		:chatConnection="this.chatConnection"
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
	-ms-overflow-style: none;
	/* IE и Edge */
	scrollbar-width: none;
	/* Firefox */
}

.main-container__channels::-webkit-scrollbar {
	/* Скрываем scrollbar для Chrome, Safari и Opera */
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
	white-space: nowrap;
	/* Отключаем автоматический перенос текста */
	overflow: hidden;
	/* Скрываем часть текста, если он не помещается */
	text-overflow: ellipsis;
	/* Добавляем многоточие для обрезанного текста */
	min-width: 0;
	/* Разрешаем сжатие элемента */
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
