/* TODO:
*  Wifi bar, battery perc icons
*  Add "reset time" option
*  Add power menu
*  Fix index=-1 bug on icon select
*  Sort programs in programbar
*  Make anything work in IE
*/

//https://api.github.com/repos/PicturElements/picturelements.github.io/contents

var xStart=0,yStart=0,selWin=0;
var prevX=0,prevY=0;
var clicked=false,resize=false,setFullscreen=0,attr,select=false,preventEvents=false,expanded=false,slide=false;
var lockTaskbar=true,lockTaskbah=false,hide=true,preventHide=false;
var windows=[],origNames=[],winCount=0,hiddenApps=5,permaStickied=2;  //permaStickied denotes the taskbar icons that cannot be unpinned, and so don't get included in the editable taskArr array.
var last=0;
var contextAssort=[
  [0,1,2,3],
  [4,5,6,7],
  [8,9,10],
  [11,12],
  [6,7],
  [7],
  [13,14,15,16]
];
var types={
  doc:["css","Cascading Style Sheet file","js","JavaScript file","html","HTML document","json","JavaScript Object Notation file","ahk","AutoHotKey script","txt","Plain text document","zip","Compressed archive","hs","Haskell file","java","Java file","py","Python script file"],
  img:["jpg","JPEG image","jpeg","JPEG image","png","PNG image","bmp","BMP image","gif","GIF image"],
  audio:["mp3","MP3 audio file","wav","Waveform file"],
  font:["otf","OpenType font file","ttf","TrueType font file"]
};
var colors=[
  ["#600","#d42","#d77","#ff5e5e 0%,#bd1929 38%,#0e0000 100%"],
  ["#060","#3a2","#7f5","#64e25e 0%,#098022 38%,#051700 100%"],
  ["#005","#53f","#29f","#64a4c4 0%,#1c5d9e 38%,#1c0935 100%"],
  ["#a40","#d72","#da4","#ffbb5e 0%,#b14b03 38%,#350f00 100%"],
  ["#317","#74a","#85f","#ae41cc 0%,#53136d 38%,#000000 100%"],
  ["#222","#333","#777","#696969 0%,#232323 50%,#000000 100%"],
  ["#999","#aaa","#ddd","#e8e8e8 0%,#a0a0a0 50%,#1f1f1f 100%"]
];
var specCols=["#68c464 0%,#1c5d9e 38%,#50005f 100%"];
var backgrounds=["Abstract.jpg","Bouncy.jpg","Gimignano.jpg","Flower.jpg","Bucks.jpg","Leaf.jpg","LonelyRoad.jpg","Flowers.jpg","Mandelbrot.png","Match.jpg"];
contextShow=false,next=null;

//load variables from localStorage
var taskArr=[0,2,18],oftenUsed=[];
var tzIndex=localStorage.getItem("tzIndex") || 0,tzOffset=localStorage.getItem("tzOffset") || 0;
var tmpArr=localStorage.getItem("taskArr");
taskArr=tmpArr!=null?tmpArr.split(","):taskArr;
var DEF_WIN_W=parseInt(localStorage.getItem("winW")) || 60;
var DEF_WIN_H=parseInt(localStorage.getItem("winH")) || 35;
var ou=localStorage.getItem("oftenUsed");
if (ou!=null){oftenUsed=ou.split(",");}
var colId=2,backId=8;
var ci=localStorage.getItem("colId");
if (ci!=null){colId=parseInt(ci);}
var bi=localStorage.getItem("backId");
if (bi!=null){backId=parseInt(bi);}
lockTaskbar=localStorage.getItem("lockTaskbar")!="0";
document.getElementById("taskbar").className=lockTaskbar?"locked":"unlocked";
document.body.classList.add(localStorage.getItem("viewmode") || "grid");

var programData=[
  {name: "Home", url: "https://picturelements.github.io/index", icon: {url:"home"}, keywords: "home,homepage,index,information"},
  {name: "Sudoku Solver", url: "https://picturelements.github.io/sudokuSolver", icon: {url:"sudokusolver"}, keywords: "sudoku,solver,games,interactive"},
  {name: "Mandelbrot", url: "https://picturelements.github.io/mandelbrot", icon: {url:"mandelbrot"}, keywords: "mandelbrot,julia,set,generator,fractal,interactive,math,canvas"},
  {name: "Pitchfork Emporium", url: "https://pitchforkemporium.github.io/", icon: {url:"pitchforkemporium"}, keywords: "pitchfork,emporium,store,webshop,reddit,api"},
  {name: "Boids", url: "https://aquaplexus.net/fishSim", icon: {url:"boids"}, keywords: "boids,craig,reynolds,interactive,fish,simulation"},
  {name: "HTML Editor", url: "https://picturelements.github.io/editor", icon: {url:"htmleditor"}, keywords: "html,editor,css,interactive,gadget"},
  {name: "Bézier", url: "https://picturelements.github.io/bezier", icon: {url:"bezier"}, keywords: "bezier,bézier,interactive,gadget"},
  {name: "Is it Prime?", url: "https://picturelements.github.io/isitprime", icon: {url:"isitprime"}, keywords: "prime,generator,math,information"},
  {name: "N:th Prime", url: "https://picturelements.github.io/nthPrime", icon: {url:"nthprime"}, keywords: "nth,prime,generator,math,information"},
  {name: "reddit Live 2.0", url: "https://picturelements.github.io/redditLive", icon: {url:"redditlive"}, keywords: "reddit,live,api,information"},
  //{name: "Egg Hunt", url: "https://picturelements.github.io/egghunt", icon: {url:"egghunt"}, keywords: "egg,hunt,confused,travolta,game,reddit,easter"},
  {name: "Game of Life", url: "https://aquaplexus.net/gameoflife", icon: {url:"gameoflife"}, keywords: "game,life,interactive,simulation,conway"},
  {name: "Hit Lawyer", url: "https://picturelements.github.io/hitLawyer", icon: {url:"hitlawyer"}, keywords: "hit,lawyer,gadget"},
  {name: "Fractal", url: "https://aquaplexus.net/fractal", icon: {url:"fractal"}, keywords: "fractal,generator,interactive,math"},
  {name: "Multiples", url: "https://picturelements.github.io/multiples", icon: {url:"multiples"}, keywords: "multiples,math,interactive"},
  {name: "Fireworks", url: "https://aquaplexus.net/firework", icon: {url:"fireworks"}, keywords: "fireworks,interactive,gadget,canvas"},
  {name: "Phone Snake", url: "https://picturelements.github.io/phonesnake", icon: {url:"phonesnake"}, keywords: "phone,snake,game,interactive"},
  //{name: "Back Dropper", url: "https://picturelements.github.io/backdropper", icon: {url:"backdropper"}, keywords: "back,dropper,library,background,canvas"},
  {name: "Parrots", url: "https://picturelements.github.io/parrots", icon: {url:"parrots"}, keywords: "parrots,dank,reddit,party,epilepsy"},
  //{name: "Smoke", url: "https://picturelements.github.io/smoke", icon: {url:"smoke"}, keywords: "smoke,3d,canvas,math"},
  {name: "404.html", url: "https://picturelements.github.io/404", icon: {url:"404"}, keywords: "404,terminal,console,greentext"},
  {name: "Matrix", url: "https://picturelements.github.io/matrix", icon: {url:"matrix"}, keywords: "matrix,math,multiplication"},
  {name: "Sweeper", url:"https://picturelements.github.io/games/minesweeper/", icon: {url:"minesweeper"}, keywords: "mine,sweeper,game,interactive"},
  {name: "Dodge", url: "https://picturelements.github.io/games/dodge", icon: {url:"dodge"}, keywords: "game,reddit,cursor,slide"},
  {name: "about.txt", url: "https://picturelements.github.io/PeNote2?url=https://picturelements.github.io/textfiles/about.txt", icon: {file:"txt"}, keywords: "about,meta,info,text,document,txt,PeOS"},
  {name: "Viewer", url: "", icon: {url:"viewer"}, keywords: ""},
  {name: "Console", url: "", icon: {url:"console"}, keywords: ""},
  {name: "Prompt", url: "", icon: {svg:"info_icon"}, keywords: ""},
  {name: "Settings", url: "", icon: {svg:"cog_icon"}, keywords: ""},
  {name: "File Explorer", url: "", icon: {url:"explorer"}, keywords: ""}
];
pl=programData.length;
var viewerID=pl-5,consoleID=pl-4,errID=pl-3,setID=pl-2,explorerID=pl-1;
var defaultPage="https://api.github.com/repos/PicturElements/picturelements.github.io/contents";

document.body.addEventListener("mousedown",function(event){winSelect=true; xStart=event.clientX; yStart=event.clientY; hideSearch();});
document.body.addEventListener("mousemove",function(event){try{moveWindow(event);}catch(e){}});
document.body.addEventListener("mouseup",function(event){try{release(event);}catch(e){}});
document.getElementById("search").addEventListener("keyup",search);
document.getElementById("searchbar").addEventListener("mousedown",function (event){showSearch(event);});
document.getElementById("home").addEventListener("mousedown",function (event){showHome(event);});
document.getElementById("taskbar").addEventListener("mousedown",function (event){showContext(event,3);});
document.getElementsByClassName("poweritem")[0].addEventListener("mousedown",function (){restart();});
document.getElementsByClassName("poweritem")[1].addEventListener("mousedown",function (event){powerOff(event);});
document.getElementsByClassName("contextitem")[0].addEventListener("mousedown",function (event){contextOpen(event,false);});
document.getElementsByClassName("contextitem")[1].addEventListener("mousedown",function (event){contextOpen(event,true);});
document.getElementsByClassName("contextitem")[2].addEventListener("mousedown",function (event){contextEdit();});
document.getElementsByClassName("contextitem")[3].addEventListener("mousedown",function (event){contextPin(0);});
document.getElementsByClassName("contextitem")[4].addEventListener("mousedown",function (event){contextPin(1);});
document.getElementsByClassName("contextitem")[5].addEventListener("mousedown",function (){contextUnpin();});
document.getElementsByClassName("contextitem")[6].addEventListener("mousedown",function (event){contextAddWin(event);});
document.getElementsByClassName("contextitem")[7].addEventListener("mousedown",function (){contextClose();});
document.getElementsByClassName("contextitem")[8].addEventListener("mousedown",function (){toggleFullscreen();});
document.getElementsByClassName("contextitem")[9].addEventListener("mousedown",function (){contextShow=!contextShow;});
document.getElementsByClassName("contextitem")[10].addEventListener("mousedown",function (){openSettings("backH");});
document.getElementsByClassName("contextitem")[11].addEventListener("mousedown",function (){
  lockTaskbar=!lockTaskbar;
  localStorage.setItem("lockTaskbar",lockTaskbar?1:0);
  document.getElementById("taskbar").className=lockTaskbar?"locked":"unlocked";
});
document.getElementsByClassName("contextitem")[12].addEventListener("mousedown",function (){toggleTaskbah();});
document.getElementsByClassName("contextitem")[13].addEventListener("mousedown",function (){contextOpenFile();});
document.getElementsByClassName("contextitem")[14].addEventListener("mousedown",function (){contextNewDir(false);});
document.getElementsByClassName("contextitem")[15].addEventListener("mousedown",function (){contextNewDir(true);});
document.getElementsByClassName("contextitem")[16].addEventListener("mousedown",function (){contextOpenHTML();});

