<script>
import {} from "@/scripts/WorkWithCookies.js"

export default {
	data() {},
	mounted() {
		this.$nextTick(function () {
			// специальные символы (пробелы), требуется кодирование
			let name = 'my name'
			let value = 'John Smith'

			// кодирует в my%20name=John%20Smith
			document.cookie =
				encodeURIComponent(name) + '=' + encodeURIComponent(value)
		})
	},
	methods: {
		
	},
}
</script>

<template>
	<div>привет</div>
</template>

<style scoped></style>
@/scripts/WorkWithCookies