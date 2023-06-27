<template>
  <div class="home">
    <nav-bar></nav-bar>
    <div class="current-search" v-if="isScroll">
      <div class="live-time">
        <span class="service">住  宿</span>
        <span class="live-time-items">
          <span>{{ getFormatStart}}</span>
          <span>{{getFormatEnd}}</span>
        </span>
      </div>
      <div class="search-text">
        <!-- <span class="search-icon">|</span>
        <span>价格/位置/规格</span> -->
        <input type="text" placeholder="   价格/位置/规格"/>
      </div>
      <div class="cancel">
        <img src="@/assets/images/search.png" />
      </div>
    </div>
    <div class="banner">
          <img src="../../assets/images/banner.webp" alt="">
    </div>
    <div class="content">
      <div class="location">
      <span  @click="toCity" class="location-text">{{currentCity.cityName}}</span>
      <div class="locate">
        <span class="locate-title">我的位置</span>
        <img class="locate-icon" src="../../assets/images/local.png" @click="getPosition"/>
      </div>
    </div>
      <div class="rental-duration">
        <div class="start-time">
          <span class="tip">入住</span>
          <span class="time">{{startTime}}</span>
        </div>
        <div class="count-time">
          <span class="stay-time">
            <van-cell :title="days"  @click="show = true" />
            <van-calendar v-model:show="show" type="range" @confirm="onConfirm" />
          </span>
        </div>
        <div class="end-time">
          <span class="tip">离开</span>
          <span class="time">{{ endTime }}</span>
        </div>
      </div>
      <div class="autoSelect">
        <span class="text l">时间不限</span>
        <span class="text r">价格不限</span>
      </div>

      <div class="suggest-title">
        <span>关键字 / </span>
        <span>位置 / </span>
        <span>民宿名</span>
      </div>
      <div class="suggest-list">
        <span class="list-item" v-for="(item,index) in hotSuggestions" :key="index" :style="{
          'background-color': item.tagText.background.color
        }">{{item.tagText.text}}</span>
      </div>
    </div>
    <div class="searchButton">
        <van-button type="primary" block  color="#e1731a" round="true"  @click="toSearch">搜索</van-button>
    </div>
    <div class="category">
      <div class="category-item" v-for="(item) in  categories" :key="item.id">
        <span class="up">
         <img :src="item.pictureUrl"/>
        </span>
        <span class="down">{{item.title}}</span>
      </div>
    </div>
    <div class="show-content">
      <div class="show-content-title">
        <h2>热门推荐</h2>
      </div>
      <div class="show-content-list">
          <div v-for="(item,index) in list" :key="item.houseId" class="list-item">
              <house-item-three :houseData="item" v-if="item.discoveryContentType === 3"></house-item-three>
              <house-item-nine :houseData="item" v-if="item.discoveryContentType ===9"></house-item-nine>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import NavBar from '@/components/nav-bar.vue';
import houseItemNine from '@/views/home/house-item-3.vue';
import houseItemThree from '@/views/home/house-item-9.vue';
import {useRouter} from 'vue-router';
import usecityStore from '@/store/city.js';
import useHomeStore from '@/store/home.js';
import {storeToRefs} from 'pinia';
import {ref,onMounted,onUnmounted,computed} from 'vue';
import {getCurrentTime,getTime,getDayCount} from '@/utils/index.js';
import _ from 'underscore';