document.getElementById("context").addEventListener("mousedown",function (){document.getElementById("context").style.display="none"; preventHide=false;});
document.getElementById("desktop").addEventListener("mousedown",function(event){
  xStart=event.clientX;
  yStart=event.clientY;
  if (!clicked){select=true;}
  var elem=document.getElementsByClassName("desktoplink");
  for (var i=0;i<elem.length;i++){
    elem[i].setAttribute("selected",false);
  }
  document.getElementById("context").style.display="none";
  preventHide=false;
  hideSearch();
  document.getElementById("clockbar").style.display="none";
  showContext(event,2);
  event.stopPropagation();
});
document.getElementById("search").addEventListener("mousedown",function(event){showSearchFull(event);});
document.getElementById("taskbar").addEventListener("mousemove",function(event){event.stopPropagation();});

function setup(){
  var parent=document.getElementById("desktop");
  for (var i=0;i<programData.length-hiddenApps;i++){
    if (i>oftenUsed.length-1){oftenUsed.push(0);}
    else{oftenUsed[i]=parseInt(oftenUsed[i]);}
    origNames.push(programData[i].name);
    if (localStorage.getItem("customTitle"+i)!=null){
      programData[i].name=localStorage.getItem("customTitle"+i);
    }
    var el=document.createElement("div");
    el.className="desktoplink";
    el.title=programData[i].name;
    el.setAttribute("selected","false");
    el.setAttribute("onclick","selectIcon(event,"+i+",false)");
    el.addEventListener("mousedown",function(event){showContext(event,0)});
    el.innerHTML="<div class='icon'></div> <p class='ddesc'>"+programData[i].name+"</p>";
    setIcon(programData[i].icon,el.getElementsByClassName("icon")[0]);
    /*var ext=getExtension(programData[i].url);
    if (ext!=""&&!ext.includes("/")){
      el.classList.add("file",getType(ext)[0],ext);
    }*/
    parent.appendChild(el);
  }
  addTaskbarIcon(explorerID,"null",0,programData[explorerID].name,programData[explorerID].icon,true);
  addTaskbarIcon(consoleID,"null",0,programData[consoleID].name,programData[consoleID].icon,true);
  for (var i=0;i<taskArr.length;i++){
    addTaskbarIcon(taskArr[i],"null",0,programData[taskArr[i]].name,programData[taskArr[i]].icon,true);
  }
  for (var i=-14;i<15;i++){
    var el=document.createElement("option");
    el.innerHTML="UTC"+(i<1?"":"+")+""+(i!=0?i:"");
    document.getElementById("timezone").appendChild(el);
  }
  var tz=new Date().getTimezoneOffset()/-60;
  document.getElementById("timezone").getElementsByTagName("option")[0].innerHTML="Local (UTC"+(tz<0?"":"+")+""+(tz!=0?tz:"")+")";
  setCols();
  setTimeout(function(){
    var elem=document.getElementById("loadscreen");
    elem.innerHTML=document.getElementById("loadscreenbuffer").innerHTML;
    elem.style.backgroundColor="#268eee";
  },500);
  loadRepos();
  
  //create cog
  document.getElementById("cog").setAttribute("d",genCog(19));
  var ci=document.getElementsByClassName("cog_icon")[0];
  ci.getElementsByTagName("path")[0].setAttribute("d",genCog(40));
  
  //create clock face
  var clock=document.getElementById("clocksvg");
  var rOuter=45,ri=37,ri2=43;
  for (var i=0;i<60;i++){
    var rad=i%5==0?ri:ri2;
    var line=document.createElementNS("http://www.w3.org/2000/svg","line");
    var sin=Math.sin(i/30*Math.PI),cos=Math.cos(i/30*Math.PI)
    line.setAttribute("x1",round(50-sin*rOuter,2));
    line.setAttribute("y1",round(50-cos*rOuter,2));
    line.setAttribute("x2",round(50-sin*rad,2));
    line.setAttribute("y2",round(50-cos*rad,2));
    line.setAttribute("stroke","#888");
    clock.appendChild(line);
  }
}
setup();

function genCog(r){
  var dimple=0.8,pins=8,part=0.8,step=1/pins;
  var angle=-0.5/pins*Math.PI;
  var out="M"+(round(45+Math.sin(angle)*r,2))+" "+(round(45+Math.cos(angle)*r,2));
  for (var i=1;i<pins*4;i++){
    var newStep=i%2==0?1-part:part;
    var rad=i%4<2?r:dimple*r;
    angle+=newStep*step*Math.PI;
    out+=(" L"+(round(45+Math.sin(angle)*rad,2))+" "+(round(45+Math.cos(angle)*rad,2)));
  }
  return out+"Z";
}

function setCols(){
  document.getElementById("specCols").innerHTML=".specColor{background-color:"+colors[colId][0]+"; border-color:"+colors[colId][0]+";}\n.window[active='true'] .infoCol, .normCol{background-color:"+colors[colId][1]+";}\n.borderCol{border-color:"+colors[colId][2]+" !important;}\n.grad{background: -moz-linear-gradient(-45deg, "+colors[colId][3]+"); background: -webkit-linear-gradient(-45deg, "+colors[colId][3]+"); background: linear-gradient(135deg, "+colors[colId][3]+"); background: linear-gradient(135deg, "+colors[colId][3]+");}"+(backId!=0?".backOverride{background:none; background-image:url(https://picturelements.github.io/images/wallpapers/"+backgrounds[backId-1]+");}":"")+"";
}

function addWindow(id,title,contStr,w,h,type){
  oftenUsed[id]++;
  localStorage.setItem("oftenUsed",oftenUsed);
  var tmpUrl=id==viewerID?contStr:(id==0?programData[id].url+"?"+(new Date().getTime()):programData[id].url);
  var elem=document.createElement("div");
  elem.className="window init";
  var data={
    icon: type!=null?type+"-viewer":programData[id].icon,
    name: title!=null?title:programData[id].name
  };
  
  //prevents multiple settings panels
  if (id==setID){
    var wins=document.getElementsByClassName("window");
    for (var i=0;i<wins.length;i++){
      if (wins[i].getAttribute("type")=="settings"){
        windows[i].collapsed=false;
        moveToTop(i);
        return;
      }
    }
  }

  elem.setAttribute("type",id);
  var inner="<div class='infobar infoCol' id='"+winCount+"'><div class='close' title='Close' onclick=closeWin("+winCount+")>✕</div><div class='max' title='Toggle' onclick=toggle("+winCount+")>◻</div><div class='min' title='Minimize' onclick=minWin("+winCount+")>_</div><div class='reload' title='Reload' onclick=reloadWin("+winCount+")>↻</div><div class='icon'></div><div class='wintitle'>"+data.name+"</div></div><div class='contentwrapper'><div class='content'><iframe class='frame'></iframe><div class='loadingoverlay'><div class='loader'></div><div class='loader2'></div><div class='loader3'></div></div></div><div class='resize' scale='lw'></div><div class='resize' scale='h'></div><div class='resize' scale='w'></div><div class='resize' scale='th'></div><div class='resize' scale='lwh'></div><div class='resize' scale='wh'></div><div class='resize' scale='thw'></div><div class='resize' scale='thlw'></div></div></div>";
  elem.innerHTML=inner;
  elem.setAttribute("active",true);
  elem.id=winCount;
  setIcon(programData[id].icon,elem.getElementsByClassName("icon")[0]);
  document.getElementById("desktop").appendChild(elem);
  if (id==0){
    document.getElementById("desktop").lastChild.addEventListener("mousedown",function(event){event.stopPropagation();});
  }
  var resizers=elem.getElementsByClassName("resize");
  for (var i=0;i<resizers.length;i++){
    resizers[i].addEventListener("mousedown",function(event){try{press(event,true);}catch(e){alert("resize error: "+e);}});
  }
  var elm=elem.getElementsByClassName("infobar")[0];
  elm.addEventListener("mousedown",function(event){try{press(event,false);}catch(e){alert("infobar error: "+e);}});
  elem.style.width=w+"em";
  elem.style.height=h+"em";
  elem.style.left=((100-w)/200)*window.innerWidth+"px";
  elem.style.top=Math.abs(window.innerHeight/2-(h/200)*window.innerWidth)+"px";
  windows.push({
    xPos:[((100-w)/200)*window.innerWidth,0],
    yPos:[Math.abs(window.innerHeight/2-(h/200)*window.innerWidth),0],
    z:winCount-1,   //I'm not entirely sure why this works...
    sizeX:[w,100],
    sizeY:[h,(window.innerHeight/window.innerWidth)*100-(lockTaskbar?3:0)],
    edit:0,
    collapsed:false
  });
  
  if (id==errID||id==setID||id==explorerID||id==consoleID){
    elem.addEventListener("mousedown",function(event){
      var win=getParent(event.target,"window");
      moveToTop(parseInt(win.id));
      document.getElementById("context").style.display="none";
      event.stopPropagation();
    });
  }

  if (id>=viewerID){
    elem.classList.add("system_window");
  }
  
  if (id==errID){
    addContent(elem,"<div class='errimg'></div><div class='errmsg'>"+contStr+"</div>");
    setIcon(programData[errID].icon,elem.getElementsByClassName("errimg")[0]);
    elem.setAttribute("type","error");
    elem.classList.add("icons_hidden");
  }else if (id==setID){
    addContent(elem,document.getElementById("settingsbuffer").innerHTML);
    elem.setAttribute("type","settings");
    elem.classList.add("icons_hidden");
  }else if (id==explorerID){
    addContent(elem,document.getElementById("explorerbuffer").innerHTML);
    elem.setAttribute("type","explorer");
    elem.getElementsByClassName("path")[0].addEventListener("keydown",function(event){
      if (event.keyCode==13){
        parseGeneralURL(event.target,event.target.value);
      }
    });
    elem.getElementsByClassName("filecontent")[0].addEventListener("mousedown",function(event){showContext(event,6);});
    windows[winCount].history=[];
    windows[winCount].histPointer=-2;
    var btns=elem.getElementsByClassName("histbtn");
    btns[0].setAttribute("onclick","moveHist("+winCount+",-1)");
    btns[1].setAttribute("onclick","moveHist("+winCount+",1)");
    parseGeneralURL(elem,contStr!=null?contStr:defaultPage);
    elem.getElementsByClassName("path")[0].addEventListener("focus",function(event){event.target.select();});
  }else if (id==consoleID){
    var content=elem.getElementsByClassName("content")[0];
    addContent(elem,document.getElementById("consolebuffer").innerHTML);
    content.style="background-color:black; color:white";
    new Console(content);
  }else if (type!=null){
    elem.classList.add(data.icon);
    elem.setAttribute("type",viewerID);
    id=viewerID;
  }
  
  setTimeout(function(){elem.classList.remove("init");},200);
  addTaskbarIcon(id,winCount,2,data.name,data.icon,false);
  moveToTop(winCount);
  if (id<consoleID){delayIframe(elem,tmpUrl);}
  winCount++;
  return elem;
}
             
