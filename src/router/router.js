import { createMemoryHistory, createRouter } from "vue-router"

import MainView from "@/pages/main/MainView.vue"
import RegistrationView from '@/pages/registration/RegistrationView.vue'

const routes = [
	{ path: '/', component: MainView },
	{ path: '/registration', component: RegistrationView },
]

const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

export default router