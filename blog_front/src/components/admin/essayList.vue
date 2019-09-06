<template>
  <div id="content">
    <div class="essay_wrap" v-for="(item,index) in essayList" :key="index">
      <div @click="essayEdit(item._id)" class="essay_title">
        <span>{{ item.title }}</span>
      </div>
      <div style="float: right;">
        <span style="margin-right:10px">
          <a-button @click="essayEdit(item._id)" type="primary">
            <a-icon type="setting" />
          </a-button>
        </span>
        <span>
          <a-button @click="deleteessay(item._id)" type="danger">
            <a-icon type="delete" />
          </a-button>
        </span>
      </div>
      <div class="essay_info">
        <span class="essay_info_date">发表于：{{ item.date }}</span>
        <span class="essay_info_label">
          标签：
          <span v-if="item.labels.length === 0">未分类</span>
          <el-tag
            v-else
            class="tag_margin"
            type="primary"
            v-for="(tag,index) in item.labels"
            :key="index"
          >{{ tag }}</el-tag>
        </span>
      </div>
      <div class="essay_gist">{{ item.gist }}</div>

      <!-- <div class="essay_underline"></div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as Api from "../../api/api";

export default {
  name: "essay",

  data() {
    return {
      essayList: [],
      apiUrl: "http://39.105.145.102:3000"
    };
  },
  computed: {
    ...mapState(["checkLogin"])
  },
  mounted: function() {
    // if (!this.checkLogin) {
    //   this.$message.warning("请先登陆");
    //   this.$router.push("/admin/signin");
    // } else {
    // 获取文章列表
    Api.getAllEssay()
      .then(response => {
        // console.log(response.data);
        this.essayList = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    // }
  },
  methods: {
    // 跳转至文章编辑页
    essayEdit: function(id) {
      this.$router.push("/admin/essayEdit/" + id);
    },
    // 删除文章
    deleteessay: function(id) {
      let self = this;
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.deleteEssay(id).then(
            response => {
              console.log(response);
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              self.fetchData();
            },
            response => {
              console.log(response);
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 更新数据
    fetchData: function() {
      Api.getAllEssay()
        .then(response => {
          // console.log(response.data);
          this.essayList = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.edit:hover {
  background: limegreen;
  color: white;
  font-weight: 600;
}

.delete:hover {
  background: red;
  color: white;
  font-weight: 600;
}
</style>