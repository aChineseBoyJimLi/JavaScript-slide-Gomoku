window.onload=function(){
  var container=document.getElementById('slide-1');
  var list=document.getElementById('image-container-1')/*.getElementsByTagName('div')*/;
  var buttons=document.getElementById('buttons').getElementsByTagName('div');
  var pre=document.getElementById('pre-1');
  var next=document.getElementById('next-1');
  var index=1;
  var index2=1;
  var timer;
  function showButton(){
    for(var i=0;i<buttons.length;i++){
      if(buttons[i].className=='on'){
        buttons[i].className='';
        break;
      }
     }
    buttons[index-1].className="on";
  }
  function moveTo(offset){
      if(offset<0){
        var move ="-=" + -offset + "px";
        if(index2 == 6){         
          $("#image-container-1").animate({left:"+=4000px"},400);
        }
        else{
          $("#image-container-1").animate({left:move},400);  
        }  
      }
      if(offset>0){
        var move ="+=" + offset + "px";
        if(index2==1){
          $("#image-container-1").animate({left:"-=4000px"},400);           
        }
        else{
          $("#image-container-1").animate({left:move},400);  
        }        
      }
  }


  function play(){
    timer=setInterval(function(){
    next.onclick();
    },3000);
  }
  function stop(){
    clearInterval(timer);
  }
   
  next.onclick=function(){
    if(index==6)
      index=1;
    else
      index+=1;
    showButton();
    moveTo(-800);
    if(index2==6)
      index2=1;
    else
      index2+=1;  
  }
  pre.onclick=function(){
    if(index==1)
    index=6;
    else
     index-=1;
    showButton();
    moveTo(800);
    if(index2==1)
     index2=6;
    else
     index2-=1;
  }
   
  for(var i=0;i<buttons.length;i++){
    buttons[i].onclick=function(){
      if(this.className=='on'){
        return;
      }
      var myIndex=parseInt(this.getAttribute('index'));
      var offset=-800*(myIndex-index);
       
      index=myIndex;
      showButton();
      moveTo(offset);
      index2=myIndex;
     }
   }
   
   container.onmouseover=stop;
   container.onmouseout=play;
   play();
}