function delayIframe(elem,src){
  setTimeout(function(){
    var iframe=elem.getElementsByClassName("frame")[0];
    iframe.src=src;
    iframe.onload=function(){
      elem.getElementsByClassName("loadingoverlay")[0].style="opacity: 0; background-color:transparent";
    };
  },500);
}

function addContent(elem,html){
  var content=elem.getElementsByClassName("content")[0];
  content.innerHTML=html;
}

function addTaskbarIcon(id,count,actLvl,name,icon,stickied){
  var elems=document.getElementsByClassName("taskbaricon");
  for (var i=0;i<elems.length;i++){
    if (elems[i].classList.contains("stickied")&&elems[i].getAttribute("type")==id&&elems[i].getAttribute("activelevel")==0){
      elems[i].setAttribute("activelevel",actLvl);
      elems[i].id=count;
      elems[i].setAttribute("onclick","minWin("+count+")");
      return;
    }
  }
  var tbi=document.createElement("div");
  tbi.className="taskbaritem";
  var iconEl=document.createElement("div");
  iconEl.setAttribute("class","taskbaricon borderCol "+(stickied?"stickied":""));
  iconEl.setAttribute("id",count);
  iconEl.setAttribute("type",id);
  iconEl.setAttribute("activelevel",actLvl);
  iconEl.setAttribute("onclick",actLvl==2?"minWin("+count+")":"selectIcon(event,"+id+",true)");
  iconEl.innerHTML="<div class='icon'></div>";
  iconEl.addEventListener("mousedown",function(event){showContext(event,id<errID?(id==viewerID||id==consoleID?4:1):4)});
  setIcon(icon,iconEl.getElementsByClassName("icon")[0]);
  tbi.setAttribute("data-title",name);
  tbi.appendChild(iconEl);
  if (!stickied){
    document.getElementById("taskbar").appendChild(tbi);
  }else{
    document.getElementById("taskbar").insertBefore(tbi,elems[taskArr.length+permaStickied]);
  }
}

function isStickied(id){
  for (var i=0;i<taskArr.length;i++){
    if (taskArr[i]==id){return i;}
  }
  return -1;
}

function press(evt,rez){
  if (getParent(evt.target,"window").getAttribute("type")!="settings"){document.getElementById("clockbar").style.display="none";}
  var id=getParent(evt.target,"window").id;
  selWin=id;
  xStart=evt.clientX;
  yStart=evt.clientY;
  document.body.classList.add("scaling");
  moveToTop(id);
  resize=rez;
  if (resize){
    attr=evt.target.getAttribute("scale");
  }
  select=false;
  clicked=true;
  hideSearch();
  document.getElementById("context").style.display="none";
  evt.stopPropagation();
}

function release(event){
  document.body.classList.remove("scaling");
  if (clicked&&!preventEvents){
    var win=windows[selWin];
    var edit=win.edit;
    if (resize){
      win.sizeX[edit]=Math.max(win.sizeX[edit],20);
      win.sizeY[edit]=Math.max(win.sizeY[edit],15);
      /*var mult=attr.includes("l")?-1:1;
      if (attr.includes("w")){windows[selWin].sizeX[edit]=Math.max(windows[selWin].sizeX[edit]+((event.clientX-xStart)*mult/window.innerWidth*100),20);}
      if (attr.includes("h")){windows[selWin].sizeY[edit]=Math.max(windows[selWin].sizeY[edit]+((event.clientY-yStart)/window.innerWidth*100),15);}
      if (mult==-1){
        windows[selWin].xPos[edit]+=(evt.clientX-xStart);
      }*/
    }else{
      if (setFullscreen>0){
        edit=(setFullscreen==1?1:0);
        win.edit=edit;
        win.xPos[edit]=setFullscreen<3?0:window.innerWidth/2;
        win.yPos[edit]=0;
        win.sizeX[edit]=(setFullscreen==1?100:50);
        win.sizeY[edit]=window.innerHeight/window.innerWidth*100-(lockTaskbar?3:0);
        var elem=document.getElementsByClassName("window")[selWin].style;
        elem.left=setFullscreen<3?0:"50em";
        elem.top=0;
        elem.width=setFullscreen==1?"100em":"50em";
        elem.height=win.sizeY[edit]+"em";
        elem.transition="100ms";
        setTimeout(function(){elem.transition="none";},100);
        document.getElementById("shadow").style.opacity=0;
        setFullscreen=0;
      }else{
        win.xPos[edit]+=(event.clientX-xStart);
        win.yPos[edit]+=(event.clientY-yStart);
      }
    }
    clicked=false;
  }
  select=false;
  document.getElementById("selectbox").style="display:none";
}

function moveWindow(evt){
  if (clicked&&!preventEvents){
    var elem=document.getElementsByClassName("window")[selWin];
    var sW=windows[selWin];
    if (resize){
      var edit=sW.edit;
      //windows[selWin].sizeX[edit]
      var multL=attr.includes("l")?-1:1;
      var multT=attr.includes("t")?-1:1;
      if (attr.includes("w")){
        sW.sizeX[edit]=(sW.sizeX[edit]+(evt.clientX-xStart)/window.innerWidth*100*multL);
        elem.style.width=sW.sizeX[edit]+"em";
      }
      if (attr.includes("h")){
        sW.sizeY[edit]=(sW.sizeY[edit]+(evt.clientY-yStart)/window.innerWidth*100*multT);
        elem.style.height=sW.sizeY[edit]+"em";
      }
      if (multL==-1){
        var offs=sW.sizeX[edit]>20?0:(20-sW.sizeX[edit])/100*window.innerWidth;
        sW.xPos[edit]=event.clientX-offs;
        elem.style.left=sW.xPos[edit]+"px";
      }
      if (multT==-1){
        var offs=sW.sizeY[edit]>15?0:(15-sW.sizeY[edit])/100*window.innerWidth;
        sW.yPos[edit]=event.clientY-offs;
        elem.style.top=sW.yPos[edit]+"px";
      }
      xStart=evt.clientX;
      yStart=evt.clientY;
    }else{
      elem.style.left=(sW.xPos[sW.edit]+evt.clientX-xStart)+"px";
      elem.style.top=(sW.yPos[sW.edit]+evt.clientY-yStart)+"px";
      if (elem.getAttribute("type")!="error"&&elem.getAttribute("type")!="settings"){
        if (sW.edit==1&&sW.xPos[sW.edit]==0&&sW.sizeX[sW.edit]==100&&evt.clientY-yStart>=window.innerHeight/100){
          sW.edit=0;
          var sPerc=evt.clientX/window.innerWidth;
          var el=document.getElementsByClassName("window")[selWin];
          el.style.width=sW.sizeX[0]+"em";
          el.style.height=sW.sizeY[0]+"em";
          sW.xPos[0]=evt.clientX-(sW.sizeX[0]/100*window.innerWidth)*sPerc;
          sW.yPos[0]=evt.clientY-0.0125*window.innerWidth;
          el.style.left=sW.xPos[0]+"px";
          el.style.top=sW.yPos[0]+"px";
          el.style.transition="50ms";
          setTimeout(function(){el.style.transition="none";},50);
          var shadow=document.getElementById("shadow").style;
        }else if (evt.clientY<=window.innerWidth/100){
          document.getElementById("shadow").style="opacity:1; width:100%; left:0";
          setFullscreen=1;
        }else if (evt.clientX<=window.innerWidth/100){
          document.getElementById("shadow").style="opacity:1; width:50%; left:0";
          setFullscreen=2;
        }else if (evt.clientX>=window.innerWidth/100*99){
          document.getElementById("shadow").style="opacity:1; width:50%; left:50%";
          setFullscreen=3;
        }else{
          document.getElementById("shadow").style.opacity="0";
          setFullscreen=0;
        }
        var shadow=document.getElementById("shadow");
        shadow.style.height="100%";
        shadow.style.paddingBottom=(lockTaskbar?"0":"3em");
      }
    } 
  }else if (select&&!preventEvents){
    var w=Math.abs(evt.clientX-xStart),h=Math.abs(evt.clientY-yStart);
    var x=(evt.clientX-xStart>0)?xStart:evt.clientX,y=(evt.clientY-yStart>0)?yStart:evt.clientY;
    document.getElementById("selectbox").style="display:block; left:"+x+"px; top:"+y+"px; width:"+w+"px; height:"+h+"px";
    
    var elem=document.getElementsByClassName("desktoplink");
    var iconData=[];
    var iW=window.innerWidth*0.05,iH=window.innerWidth*0.06;
    for (var i=0;i<elem.length;i++){
      elem[i].setAttribute("selected",false);
      var rect=elem[i].getBoundingClientRect();
      iconData.push({
        x: rect.left,
        y: rect.top
      });
    }
    //document.getElementById("test").innerHTML=x+","+y+","+w+","+h;
    for (var h2=0;h2<=30;h2++){
      for (var w2=0;w2<=30;w2++){
        var x2=x+w/30*w2,y2=y+h/30*h2;
        for (var i=0;i<elem.length;i++){
          if (x2>=iconData[i].x&&x2<=iconData[i].x+iW&&y2>=iconData[i].y&&y2<=iconData[i].y+iH){
            elem[i].setAttribute("selected",true);
          }
        }
      }
    }
  }
  
  //taskbar stuff
  if (evt.clientY>window.innerHeight-window.innerWidth/100||document.getElementById("taskbar").style.bottom=="0"&&evt.clientY>window.innerHeight-window.innerWidth*0.03){
    hide=false;
  }else if (evt.clientY<window.innerHeight-window.innerWidth*0.03){
    hide=true;
  }
}

