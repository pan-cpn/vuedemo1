import {createRouter,createWebHistory} from 'vue-router';


const Home = () => import('../views/home/Home.vue');
const More = () => import('../views/more/More.vue');
const Mine = () => import('../views/mine/Mine.vue');
const Search = () => import('../views/search/Search.vue');
const city = () => import('../views/city/city.vue');
const find = () => import('../views/home/Find.vue');

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            name:'home',
            path:'/home',
            component: Home
        },
        {
            name:'more',
            path:'/more',
            component: More
        },
        {   
            name:'mine',
            path:'/mine',
            component:Mine
        },
        {
            name:'search',
            path:'/search',
            component:Search
        },
        {
            name:'city',
            path:'/city',
            component:city,
            meta: { hideTarbar: true},
        },
        {
            name:'find',
            path:'/find',
            component:find,
        }
    ]
});

export default router