<script>
import { deleteCookie } from '@/scripts/WorkWithCookies.js'

export default {
	methods: {
		deleteJWT() {
			deleteCookie('jwt')
		},
	},
}
</script>

<template>
	<div class="main-container">
		<div class="main-container__channels">
			<div class="main-container__line"></div>
		</div>
		<div class="main-container__chat"></div>
	</div>
	<!-- <button @click="deleteJWT()">deleteJWT</button> -->
</template>

<style>
.main-container {
	display: flex;
	flex-direction: row;
	width: 80vw;
	height: 90vh;
	background-color: #fff;
	border-radius: 10px;
	overflow: hidden;
}

.main-container__channels {
	position: relative;
	width: 25%;
	background: #e2e2e2;
}
.main-container__line {
	position: absolute;
	right: 0;
	top: 5%;
	height: 90%;
	width: 2px;
	background-color: rgb(146, 146, 146);
}

.main-container__chat {
	width: 75%;
	background: #fff;
}
</style>
