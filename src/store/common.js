import {defineStore} from 'pinia';
import axios from 'axios';

const commonStore = defineStore('home',{
    state:() => ({
        startDate:new Date(),
        endDate:new Date(),
        token:''
    }),
    actions:{},
})
export default commonStore;