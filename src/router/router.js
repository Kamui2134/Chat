import { createMemoryHistory, createRouter } from "vue-router"

import MainView from "@/pages/main/MainView.vue"
import RegistrationView from '@/pages/registration/RegistrationView.vue'
import AuthorizationView from "@/pages/authorization/AuthorizationView.vue"

const routes = [
	{ path: '/', component: MainView },
	{ path: '/registration', component: RegistrationView },
	{ path: '/authorization', component: AuthorizationView},
]

const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

export default router