function closeWin(id){
  var actWin=document.getElementsByClassName("window")[id];
  actWin.classList.add("closed");
  setTimeout(function(){closeWinHelper(id,actWin);},200);
}

function closeWinHelper(id,actWin){
  actWin.getElementsByClassName("content")[0].innerHTML="<iframe id='frame'></iframe>";
  actWin.setAttribute("type",null)
  setTimeout(function(){actWin.style.display="none"},500);
  
  var icons=document.getElementsByClassName("taskbaricon");
  for (var i=0;i<icons.length;i++){
    if (icons[i].id==id){
      if (icons[i].classList.contains("stickied")){
        icons[i].id="null";
        icons[i].setAttribute("activelevel",0);
        icons[i].setAttribute("onclick","selectIcon(event,"+icons[i].getAttribute("type")+",true)");
        for (var n=i+1;n<icons.length;n++){
          if (icons[n].getAttribute("type")==icons[i].getAttribute("type")){
            icons[i].id=icons[n].id;
            icons[n].id="null";
            icons[n].setAttribute("type","null");
            icons[n].style.opacity="0";
            //setTimeout(function(){icons[n].style.display="none"; findTopWin();},200);
            icons[i].setAttribute("onclick","minWin("+icons[i].id+")");
            setTimeout(function(){icons[n].parentElement.parentElement.removeChild(icons[n].parentElement); findTopWin();},200);
            clicked=false;
            return;
          }
        }
      }else{
        icons[i].style.opacity="0";
        setTimeout(function(){icons[i].parentElement.parentElement.removeChild(icons[i].parentElement); findTopWin();},200);
        clicked=false;
        return;
      }
    }
  }
  //actWin.parentElement.removeChild(actWin);
  findTopWin();
  clicked=false;
  select=false;
}

function reloadWin(id){
  var srcEl=document.getElementsByTagName("iframe")[id];
  var src=srcEl.src;
  srcEl.src=src;
  clicked=false;
  select=false;
}

function toggle(id){
  windows[id].edit=Math.abs(windows[id].edit-1);
  var elem=document.getElementsByClassName("window")[id];
  var edit=windows[id].edit;
  elem.style.width=windows[id].sizeX[edit]+"em";
  windows[id].sizeY[1]=window.innerHeight/window.innerWidth*100-(lockTaskbar?3:0);
  elem.style.height=windows[id].sizeY[edit]+"em";
  elem.style.left=windows[id].xPos[edit]+"px";
  elem.style.top=windows[id].yPos[edit]+"px";
  moveToTop(id);
  findTopWin();
  elem.style.transition="100ms";
  setTimeout(function(){elem.style.transition="none";},100);
}

function minWin(id){
  if (document.getElementsByClassName("window")[id].getAttribute("active")=="true"||windows[id].collapsed){
    windows[id].collapsed=!windows[id].collapsed;
  }
  moveToTop(id);
  findTopWin();
}

function findTopWin(){
  //alert("GOT HERE!");
  var max=-10,maxId=-1;
  var wins=document.getElementsByClassName("window");
  for (var i in windows){
    if (!wins[i].classList.contains("closed")&&windows[i].z>max){
      max=windows[i].z;
      maxId=i;
    }
  }
  if (maxId>-1){wins[maxId].setAttribute("active",true);}
  var elems=document.getElementsByClassName("taskbaricon");
  for (var i=0;i<elems.length;i++){
    if (elems[i].getAttribute("activelevel")==2){elems[i].setAttribute("activelevel",1);}
    if (elems[i].id==maxId){elems[i].setAttribute("activelevel",2);}
  }
}

function moveToTop(id){
  var max=0;
  var wins=document.getElementsByClassName("window");
  for (var i=0;i<windows.length;i++){
    if (windows[i].z>max){max=windows[i].z;}
    wins[i].setAttribute("active",false);
  }
  if (max!=windows[id].z){
    wins[id].style.zIndex=max+1;
    windows[id].z=max+1;
  }
  wins[id].setAttribute("active",true);
  
  var collapsed=windows[id].collapsed;
  var elem=document.getElementsByClassName("window")[id];
  if (collapsed){
    elem.classList.add("closed");
  }else{
    elem.classList.remove("closed");
  }
  //elem.style.display=collapsed?"none":"block";
  elem=document.getElementsByClassName("taskbaricon");
  for (var i=0;i<elem.length;i++){
    elem[i].setAttribute("activelevel",elem[i].getAttribute("activelevel")==0?0:1);
    if (elem[i].id==id){
      elem[i].setAttribute("activelevel",(collapsed?1:2));
    }
  }
}

function selectIcon(evt,id,singleClick){
  hideSearch();
  if (!preventEvents){
    var time=new Date().getTime();
    if (time-last<500||singleClick){
      addWindow(id,null,null,DEF_WIN_W,DEF_WIN_H);
      prevX=-100;
    }else if(evt.target.getAttribute("class")=="ddesc"&&time-last<1000){
      editName(id);
      preventEvents=true;
    }
    last=time;
  }
  document.getElementById("context").style.display="none";
}

function editName(id){
  var p=document.getElementsByClassName("ddesc")[id];
  var name=p.innerHTML;
  p.innerHTML="<div contenteditable spellcheck='false' id='nameedit'>"+name+"</div>";
  var ne=document.getElementById("nameedit");
  selectElementContents(ne);
  ne.addEventListener("keydown",function(event){setName(event,id)});
}

//http://stackoverflow.com/a/6150060
function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function setName(evt,id){
  var elem=document.getElementById("nameedit");
  if (evt.keyCode==13){
    var oldName=programData[id].name;
    var name=elem.innerHTML;
    for (var i=0;i<programData.length;i++){
      var boolName=(programData[i].name==name&&name!=oldName),boolBlank=(name=="");
      if (boolName||boolBlank){
        if (boolName){openPopup("Filename Error","Error: Filename '"+name+"' is already in use. Try another name.");}
        if (boolBlank){openPopup("Filename Error","Error: Filename cannot be blank. Try another name.");}
        elem.parentElement.innerHTML=oldName;
        preventEvents=false;
        return;
      }
    }
    elem.parentElement.parentElement.title=name;
    elem.parentElement.innerHTML=name;
    preventEvents=false;
    programData[id].name=name;
    var titles=document.getElementsByClassName("wintitle");
    var items=document.getElementsByClassName("taskbaritem");
    for (var i=0;i<titles.length;i++){
      if (titles[i].innerHTML==oldName){
        titles[i].innerHTML=name;
      }
    }
    for (var i=0;i<items.length;i++){
      if (items[i].getAttribute("data-title")==oldName){
        items[i].setAttribute("data-title",name);
      }
    }
    localStorage.setItem("customTitle"+id,name);
  }
}

function resetNames(){
  var icons=document.getElementsByClassName("taskbaritem");
  var titles=document.getElementsByClassName("wintitle");
  var titles2=document.getElementsByClassName("ddesc");
  for (var i=0;i<titles.length;i++){
    for (var n=0;n<origNames.length;n++){
      if (titles[i].innerHTML==programData[n].name){titles[i].innerHTML=origNames[n];}
    }
  }
  for (var i=0;i<icons.length;i++){
    icons[i].setAttribute("data-title",origNames[i]);
  }
  for (var i=0;i<titles2.length;i++){
    titles2[i].innerHTML=origNames[i];
    localStorage.setItem("customTitle"+i,origNames[i]);
  }
  for (var n=0;n<origNames.length;n++){
    programData[n].name=origNames[n];
  }
}

function openPopup(errtitle,errStr,icon){
  icon=icon || "err";
  programData[errID].icon.svg=icon+"_icon";
  addWindow(errID,errtitle,errStr,25,9);
}

function showSearchFull(evt){
  if (document.getElementById("search").value==""){document.getElementById("innerbar").innerHTML=document.getElementById("resultsbuffer").innerHTML;}
  document.getElementById("searchbarbar").setAttribute("expanded",false);
  document.getElementById("sbblabel").innerHTML="<b>SEARCH</b>";
  document.getElementById("search").setAttribute("active",true);
  var search=document.getElementById("searchbar").style;
  search.width="27.5em";
  search.height="50em";
  var buttons=document.getElementsByClassName("sbbitem2");
  buttons[0].style.bottom="0";
  buttons[1].style.display="none";
  document.getElementsByClassName("sbbitem")[1].style.display="block";
  if (!expanded){
    showSearch(evt);
  }
  preventHide=true;
  evt.stopPropagation();
}

function showSearch(evt){
  expanded=true;
  document.getElementById("searchbar").style.opacity="1";
  document.getElementById("searchbar").style.bottom="3em";
  document.getElementById("context").style.display="none";
  document.getElementById("powerbar").style.display="none";
  evt.stopPropagation();
}

