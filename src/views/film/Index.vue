<template>
  <div class="film">

    <div class="film-header">
    </div>

    <div class="film-card"  >
      <!-- <img alt="" style="width: 100%;height: 100%" :src="film.cover"> -->
      <vs-card style="margin:4px;">
        <template #title>
          <h3>Pot with a plant</h3>
        </template>
        <template #img  >
          <img :src="film.cover" alt="">
        </template>
        
        
      </vs-card>
    </div>

    <div class="film-des">
      <vs-row style="width:100%">
            <!-- <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5" > -->
              <div class="p1" @mouseenter="changeActive_title($event)" @mouseleave="removeActive_title($event)">{{ film.name }}
        
              </div>
            <!-- </vs-col> -->
            <!-- <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5" style="margin-left:10px"> -->
              <!-- <div class="p1">总评分：</div> -->
            <!-- </vs-col> -->
          </vs-row>
        
      
      
      <!-- <div class="animate__pulse" ref="box" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">123123</div> -->
      <div class="p2"  @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">电影类型 : {{ film.type }}</div>
      <div class="p2 " @mouseenter="changeActive($event)" @mouseleave="removeActive($event)" >{{ film.region }}{{ film.duration }}分钟</div>
      <div class="p2"   @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">上映日期 : {{ film.releaseTime }} </div>
      <div style="padding-top: 30px">
        
        <!-- <router-link style="margin-right: 20px" :to="'/film/ticket?fid=' + filmId">
          <el-button type="danger" style="width: 130px;letter-spacing: 2px">
            <i style="padding-right: 5px;font-size: 15px" class="el-icon-s-finance"></i>特惠购票
          </el-button>
        </router-link> -->
        
          <!-- <el-button @click="openComment" type="danger" style="width: 130px;letter-spacing: 2px">
            <i style="padding-right: 5px;font-size: 15px" class="el-icon-star-on"></i>评分
          </el-button> -->
          <!-- <el-button @click="openComment" type="danger" style="width: 170px;letter-spacing: 2px" >
            <i style="padding-right: 5px;font-size: 15px" class="el-icon-star-on"></i>查看推荐电影
          </el-button> -->
          <vs-row style="width:320px">
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5" >
              <vs-button gradient  @click="opendialog" square color="#cc163a" size="large"
                :active="active == 1" 
                >
                  
                  猜你喜欢
                  <template #animate >
                    <i style="font-size: 15px" class="el-icon-moon"></i>
                  </template>
                </vs-button>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5" style="margin-left:10px">
              <vs-button gradient  @click="openComment" square color="#cc163a" size="large"
                :active="active == 1"
                >
                  
                    评分
                </vs-button>
            </vs-col>
          </vs-row>
         
          
          
          
        
        <div class="center">
          
          <vs-dialog overflow-hidden full-screen v-model="active" style="color:black">
            <template #header>
              <h4 class="not-margin">
                可能感兴趣的电影
              </h4>
            </template>

            
            <vs-card-group style="height:590px">
              <div v-for="card in cards" class="eachcard">
                <!-- <router-link :to="'/film/info?fid=' + item.id"> -->
                  <vs-card  @click="handleClick(card)"  type="2" style="margin:5px" >
                <template #title>
                  <h3>{{card.name}}</h3>
                </template>
                <template #img  >
                  <img :src=card.cover alt="" style="height:600px">
                </template>
                <template #text>
                  <p>
                    {{ card.introduction }}
                  </p>
                </template>
                <template #interactions>
                  <vs-button danger icon>
                    <i class='bx bx-heart'></i>
                  </vs-button>
                  <vs-button class="btn-chat" shadow primary>
                    <i class='bx bx-chat' ></i>
                    <span class="span">
                      {{ card.rate }}
                    </span>
                  </vs-button>
                </template>
                
                  </vs-card>
                <!-- </router-link> -->
              </div>
              
            </vs-card-group>

            <!-- <template #footer>
              <div class="footer-dialog">
                <vs-button block>
                  Sign In
                </vs-button>

                <div class="new">
                  New Here? <a href="#">Create New Account</a>
                </div>
              </div>
            </template> -->
            <!-- <div>
              <Login2/>
            </div> -->
            
          </vs-dialog>
        </div>



      </div>
    </div>

    <div class="film-content">
      <router-view :key="$route.fullPath"/>
    </div>

    <el-dialog
        :show-close=false
        title="电影评价"
        :visible.sync="dialogVisible"
        width="30%">
      <div class="block">
        
        <el-rate
            v-model="form.star"
            :colors="colors">
        </el-rate>
      </div>
      <el-input
          style="margin-top: 40px"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="form.comment">
      </el-input>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitComment">确 认 提 交</el-button>
             </span>
    </el-dialog>

  </div>
