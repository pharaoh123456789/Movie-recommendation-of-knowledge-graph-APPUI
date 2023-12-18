<template>
  <div class="films">
    <div class="tags-panel">
      <ul class="tags-lines">
        <li class="tags-line">
          <div class="tags-title">类型 :</div>
          <ul class="tags">
            <li v-for="item in typeList" :class="selectType===item ? 'active' : ''" @click="handleTypeSelect(item)">
              <router-link :to=" '/films?region='+ selectRegion + '&type=' + item ">{{ item }}</router-link>
            </li>
          </ul>
        </li>
        <li class="tags-line">
          <div class="tags-title">地区 :</div>
          <ul class="tags">
            <li v-for="item in regionList" :class="selectRegion===item ? 'active' : ''"
                @click="handleRegionSelect(item)">
              <router-link :to=" '/films?region='+ item + '&type=' + selectType ">{{ item }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <el-row :gutter="20" style="padding-top: 60px;">
        <el-col style="padding-bottom: 40px;text-align: center;" v-for="(item, index) in filmList" :key="index"
                :span="4">
          <router-link :to=" '/film/info?fid=' + item.id">
            <!-- <el-card shadow="hover" style="padding: 0">
              <img style="width: 100%; height: 300px;padding-bottom: 10px" :src="item.cover"
                   alt="">
              <span class="s">{{ item.name }}</span>
            </el-card> -->

            <vs-card style="margin:4px;" type="4">
                      <!-- <template #title>
                        <h3 style="width:100%">{{ item.name }}</h3>
                      </template> -->
              <template #img  >
                <img :src="item.cover" alt="" style="height:280px;width:140px">
              </template>
              <template #text>
                <h1 >
                  {{ item.name }}
                </h1>
              </template>
              <template #interactions>
                <vs-button class="btn-chat" shadow primary>
                  <i class='el-icon-star-on' ></i>
                    <span class="span">
                      {{item.rate}}
                    </span>
                </vs-button>
                <!-- <p ></p> -->
              </template>
              
            </vs-card>
          </router-link>
        </el-col>
      </el-row>
      <div class="center">
        <vs-pagination v-model="page" :length="pagesize" />
        
      </div>
    </div>
  </div>
</template>

<script>

import {FindFilmByRegionAndType, ListAllFilm,ListsomeFilm} from "@/api/film";

export default {

  name: "Films",

  data() {
    return {
      selectType: '全部',
      selectRegion: '全部',
      typeList: ["全部", "剧情","喜剧","短片","爱情","纪录片","动作","惊悚","恐怖","动画","犯罪","冒险","家庭","悬疑","奇幻","科幻","战争","传记","音乐","历史","歌舞","西部","运动","古装","戏曲","黑色","电影","儿童","新闻","真人秀","成人","脱口秀","游戏秀","情色","文艺","同性","青春","灾难","女性","励志"],
      regionList: ["全部", "美国", "中国", "日本", "法国", "英国", "中国香港", "意大利", "德国", "韩国", "加拿大", "西班牙", "中国台湾","印度","西德","澳大利亚","苏联","比利时","瑞士","瑞典","俄罗斯","墨西哥","波兰","丹麦","荷兰","巴西","奥地利","泰国"],
      filmList: [],
      page:1,
      pagesize:1
    }
  },

  mounted() {
    // ListAllFilm().then(res => {
    //   this.filmList = res.data
    // })
    ListsomeFilm(1,18).then(res => {
      this.filmList = res.data
      // console.log(this.filmList[0].hot)
      this.pagesize=Math.ceil(this.filmList[0].hot/18)
      // this.changecss();
    })
  },


  methods: {

    changecss(){
      var q= document.getElementsByClassName('vs-card__img')
      // console.log(q.length)
      for(let i = 0 ;i < q.length;i++){
        q[i].style.maxHeight = "500px"
      }
      var p= document.getElementsByClassName('vs-card__text')
      // console.log(p.length)
      for(let i = 0 ;i < p.length;i++){
        p[i].style.width = "100%"
        
      }
      // var z= document.getElementsByClassName('eachcard')
      // console.log(z.length)
      // for(let i = 0 ;i < z.length;i++){
      //   z[i].style.maxHeight = "510px"
      // }
    },

    handleTypeSelect(item) {
      this.selectType = item;
      console.log(this.selectType)
      this.reloadFilmList()
    },

    handleRegionSelect(item) {
      this.selectRegion = item;
      console.log(this.selectRegion)
      this.reloadFilmList()
    },

    reloadFilmList() {
      FindFilmByRegionAndType(this.selectRegion, this.selectType,1,18).then(res => {
        this.filmList = res.data
        // console.log(this.filmList[0].hot)
        this.pagesize=Math.ceil(this.filmList[0].hot/18)
      })
    },

  },
  watch:{
    filmList:{
      handler(newval,oldval){
        // console.log(oldval)
        // console.log(newval)
          this.$nextTick(function(){
          this.changecss()
        })
        // console.log(filmList.length)
      },
      deep:true
    },
    page:{
      handler(newval,oldval){
        // console.log(oldval)
        // console.log(newval)
        FindFilmByRegionAndType(this.selectRegion, this.selectType,newval,18).then(res => {
          this.filmList = res.data
          // console.log(this.filmList[0].hot)
          this.pagesize=Math.ceil(this.filmList[0].hot/18)
          // this.changecss();
        })
      },
      deep:true
    }
    
  },

}
</script>

<style scoped>
@import "../assets/css/movie-list.css";

.films {
  padding: 20px 220px;
}

 .el-card__body {
  padding: 0 0 10px;
}

.s {
  margin-bottom: 10px;
  padding: 0 8px;
  letter-spacing: 1px;
  color: coral;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
