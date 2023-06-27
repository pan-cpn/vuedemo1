<template>
    <div class="content1">
      <div class="picture">
        <img :src="houseData.data.image.url"  alt="">
      </div>
      <div class="text">
        <span>{{houseData.data.summaryText}}</span>
        <span class="houseName">{{houseData.data.houseName}}</span>
        <span>
          <van-rate v-model="getScore" />
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
      const getScore = computed(() => {
        return Number(props.houseData.data.commentScore)
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
  .content1{
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    .picture{
        img{
            border-radius: 5px;
            width: 100%;
            height: 50%;
        }
    }
    .text{
        display:flex;
        flex-direction:column;
        .houseName{
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /* 超出几行省略 */
            overflow: hidden;

      }
        span{
            .oldPrice{
                color:#ccc;
                text-decoration: line-through;
            }
        }
    
    }
  }
  </style>
  