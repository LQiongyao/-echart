<template>
  <div class="home">
    <div class="background">
      <!-- <img :src="imgSrc" width="100%" height="100%" alt="" /> -->

      <div class="front">
        <!-- 左边中国地图盒子 -->
        <div class="left_box">
          <div class="title">中国移动远程心电业务平台</div>
          <!-- 中国地图 -->
          <div class="geo">
            <div id="main" style="height: 1080px; width: 1920px"></div>
          </div>
        </div>

        <!-- 右边数据比例盒子 -->
        <div class="right_box">
          <ul>
            <li>男女比例</li>
          </ul>
          <!-- 男女比例环形图 -->
          <div id="fourth" :style="{ width: '100%', height: '20%' }"></div>
          <ul>
            <li>年龄段分布图</li>
          </ul>
          <!-- 年龄分布柱状图 -->
          <div id="chartLine" :style="{ width: '100%', height: '20%' }"></div>

          <ul>
            <li>全国机构连接数据</li>
          </ul>
          <!-- 机构连接数柱状图 -->
          <div id="myChart" :style="{ width: '100%', height: '20%' }"></div>
          <ul>
            <li>各省机构数</li>
          </ul>
          <!-- 机构数多重环形图 -->
          <div id="drawChart" :style="{ width: '100%', height: '30%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { color } from "echarts";
// echarts5.0以上版本使用中国地图

