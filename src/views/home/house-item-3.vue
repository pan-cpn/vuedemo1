<template>
  <div class="content2">
    <div class="picture">
      <img :src="houseData.data.image.url"  alt="">
    </div>
    <div class="text">
      <span>{{houseData.data.summaryText}}</span>
      <span class="houseName">{{houseData.data.houseName}}</span>
      <span>
        <van-rate v-model="houseData.data.commentSocre" />
        <span class="newPrice">￥{{houseData.data.finalPrice}}</span>
        <span class="oldPrice">￥{{houseData.data.productPrice}}</span>
      </span>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'

/* eslint-disable */ 
export default {
  name: '',
  props:{
    houseData:{
      default:() => ({}),
      type: Object
    }
  },
  setup(props,context){
    const getScore = computed((score) => {
      return score * 1
    })
    return {
      getScore
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.content2{
    display: flex;
    flex-direction: column;
    position: relative;
    .picture{
        img{
          border-radius: 5px;
          width: 100%;
          height: 100%;
        }
    }
    .text{
      display:flex;
      flex-direction: column;
      color:white;
      position:absolute;
      bottom: 23px;
      left: 3px;
      .houseName{
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /* 超出几行省略 */
            overflow: hidden;
      }
      .oldPrice{
                color:#ccc;
                text-decoration: line-through;
            }
    }
  }
</style>