function showHome(evt){
  document.getElementById("searchbarbar").setAttribute("expanded",false);
  document.getElementById("innerbar").innerHTML="";
  document.getElementById("sbblabel").innerHTML="<b>HOME</b>";
  document.getElementById("search").setAttribute("active",false);
  document.getElementById("search").value="";
  var buttons=document.getElementsByClassName("sbbitem2");
  buttons[0].style.bottom="3.5em";
  buttons[1].style.display="block";
  document.getElementsByClassName("sbbitem")[1].style.display="none";
  var elem=document.getElementById("searchbar").style;
  if (!expanded){
    showSearch(evt);
  }else if (elem.width=="57.5em"){  //Dirty, but it works.
    document.getElementById("searchbar").style="opacity:0; bottom:-100vh";
    expanded=false;
  }
  elem.width="57.5em";
  elem.height="30em";
  setTimeout(function(){
    document.getElementById("innerbar").innerHTML=document.getElementById("mainbuffer").innerHTML;
    var tot=0,max=5;
    var pb=document.getElementById("puzzlebar");
    var imgs=[1084,1078,1072,1067,1057,1050,1048,1043,1040,1039,1033,1030,1025,1018,1016,998,995,980,979,972,967,953,939,929,900,899,893,867,862,857,835,807,789,744,724,701];
    var backUrl="https://unsplash.it/800/800?image="+imgs[Math.floor(Math.random()*imgs.length)];
    for (var i=0;i<25;i++){
      var piece=document.createElement("div");
      piece.className="puzzle specColor";
      var wide=Math.random()>0.6&&tot%max<4;
      piece.setAttribute("wide",wide);
      //piece.innerHTML="Test "+(i+1);
      piece.style.backgroundImage="url("+backUrl+")";
      piece.style.backgroundPosition=(-7.5*(tot%max))+"em "+(-7.5*Math.floor(tot/max))+"em";
      tot+=(wide?2:1);
      pb.insertBefore(piece,pb.lastChild.previousSibling);
      if (tot==25){break;}
    }
    fillHome();
    var pieces=document.getElementById("innerbar").getElementsByClassName("puzzle");
    for (var i=0;i<pieces.length;i++){
      pieces[i].addEventListener("mousedown",function(event){selectPiece(event);});
      pieces[i].addEventListener("mousemove",function(event){slidePiece(event);});
      pieces[i].addEventListener("mouseup",function(event){placePiece(event);});
    }
  },200);
  preventHide=true;
  evt.stopPropagation();
}

function selectPiece(evt){
  var pieces=document.getElementById("innerbar").getElementsByClassName("puzzle");
  var sel=0,max=pieces.length-1;
  var preBox=document.getElementById("puzzlebar").getBoundingClientRect(),preBox2;
  for (var i=0;i<pieces.length;i++){
    if (pieces[i]==evt.target){sel=i;}
  }
  preBox2=pieces[sel].getBoundingClientRect();
  var box={
    t: preBox2.top-preBox.top,
    l: preBox2.left-preBox.left,
    w: preBox2.width,
    h: preBox2.height
  };
  //Had to hardcopy the css... Sorry for that.
  pieces[max].setAttribute("style",pieces[sel].getAttribute("style"));
  pieces[sel].classList.add("ghost");
  pieces[max].setAttribute("wide",pieces[sel].getAttribute("wide"));
  pieces[max].innerHTML=pieces[sel].innerHTML;
  var sh=document.getElementById("puzzlebar").scrollTop;
  pieces[max].style.display="block";
  pieces[max].style.position="absolute";
  pieces[max].style.marginLeft=(evt.clientX-preBox.left-box.w/2)+"px";
  pieces[max].style.marginTop=(evt.clientY-preBox.top-box.h/2+sh)+"px";
  slide=true;
}

function slidePiece(evt){
  if (slide){
    var pieces=document.getElementById("innerbar").getElementsByClassName("puzzle");
    var count=0;
    for (var i=0;i<pieces.length-1;i++){
      count+=(pieces[i].getAttribute("wide")=="true"?2:1);
      if (count==5){
        count=0;
      }else if (count==6){
        var elem=document.createElement("div");
        elem.className="puzzle invisible";
        elem.setAttribute("wide","false");
        pieces[i].parentElement.insertBefore(elem,pieces[i]);
        count=0;
      }
    }
    var max=pieces.length-1;
    var container=document.getElementById("puzzlebar");
    var box=container.getBoundingClientRect();
    var sh=container.scrollTop;
    var box2=pieces[max].getBoundingClientRect();
    pieces[max].style.marginLeft=(evt.clientX-box.left-box2.width/2)+"px";
    pieces[max].style.marginTop=(evt.clientY-box.top-box2.height/2+sh)+"px";
    var ghost=container.getElementsByClassName("ghost")[0];
    
    for (var i=0;i<max;i++){
      var rect=pieces[i].getBoundingClientRect();
      if (evt.clientX>rect.left&&evt.clientY>rect.top&&evt.clientX<rect.left+Math.min(rect.width,ghost.getBoundingClientRect().width)&&evt.clientY<rect.top+rect.height&&pieces[i]!=ghost){
        var pe=ghost.parentElement;
        pe.removeChild(ghost);
        pe.insertBefore(ghost,pieces[i]);
        break;
      }
    }
    var tmpElem=document.getElementById("innerbar").getElementsByClassName("invisible");
    for (var i=0;i<tmpElem.length;i++){
      if (tmpElem[i+1]!=ghost){
        tmpElem[i].parentElement.removeChild(tmpElem[i]);
      }
    }
  }
}

function placePiece(){
  var pieces=document.getElementById("innerbar").getElementsByClassName("puzzle");
  var ghost=document.getElementById("innerbar").getElementsByClassName("ghost")[0];
  if (ghost){
    ghost.classList.remove("ghost");
  }
  pieces[pieces.length-1].style.display="none";
  var invisible=document.getElementById("innerbar").getElementsByClassName("invisible");
  for (var i=0;i<invisible.length;i++){
    invisible[i].parentElement.removeChild(invisible[i]);
  }
  slide=false;
}

function fillHome(){
  var output="";
  searchFor=-1;
  var locData=[];
  for (var i=0;i<programData.length-hiddenApps;i++){
    locData.push(programData[i]);
    locData[i].index=i;
    locData[i].oftenUsed=oftenUsed[i];
  }
  for (var i=0;i<locData.length;i++){
    for (var j=i+1;j<locData.length;j++){
      if (locData[i].oftenUsed<locData[j].oftenUsed){
        var tmpR=locData[i];
        locData[i]=locData[j];
        locData[j]=tmpR;
      }
    }
  }
  
  var addTo=document.getElementById("programbar");
  addTo.innerHTML="";
  
  if (locData[0].oftenUsed>0){
    addSpacer(addTo,"Often used");
    for (var i=0;i<6;i++){
      if (locData[i].oftenUsed==0){break;}
      addPbItem(addTo,locData[i].index,locData[i].icon,locData[i].name,locData[i].oftenUsed)
    }
    addSpacer(addTo,"");
  }
  
  for (var i=0;i<locData.length;i++){
    for (var j=i+1;j<locData.length;j++){
      if (locData[i].name.localeCompare(locData[j].name)>0){
        var tmpR=locData[i];
        locData[i]=locData[j];
        locData[j]=tmpR;
      }
    }
  }
  for (var i=0;i<locData.length;i++){
    var name=locData[i].name;
    var cc=name.charCodeAt(0);
    if (cc>=97&&cc<=122){cc-=32;}
    if (searchFor==-1){
      if (cc<65||cc>90){
        addSpacer(addTo,"#");
        searchFor=64;
      }
    }
    if (cc>searchFor&&cc>=65&&cc<=90){
      addSpacer(addTo,String.fromCharCode(cc));
      searchFor=cc;
    }
    addPbItem(addTo,locData[i].index,locData[i].icon,locData[i].name,null);
  }
}

function addPbItem(addTo,index,icon,name,used){
  var pbitem=document.createElement("div");
  pbitem.className="pbitem";
  pbitem.setAttribute("onclick","selectIcon(event,"+index+",true)");
  var pbicon=document.createElement("div");
  pbicon.className="icon";
  var pbtitle=document.createElement("div");
  pbtitle.className="pbtitle";
  pbtitle.innerHTML=name+" "+(used!=null?"<span>("+used+")</span>":"");
  
  pbitem.appendChild(pbicon);
  pbitem.appendChild(pbtitle);
  addTo.appendChild(pbitem);
  
  setIcon(icon,pbicon);
}

function addSpacer(addTo,msg){
  var spacer=document.createElement("div");
  spacer.className="pbspacer";
  spacer.innerHTML=msg;
  addTo.appendChild(spacer);
}

function hideSearch(){
  expanded=false;
  var elem=document.getElementById("searchbar").style;
  elem.opacity="0";
  elem.bottom="-100vh";
  var elem=document.getElementById("search");
  elem.value="";
  elem.setAttribute("active",false);
}

function sbbToggle(elem){
  elem=elem.parentElement;
  elem.setAttribute("expanded",elem.getAttribute("expanded")=="false");
}

function sbbHome(){
  document.getElementById("searchbarbar").setAttribute("expanded",false);
  document.getElementById("search").value="";
  document.getElementById("innerbar").innerHTML=document.getElementById("resultsbuffer").innerHTML;
}

function togglePower(){
  var powerbar=document.getElementById("powerbar").style;
  powerbar.display=powerbar.display=="block"?"none":"block";
}

function restart(){
  var elem=document.getElementById("loadscreen");
  elem.innerHTML=document.getElementById("loadscreenbuffer").innerHTML;
  elem.getElementsByClassName("loadmsg")[0].innerHTML="Shutting down";
  elem.style="display:flex; opacity:0; animation:fadescreen 3500ms forwards 1; animation-delay:250ms;";
  setTimeout(function(){elem.innerHTML=inner;},500);
  setTimeout(function(){elem.style.backgroundColor="black"; elem.innerHTML=""},3750);
  setTimeout(function(){location.reload();},4000);
}

function powerOff(evt){
  preventHide=false;
  openPopup("Nope.","You fool! You can't exit PeOS. PeOS is love. PeOS is life.");
  hideSearch();
  evt.stopPropagation();
}