import dataJson from "../assets/data";
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
    this.drawCharts();

    this.drawChart();
    this.drawLine();
    this.chartLine();

    let myChart = echarts.init(document.getElementById("main"));
    let uploadDataUrl = dataJson;
    console.log(uploadDataUrl);
    // 注册地图
    echarts.registerMap("china", uploadDataUrl);

    let option = {
      geo: {
        // 地理坐标系组件,支持在地理坐标系上绘制散点图、线图
        map: "china",
        // aspectScale: 0.75,
        roam: true, //是否可以缩放
        zoom: 1.1, //地图缩放比例
        roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 1.5,
        },
        itemStyle: {
          areaColor: "#272D33", //地图区域的颜色
          borderColor: "#66FFFF",
        },
        //
      },
      series: [
        {
          type: "scatter",
          coordinateSystem: "geo",

          // effectScatter
          //  roam: true, //是否开启平游或缩放
          //   scaleLimit: { //滚轮缩放的极限控制
          //     min: 1,
          //     max: 2
          //   },

          label: {
            normal: {
              show: false,
              // textStyle: {
              //   color: "#1DE9B6",
              // },
            },
            emphasis: {
              // areaColor: "#007DE0",
              // 高亮时点的颜色
              color: "red",
              // scale: true
              // textStyle: {
              //   color: "rgb(183, 185, 14)",
              // },
              // areaColor:'blue'
            },
          },

          zoom: 1.1,
          map: "scatter",
        },
        // // 地图的线路图动画效果相关设置
        // {
        //   type: "lines",
        //   zlevel: 2,
        //   effect: {
        //     show: true,
        //     period: 4,
        //     trailLength: 0.6,
        //     symbol: "arrow",
        //     // symbol: 'images://' + require('../assets/images/li.png'),// 自定义图片路径
        //     symbolSize: 7,
        //   },
        //   lineStyle: {
        //     normal: {
        //       color: "#1DE9B6",
        //       // color: "red",
        //       width: 1,
        //       opacity: 0.1,
        //       curveness: 0.3,
        //     },
        //   },
        // },
        // 区域散点图
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          symbol: "image://" + require("../assets/images/life.png"), // 自定
          symbolSize: 20,
          rippleEffect: {
            //坐标点动画
            period: 3,
            scale: 3,
            brushType: "fill",
          },
          label: {
            normal: {
              show: true,
              position: "bottom",
              formatter: "{b}",
              color: "white",
              // fontWeight: "bold",
              fontSize: 16,
            },
          },

          data: [
            {
              name: "珠海市人民医院",
              value: [113.57, 22.27],
            },
            {
              name: "渭南市中心医院",
              value: [109.5, 34.5],
            },
            {
              name: "贵阳医学院",
              value: [106.63, 26.65],
            },
            {
              name: "青海红十字医院服务站",
              value: [101.78, 36.62, 100],
            },
            {
              name: "喀什地区第一人民医院服务站",
              value: [75.98, 39.47],
            },

            {
              name: "天津市胸科医院服务站",
              value: [117.38, 38.98],
            },

            {
              name: "苏州永鼎医院服务站",
              value: [120.63, 31.17],
            },
            {
              name: "湖南省人民医院",
              value: [113.03, 28.18],
            },
            // {
            //   name: "喀什地区"
            //   value: [ 75.9, 39.46]

            // },
          ],
          // itemStyle: {
          //   //坐标点颜色
          //   normal: {
          //     show: true,
          //     color: "#fff",
          //     shadowBlur: 10,
          //     shadowColor: "#fff",
          //   },
          //   emphasis: {
          //     areaColor: "#f00",
          //   },
          // },
        },
      ],
    };
    // this.myChart.setOption(this.setOption(),true)
    myChart.setOption(option, true);
  },

  methods: {
    // 环形图
    drawCharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("fourth"));
      // var e = 80;
      var man = 56,
        women = 44;
      // total = 100;
      var option = {
        title: {
          show: true,
          // text:  "男女比例",
          x: "center",
          y: "center", // 通过x,y将标题(进度)定位在圆环中心
          textStyle: {
            fontSize: "25",
            color: "white",
            fontWeight: "400",
            fontFamily: "DINPro, DINPro-Regular",
          },
        },

        tooltip: {
          // trigger: "item",
          // formatter: "{a} : {c} ({d}%)",
          show: true,

          trigger: "axis",
          // 坐标轴指示器配置项。
          axisPointer: {
            type: "cross", //指示器样试
          },
        },

        legend: {
          orient: "horizontal", //图例列表的布局朝向。
          x: "left", //距离左侧的距离
          frontSize: 12,
          width: 220,
          textStyle: { color: "inherit" },

          data: ["男性比例" + man + "%", "女性比例" + women + "%"],
        },
        series: [
          {
            //  name: "男性比例"+man+"%",
            type: "pie",
            radius: ["45%", "65%"],
            avoidLabelOverlap: true,
            hoverAnimation: true, //移入放大

            // itemStyle: {
            //     normal: {
            //       color: "lightblue"
            //     },
            //   },

            label: {
              normal: {
                show: false,
                position: "center",
                itemStyle: {
                  color: "inherit",
                },
                fontSize: 12,
                color: "inherit",
              },
              emphasis: {
                show: true,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            // label: {
            //   normal: {
            //     show: true,
            //     // position: "bottom",
            //     formatter: "{b}",
            //     color: "white",
            //     // fontWeight: "bold",
            //     fontSize: 16,
            //   },
            // },

            data: [
              {
                value: man,
                name: "男性比例" + man + "%",
                // itemStyle:{ color:"lightblue"}
              },
              {
                value: women,
                name: "女性比例" + women + "%",
                itemStyle: { color: "pink" },
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },

    //横性柱状图
    chartLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("chartLine"));
      // 绘制图表
      var yList = ["60岁及以上", "40岁至60岁", "20岁至40岁", "20岁及以下"];
      var sixMediaList = [66, 66, 66, 66];
      var fourLists = [80, 80, 80, 80];
      var twoList = [120, 120, 120, 120];
      var twoDelivery = [10, 10, 10, 10];
      myChart.setOption({
        title: {
          text: "",
        },

        title: {
          // text: '渠道集客量对比',
          left: "center",
        },
        legend: {
          orient: "horizontal",
          width: 220,
          x: "left",
          textStyle: { color: "inherit" },
          // top: "30",
          data: ["60岁及以上", "40岁至60岁", "20岁至40岁", "20岁及以下"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          // right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: yList,
        },
        series: [
          {
            name: "60岁及以上",
            type: "bar",
            stack: "总量",
            barWidth: 10, // 宽度
            itemStyle: {
              normal: {
                color: "blue",
              },
            },
            label: {
              normal: {
                // show: true,
                // position: 'insideRight'
              },
              emphasis: {
                focus: "series",
                blurScope: "coordinateSystem",
              },
            },
            z: 10,
            data: sixMediaList,
          },
          {
            name: "40岁至60岁",
            type: "bar",
            stack: "总量",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#330099",
              },
            },
            label: {
              // normal: {
              //     show: true,
              //     position: 'insideRight'
              // }
              emphasis: {
                focus: "series",
                blurScope: "coordinateSystem",
              },
            },
            z: 10,
            data: fourLists,
          },
          {
            name: "20岁至40岁",
            type: "bar",
            stack: "总量",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "lightblue",
              },
            },
            label: {
              // normal: {
              //     show: true,
              //     position: 'insideRight'
              // }
              emphasis: {
                focus: "series",
                blurScope: "coordinateSystem",
              },
            },
            z: 10,
            data: twoList,
          },

          {
            name: "20岁及以下",
            type: "bar",
            stack: "总量",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#33CCFF",
              },
            },
            label: {
              // normal: {
              //     show: true,
              //     position: 'insideRight'
              // }
              emphasis: {
                focus: "series",
                blurScope: "coordinateSystem",
              },
            },
            z: 10,
            data: twoDelivery,
          },
        ],
      });
    },

    // 柱状图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "",
        },
        //提示框组件，专门配置提示框的。
        tooltip: {
          trigger: "axis",
          // 坐标轴指示器配置项。
          axisPointer: {
            type: "cross", //指示器样试
          },
        },
        // //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
        // toolbox:{
        //     feature:{
        //         // 动态类型切换,切换图表
        //         magicType: {
        //             type: ['line', 'bar', ]
        //         },
        //         //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
        //         dataView:{
        //             show:true,  //是否显示 数据示图
        //             readOnly:false, //是否 直接可以编辑数据。
        //         },
        //         //保存为图片的配置
        //         saveAsImage: {
        //             show: true
        //         },
        //         //配置项还原
        //         restore: {show: true},
        //     }
        // },
        //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
        legend: {
          textStyle: { color: "inherit" },
          data: ["实体查阅", "电子查阅"], //对应的是name
        },
        //配置X轴
        xAxis: {
          //坐标轴类型
          type: "category",
          //配置类目名称。 可以逐一设置，具体看文档
          data: ["东区", "南区", "北区", "西区"],
          //配置 鼠标移入时显示的 阴影指示器'line' 直线指示器 'shadow' 阴影指示,器  'none' 无指示器
          axisPointer: {
            show: true, //show 必须写，开关的作用
            type: "shadow",
          },
        },
        //配置Y轴
        yAxis: [
          {
            type: "value", //坐标轴类型
            name: "实体查阅", //名称
            min: 0, //最小值
            max: 400, //最大值
            // interval: 5, //列数
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              formatter: "{value}", //字符串模板
            },
          },
        ],
        //系列列表。每个系列通过 type 决定自己的图表类型,一个对象表示一个列表
        series: [
          {
            name: "实体查阅",
            type: "bar",
            data: [201, 145, 100, 168],
            itemStyle: {
              //图形的颜色。默认指向全局的option.color
              color: "#00FFFF",
            },
          },
          {
            name: "电子查阅",
            type: "line",
            data: [201, 145, 100, 168],
          },
        ],
        //图表的颜色
        color: ["#CCFFFF", "#00FFFF", "#00FFFF", "#00FFFF"],
      });
      //鼠标事件
      myChart.on("click", function (params) {
        console.log(params);
      });
    },

    // 多环形
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      var pieChart = this.$echarts.init(document.getElementById("drawChart"));

      pieChart.setOption({
        title: {
          show: true,
        },

        legend: {
          orient: "horizontal", //图例列表的布局朝向。
          width: 220,
          left: "left", //距离左侧的距离
          textStyle: { color: "inherit" },
          //  color:'inherit',

          data: ["北京市", "贵州省", "上海市", "河北省", "广东省", "山东省"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie", //类型
            // radius: "30%", //饼图的半径
            radius: ["35%", "45%"],
            right: ["70%", "80%"], //饼图位置的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            label: {
              color: "inherit",
            },

            color: [
              "#37A2DA",
              "#32C5E9",
              "#67E0E3",
              "#9FE6B8",
              "#FFDB5C",
              "#ff9f7f",
              "#fb7293",
              "#E062AE",
              "#E690D1",
              "#e7bcf3",
              "#9d96f5",
              "#8378EA",
              "#96BFFF",
            ],
            data: [
              {
                value: 4,
                name: "北京市",
                //图形的颜色。默认指向全局的option.color
              },
              { value: 2, name: "贵州省" },
              { value: 1, name: "上海市" },
              { value: 3, name: "河北省" },
            ],
          },
          {
            name: "访问来源",
            type: "pie", //类型
            // radius: "30%", //饼图的半径
            // color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
            radius: ["15%", "25%"],
            label: {
              color: "inherit",
            },
            right: ["70%", "80%"], //饼图位置的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            data: [
              { value: 2, name: "广东省" },
              { value: 3, name: "山东省" },
            ],
          },
        ],
        //  textStyle:{
        //         color: "red",
        //       }
      });
    },
  },
};
</script>
 
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.home {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  //   z-index: -1;
  //   position: absolute;
  //   background: url('~@/assets/images/bg.jpg');
  // background-size: auto;
  .background {
    // width: 1920px;
    // height: 1080px; /**宽高100%是为了图片铺满屏幕 */
    z-index: -1;
    position: absolute;

    background: url("~@/assets/images/bg.jpg");
    // background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;
    height: 100%;
    display: flex;
  }
  // .background:before{
  //   content:"";
  //   display: block;
  //   padding: 100%;
  // }
  .geo {
    top: 100px;
    // align-items: center;
  }
  .front {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .left_box {
    width: 85%;
    height: 100%;
    // background-color: pink;
    // display: inline;
    float: left;
  }
  .title {
    margin-left: 20px;
    font-size: 35px;
    float: left;
    color: white;
  }
  .right_box {
    width: 15%;
    height: 100%;
    // background-color: red;
    // display: inline;
    float: left;
  }
  // .geo{
  //   -webkit-tap-highlight-color: #007DE0;
  // }

  ul {
    list-style-image: url("~@/assets/images/li.png");
    list-style-type: none;
    // height: 100%;
    li {
      text-align: left;
      // margin: -10px;
      color: white;
    }
  }
}
</style>