<script>
import { RouterView } from 'vue-router'
import { getCookie } from '@/scripts/WorkWithCookies.js'
import router from '@/router/router.js'

export default {
	mounted() {
		this.$nextTick(function () {
			if (getCookie('jwt') == undefined) {
				router.replace({ path: '/registration' })
			}
		})
	},
}
</script>

<template>
	<div class="app">
		<RouterView />
	</div>
</template>

<style scoped></style>