function search(){
  var input=new RegExp(""+document.getElementById("search").value+"","gi");
  var results=[];
  for (var i=1;i<programData.length-hiddenApps;i++){
    var arr=programData[i].keywords.split(",");
    var newArr=[];
    for (var n=0;n<arr.length;n++){
      if (arr[n].match(input)!=null||programData[i].name.match(input)!=null){
        newArr.push(arr[n]);
      }
    }
    if (newArr.length>0){
      var keyws=newArr.toString().replace(/,/g,", ");
      results.push({
        name: programData[i].name,
        keywords: keyws.match(input)==null?keyws:keyws.replace(input,"<span class='highlight'>"+keyws.match(input)[0]+"</span>"),
        url: programData[i].url,
        icon: programData[i].icon
      });
    }
  }
  for (var i=0;i<results.length;i++){
    for (var j=i+1;j<results.length;j++){
      if (results[i].name.localeCompare(results[j].name)>0){
        var tmpR=results[i];
        results[i]=results[j];
        results[j]=tmpR;
      }
    }
  }
  
  var addTo=document.getElementById("innerresults");
  addTo.innerHTML="";
  
  for (var i=0;i<results.length;i++){
    var tmpUrl=results[i].url;
    //inHTML+="<a class='result' onclick='window.open('"+(tmpUrl.includes("aquaplexus")?tmpUrl.replace("https","http"):tmpUrl)+"')'><div class='resultimg'></div><div class='resulttext'>"+results[i].name+"<br><kw>"+results[i].keywords+"</kw></div></a>"
    addResult(addTo,tmpUrl,results[i].icon,results[i].name,results[i].keywords);
  }
  
  if (results.length==0){
    addTo.innerHTML="<div id='searchmsg' style='color:#999; text-align:center'><br><br>No results.</div>"
  }
}

function addResult(addTo,url,icon,name,keywords){
  url=url.replace("http:","https:");
  var result=document.createElement("a");
  result.className="result";
  result.setAttribute("onclick","window.open('"+url+"')");
  var resultimg=document.createElement("div");
  resultimg.className="resultimg";
  var resulttext=document.createElement("div");
  resulttext.className="resulttext";
  resulttext.innerHTML=name+"<br><kw>"+keywords+"</kw>";
  
  result.appendChild(resultimg);
  result.appendChild(resulttext);
  addTo.appendChild(result);
  setIcon(icon,resultimg);
}

//So many edge cases...
//I'm sorry for this.
function showContext(evt,type){
  if (evt.which!=1){
    var items=document.getElementsByClassName("contextitem");
    var context=document.getElementById("context");
    for (var i=0;i<items.length;i++){
      items[i].style.display="none";
    }
    for (var i=0;i<contextAssort[type].length;i++){
      items[contextAssort[type][i]].style.display="block";
    }
    
    if (type==0){
      var tot=0;
      var id=-1,elem=document.getElementsByClassName("desktoplink");
      var targ=getParent(evt.target,"desktoplink");
      for (var i=0;i<elem.length;i++){
        if (elem[i]==targ&&id==-1){id=i;}
        if (elem[i].getAttribute("selected")=="true"){
          tot++;
        }
      }
      document.getElementsByClassName("contextitem")[1].style.display=tot>1&&id!=-1?"block":"none";
      document.getElementsByClassName("contextitem")[1].innerHTML="Open All ("+tot+")";
      context.setAttribute("target",id);
      for (var i=0;i<elem.length;i++){
        if (elem[i]==evt.target){
          context.setAttribute("targetIndex",i);
        }
      }
    }else if (type==1||type==4||type==5){
      var icons=document.getElementsByClassName("taskbaricon");
      for (var i=0;i<icons.length;i++){
        if (evt.target==icons[i]){
          var stickied=icons[i].classList.contains("stickied");
          items[stickied?4:5].style.display="none";
          items[6].innerHTML="Open "+(stickied&&icons[i].getAttribute("activelevel")==0?"":"new");
          //remove "open new" for error messages and settings
          var tgt=evt.target.getAttribute("type");
          if (type==4&&(tgt==errID||tgt==setID)){
            items[6].style.display="none";
          }
          items[7].style.display=icons[i].id=="null"?"none":"block";
        }
      }
      context.setAttribute("target",evt.target.getAttribute("type"));
      for (var i=0;i<icons.length;i++){
        if (icons[i]==evt.target){
          context.setAttribute("targetIndex",i);
        }
      }
    }else if (type==2){
      if (!document.fullscreenElement&&!document.mozFullScreenElement&&!document.webkitFullscreenElement&&!document.msFullscreenElement){
        items[8].innerHTML="Go fullscreen";
      }else{
        items[8].innerHTML="Exit fullscreen";
      }
      items[9].innerHTML=(contextShow?"Disable":"Enable")+" context menu";
    }else if (type==3){
      items[11].setAttribute("ticked",lockTaskbar);
      items[12].setAttribute("ticked",lockTaskbah);
    }else if (type==6){
      var file=getParent(evt.target,"file");
      if (file==null||file.classList.contains("tableheader")){return;}
      context.setAttribute("target",getParent(evt.target,"window").id);
      var files=file.parentElement.getElementsByClassName("file");
      for (var i=0;i<files.length;i++){
        if (file==files[i]){context.setAttribute("targetIndex",i); break;}
      }
      if (!getParent(evt.target,"file").classList.contains("html")){
        items[16].style.display="none";
      }
      evt.stopPropagation();
    }
    
    //Edit context menu styling (width,height,position)
    context.style.display="block";
    context.style.left=((evt.clientX+context.offsetWidth<window.innerWidth-window.innerWidth*0.03)?(evt.clientX+2):(evt.clientX-context.offsetWidth-2))+"px";
    context.style.top=((evt.clientY+context.offsetHeight<window.innerHeight-window.innerWidth*0.03)?(evt.clientY+2):(evt.clientY-context.offsetHeight-2))+"px";
    evt.stopPropagation();
    //preventHide=true;
  }
}

function contextOpen(evt,mult){
  //mult = multiple windows
  if (!mult){
    var elem=document.getElementById("context");
    addWindow(elem.getAttribute("target"),null,null,DEF_WIN_W,DEF_WIN_H);
    elem.style.display="none";
  }else{
    var count=0,ids=[];
    var elem=document.getElementsByClassName("desktoplink");
    for (var i=1;i<elem.length;i++){
      if (elem[i].getAttribute("selected")=="true"){
        ids.push(i);
        setTimeout(function(){addWindow(ids[0],null,null,DEF_WIN_W,DEF_WIN_H); ids.splice(0,1);},750*count);
        count++;
      }
    }
    document.getElementById("context").style.display="none";
  }
  evt.stopPropagation();
}

function contextClose(){
  document.getElementById("context").style.display="none";
  var toClose=document.getElementsByClassName("taskbaricon")[document.getElementById("context").getAttribute("targetIndex")].id;
  closeWin(toClose);
}

function contextEdit(evt){
  var elem=document.getElementById("context");
  editName(elem.getAttribute("target"));
  preventEvents=true;
  elem.style.display="none";
}

function contextPin(type){
  document.getElementById("context").style.display="none";
  var id=document.getElementById("context").getAttribute("target");
  var index=document.getElementById("context").getAttribute("targetIndex");
  for (var i=0;i<taskArr.length;i++){
    if (id==taskArr[i]){return;}
  }
  if (type==0){addTaskbarIcon(id,"null",0,programData[id].name,programData[id].icon,true);}
  else if (index>taskArr.length){
    var icon=document.getElementsByClassName("taskbaricon")[index];
    icon.style.opacity="0";
    icon.parentElement.parentElement.removeChild(icon.parentElement);
    document.getElementById("taskbar").insertBefore(icon.parentElement,document.getElementsByClassName("taskbaritem")[taskArr.length+permaStickied]);
    icon.style.opacity="1";
    icon.classList.add("stickied");
  }
  taskArr.push(id);
  localStorage.setItem("taskArr",taskArr);
}

function contextUnpin(){
  document.getElementById("context").style.display="none";
  var icons=document.getElementsByClassName("taskbaricon");
  var target=document.getElementById("context").getAttribute("target");
  for (var i=0;i<icons.length;i++){
    if (icons[i].getAttribute("type")==target){
      var id=icons[i].id;
      if (id=="null"){
        icons[i].style.opacity="0";
        setTimeout(function(){icons[i].parentElement.parentElement.removeChild(icons[i].parentElement);},200);
      }else{
        icons[i].classList.remove("stickied");
      }
      taskArr.splice(i-permaStickied,1);
      break;
    }
  }
  localStorage.setItem("taskArr",taskArr);
}

function contextAddWin(evt){
  document.getElementById("context").style.display="none";
  var target=document.getElementById("context").getAttribute("target");
  selectIcon(evt,target,true);
}

function toggleTaskbah(){
  lockTaskbah=!lockTaskbah;
  var elem=document.getElementById("taskbahSound");
  if (lockTaskbah){
    elem.currentTime=0;
    elem.play();
  }else{
    elem.pause();
  }
}

function openSettings(scrTo){
  hideSearch();
  var win=addWindow(setID,null,null,60,35);
  var dt=new Date();
  var date=new Date(dt.setTime(dt.getTime()+tzOffset*60000));
  var month=date.getMonth()+1,day=date.getDate();
  document.getElementById("dateset").value=date.getFullYear()+"-"+(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day);
  document.getElementById("timezone").selectedIndex=tzIndex;
  var prec=document.getElementById("prectz");
  if (tzIndex==1&&prec.getAttribute("disabled")!=null){
    prec.removeAttribute("disabled");
    prec.value=tzOffset;
  }
  newTime();
  document.getElementsByClassName("sizeslider")[0].value=DEF_WIN_W;
  document.getElementsByClassName("sizeslider")[1].value=DEF_WIN_H;
  updateSize(0);
  colorSelect();
  if (scrTo!=null){
    win.getElementsByClassName("content")[0].scrollTop=document.getElementById(scrTo).offsetTop;
  }
}

