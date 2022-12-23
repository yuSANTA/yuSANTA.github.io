// 封装函数
function ajax(ob) {
    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest();
    // 初始化参数
    ob = ob || {};
    ob.type = (ob.type || "GET").toUpperCase();
    ob.dataType = ob.dataType || "json";
    let params = ob.data;
    // 发送请求
    if (ob.type === "GET") {
      xhr.open("GET", ob.url + "?" + getParams(params), true);
      console.log(ob.url + "?" + getParams(params));
      xhr.send(null);
    } else if (ob.type === "POST") {
      xhr.open("POST", ob.url, true);
      xhr.send(params);
    }
    // 接收请求
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 && xhr.status < 300) {
          ob.success(xhr.responseText, xhr.responseXML);
        } else if (!xhr.status === 200 || xhr.status > 300) {
          ob.fail(xhr.status);
        }
      }
    };
  }
  
  // get参数设置
  function getParams(data) {
    let arry = [];
    for (let key in data) {
      arry.push(`${key}=${data[key]}`);
    }
    console.log(arry);
    return arry;
  }
  
  
    // 发送ajax请求(month)
    ajax({
      type: "GET",
      dataType: "json",
      data: {
        type: "month",
      },
      url: "https://edu.telking.com/api/",
      success: function (res, xml) {
        var result = JSON.parse(res);
        console.log(JSON.parse(res));
        // 立即执行函数
        (function () {
          // 实例化
          var myChart = echarts.init(document.querySelector(".curve"));
          // 配置
          var option = {
              color: ['rgb(135, 181, 255)'],
              title: {
                  text: "曲线图数据展示",
                  top: "30",
                  left: "center",
                },
              grid: {
                  left: 100,
                  right: 50,
                  top: 100,
                  bottom: 60
              },
              xAxis: [{
                  name: '',
                  type: 'category',
                  boundaryGap: false,
                  data: result.data.xAxis,
                  axisTick: {
                      show: false
                    },
                    boundaryGap: true,
              }],
              yAxis: [{
                  type: 'value',
                  name: '',
                  min: 0,
                  interval: 2000,     
                  axisLabel: {
                      formatter: '{value}人'
                    }           
              }],
              series: [
                  {
                      type: 'line',
                      smooth: true,
                      data: result.data.series,
                      areaStyle: {
                          color: 'rgb(135, 198, 255)',
                          opacity: 0.3
                      },
                      label: {
                          show: true, 
                          position: 'top',
                          textStyle: {
                              color: 'rgb(135, 181, 255)',
                              fontSize: 12
                          }
                      }
                  }
              ]
          };
          // 配置设置给对象
          myChart.setOption(option);
          window.addEventListener("resize", function () {
            myChart.resize(); //图表自适应的一个方法
          });
        })();
      },
      fail: function (status) {
        console.log(status);
      },
    });
  
    // 发送ajax请求(week)
    ajax({
      type: "GET",
      dataType: "json",
      data: {
        type: "week",
      },
      url: "https://edu.telking.com/api/",
      success: function (res, xml) {
        var result = JSON.parse(res);
        console.log(JSON.parse(res));
        //   数据转换为json格式
        var data = [];
        for (let i in result.data.series) {
          data.push({ value: result.data.series[i], name: result.data.xAxis[i] });
        }
        console.log(data);
        (function () {
          // 实例化
          var myChart = echarts.init(document.querySelector(".pie"));
          // 配置
          var option = {
            title: {
              text: "饼状图数据展示",
              top: "20",
              left: "center",
            },
            tooltip: {
              trigger: "item",
            },
            grid: {
              left: 100,
              bottom: 0
          },
            series: [
              {
                name: "数据",
                type: "pie",
                radius: "50%",
                data: data,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
              },
            ],
          };
          // 配置设置给对象
          myChart.setOption(option);
          window.addEventListener("resize", function () {
            myChart.resize(); //图表自适应的一个方法
          });
        })();
  
        (function () {
          // 实例化
          var myChart = echarts.init(document.querySelector(".bar"));
          //配置项
          let option = {
            title: {
              text: "柱状图数据展示",
              top: "20",
              left: "center",
            },
            grid: { left: 100, top: 100, right: 50, bottom: 30 },
            tooltip: {
              //鼠标触摸显示值
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            xAxis: {
              //x轴设置
              type: "category", //类型
              data: result.data.xAxis, //x即接口方法传递过来的参数也是x轴的数据（x等同于res.data.xData）
              axisTick: {
                  show: false
                },
            },
            yAxis: {
              //y轴设置
              name: "商品数",
              nameTextStyle: {
                // y轴name的样式调整
                left: "0",
              },
              type: "value", //类型
            },
            series: [
              {
                barWidth: "30%",
                data: result.data.series, //y即接口方法传递过来的参数也是y轴的数据（x等同于res.data.yData）
                type: "bar", //类型
              },
            ],
          };
          // 配置设置给对象
          myChart.setOption(option);
          window.addEventListener("resize", function () {
            myChart.resize(); //图表自适应的一个方法
          });
        })();
      },
      fail: function (status) {
        console.log(status);
      },
    });
  
  