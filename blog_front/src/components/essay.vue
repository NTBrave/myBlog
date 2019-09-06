<template>
  <div id="content-essay">
    <div class="essay_wrap" v-for="(item,index) in essayList" :key="index" @click="essayDetail( item._id )">
    
        <div>{{item.title}}</div>
        <div class="essay_info">
          <span class="essay_info_date">发表于：{{ item.date }}</span>
          <div class="essay_info_label">
            标签：
            <span v-if="item.labels.length === 0">未分类</span>
            <el-tag
              v-else
              class="tag_margin"
              type="primary"
              v-for="(tag,index) in item.labels"
              :key="index"
            >{{ tag }}</el-tag>
          </div>
        </div>
        <div class="essay_gist">{{ item.gist }}</div>
        <!-- <div @click="essayDetail( item._id )" class="essay_button essay_all"><a> 阅读全文 </a>
         </div> -->
        <!-- <div class="essay_underline"></div> -->
      
    </div>
  </div>
</template>

<script>
import * as Api from "../api/api";

export default {
  
  name: "essay",
  data() {
    return {
      essayList: [],
     
    };
  },
  mounted: function() {
     Api.getAllEssay()
      .then(
        response => {
          //  console.log(response.data);
          this.essayList = response.data;
        }
      )
      // .catch(err => {
      //   console.log(err);
      // });
  },
  methods: {
    essayDetail: function(id) {
      // 这边不能多一个斜杠 '/essayDetail/'  因为router定义的路由是 '/essayDetail:id'
      // 我把router改成 '/essayDetail/:id' 让前后端的路由规则一致
      this.$router.push("/essayDetail/" + id);
    }
  }
};
</script>

<style>
#content-essay {
  margin-left: 15%;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.16), 0 0 9px rgba(0, 0, 0, 0.08);
padding: 10px;
  width: 75%;
  /* height: 100%; */
}
.essay_wrap {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  width: 700px;
  height: 150px;
  margin-bottom: 30px;
    margin-top: 10px;
  padding: 10px;
  
}
.essay_wrap:hover {
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.16), 0 0 9px rgba(0, 0, 0, 0.08);
  /* box-shadow: 4px 5px 7px rgba(0, 0, 0, 0.16); */
  /* width: 700px;
  height: 150px;
  margin-bottom: 30px;
  margin-top: 10px;
  padding: 10px; */
  
}

.essay_title {
  display: inline-block;
  color: #222;
  font-size: 20px;
  /* font-weight: 300; */
  border-bottom: 1px solid white;
  cursor: pointer;
}

.essay_title:hover {
  border-bottom: 1px solid #222;
}

.essay_info {
  color: #999;
  font-size: 14px;
  /* padding-top: 8px; */
}

.tag_margin {
  /* margin: 3px; */
}

.essay_gist {
  text-align: left;
  /* padding-top: 40px; */
  /* padding-bottom: 40px; */
  width: 100%;
  font-size: 16px;
  text-align: left;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  cursor: default;
  /* width: 30%; */
  /* height: 20%; */
  /* margin: 10px; */
}

/* .essay_button {
  text-align: center;
  margin: auto;
  display: inline-block;
  padding: 3px 12px;
  border: 2px solid #222;
  color: #222;
  font-size: 14px;
  cursor: pointer;
}

.essay_all:hover {
  color: white;
  background: #000;
  font-weight: 600;
} */

.essay_underline {
  height: 1px;
  /* width: 40px; */
  background: #545455;
  /* margin: 80px auto 0; */
}
</style>