function colorSelect(){
  var inner="";
  for (var i=0;i<colors.length;i++){
    inner+="<div class='coloroption' "+(i==colId?"selected":"")+" onclick=selCol("+i+")><div class='col' style='background-color:"+colors[i][0]+"'></div><div class='col' style='background-color:"+colors[i][1]+"'></div><div class='col' style='background-color:"+colors[i][2]+"'></div></div>";
  }
  document.getElementById("colorbar").innerHTML=inner;
  
  inner="<div class='backoption grad' "+(backId==0?"selected":"")+" onclick=selIco(0)></div>";
  for (var i=1;i<backgrounds.length+1;i++){
    inner+="<div class='backoption' "+(i==backId?"selected":"")+" onclick=selIco("+i+") style='background-image:url(https://picturelements.github.io/images/wallpapers/icons/"+(backgrounds[i-1].replace(".","Ico."))+")'></div>";
  }
  document.getElementById("backbar").innerHTML=inner;
}

function selCol(id){
  colId=id;
  localStorage.setItem("colId",id);
  colorSelect();
  setCols();
}

function selIco(id){
  backId=id;
  localStorage.setItem("backId",id);
  colorSelect();
  setCols();
}

function toggleClock(){
  var elem=document.getElementById("clockbar");
  if (elem.style.display=="none"){openClock();}
  else{elem.style.display="none"; preventHide=false;}
}

function openClock(){
  document.getElementById("clockbar").style.display="flex";
  var dt=new Date((new Date().getTime())+tzOffset*60000);
  var year=dt.getFullYear(),dInMo=daysInMonth(dt.getMonth(),year);
  var elem=document.getElementById("calendar");
  var tCo="<th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th><th>SUN</th>";
  var startAt=(7+new Date(year,dt.getMonth(),1).getDay()-1)%7;
  var counter=-startAt+1;
  for (var i=0;i<6;i++){
    if (counter>dInMo){break;}
    tCo+="<tr>";
    for (var n=0;n<7;n++){
      if (counter<1){
        tCo+="<td inactive>"+(daysInMonth((12+dt.getMonth()-1)%12,year)+counter)+"</td>";
      }else if (counter<=dInMo){
        tCo+="<td "+(counter==dt.getDate()?"today":"")+">"+counter+"</td>"
      }else{
        tCo+="<td inactive>"+(counter-dInMo)+"</td>"
      }
      counter++;
    }
    tCo+="</tr>";
  }
  document.getElementById("calendar").innerHTML=tCo;
  preventHide=true;
  //alert(daysInMonth(1,2017));
}

function daysInMonth(month,year) {
  return new Date(year,month+1,0).getDate();
}

function newTime(){
  var dt=new Date();
  dt.setTime(dt.getTime()+tzOffset*60000);
  var month=dt.getMonth()+1,day=dt.getDate(),hour=dt.getHours(),minute=dt.getMinutes();
  document.getElementById("time").innerHTML=""+(hour<10?"0"+hour:hour)+":"+(minute<10?"0"+minute:minute)+"<br>"+dt.getFullYear()+"-"+(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day);
  
  var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var suffix="th";
  if (day<10||day>20){
    if (day%10==1){suffix="st";}
    else if (day%10==2){suffix="nd";}
    else if (day%10==3){suffix="rd";}
  }
  var dateStr=months[dt.getMonth()]+" "+day+""+suffix+" "+dt.getFullYear();
  document.getElementById("clocklbl").innerHTML=dateStr;
  document.getElementById("time").setAttribute("data-title",dateStr);
  document.getElementById("hour").style="transform:rotate("+(hour/12*360+minute/2)+"deg)";
  document.getElementById("minute").style="transform:rotate("+(minute*6+dt.getSeconds()/10)+"deg)";
  document.getElementById("second").style="transform:rotate("+dt.getSeconds()*6+"deg)";
  
  var index=document.getElementById("timezone").selectedIndex;
  var offset=getOffset(dt,index);
  if (index>0){
    dt=new Date();
    dt.setTime(index==1?dt.getTime()+(document.getElementById("prectz").value)*60000+offset:dt.getTime()+((index-16+dt.getTimezoneOffset()/60)*60)*60000+offset);
  }else{
    dt=new Date();
    dt.setTime(dt.getTime()+offset);
  }
  document.getElementById("tzlbl").innerHTML="Current time: "+dt.toLocaleString()+"";
}

function handleTaskbar(){
  if (!lockTaskbar){
    var tb=document.getElementById("taskbar").style;
    //console.log(tb.bottom);
    if (hide&&tb.bottom=="0vw"&&!preventHide){
      setTimeout(function(){if (hide){tb.bottom="-2.8vw";}},750);
    }else if (!hide&&tb.bottom=="-2.8vw"){
      tb.bottom="0vw";
    }
  }
}

function getOffset(){
  var dt=new Date();
  var dt2=new Date(),roundedDate=Math.floor((dt.getTime()-60000*dt2.getTimezoneOffset())/86400000)*86400000;
  return new Date(document.getElementById("dateset").value).getTime()-roundedDate;
}

function setTime(){
  var dt=new Date();
  var offset=getOffset()/60000;
  var index=document.getElementById("timezone").selectedIndex;
  
  if (index==0){tzOffset=offset;}
  else if (index==1){tzOffset=parseInt(document.getElementById("prectz").value)+offset;}
  else{tzOffset=(index-16+dt.getTimezoneOffset()/60)*60+offset;}
  
  newTime();
  localStorage.setItem("tzIndex",index);
  localStorage.setItem("tzOffset",tzOffset);
  openClock();
}

function updateTime(){
  var index=document.getElementById("timezone").selectedIndex;
  var precTZ=document.getElementById("prectz");
  if (index==1){
    precTZ.removeAttribute("disabled");
  }else{
    precTZ.setAttribute("disabled","");
  }
  tzIndex=index;
  newTime();
}

function updateSize(id){
  var val=parseInt(document.getElementsByClassName("sizeslider")[id].value);
  if (id==0){DEF_WIN_W=val;}
  else{DEF_WIN_H=val;}
  document.getElementById("winW").innerHTML="Window width: "+DEF_WIN_W;
  document.getElementById("winH").innerHTML="Window height: "+DEF_WIN_H;
  localStorage.setItem("winW",DEF_WIN_W);
  localStorage.setItem("winH",DEF_WIN_H);
}

newTime();
setInterval(newTime,1000);
setInterval(handleTaskbar,50);
window.onload=function(){
  setTimeout(function(){
    document.getElementById("loadscreen").style.opacity=0;
    setTimeout(function(){document.getElementById("loadscreen").style.display="none";},500);
  },1500);
};
/*setInterval(function(){
  document.getElementById("test").innerHTML=prevX+" - "+prevY;
},10);*/

function openPrompt(title,msg,action){
  var buttons="<br><button class='promptbtn exec'>OK</button><button class='promptbtn cancel'>Cancel</button>";
  openPopup(title,msg+buttons);
  var elem=document.getElementById("desktop").lastChild;
  elem.getElementsByClassName("close")[0].setAttribute("onclick","cancelPrompt("+elem.id+")");
  elem.getElementsByClassName("cancel")[0].setAttribute("onclick","cancelPrompt("+elem.id+")");
  elem.getElementsByClassName("exec")[0].setAttribute("onclick","execNext("+elem.id+")");
  next=action;
}

function execNext(id){
  if (next=="reset"){
    localStorage.clear();
    restart();
  }else if (next=="resetn"){
    resetNames();
  }
  cancelPrompt(id);
}

function cancelPrompt(id){
  next=null;
  closeWin(id);
}

function resetNamesRelay(){
  openPrompt("Reset Names?","Do you want to reset all file names?","resetn");
}

function resetAll(){
  openPrompt("Reset System?","Do you want to reset the system?","reset");
}

function toggleFullscreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function moveHist(index,dir){
  var w=windows[index],win=document.getElementsByClassName("window")[index];
  w.histPointer+=dir*2;
  win.getElementsByClassName("path")[0].value=w.history[w.histPointer+1];
  //loadFiles(w.history[w.histPointer],win);
  //This will update everything that needs to be updated.
  parseGeneralURL(win,w.history[w.histPointer]);
}

function loadRepos(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var elem=document.getElementById("explorerbuffer").getElementsByClassName("sidelinkwrapper")[0];
      var doc=JSON.parse(this.responseText);
      for (var i in doc){
        var obj=doc[i];
        var item=document.createElement("div");
        item.className="sidelink";
        item.setAttribute("onclick","parseGeneralURL(this,'"+obj.url+"/contents')");
        item.innerHTML=obj.name;
        elem.appendChild(item);
      }
    }
  };
  xhttp.open("GET","https://api.github.com/users/PicturElements/repos",true);
  xhttp.send();
}

function parseGeneralURL(elem,url){
  var win=getParent(elem,"window");
  loadFiles(dirToUrl(win,url),win);
}

function dirToUrl(win,inp){
  if (inp.includes("http")){
    win.setAttribute("root",inp.split("/")[5]);   //The repo name is at this position in a https URL.
    return inp;
  }
  var inputArr=inp.split("\\");
  var url="https://api.github.com/repos/PicturElements/"+inputArr[1]+"/contents";
  for (var i=2;i<inputArr.length;i++){
    url+="/"+inputArr[i];
  }
  win.setAttribute("root",inputArr[1]);
  return url;
}

