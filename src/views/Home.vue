<template>
  <div class="app" 
  
         ref="scrollView"
         id="scroll-view"
         
  >
    
    <el-carousel height="500px" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in posterList" :key="index">
        <img alt=""
             :src="item.url"
             style="width: 100%;height: 500px">
      </el-carousel-item>
    </el-carousel>

    <div class="as">
      
      <div style="padding-top: 40px" class="most-expect-wrapper">
        <div class="panel">
          <div class="panel-header">
            <span class="panel-more">
              <span class="panel-arrow panel-arrow-orange"></span>
            </span>
            <span class="panel-title">
              <span class="textcolor_orange">热门榜单Top10</span>
            </span>
          </div>
          <div class="panel-content">
            <ul class="ranking-wrapper ranking-mostExpect">
              <li class="ranking-item ranking-top ranking-index-1">
                <router-link :to="'/film/info?fid=' + top1.id" target="_blank">
                  <vs-card type="3">
                    <template #title>
                      <h3 class="ranking-top-moive-name">{{ top1.name }}</h3>
                    </template>
                    <template #img>
                      <img class="ranking-img  default-img" :alt="top1.name" :src="top1.cover">
                    </template>
                    <template #text>
                      

                      <p class="ranking-release-time">上映时间：{{ top1.releaseTime }}</p>

                      <p class="ranking-top-wish">
                        <span class="stonefont">评分值: </span>{{ top1.rate }}
                      </p>
                    </template>
                    <template #interactions>
                      <vs-button danger icon size="large">
                        <i class="ranking-top-icon"></i>
                      </vs-button>
                      <!-- <vs-button class="btn-chat" shadow primary>
                        <i class='bx bx-chat' ></i>
                        <span class="span">
                          54
                        </span>
                      </vs-button> -->
                    </template>
                  </vs-card>

                  <!-- <div class="ranking-top-left">
                    <i class="ranking-top-icon"></i>
                    <img class="ranking-img  default-img" :alt="top1.name" :src="top1.cover">
                  </div>
                  <div class="ranking-top-right">
                    <div class="ranking-top-right-main">
                      <span class="ranking-top-moive-name">{{ top1.name }}</span>

                      <p class="ranking-release-time">上映时间：{{ top1.releaseTime }}</p>

                      <p class="ranking-top-wish">
                        <span class="stonefont">热度值: </span>{{ top1.hot }}
                      </p>
                    </div>
                  </div> -->
                </router-link>
              </li>

              <li class="ranking-item ranking-index-2">
                <router-link :to="'/film/info?fid=' + top2.id" target="_blank">
                  <i class="ranking-index">2</i>
                  <span class="img-link">
                    <img style="height: 180px" class="ranking-img default-img" :alt="top2.name" :src="top2.cover"></span>
                  <div class="name-link ranking-movie-name">{{ top2.name }}</div>
                  <span class="ranking-num-info"><span class="stonefont">评分值: </span>{{ top2.rate }}</span>
                </router-link>
              </li>

              <li class="ranking-item ranking-index-3">
                <router-link :to="'/film/info?fid=' + top3.id" target="_blank">
                  <i class="ranking-index">3</i>
                  <span class="img-link">
                    <img style="height: 180px" class="ranking-img default-img" :alt="top3.name" :src="top3.cover"></span>
                  <div class="name-link ranking-movie-name">{{ top3.name }}</div>
                  <span class="ranking-num-info"><span class="stonefont">评分值: </span>{{ top3.rate }}</span>
                </router-link>
              </li>

              <li v-for="(item, index) in topList" :key="index" class="ranking-item ranking-index-4">
                <router-link :to="'/film/info?fid=' + item.id" target="_blank">
                  <span class="normal-link">
                    <i class="ranking-index">{{ index + 4 }}</i>
                    <span class="ranking-movie-name">{{ item.name }}</span>
                    <span class="ranking-num-info"><span class="stonefont">评分值: </span>{{ item.rate }}</span>
                  </span>
                </router-link>
              </li>

            </ul>
          </div>
        </div>
      </div>

    </div>

    <div class="main" >
      <div class="movie-grid">
        <div class="panel" >
          <div class="panel-header">
            <span class="panel-title">
              <span class="textcolor_orange">电影列表  ( {{ filmsize }} )</span>
            </span>
          </div>
          <div class="panel-content" >
            <dl class="movie-list" ref="content">
              <dd v-for="item in filmList" >
                <router-link :to="'/film/info?fid=' + item.id">
                  <div class=""  >
                    <!-- <img alt="" style="width: 100%;height: 100%" :src="film.cover"> -->
                    <vs-card style="margin:4px;" type="4">
                      <!-- <template #title>
                        <h3 style="width:100%">{{ item.name }}</h3>
                      </template> -->
                      <template #img  >
                        <img :src="item.cover" alt="" style="height:280px;width:140px">
                      </template>
                      <template #text>
                        <h2 >
                          {{ item.name }}
                        </h2>
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
                          <!-- <div class="movie-overlay movie-overlay-bg">
                              <div class="movie-info">
                                <div class="movie-title" title="">{{ item.name }}</div>
                              </div>
                            </div> -->
                  </div>






                  <!-- <div class="movie-item">
                    <div class="movie-poster">
                      <img class="poster-default" alt=""
                           :src="item.cover">
                      <img class="movie-poster-img" alt="不要先生与好的女士海报封面"
                           :src="item.cover">
                      <div class="movie-overlay movie-overlay-bg">
                        <div class="movie-info">
                          <div class="movie-title" title="">{{ item.name }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="movie-detail movie-wish"><span class="stonefont">123</span>人想看</div>
                    <div class="movie-ver"></div>
                  </div>
                  <div class="movie-detail movie-rt">{{ item.releaseTime }} 上映</div> -->
                </router-link>



                
              </dd>
            </dl>
          </div>
          <div class="center">
            <vs-pagination v-model="page" :length="pagesize" />
            
          </div>
        </div>
      </div>
    </div>
    

  </div>


  

</template>


<script>
import Login2 from "@/components/layout/Login2";
import {ListAllFilm, ListAllPoster, ListHots,ListsomeFilm} from "@/api/film";
export default {
  components:{
    Login2
  },
  data() {
    return {
      top1: {},
      top2: {},
      top3: {},
      topList: [],
      filmList: [],
      posterList: [],
      count:0,
      page: 1,
      pagesize:1,
      filmsize:0
    }
  },

  mounted() {
    // this.changecss();


    //滚动有关
    
   


    // ListsomeFilm(Math.round(Math.random()*100),12).then(res => {
    //   this.filmList = res.data
    //   // this.changecss();
    // })
    ListsomeFilm(1,12).then(res => {
      this.filmList = res.data
      this.pagesize = Math.ceil(this.filmList[0].hot/12)
      this.filmsize = this.filmList[0].hot
      // this.changecss();
    })




    // ListAllFilm().then(res => {
    //   this.filmList = res.data
    // })
    ListAllPoster().then(res => {
      this.posterList = res.data
    })
    ListHots().then(res => {
      this.topList = res.data
      this.top1 = this.topList[0]
      this.top2 = this.topList[1]
      this.top3 = this.topList[2]
      this.topList.splice(0, 3)
    })
    this.openloading()
    // this.$nextTick(() => {
    //     this.changecss();
    // })
  },
  
  methods:{
    changepage(){
      // console.log(this.page)
    },


    openloading() {
      const loading = this.$vs.loading({
        target: this.$refs.content,
        color: 'dark'
      })
      setTimeout(() => {
        loading.close()
      }, 3000)
    },


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
    


    load () {
        this.count += 2
        // console.log(this.count)
    }
    // handleScroll(e) {
    //   const {scrollTop, clientHeight, scrollHeight} = e.target
    //   // console.log(scrollTop, clientHeight, scrollHeight)
    //   if (scrollTop + clientHeight === scrollHeight){
    //     alert('滚动到底部啦')
    //   }
    // }

  },
  watch:{
    filmList:{
      handler(newval,oldval){
        console.log(oldval)
        console.log(newval)
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
        ListsomeFilm(newval,12).then(res => {
          this.filmList = res.data
          // this.changecss();
        })
      },
      deep:true
    }
    
  },
  
}
</script>

<style scoped>
@import "../assets/css/home.css";

.app {
  padding: 50px 120px;
  height: 500px;
}

.as {
  float: right;
}

.main {
  float: left;
  padding-top: 40px;
}
.movie-title{
  /* margin-bottom: 5px; */
  color: blue;
  background-color: white;
  height: 30px;
}
</style>