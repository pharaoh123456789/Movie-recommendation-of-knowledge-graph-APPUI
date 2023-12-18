<template>
  <el-container>
    <el-header style="padding: 0">
      <Header/>
    </el-header>
    <el-main style="padding: 0" >
      <router-view :key="$route.fullPath"/>
    </el-main>
    <el-footer style="padding: 0">
      <Footer/>
      <!-- <Login2/> -->
    </el-footer>

  </el-container>
</template>

<script>
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Login2 from "@/components/layout/Login2";
// import Login2 from "./Login2.vue";

export default {
  name: "Layout",
  components: { Footer, Header, Login2, Login2 },
}
</script>

<style scoped>
.el-main {
  overflow: auto;
}
</style>