</template>

<script>
import {AddFilmEvaluate, FindFilmById, FindFilmEvaluateByFId,Getsame,Getsame_list} from "@/api/film";
import Login2 from "@/components/layout/Login2";
export default {

  name: "Film",
  components:{
    Login2
  },
  data() {
    return {
      

      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      filmId: this.$route.query.fid,
      value: 4.5,                             //评分是写死的
      list: [{}, {}, {}],
      dialogVisible: false,
      film: {},
      evaluateList: [],
      form: {
        fid: '',
        uid: '',
        star: 5,
        comment: '',
        
      },
      cart:'',



      active: false,
      input1: '',
      input2: '',
      checkbox1: false,

      cards:[
        {
          id:236269,
          name:"原谅他77次",
          rate:"6.5",
          introduction:"影片以一对相爱九年情侣因小事分手为起点展开，周柏豪饰演的男主角无意中发现了女主角蔡卓妍留下的一本“心碎日记”，才发现长久以来一直忽视了身边爱人的种种感受。知错的男主角全力挽回，可是面对种种心碎过往，女主角还会不会原谅他第78次？",
          cover:"http://img5.mtime.cn/mt/2017/06/20/141106.47547702_1280X720X2.jpg"
        },
        {
          id:271882,
          name:"满江红",
          rate:"7.5",
          introduction:"南宋绍兴年间，岳飞死后四年，秦桧率兵与金国会谈。会谈前夜，金国使者死在宰相驻地，所携密信也不翼而飞。小兵张大（沈腾 饰）与亲兵营副统领孙均（易烊千玺 饰）机缘巧合被裹挟进这巨大阴谋之中，宰相秦桧（雷佳音 饰）命两人限一个时辰之内找到凶手。伴随危机四伏的深入调查，宰相府总管何立（张译 饰）、副总管武义淳（岳云鹏 饰）、舞姬瑶琴（王佳怡 饰）等人卷入局中，案件的背后似乎隐藏着一场更大的阴谋。局中有局、人心叵测，一夜之间风云变幻，各方势力暗流涌动……",
          cover:"http://img5.mtime.cn/mt/2023/01/14/113221.72316232_1280X720X2.jpg"
        },
        {
          id:228990,
          name:"春娇救志明",
          rate:"6.9",
          introduction:"影片主要讲述春娇与志明的婚后生活以及和父母的沟通问题等等，一家人在一起生活出现了很多矛盾和笑话的故事。",
          cover:"http://img5.mtime.cn/mt/2017/04/27/102449.96037959_1280X720X2.jpg"
        },
        {
          id:11655,
          name:"爱在黎明破晓前",
          rate:"8.2",
          introduction:"美国青年杰西在开往维也纳的火车上，认识了法国女学生塞利娜，两人一见钟情。火车到达维也纳，杰西说服了塞利娜一同下车，这样他们一边游览城市一边攀谈，加深了互相了解。他们去了无名坟地，去了普拉特的公共游乐场，他们一起乘坐转轮。日落时分，他们第一次拥抱、接吻。在一家夜总会，杰西和塞利娜一边玩弹球游戏一边谈了过去他们的社会关系和往来。他们又假装向最好的朋友打电话，以测验他们两人相互间的感情有多深。他们决定今后不再见面仅仅在一起渡过一个愉快的夜晚。这对恋人来到公园，对着一轮明月将酒一饮而尽，他们决定半年之后在同一个约会地点见面。塞利娜独自一人上火车，很快就进入了梦乡。",
          cover:"http://img31.mtime.cn/mt/2015/01/26/141827.42841057_1280X720X2.jpg"
        },
        {
          id:10957,
          name:"剪刀手爱德华",
          rate:"8.4",
          introduction:"一个类似科学怪人的发明家制造了机器人爱德华（约翰尼·德普 饰），爱德华具备人类的一切肉体和精神功能，但发明家还没来得及为爱德华装上双手就去世了，只留下一双异于常人的剪刀手。孤独的爱德华隐居在远离人群的神秘古堡之内，不敢面对正常的人类。化妆品推销员佩格（黛安娜·维斯特 饰）发现了这个少年，出于对爱德华处境的同情，把他带回了家。爱德华很快以灵巧异常的剪刀手和温和的性格博得了人们的欢迎。他能用剪刀手修剪植物、剪出奇妙的发型。派格的女儿金（薇诺娜·瑞德 饰）也逐渐爱上了爱德华，但这却给爱德华带来了痛苦——他甚至不能拥抱自己所爱的人，他恨自己的双手。同时人类社会意想不到的种种麻烦也纷至沓来，令爱德华开始迷惑惶恐。",
          cover:"http://img31.mtime.cn/mt/2013/02/04/002655.71225669_1280X720X2.jpg"
        },
        {
          id:157224,
          name:"超凡蜘蛛侠2",
          rate:"7.5",
          introduction:"彼得·帕克（安德鲁·加菲尔德饰）依然很忙，而格温（艾玛·斯通饰）毕业后考虑去牛津大学继续深造。“电光人”（杰米·福克斯饰）出现后，生活更不得安宁。老朋友哈利·奥斯本（戴恩·德哈恩饰）回归，帕克发现了关于自己身世的新线索。",
          cover:"http://img31.mtime.cn/mt/2014/05/16/164743.97501646_1280X720X2.jpg"
        },
        {
          id:196613,
          name:"速度与激情7",
          rate:"8.3",
          introduction:"《速7》的故事将在多米尼克的团队和大反派德伊恩·肖之间展开。多米尼克和他的挚友们结束上一部影片中和大反派欧文·肖在伦敦的战斗之后，回到美国，过上了向往已久的平静生活。但他们在伦敦结下的梁子很快打破了这种平静。欧文·肖的哥哥伊恩·肖以不择手段、心狠手辣闻名，为了替弟弟复仇，他誓要与多米尼克家族一决高下。",
          cover:"http://img5.mtime.cn/mt/2021/01/12/095200.60210567_1280X720X2.jpg"
        },
        {
          id:12142,
          name:"无间道",
          rate:"8.5",
          introduction:"佛经里说，无间是八大地狱之中最痛苦的一个。两个身份都本不该属于自己的人，他们如同生活一个无间地狱当中，做梦都怕别人拆穿自己的身份。这个世界里，角色的茫然成了探讨的根源：到底什么才是生活的道理、做人的道理？无间地狱没有轮回，只有永远受苦，但片中两位主角却不甘于此。两个身份混乱的男人，他们分别是警方和黑社会的卧底。现在他们决心要离开这个不辨是非的处境，离开无间地狱，寻回自己。刘健明（刘德华 饰）是香港黑帮三合会的会员，10多年前，他听从老大韩琛（曾志伟 饰）的吩咐，加入香港警察，做黑社会卧底。在韩琛的帮助下，健明在七年后有望晋升为见习督察，这官可不小！而陈永仁（梁朝伟 饰）本来想当个好警察，但被警察训练学校强行退学，秘密执行渗透进三和会的卧底工作。现在已经是帮会里的红人，而他的老大恰恰就是韩琛。一宗毒品交易，黑白两道的行动均告失败。暴漏了双方都有卧底潜伏的事实，陈永仁和刘健明也将面临一场生死考验。",
          cover:"http://img31.mtime.cn/mt/2014/02/22/230340.66768202_1280X720X2.jpg"
        },
        {
          id:219784,
          name:"爱乐之城",
          rate:"8.0",
          introduction:"《爱乐之城》讲述了一段发生在洛杉矶的爱情故事，两位主人公米娅（艾玛·斯通饰）和塞巴斯汀（瑞恩·高斯林饰）在遇到爱情之前一直追寻着看似不可能实现的梦想，米娅希望可以完成一次不被打断的试镜能够顺利成为演员，塞巴斯汀对传统爵士乐情有独钟，渴望开一家爵士乐餐厅。充满未知的洛杉矶让他们意外相遇，两人因缘而遇互相吸引，随后互生情愫陷入热恋。《爱乐之城》凝聚着导演查泽雷复兴歌舞片的野心，艾玛·斯通与瑞恩·高斯林将他们“不完美”的好莱坞梦想倾注在电影中，演绎了一段必将成为经典的洛杉矶爱情故事。",
          cover:"http://img5.mtime.cn/mt/2017/02/08/093237.40835159_1280X720X2.jpg"
        }

      ]
    }
  },

  methods: {


    open(card){
      // console.log(321)
    },
    changeActive(e) {
        // console.log(e);
        // e.currentTarget.className = 'active';
        // console.log(e.currentTarget.className)
        // this.$refs.box.className = 'box animate__animated animate__pulse ';
        e.currentTarget.className = 'box animate__animated animate__pulse ';
        // console.log("鼠标移入了");
    },
    removeActive(e) {
        // e.currentTarget.className = '';
        // console.log(e.currentTarget.className)
        // this.$refs.box.className = 'p2';
        e.currentTarget.className = 'p2';
        // console.log("鼠标移出了");
    },

    changeActive_title(e) {
        // console.log(e);
        // e.currentTarget.className = 'active';
        // console.log(e.currentTarget.className)
        // this.$refs.box.className = 'box animate__animated animate__pulse ';
        e.currentTarget.className = 'box animate__animated animate__pulse p1 ';
        // console.log("鼠标移入了");
    },
    removeActive_title(e) {
        // e.currentTarget.className = '';
        // console.log(e.currentTarget.className)
        // this.$refs.box.className = 'p2';
        e.currentTarget.className = 'p1';
        // console.log("鼠标移出了");
    },
    


    changecss(){
      var q= document.getElementsByClassName('vs-card__img')
      // console.log(q.length)
      for(let i = 0 ;i < q.length;i++){
        q[i].style.maxHeight = "600px"
      }
      
      var z= document.getElementsByClassName('eachcard')
      // console.log(z.length)
      for(let i = 0 ;i < z.length;i++){
        z[i].style.maxHeight = "610px"
      }
    },
    handleClick(card){
      // console.log(card.rate)
      this.$router.push('/film/info?fid=' + card.id)
      this.$router.go(0)
    },
    opendialog(){
      
      this.active=!this.active
      this.$nextTick(() => {//nextTick，不一定要用在onMounted里
        this.changecss();
      });


    },





    openComment() {
      if (!localStorage.getItem("uid")) {
        this.$confirm('系统还没有检测到您的登陆信息, 是否去登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push("/login")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消为电影评分'
          });
        });
      } else {
        this.dialogVisible = true
      }
    },

    submitComment() {
      this.form.fid = this.filmId;
      this.form.uid = localStorage.getItem("uid");
      const form = this.form
      AddFilmEvaluate(form).then(res => {
        this.dialogVisible = false;
      })
      this.$router.go(0)
    },

  },

  mounted() {
    // this.$router.go(0)
    
    FindFilmById(this.filmId).then(res => {
      this.film = res.data;
    }),
    Getsame(this.filmId).then(res =>{
      // console.log(this.filmId)
      // console.log(res)
      // console.log(res.data.sameMovieName)
      
      // setTimeout("alert('对不起, 要你久候')", 3000 )
      this.$store.movie_same = res.data.sameMovieName
      // console.log(this.$store.movie_same)
    }),
    Getsame_list(this.filmId).then(res =>{
      this.cards = res.data
    })
    
    this.changecss()
  }
}
</script>

