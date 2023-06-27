import {defineStore} from 'pinia';
import axios from 'axios';
const cityStore = defineStore('city',{
    state:() => ({
        allCities:{},
        currentCity:{
            cityName:'广州'
        }
    }),
    actions:{
        async getAllCities(){
            try {
                const {data} = await axios.get("http://123.207.32.32:1888/api/city/all");
                this.allCities = data.data;
            } catch (error) {
                throw error;
            }
        }
    },
    mutations:{

    }
})

export default cityStore;