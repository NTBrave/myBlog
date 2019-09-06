<template>
  <div>
    <div style="float:left;width:90%">
      <canvas id="mycanvas" @mousedown="setPoint" width="800" height="800"></canvas>
    </div>
    <div style="float:right;width:10%">
      <div>
        <span>
          图片像素：
          <span v-if="img!=null">{{img.width}}&nbsp;&nbsp;{{img.height}}</span>
        </span>
      </div>
      <a-button size="small" type="primary" @click.stop="undoPoint">撤销</a-button>
      <a-button
        size="small"
        type="primary"
        style="margin-left:20px;"
        @click.stop="delectAllPoint"
      >重画</a-button>
      <div>
        <div>X &nbsp;&nbsp;&nbsp;&nbsp;Y</div>
        <div v-for="(item,index) in pointList" :key="index">
          {{ parseInt(item.x)}}&nbsp;&nbsp;
          <span>{{parseInt(item.y)}}</span>
        </div>
      </div>
    </div>
    <el-input style="width:60%" v-model="newUrl" placeholder="输入图片网址"></el-input>
    <span>
      <a-button size="small" type="primary" @click.stop="mackImg">确认</a-button>
    </span>

    <a-button
      style="margin-left:20px;"
      size="small"
      type="primary"
      @click="newUrl='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1819615429,3216219056&fm=26&gp=0.jpg';mackImg"
    ><span @click="mackImg"></span>图片2</a-button>
    <a-button
      style="margin-left:20px;"
      size="small"
      type="primary"
      @click="newUrl='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3684759227,1945322156&fm=26&gp=0.jpg';mackImg"
    ><span @click="mackImg"></span>图片3</a-button>
    <span>
      <a-button  style="margin-left:20px;" size="small" type="primary" @click.stop="getArea">求面积</a-button>
    </span>
  
    <span   style="margin-left:20px;background-color: #f0f0f0;color: brown">{{area}}</span>
  </div>
</template>

<script>
import * as Api from "../api/api";

export default {
  name: "essay",
  data() {
    return {
      //   dialogJPG: true,
      canvas: null,
      newUrl: "http://dayy.xyz/resource/1.jpg",
      imageUrl: "http://dayy.xyz/resource/1.jpg",
      //点坐标数组
      pointList: [],
      pointX: [],
      pointY: [],
      area: 0,
      //   width: null,
      //   height: null,
      //   executionArray: [],
      context: null,
      img: null
    };
  },
  mounted: function() {
    this.canvas = document.getElementById("mycanvas");
    this.context = this.canvas.getContext("2d");

    this.doDraw(this.imageUrl);
  },
  methods: {
    //  imageUrl为后台提供图片地址
    doDraw(imageUrl) {
      let _this = this;

      if (!_this.canvas) {
        return false;
      } else {
        //  可以理解为一个画笔，可画路径、矩形、文字、图像
        _this.img = new Image();
        _this.img.src = imageUrl;
        //  加载图片
        _this.img.onload = function() {
          if (_this.img.complete) {
            // console.log(_this.img.width, _this.img.height);
            //  根据图像重新设定了canvas的长宽
            _this.canvas.setAttribute("width", _this.img.width);
            _this.canvas.setAttribute("height", _this.img.height);
            //  绘制图片
            _this.context.drawImage(
              _this.img,
              0,
              0,
              _this.img.width,
              _this.img.height
            );
          }
        };
      }
    },
    //画圆点
    setPoint(event) {
      // console.log(1);
      let _this = this;
      //   console.log("~~", event.clientX, "~~", event.clientY);
      let loc = _this.windowToCanvas(event.clientX, event.clientY);
      //设置绘制颜色 宽度
      _this.context.strokeStyle = "#ca113f";
      _this.context.lineWidth = 2;
      //圆点
      _this.context.arc(loc.x, loc.y, 1.5, 0, 2 * Math.PI);
      _this.pointList.push(loc);
      _this.pointX.push(loc.x);
      _this.pointY.push(loc.y);
      //动作存储 方便进行撤销
      // console.log(_this.pointList.length,loc.x, loc.y);
      //   context.fill(); 遮盖效果
      _this.context.stroke();
    },

    //获取实际的鼠标在canvas的位置
    windowToCanvas(x, y) {
      let _this = this;
      //方法返回元素的大小及其相对于视口的位置
      var bbox = _this.canvas.getBoundingClientRect();
      return {
        x: x - bbox.left * (_this.canvas.width / bbox.width),
        y: y - bbox.top * (_this.canvas.height / bbox.width)
      };
    },
    //撤销上一步
    undoPoint() {
      let _this = this;
      // 清空画布
      _this.canvas.height = _this.img.height;
      // 减少点
      _this.pointList.pop();
      _this.pointX.pop();
      _this.pointY.pop();
      // 绘制图片
      _this.context.drawImage(
        _this.img,
        0,
        0,
        _this.img.width,
        _this.img.height
      );

      // 逐个执行绘图动作进行重绘
      for (let i = 0; i < _this.pointList.length; i++) {
        _this.context.strokeStyle = "#ca113f";
        _this.context.lineWidth = 2;
        _this.context.arc(
          _this.pointList[i].x,
          _this.pointList[i].y,
          1.5,
          0,
          2 * Math.PI
        );
        _this.context.stroke();
      }
    },
    delectAllPoint() {
      let _this = this;
      // 清空画布
      _this.canvas.height = _this.img.height;
      // 减少点
      _this.pointList = [];
      _this.pointX = [];
      _this.pointY = [];
      // 绘制图片
      _this.context.drawImage(
        _this.img,
        0,
        0,
        _this.img.width,
        _this.img.height
      );
    },
    mackImg() {
      this.imageUrl = this.newUrl;
      this.doDraw(this.imageUrl);
    },
    getArea() {
      Api.getArea(this.pointX, this.pointY).then(response => {
        //  console.log(response);
        this.area = response.data;
      });
    }
  }
};
</script>

<style>
#content-essay {
  
  /* margin-left: 15%; */
  /* box-shadow: 0 0 7px rgba(0, 0, 0, 0.16), 0 0 9px rgba(0, 0, 0, 0.08); */
  /* padding: 10px; */
  /* width: 75%; */
  /* color: #ca113f; */
  /* height: 100%; */
}
#mycanvas {
  border: 1px solid rgb(199, 198, 198);
}
</style>