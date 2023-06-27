<template>
  <div class="city">
    <form action="/">
        <van-search
            v-model="value"
            show-action
            shape="round"
            placeholder="搜索你想要的城市"
            @search="onSearch"
            @cancel="onCancel"
        />
    </form>
    <div class="city-items">
    <van-tabs v-model:active="targetActive" color="#e37b0b" title-active-color="#e37b0b">
        <van-tab v-for="(item,index) in allCities" :title="item.title" :name="index" :key="index"></van-tab>
    </van-tabs>
    <div class="hot-cities">
      <div class="hot-cities-title">热门城市</div>
      <div class="hot-cities_box">
          <span class="city-item" v-for="(item,index) in currentGroup?.hotCities" :key="index" @click="getCity(item)">{{item.cityName}}</span>
      </div>
    </div>
    <div class="content">
      <van-index-bar :sticky="false">
        <template v-for="(items,index) in currentGroup?.cities" :key="index">
          <van-index-anchor :index="items.group">{{items.group}}</van-index-anchor>
          <template v-for="(city,key) in  items.cities">
            <van-cell :title="city.cityName"  index="key" @click="getCity(city)" />
          </template>
        </template>
      </van-index-bar>
    </div>
   </div>
  </div>
</template>

<script>

import { ref,computed } from 'vue';
import {storeToRefs} from 'pinia';
import { showToast } from 'vant';
import {useRouter} from 'vue-router';
import cityStore from '@/store/city.js';

/* eslint-disable */ 
export default {
  name: '',
  props:{},
  setup(props,context){
    const value = ref('');
    const targetActive = ref(0);
    const city_store = cityStore();
    const router = new useRouter();
    const onSearch = (val) => showToast(val);
    city_store.getAllCities();
    const {allCities} = storeToRefs(city_store);

    //allCities结构出来并不是响应式的，必须使用计算属性包裹
    const currentGroup = computed(() => allCities.value[targetActive.value])
    const onCancel = () => {
        router.back();
    };
    const getCity = function(name){
      city_store.currentCity = name;
      router.back();
    }
  
    return {
        value,
        targetActive,
        onSearch,
        onCancel,
        allCities,
        currentGroup,
        getCity
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.hot-cities{
  margin-top:10px;
  .hot-cities-title{
    padding-left:20px;
    // color:#e37b0b;
    font-weight:550;
  }
.hot-cities_box{
  font-size: 12px;
  display:flex;
  flex-wrap: wrap;
  padding:10px 15px;

  .city-item{
    text-align: center;
    line-height: 23px;
    width: 50px;
    height: 23px;
    background-color: white;
    box-shadow:0px .5px 0px .5px rgba(0,0,0,0.1);
    border-radius: 15px;
    color:#e37b0b;
    margin:3px 8px;
  }
}
}
.content{
  margin-top:10px;
}
</style>
