<template>
   
 <div class="app">
   <router-view></router-view>
   <div class="control">
      <van-tabbar v-model="currentIndex" active-color="#966713" inactive-color="#9f9fa0" >
      <van-tabbar-item  v-for="(item,index) in tarbarData" :to="item.path">
         <span>{{ item.text }}</span>
         <template #icon>
            <img v-if="currentIndex === index" :src="getAssetURL(item.imageActive)" />
            <img v-else :src="getAssetURL(item.image)" />
         </template>
      </van-tabbar-item>
   </van-tabbar>
   </div>

 </div>
</template>

<script setup>

import tarbarData from '@/assets/data/tarbar.js'; 
import {getAssetURL} from '@/utils/index.js';
import { ref ,watch} from 'vue';
import {useRouter} from 'vue-router';

const route = new useRouter();
const currentIndex = ref(0);
watch(route,(newRoute) => {
   const index = tarbarData.findIndex(item => item.path === newRoute.path);
   currentIndex.value = index;
})


</script>

<style lang="less" scoped>

</style>
