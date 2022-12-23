// 图片下标
let index = 0;

let imgNum = document.querySelectorAll(".img img").length;
console.log(imgNum, "照片张数");

let img = document.querySelectorAll(".inner .img img");
console.log(img, "照片");

// 捕捉轮播图
var carousel = document.querySelector(".carousel");

// 刷新
function refresh() {
  // 获取轮播图单张宽高
  var carouselWidth = getComputedStyle(carousel).width;
  // 切片
  carouselWidth = Number(carouselWidth.slice(0, -2));
  console.log("轮播图宽度", carouselWidth);

  var carouselHeight = Number(getComputedStyle(carousel).height.slice(0, -2));
  console.log("轮播图高度", carouselHeight);

  let lis = document.querySelectorAll(".r li");

  // 动态修改展位图的大小
  for (let i = 0; i < imgNum; i++) {
    img[i].width = carouselWidth;
    img[i].height = carouselHeight;
  }
  console.log("当前", index);
  if (index === imgNum-1) {
    index = 0;
    carousel.querySelector(".inner").style.left =
      index * carouselWidth * -1 + "px";
    carousel.querySelector(".inner").style.transition = "none";
  }
  if (index < 0) {
    index = 4;
    carousel.querySelector(".inner").style.left =
      index * carouselWidth * -1 + "px";
    carousel.querySelector(".inner").style.transition = "none";
  }
  carousel.querySelector(".inner").style.left =
    index * carouselWidth * -1 + "px";
  for (let i = 0; i < lis.length; i++) {
    //给所有元素全部消除样式
    lis[i].style.background = "";
  }

  //给当前元素设置样式
  lis[index].style.background = "black";
}

function leftClick() {
  index--;
  carousel.querySelector(".inner").style.transition = "all 1s";
  refresh();
}

function rightClick() {
  index++;
  carousel.querySelector(".inner").style.transition = "all 1s";
  refresh();
}

function setIndex(i) {
  index = i;
  carousel.querySelector(".inner").style.transition = "all 1s";
  refresh();
}

// 自动播放
// 开始定时器
function start() {
  timer = setInterval(function () {
    index++;
    carousel.querySelector(".inner").style.transition = "all 1s";
    refresh();
  }, 2000);
}

// 关闭定时器
function stop() {
  clearInterval(timer);
}
start();
// 捕捉轮播图
//  carousel = document.querySelector(".carousel");
// 鼠标移出时,开始定时器
carousel.onmouseleave = start;
// 鼠标移入时,关闭定时器
carousel.onmouseenter = stop;
refresh();
