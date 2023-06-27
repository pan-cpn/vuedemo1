import {defineStore} from 'pinia';
import axios from 'axios';
const homeStore = defineStore('home',{
    state:() => ({
        hotSuggestions:[],
        categories:[],
        homeLists:[]
    }),
    actions:{
        async getHots(){
            try {
                const {data} = await axios.get('http://123.207.32.32:1888/api/home/hotSuggests');
                this.hotSuggestions = data.data
            } catch (error) {
                throw error;
            }
        },
        async getCategory(){
            try {
                const {data} = await axios.get('http://codercba.com:1888/api/home/categories');
                this.categories = data.data;
            } catch (error) {
                throw error;
            }
        },
        async getHomeList(pageNo){
            try{
                const {data} =  await axios.get(`http://codercba.com:1888/api/home/houselist?page=${pageNo}`);
                this.homeLists = [...this.homeLists,...data.data];
            }catch(error){
                throw error;
            }
        }
    },
    mutations:{}
});

export default homeStore;