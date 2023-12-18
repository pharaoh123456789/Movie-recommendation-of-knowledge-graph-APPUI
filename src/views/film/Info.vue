<template>
  <div>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>

    


  


    <div style="font-weight: bolder;font-size: 25px;padding-top: 40px;padding-bottom: 40px">剧情简介</div>
    <div style="line-height: 30px;text-indent:2.5em;padding-top: 20px;padding-bottom: 20px"> {{film.introduction}}
    </div>
    <div style="font-weight: bolder;font-size: 25px;padding-top: 40px;padding-bottom: 40px">电影评论</div>
    <div style="padding-right: 100px">
      <div class="item" v-for="item in evaluateList">
        <img alt="" style="float: left;width: 55px;height: 55px;border-radius: 50%" :src="item.user.avatar">
        <div class="header-name">
          <div v-if="item.user.nickname===null" style="font-weight: 400;color: darkgrey; padding-left: 5px;">匿名用户</div>
          <div v-if="item.user.nickname!==null" style="font-weight: 400;color: darkgrey; padding-left: 5px;">
            {{ item.user.nickname }}
          </div>
          <el-rate
              style="padding-top: 7px"
              v-model="item.filmEvaluate.star"
              disabled
              text-color="#ff9900"
              score-template="{value}">
          </el-rate>
        </div>
        <div
            style="text-indent:2.5em;line-height: 28px;padding-left: 70px;padding-top: 80px;padding-bottom: 20px;color: #91949c">
          {{ item.filmEvaluate.comment }}
        </div>
        <i style="float: right;padding-right: 18px;color: #91949c">Time : {{ item.filmEvaluate.createAt }}</i>
      </div>
    <div style="font-weight: bolder;font-size: 25px;padding-top: 40px;padding-bottom: 40px">相似电影的知识图谱（可以任意放大缩小并拖动图谱）</div>
    
    </div>
    <div style="padding-right: 100px"><Login2 v-model="samemovie_list" v-if="initSuccess"/></div>
    
  </div>
</template>

<script>
import {FindFilmById, FindFilmEvaluateByFId,Getsame} from "@/api/film";
import Login2 from "@/components/layout/Login2";

export default {
  name: "Info",
  components:{
    Login2
  },
  data() {
    return {
      samemovie_list:'12313',
      film: {},
      evaluateList: [],
      filmId: this.$route.query.fid,

      aaaaaaa:{},
      myStyle:{},
      initSuccess:false
    }
  },

  methods: {
    changecss(){
      var p= document.getElementsByClassName('vs-card__img')
      // console.log(p.length)
      for(let i = 0 ;i < p.length;i++){
        p[i].style.maxHeight = "600px"
      }
      
    },
    goBack() {
      
      this.$router.go(-1)
      
      // this.$router.push('/film/info?fid=' + item.id)
    }
  },

  mounted() {
    // this.$router.go(0)
    this.samemovie_list=121333333333
    FindFilmById(this.filmId).then(res => {
      this.film = res.data;
    });
    Getsame(this.filmId).then(res =>{
      // console.log(res.data.sameMovieName)
      this.samemovie_list = res.data
      this.initSuccess = true
      // console.log(this.samemovie_list)
    })
    FindFilmEvaluateByFId(this.filmId).then(res => {
      this.evaluateList = res.data;
    });
    this.changecss()
  }
}
</script>

<style scoped>

.aaaaaaa{
  color: red;
}

.vs-card{

  height: 500px;
}

.item {
  padding-bottom: 40px;
}

.header-name {
  color: #000000;
  padding-top: 5px;
  float: left;
  padding-left: 20px;
  font-weight: bolder;
  font-size: 14px;
  letter-spacing: 2px;
}

.film-content {
  padding: 80px 200px;
  letter-spacing: 2px;
}


.el-rate__icon {
  font-size: 25px;
}

 .el-rate__text {
  padding-left: 8px;
  font-size: 30px;
}

</style>