function loadFiles(url,elem,file){
  var arr=url.split("/");
  var w=getParent(elem,"window");
  var index=parseInt(w.id),win=windows[index];
  var btns=w.getElementsByClassName("histbtn");
  btns[3].setAttribute("active",arr.length>7||file!=null);
  elem=w.getElementsByClassName("filecontent")[0];
  elem.innerHTML="<div class='loadwrapper'><div class='loader dark'></div><div class='loader2 dark'></div><div class='loader3 dark'></div></div>";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var doc=JSON.parse(this.responseText),cutoff=1;
      if (!Array.isArray(doc)){doc=[doc]; cutoff=0;}
      
      if (file!=null){
        var fb=getFileObj(doc,file);
        if (fb==null){
          elem.innerHTML="<div class='fileerror'>Couldn't find file.</div>";
          return;
        }
        url+=("/"+file);
        doc=[fb];
        cutoff=0;
      }
      
      if (win.history[win.histPointer]!=url||win.histPointer==-2){
        win.histPointer+=2;
        win.history[win.histPointer]=url;
        win.history[win.histPointer+1]="P:\\"+w.getAttribute("root")+(doc[0].path!=undefined?morePath(doc[0].path,cutoff):"").replace(/\//g,"\\");
        win.history.splice(win.histPointer+2,win.history.length-(win.histPointer+2));
        //console.log(win.history);
      }
      
      btns[0].setAttribute("active",(win.histPointer>0));
      btns[1].setAttribute("active",(win.histPointer<win.history.length-2));
      
      //console.log(win.histPointer);
      w.getElementsByClassName("path")[0].value=win.history[win.histPointer+1];
      
      elem.innerHTML="";
      createLink(elem,"file tableheader hideable","return;","Name","File type","Size");
      for (var i in doc){
        if (doc[i].type=="dir"){
          createLink(elem,"file dir","loadFilesRelay(this)",doc[i].name,"PeOS Folder","",doc[i].url);
        }
      }
      for (var i in doc){
        if (doc[i].type=="file"){
          var ext=getExtension(doc[i].name);
          var type=getType(ext);
          var func="";
          var attrUrl=null;
          if (type[0]=="doc"){
            func="relayAddWindow("+viewerID+",'"+doc[i].name+"',this)";
            attrUrl="https://picturelements.github.io/PeNote2?url="+doc[i].download_url;
            //console.log(func);
          }else{
            func="relayAddWindow("+viewerID+",'"+doc[i].name+"',this)";
            attrUrl="https://picturelements.github.io/PeViewer?type="+type[0]+"&url="+doc[i].download_url;
          }
          createLink(elem,"file "+type[0]+" "+ext,func,doc[i].name,type[1],getSize(doc[i].size),attrUrl);
        }
      }
    }else if (this.status==404){
      elem.innerHTML="<div class='fileerror'>Couldn't find "+(arr.length==7?"repository":(arr[arr.length-1].includes(".")?"file":"folder"))+".</div>";
    }else if (this.status==403){
      //If the blob is too large, try looking for the folder
      var newFile=arr[arr.length-1];
      newUrl=url.split("/"+newFile)[0];
      console.warn("Don't worry. I've got this.");
      loadFiles(newUrl,elem,newFile);
      return;
    }
  };
  xhttp.onerror = function() {
    elem.innerHTML="<div class='fileerror'>Couldn't load files.<br>Click to try again.</div>";
    elem.getElementsByClassName("fileerror")[0].setAttribute("onclick","loadFiles('"+url+"',this)");
  };
  xhttp.open("GET",url,true);
  xhttp.send();
}

function getFileObj(obj,file){
  for (var elem in obj){
    if (obj[elem].name==file){
      return obj[elem];
    }
  }
  return null;
}

function morePath(path,cutoff){
  var arr=path.split("/");
  var result="";
  for (var i=0;i<arr.length-cutoff;i++){
    result+="/"+arr[i];
  }
  return result;
}

function getExtension(filename){
  var arr=filename.split(".");
  if (arr.length>1){
    return arr[arr.length-1];
  }
  return "";
}

function getType(extension,findType){
  for (var obj in types){
    for (var i=0;i<types[obj].length;i+=2){
      if (types[obj][i]==extension){
        return [obj,types[obj][i+1]];
      }
    }
  }
  return ["doc","<span class='yell'>"+extension+"</span> file"];
}

function getSize(bytes){
  if (bytes<1000){return bytes+" B";}
  if (bytes<1e6){return round(bytes/1000,1)+" kB";}
  if (bytes<1e9){return round(bytes/1e6,1)+" MB";}
}

function round(num,dec){
  var dec=Math.pow(10,dec);
  return Math.round(num*dec)/dec;
  /*var str=""+Math.round(num*dec)/dec;
  var arr=str.split(".");
  if (arr.length==1){arr.push("0")}
  str=arr[0]+"."+arr[1].substring(0,dec);
  return parseFloat(str);*/
}

function createLink(elem,cName,func,name,tpe,sze,url){
  var item=document.createElement("div");
  item.className=cName;
  item.setAttribute("ondblclick",func);
  var wrapper=document.createElement("div");
  wrapper.className="mainwrapper";
  var infowrapper=document.createElement("div");
  infowrapper.className="infowrapper hideable";
  var icon=document.createElement("div");
  icon.className="icon";
  var title=document.createElement("div");
  title.className="title";
  title.innerHTML=name;
  var type=document.createElement("div");
  type.className="filetype";
  type.innerHTML=tpe;
  var size=document.createElement("div");
  size.className="size";
  size.innerHTML=sze;
  
  item.setAttribute("url",url);
  
  wrapper.appendChild(icon);
  wrapper.appendChild(title);
  infowrapper.appendChild(type);
  infowrapper.appendChild(size);
  item.appendChild(wrapper);
  item.appendChild(infowrapper);
  elem.appendChild(item);
}

function relayAddWindow(id,name,elem){
  var url=elem.getAttribute("url");
  addWindow(id,name,url,DEF_WIN_W,DEF_WIN_H,getType(getExtension(url))[0])
}

function loadFilesRelay(elem){
  loadFiles(elem.getAttribute("url"),elem);
}

function getParent(elem,cName){
  while(true){
    if (elem.classList.contains(cName)){return elem;}
    elem=elem.parentElement;
    if (elem.tagName=="BODY"){return null;}
  }
}

function toggleGT(){
  var cl=document.body.classList;
  if (cl.contains("grid")){
    cl.remove("grid");
    cl.add("table");
    localStorage.setItem("viewmode","table");
  }else{
    cl.remove("table");
    cl.add("grid");
    localStorage.setItem("viewmode","grid");
  }
}

function contextOpenFile(){
  var elem=getExplorerItem();
  var dbl=new MouseEvent("dblclick");
  elem.dispatchEvent(dbl);
}

function contextNewDir(openNew){
  var elem=getExplorerItem();
  var window=getParent(elem,"window");
  var path=window.getElementsByClassName("path")[0].value;
  var name=elem.getElementsByClassName("title")[0].innerHTML;
  if (!path.endsWith(name)){path+="\\"+name;}
  if (openNew){
    addWindow(explorerID,null,path,DEF_WIN_W,DEF_WIN_H);
  }else{
    parseGeneralURL(window,path);
  }
}

function contextOpenHTML(){
  var elem=getExplorerItem();
  var url=elem.getAttribute("url").replace("https://raw.githubusercontent.com/PicturElements/","https://").replace("/master","").split("=")[1];
  var title=elem.getElementsByClassName("title")[0].innerHTML;
  addWindow(viewerID,title,url,DEF_WIN_W,DEF_WIN_H,"html");
}

function getExplorerItem(){
  var cont=document.getElementById("context");
  return document.getElementById(cont.getAttribute("target")).getElementsByClassName("file")[cont.getAttribute("targetIndex")];
}

function moveUp(elem){
  var window=getParent(elem,"window");
  var index=parseInt(window.id),win=windows[index];
  var pathSplit=window.getElementsByClassName("path")[0].value.split("\\");
  var newUrl=pathSplit[0];
  for (var i=1;i<pathSplit.length-1;i++){newUrl+=("\\"+pathSplit[i]);}
  if (newUrl==win.history[win.histPointer-1]){
    moveHist(index,-1);
  }else{
    parseGeneralURL(window,newUrl);
  }
}

function consoleOpenWin(str){
  var origStr=str;
  str=str.toLowerCase();
  if (!str.startsWith("http")){
    for (var i in programData){
      if (programData[i].name.toLowerCase()==str){
        if (str=="settings"){openSettings(); return;}
        addWindow(i,null,null,DEF_WIN_W,DEF_WIN_H);
        return;
      }
    }
    openPopup("Program Launch Error","There is no program with name '"+str+"' on this device.");
  }else{
    if (str.endsWith(".html")&&str.includes("picturelements.github.io")){
      addWindow(viewerID,urlToDir(origStr),apiToHttps(origStr),DEF_WIN_W,DEF_WIN_H,"html");
    }else{
      addWindow(explorerID,null,origStr,DEF_WIN_W,DEF_WIN_H);
    }
  }
}

function urlToDir(inp){
  if (inp.startsWith("P:")){
    return inp;
  }
  inp=inp.split("?")[0].split("/");
  var out="P:\\"+inp[5];
  for (var i=7;i<inp.length;i++){
    out+="\\"+inp[i];
  }
  return out;
}

function apiToRaw(url){
  return (url.replace("api.github.com/repos","raw.githubusercontent.com").replace("/contents","/master")).split("?")[0];
}

function apiToHttps(url){
  return (url.replace("api.github.com/repos/PicturElements/","").replace("/contents","")).split("?")[0];
}

//loadFiles("https://api.github.com/repos/PicturElements/picturelements.github.io/contents");

function randWifi(){
  document.getElementById("wifi").setAttribute("level",Math.floor(Math.random()*4));
}

setInterval(randWifi,3000);

function setIcon(obj,elem){
  if (obj.url!=undefined){
    elem.style.backgroundImage="url(https://picturelements.github.io/images/win_icons/"+obj.url+".png)";
  }else if (obj.svg!=undefined){
    var html=document.getElementById("svgbuffer").getElementsByClassName(obj.svg)[0].outerHTML;
    elem.innerHTML=html;
  }else{
    elem.parentElement.classList.add("file",getType(obj.file)[0],obj.file);
  }
}


navigator.getBattery().then(function(battery) {
  updateAll();
  battery.addEventListener('chargingchange', function(){
    updateAll();
  });
  battery.addEventListener('levelchange', function(){
    updateAll();
  });
  function updateAll(){
    var batt=document.getElementById("battery");
    var lvl=Math.floor(battery.level*100);
    var charging=battery.charging&&lvl!=100;
    batt.setAttribute("charging",charging);
    document.getElementById("batterywrapper").setAttribute("data-title",lvl+"% charged"+(charging?" (charging)":""));
    batt.getElementsByClassName("batteryindicator")[0].setAttribute("width",lvl);
    if (lvl==10&&!charging){
      openPopup("Battery level low","The battery level is low (10%). It is recommended that you charge your computer.");
    }else if (lvl<8&&!charging){
      openPopup("BATTERY LEVEL LOW","HOLY FUCK! "+lvl+"% REMAINING! CHARGE YOUR DAMN COMPUTER NOW!");
    }
  }
});