window.onload = function(){
    // 获取导航栏
    var nav = document.getElementsByClassName('nav_right')[0];
    // 获取滑块
    var slider = nav.children[0]
    // console.log(slider);
    // 获取导航栏ul
    var ul = nav.children[1]
    var lis = ul.children;
    // console.log(lis);

    var begin = 0;
    var end = 0;
    var clickNum = 0


    // 遍历lis
    for(let li of lis){
        // 监听鼠标进入
        li.onmouseover = function(){
            end = this.offsetLeft
            // console.log("进入",li,this.offsetLeft);
        }

        // 鼠标离开
        li.onmouseout = function () {
            end = clickNum;
        }

        // 鼠标按动
        li.onmousedown = function () {
            clickNum = this.offsetLeft;
        };
    };

    // 滑块滑动
    // 定时
    setInterval(()=>{
        begin = begin + (end - begin) * 0.1;
    //    设置滑块的左边距
        slider.style.left = begin + "px";
    })

}