<style scoped>

.vs-card__group .vs-card__group-cards{
  height: 600px;
}


.box.animate__animated.animate__pulse {
  font-size: 14px;
  padding-top: 20px;
  letter-spacing: 2px;
  color: #FFFFFF;
}

.box.animate__animated.animate__pulse.p1{
  font-weight: bolder;
  letter-spacing: 3px;
  color: #FFFFFF;
  font-size: 30px;
  padding-top: 20px;
  padding-bottom: 10px;
}



.eachcard{
  height: 655px;
  width: 360px;
  background:#e2e1e4;
  margin-left: 10px;
}

.film-header {
  position: relative;
  width: 100%;
  height: 380px;
  background: #5a84fd;
  margin-top: 12px;
}

.film-content {
  padding: 80px 200px;
  letter-spacing: 2px;
}

.p1 {
  font-weight: bolder;
  letter-spacing: 3px;
  color: #FFFFFF;
  font-size: 30px;
  padding-top: 20px;
  padding-bottom: 10px;
}

.p2 {
  font-size: 14px;
  padding-top: 20px;
  letter-spacing: 2px;
  color: #FFFFFF;
}

.film-card {
  width: 240px;
  height: 350.85px;
  background: #e2e1e4;
  margin-right: 50px;
  margin-left: 190px;
  margin-bottom: 20px;
  position: absolute;
  overflow: hidden;
  top: 160px;
  z-index: 999;
}

.film-des {
  margin-left: 500px;
  position: absolute;
  overflow: hidden;
  top: 150px;
  z-index: 999;
}

 .el-rate__icon {
  font-size: 25px;
}

 .el-rate__text {
  padding-left: 8px;
  font-size: 30px;
}













</style>