export default {
  name: '',
  props:{},
  setup(props,context){
   
    const router = new useRouter();
    const cityStore = usecityStore();
    const {currentCity} = storeToRefs(cityStore);
    const isScroll = ref(true);

    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const pageNo  = ref(0);

    /**
     * 获取当前定位和回退页面
     */
    const getPosition = function(pos){
      navigator.geolocation.getCurrentPosition(pos => {
        var crd = pos.coords;
      },err => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      },{
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0
      });
    }
    const toCity = function(){
      router.push('/city');
    }

    /**
     * 获取热门居住推荐数据
     */
    const homeStore = useHomeStore();
    homeStore.getCategory();
    homeStore.getHots();
    const {hotSuggestions,categories} = storeToRefs(homeStore);
    const load = () => {
      if(pageNo.value < 30){
          pageNo.value++;
        }
        homeStore.getHomeList(pageNo.value);
        const { homeLists} = storeToRefs(homeStore);
        list.value = homeLists.value;
        console.log(list.value);
        loading.value = false;
        if (list.value.length ===  60) {
          finished.value = true;
        }
    }
    load();
    /**
     * 获取房屋列表
     */
    function getScroll(){
      let totalHeight = document.documentElement.scrollHeight;
      let scrollDistance = document.documentElement.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      if((totalHeight - (scrollDistance + clientHeight)) <= 20){
        console.log(totalHeight - (scrollDistance + clientHeight));
        load();
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', _.throttle(getScroll,1000))

    })
    onUnmounted(() => {
      window.removeEventListener('scroll', getScroll)
    })

    


    /**
     * 旅店居住的时长
     */
    const startTime = ref('');
    const endTime = ref('---- -- --');
    const days = ref('选择时间');
    const show = ref(false);
    startTime.value = getCurrentTime();
    const onConfirm = (values) => {
      const [start, end] = values;
      show.value = false;
      startTime.value = getTime(start);
      endTime.value = getTime(end);
      days.value =getDayCount(startTime.value,endTime.value);
    };

    /**
     * 跳转到search页面
     */
    const toSearch = () => {
      router.push({
        path: "/search",
        query:{
          currentLocation:currentCity.value,
          currentStartTime:startTime.value,
          currentEndTime:endTime.value
        }
      })
    }

    const getformatDate = (time) => {
      const dateStr = time.substring(5);
      return dateStr.split('-').join('.');
    }

    const getFormatStart = computed(() => {
      return getformatDate(startTime.value);
    });
    const getFormatEnd = computed(() => {
      return getformatDate(endTime.value);
    });
    
   
    return {
      getFormatStart,
      getFormatEnd,
      getPosition,
      toCity,
      currentCity,
      show,
      onConfirm,
      startTime,endTime,days,
      hotSuggestions,
      toSearch,
      categories,
      list,
      loading,
      finished,isScroll
    }
  },
  components: {
    NavBar,
    houseItemThree,
    houseItemNine
  }
}
</script>

<style lang="less" scoped>
.home{
  width:100%;
  margin-bottom:65px;
  .current-search{
    width:100%;
    background:#f98c2c;
    height:50px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    position:fixed;
    top:0;
    left:0;
    z-index:9;
    color:white;
    // line-height:50px;
    .search-text{
      width:68%;
      font-size:14px;
      color:#ccc;
      line-height:50px;
      input{
        width:100%;
        height:50px;
        outline:none;
        border:0;
        // padding-left:24px;
        // background-color:#ccc;
        // border-radius:5px;
      }
    }
    .cancel{
      line-height:50px;
      padding-right:5px;
      font-size:15px;
      img{
        margin-top:10px;
        width:30px;
        height:30px;
      }
    }
    .live-time{
      width:15%;
      display:flex;
      flex-direction:row;
   
      .service{
          writing-mode: vertical-lr;
          text-align:center;
      }
      .live-time-items{
          margin:3px;
          display:flex;
          flex-direction:column;
      }
    }
  }
  .show-content{
    margin: 5px 2.5% 5px 2.5%;
    .show-content-list{
        display:flex;
        flex-direction:row;   
        flex-wrap: wrap;
        justify-content: space-between;
        .list-item{
          width: 49%;
        }

    }
  }
  .category{
    height:85px;
    overflow:auto;
    display:flex;
    .category-item{ 
      flex-shrink:0;
      width:75px;
      display:flex;
      flex-direction: column;
      text-align: center;
      .up{
        img{
          height: 40px;
          width: 40px;
        }
      }
      .down{
        font-size:12px;
        height:35px;
      }
    }
  }
  .searchButton{
    margin: 5px 2.5%;
  }
    .banner{
    height: 250px;
    background-color: #edebeb;
      img{
        height: 250px;
        width:100%;
      }
  }
  .content{
    margin-left:20px;
    .suggest-list{
      display:flex;
      flex-wrap:wrap;
      .list-item{
        box-shadow:0px .5px 0px .5px rgba(0,0,0,0.1);
        font-size:12px;
        padding:0px 5px;
        display:inline-block;
        height:20px;
        line-height:20px;
        border-radius:10px;
        margin: 2px 5px;
      }
    }
    .suggest-title{
      margin-top:15px;
      font-size:12px;
      color:#959493;
    }
    .rental-duration,.autoSelect{
    margin: 5px 2.5% 5px 0px;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    width: 95%;
    border-bottom:.5px solid rgba(251, 215, 143, 0.3);
    .start-time,.end-time{
      display:flex;
      flex-direction:column;
      .tip{
        font-size:12px;
        color: #959493;
      }
    }
    .text{
      font-size: 12px;
      color: #6d6d6c;
    }
    .r{
      margin-right: 20px;
    }
    .end-time{
      text-align:right;
      margin-right: 20px;
    }
    .stay-time{
      font-size:14px;
      padding-bottom: 3px;
      text-decoration: underline;
    }
  }
  .location{
    line-height: 40px;
    height:40px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    .location-text{
      width: 100px;
      padding-left:7px
    }
    .locate{
      margin-right: 20px;
      display: flex;
      align-items: center;
      .locate-title{
        padding-right:7px;
      }
      .locate-icon{
        height: 20px;
        width: 20px;
        // margin-right:10px;
      }
    }
  }
  }
 
}

</style>
