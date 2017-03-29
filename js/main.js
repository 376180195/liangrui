$(function(){
  var toSection = document.querySelectorAll('.navbar-nav li');//获取导航栏上的所有li标签
  var navTop= document.querySelector('#nav');//获取di为nav的元素
  var nav = document.querySelector('.navbar-default');
  var cvs = document.querySelectorAll('.canvaes canvas');//获取所有canvas标签
  var pContent = document.querySelectorAll('.canvaes p');//获取所有p标签
  var arr = [90,80,70,75,70,80,90,100];//canvas绘画弧度以及p标签内容
  var state = true; //canvas绘制前的初始状态
  var skills = document.querySelector('#myskills');//获取id为myskills的section标签
  /*
    window滚动监听事件
  */
  window.onscroll = function(){
    /*
      导航栏置顶
    */ 
    var _navTop = navTop.offsetTop - window.scrollY; 
    if(_navTop<=0){
      nav.style.position = "fixed";
      nav.style.width = "100%";
      nav.style.top = 0;
    }else{
      nav.style.position = "";
    }
    /*
      窗口滚动到我的技能页开始绘制canvas
    */
    var skillsTop = skills.offsetTop - window.scrollY;
    if(skillsTop<=50&&state){
      for (var i = 0; i<arr.length;i++) {
        drawScore(arr[i],cvs[i],pContent[i]);
      }
      return state=false;
    }
  }
  /*
    锚点定位+平滑过渡
  */
  $(".goto").on('click',function(){
    for(var i=0;i<toSection.length;i++){
      toSection[i].className = "";
    }
    $(this).parent().addClass('active');
    $(this).parents()[2].className='navbar-collapse collapse';
  $('html,body').animate({
    scrollTop:$($.attr(this,'href')).offset().top},500);
    return false;
  })
  /*
    canvas绘画函数
  */
  function drawScore(num,cvs,p){
    var ctx = cvs.getContext('2d');
    var _num =  num / 100  * 360;
    var index = 0;
    ctx.lineWidth = 12;
    ctx.strokeStyle="lightgreen";
    var sid = setInterval(function(){
      if(_num <= index){
        clearInterval(sid);
      }else{
        ctx.clearRect(0,0,170,170);
        ctx.beginPath();
        ctx.arc(85,85,70,Math.PI /180 * -91,Math.PI / 180 * (index - 90),false);
        ctx.stroke();
        index++;
        p.textContent = ~~(index / 360*100)+'%';
      }
    },1000/60);
  }  
})
