<script>
export default {
	data() {
		return {
			userSelected: false,
			currentUserIndex: 0,
			missingChannels: [],
			markerTypes: ['first', 'second', 'third', 'fourth', 'fifth'],
			nameOfNewChannel: '',
		}
	},
	props: {
		users: {
			type: Array,
			required: true,
		},
		channels: {
			type: Array,
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		selectUser(index) {
			this.missingChannels.splice(0, this.missingChannels.length)
			this.userSelected = true
			this.currentUserIndex = index
			this.channels.forEach(channel => {
				for (
					let i = 0;
					i < this.users[this.currentUserIndex].channels.length;
					i++
				) {
					if (
						!this.findStringInArray(
							this.users[this.currentUserIndex].channels,
							channel.title
						) &&
						!this.findStringInArray(this.missingChannels, channel.title)
					) {
						this.missingChannels.push({ title: channel.title })
					}
				}
			})
		},
		addUserInChannel(title) {
			//нужно доделать, когда появится сервак
			this.users[this.currentUserIndex].channels.push({ title: title })
			this.missingChannels = this.missingChannels.filter(
				channel => channel.title !== title
			)
		},
		exitChannel(index) {
			let channelToBeDeleted = this.users[this.currentUserIndex].channels[index]
			this.missingChannels.push(channelToBeDeleted)
			this.users[this.currentUserIndex].channels.splice(index, 1)
			console.log(this.missingChannels)
		},
		deleteChannel(index) { // требуется жёсткая доработка!!!!!!
			if(!confirm('Вы уверены?')) {
				return
			}
			this.channels.splice(index, 1) 
			// надо придумать как удалять канал у пользователей
		},
		addNewChannel() {
			if(this.nameOfNewChannel === '') {
				return
			}
			this.channels.push({title: this.nameOfNewChannel})
			this.missingChannels.push({title: this.nameOfNewChannel})
			this.nameOfNewChannel = ''
		},
		findStringInArray(array, searchString) {
			for (let i = 0; i < array.length; i++) {
				if (array[i].title === searchString) {
					return true
				}
			}
			return false
		},
	},
}
</script>

<template>
	<div class="admin-panel" v-bind:class="{ active: active }">
		<div
			class="admin-panel__container"
			v-bind:class="{ active: active }"
			@click="$event => $event.stopPropagation()"
		>
			<div class="admin-panel__users-info-container">
				<div class="admin-panel__users-list-container">
					<div class="admin-panel__title-container">
						<h3 class="admin-panel__title">Пользователи</h3>
						<div class="admin-panel__textline"></div>
					</div>
					<ul class="admin-panel__users-list">
						<li
							v-for="(user, index) in users"
							@click="selectUser(index)"
							:key="index"
							class="admin-panel__user"
							v-bind:class="[markerTypes[index % 5]]"
						>
							{{ user.name }}
						</li>
					</ul>
				</div>
				<div class="admin-panel__user-channels-list-container">
					<div class="admin-panel__title-container">
						<h3 class="admin-panel__title">Каналы пользователя</h3>
						<div class="admin-panel__textline"></div>
					</div>
					<ul class="admin-panel__user-channels-list">
						<li
							v-for="(userChannel, index) in users[currentUserIndex].channels"
							:key="index"
							class="admin-panel__user-channel"
							v-if="this.userSelected"
						>
							{{ userChannel.title }}
							<img
								class="admin-panel__cross"
								src="/cross.png"
								@click="exitChannel(index)"
							/>
						</li>
					</ul>
				</div>
			</div>
			<div class="admin-panel__channels-list-container">
				<div class="admin-panel__title-container">
					<h3 class="admin-panel__title">Все каналы</h3>
					<div class="admin-panel__textline"></div>
				</div>
				<ul class="admin-panel__channels-list">
					<li v-for="(channel, index) in channels" class="admin-panel__channel" :key="index">
						{{ channel.title }}
						<img
							class="admin-panel__trash"
							src="/trash.png"
							@click="deleteChannel(index)"
						/>
						<img
							class="admin-panel__upArrow"
							src="/upArrow.png"
							v-if="
								findStringInArray(missingChannels, channel.title) &&
								userSelected
							"
							@click="addUserInChannel(channel.title)"
						/>
					</li>
					<div class="admin-panel__add-new-channel-container">
						<input placeholder="Введите название" class="admin-panel__input" v-model="nameOfNewChannel" maxlength="40"/>
						<img src="/plus.png" class="admin-panel__plus" @click="addNewChannel()" type="submit" />
					</div>
				</ul>
			</div>
		</div>
	</div>
</template>

<style>
.admin-panel {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	top: 0;
	left: 0;
	opacity: 0;
	pointer-events: none;
	transition: 0.5s;
}
.admin-panel.active {
	opacity: 1;
	pointer-events: all;
}

.admin-panel__container {
	display: flex;
	position: relative;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	border-radius: 20px;
	background: #fff;
	width: 40vw;
	height: 80vh;
	padding: 12px 0 12px 18px;
	transform: scale(0.5);
	transition: 0.4s all;
	overflow: hidden;
}
.admin-panel__container.active {
	transform: scale(1);
}

.admin-panel__users-info-container {
	width: 100%;
	height: 50%;
	display: flex;
	flex-direction: row;
	justify-content: stretch;
}

.admin-panel__title-container {
	height: 20px;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.admin-panel__title {
	height: 100%;
	font-family: 'Roboto', sans-serif;
	font-weight: 500;
	color: #c9c9c9;
	background: #fff;
	margin-right: 12px;
	font-size: 18px;
}
.admin-panel__textline {
	flex-grow: 1;
	height: 2px;
	width: auto;
	background: #c9c9c9;
	top: 10px;
}

.admin-panel__users-list-container {
	width: 50%;
	display: flex;
	flex-direction: column;
}
.admin-panel__users-list {
	height: 100%;
	width: calc(50% - 20px);
	max-height: calc(100% - 20px);
	overflow-y: auto;
}
.admin-panel__user {
	font-size: 18px;
	font-family: Roboto, sans-serif;
	font-weight: 500;
	color: #575757;
	cursor: pointer;
}
.admin-panel__user.first::marker {
	color: #e74c3c;
}
.admin-panel__user.second::marker {
	color: #38ffb0;
}
.admin-panel__user.third::marker {
	color: #02c3f4;
}
.admin-panel__user.fourth::marker {
	color: #f39c13;
}
.admin-panel__user.fifth::marker {
	color: #a569bd;
}

.admin-panel__user-channels-list-container {
	width: 50%;
	height: 100%;
}

.admin-panel__user-channels-list {
	padding: 10px;
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: flex-start;
	list-style-type: none;
	padding-inline-start: 0px;
	gap: 8px;
	overflow-y: auto;
	max-height: calc(100% - 20px);
}

.admin-panel__user-channel {
	font-size: 16px;
    font-family: Roboto, sans-serif;
    background: #02c3f4;
    color: #fff;
    border-radius: 5px;
    gap: 4px;
    padding: 4px 8px;
	overflow-wrap: break-word;	
	max-width: 100%;
}
.admin-panel__cross {
	display: inline-block;
	height: 18px;
	cursor: pointer;
	vertical-align: middle;
}

.admin-panel__channels-list-container {
	width: 100%;
	height: calc(50% - 18px);
}
.admin-panel__channels-list {
	padding: 10px;
	width: 100%;
	display: flex;
	flex-direction: row;
	font-weight: 500;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: flex-start;
	list-style-type: none;
	padding-inline-start: 0px;
	gap: 8px;
	overflow-y: auto;
	max-height: 100%;
}
.admin-panel__channel {
	font-size: 16px;
	font-family: Roboto, sans-serif;
	background: #fff;
	color: #575757;
	border-radius: 5px;
	border: #c9c9c9 solid 2px;
	padding: 4px 8px;
	overflow-wrap: break-word;
	max-width: 100%;
}
.admin-panel__upArrow {
	display: inline-block;
	height: 24px;
	cursor: pointer;
	vertical-align: middle;
	margin-left: 4px;
}
.admin-panel__trash {
	display: inline-block;
	height: 24px;
	cursor: pointer;
	vertical-align: middle;
	margin-left: 4px;
}

.admin-panel__add-new-channel-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	background: #fff;
	color: #575757;
	border-radius: 5px;
	border: #c9c9c9 solid 2px;
	padding: 4px 8px;
	gap: 4px;
}
.admin-panel__input {
	width: 9.5rem;
	height: 1.5rem;
	border: 0;
	border-bottom: 2px solid #c9c9c9;
	color: #575757;
	padding: 4px;
	outline: none;
	font-size: 16px;
	font-family: Roboto, sans-serif;
}
.admin-panel__input:focus {
	border-width: thin;
	border-bottom: 2px solid #575757;
}
.admin-panel__plus {
	height: 24px;
	cursor: pointer;
}
.admin-panel__plus:active {
	transform: scale(0.9);
}
</style>
