var isWhite = false; //设置是否该轮到白棋，黑棋先手
var winner = ''; //赢家初始化为空
var step=225;//总步数
var chessData = new Array(15); //二维数组存储棋盘落子信息,初始化数组chessData值为0即此处没有棋子，1为白棋，2为黑棋
for (var x = 0; x < 15; x++) {
  chessData[x] = new Array(15);
  for (var y = 0; y < 15; y++) {
    chessData[x][y] = 0;
  }
}

/*落子*/
function drawChess(color, x, y) { //参数为，棋（1为白棋，2为黑棋），数组位置
  if (x >= 0 && x < 15 && y >= 0 && y < 15) {
    if (color == "white") {
      chess("white", x, y);
      isWin("white", x, y); //判断输赢
      isWhite = false;
    } else {
      chess("black", x, y);
      isWin("black", x, y); //判断输赢
      isWhite = true;
      AIplay();
    }
  }
  if(--step==0){
    winner="和局";
    alert(winner);
  }
}
/*绘制棋子*/
function chess(color, x, y) {
  context.fillStyle = color; //绘制黑棋
  context.beginPath();
  context.arc(x * 40 + 180, y * 40 + 80, 15, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
  if (color == "white") {
    chessData[x][y] = 1;
  } else {
    chessData[x][y] = 2;
  }
}
/*鼠标点击事件*/
function play(evet){
	var color;
	var e=e||event;
	var px=e.clientX - 160;
	var py=e.clientY - 60;
	var x=parseInt(px / 40);
	var y=parseInt(py / 40);
	 if (px < 0 || py < 0 || x > 14 || y > 14 || chessData[x][y] != 0) { //鼠标点击棋盘外的区域不响应  
    	return;  
  	}  
  	doCheck(x, y);  
}

function doCheck(x, y) {
  if (winner != '' && winner != null) { //已经结束的游戏只能点击new game
    alert(winner);
    return;
  }
  if (isWhite) {
    color = "white";
  } else {
    color = "black";
  }
  drawChess(color, x, y);
}

/*新游戏按钮*/
function isNewGame() { 
    if (confirm("开启一局新游戏？")) {
      location.reload();
    }
}



function isWin(color, x, y) {
  console.log("判断" + color + "(" + x + "," + y + ")是否胜利");
  var temp = 2; //默认为黑色
  if (color == "white") {
    temp = 1;
  } //白色
  lrCount(temp, x, y);
  tbCount(temp, x, y);
  rtCount(temp, x, y);
  rbCount(temp, x, y);
}

function lrCount(temp, x, y) {
  var line = new Array(4);
  var count = 0;
  for (var i = x; i >= 0; i--) {
    line[0] = i;
    line[1] = y;
    if (chessData[i][y] == temp) {
      ++count;
    } else {
      i = -1;
    }
  }
  for (var i = x; i <= 14; i++) {
    line[2] = i;
    line[3] = y;
    if (chessData[i][y] == temp) {
      ++count;
    } else {
      i = 100;
    }
  }
  success(line[0], line[1], line[2], line[3], temp, --count);
}

function tbCount(temp, x, y) {
  var line = new Array(4);
  var count = 0;
  for (var i = y; i >= 0; i--) {
    line[0] = x;
    line[1] = i;
    if (chessData[x][i] == temp) {
      ++count;
    } else {
      i = -1;
    }
  }
  for (var i = y; i <= 14; i++) {
    line[2] = x;
    line[3] = i;
    if (chessData[x][i] == temp) {
      ++count;
    } else {
      i = 100;
    }
  }
  success(line[0], line[1], line[2], line[3], temp, --count);
}

function rtCount(temp, x, y) {
  var line = new Array(4);
  var count = 0;

  for (var i = x, j = y; i <= 14 && j >= 0;) {
    line[0] = i;
    line[1] = j;
    if (chessData[i][j] == temp) {
      ++count;
    } else {
      i = 100;
    }
    i++;
    j--;
  }
  for (var i = x, j = y; i >= 0 && j <= 14;) {
    line[2] = i;
    line[3] = j;
    if (chessData[i][j] == temp) {
      ++count;
    } else {
      i = -1;
    }
    i--;
    j++;
  }
  success(line[0], line[1], line[2], line[3], temp, --count);
}

function rbCount(temp, x, y) {
  //右下斜判断
  var line = new Array(4);
  var count = 0;

  for (var i = x, j = y; i >= 0 && j >= 0;) {
    line[0] = i;
    line[1] = j;
    if (chessData[i][j] == temp) {
      ++count;
    } else {
      i = -1;
    }
    i--;
    j--;
  }
  for (var i = x, j = y; i <= 14 && j <= 14;) {
    line[2] = i;
    line[3] = j;
    if (chessData[i][j] == temp) {
      ++count;
    } else {
      i = 100;
    }
    i++;
    j++;
  }
  success(line[0], line[1], line[2], line[3], temp, --count);
}

/*判断是否胜利及胜利之后的操作*/
function success(a, b, c, d, temp, count) {
  if (count == 5) { //因为落子点重复计算了一次
    context.beginPath();
    context.lineWidth = 5;
    context.strokeStyle = 'purple';
    context.moveTo(40 * a + 180, 40 * b + 80);
    context.lineTo(40 * c + 180, 40 * d + 80);
    context.closePath();
    context.stroke();

    winner = "黑棋胜利!";
    if (temp == 1) {
      winner = "白棋胜利!";
    }
    alert(winner);
  }
}

/*禁止页面滚动事件*/
var pageScroll = 0;
window.onscroll = function() {
  pageScroll++;
  scrollTo(0, 0);
  if (pageScroll > 100) { //每当玩家滚动页面滚动条100次提醒
    pageScroll = 0;
  }
}






function getPosition() {
	var a = new Array(2);
	var score = 0;
	for (var x = 0; x < 15; x++) {
		for (var y = 0; y < 15; y++) {
			if (chessData[x][y] == 0) {
				if (judge(x, y) > score) {
					score = judge(x, y);
					a[0] = x;
					a[1] = y;
				}
			}
		}
	}
	return a;
}

function AIplay() {
	var str = getPosition();
	doCheck(str[0], str[1]);
}

function judge(x, y) {
	var a = parseInt(leftRight(x, y, 1)) + parseInt(topBottom(x, y, 1)) + parseInt(rightBottom(x, y, 1)) + parseInt(rightTop(x, y, 1))+100; //判断白棋走该位置的得分
	var b = parseInt(leftRight(x, y, 2)) + parseInt(topBottom(x, y, 2)) + parseInt(rightBottom(x, y, 2)) + parseInt(rightTop(x, y, 2)); //判断黑棋走该位置的得分
	var result = a + b;
	return result; //返回黑白棋下该位置的总和
}

function leftRight(x, y, num) {
	var death = 0; //0表示两边都没堵住,且可以成5，1表示一边堵住了，可以成5,2表示是死棋，不予考虑
	var live = 0;
	var count = 0;
	var arr = new Array(15);
	for (var i = 0; i< 15; i++) {
		arr[i] = new Array(15);
		for (var j = 0; j < 15; j++) {
			arr[i][j] = chessData[i][j];
		}
	}
	arr[x][y] = num;
	for (var i = x; i >= 0; i--) {
		if (arr[i][y] == num) {
			count++;
		} else if (arr[i][y] == 0) {
			live += 1; //空位标记
			i = -1;
		} else {
			death += 1; //颜色不同是标记一边被堵住
			i = -1;
		}
	}
	for (var i = x; i <= 14; i++) {
		if (arr[i][y] == num) {
			count++;
		} else if (arr[i][y] == 0) {
			live += 1; //空位标记
			i = 100;
		} else {
			death += 1;
			i = 100;
		}
	}
	count -= 1;
	return model(count, death);
}

function topBottom(x, y, num) {
	var death = 0; //0表示两边都没堵住,且可以成5，1表示一边堵住了，可以成5,2表示是死棋，不予考虑
	var live = 0;
	var count = 0;
	var arr = new Array(15);
	for (var i = 0; i< 15; i++) {
		arr[i] = new Array(15);
		for (var j = 0; j < 15; j++) {
			arr[i][j] = chessData[i][j];
		}
	}
	arr[x][y] = num;
	for (var i = y; i >= 0; i--) {
		if (arr[x][i] == num) {
			count++;
		} else if (arr[x][i] == 0) {
			live += 1; //空位标记
			i = -1;
		} else {
			death += 1;
			i = -1;
		}
	}
	for (var i = y; i <= 14; i++) {
		if (arr[x][i] == num) {
			count++;
		} else if (arr[x][i] == 0) {
			live += 1; //空位标记
			i = 100;
		} else {
			death += 1;
			i = 100;
		}
	}
	count -= 1;
	return model(count, death);
}

function rightBottom(x, y, num) {
	var death = 0; //0表示两边都没堵住,且可以成5，1表示一边堵住了，可以成5,2表示是死棋，不予考虑
	var live = 0;
	var count = 0;
	var arr = new Array(15);
	for (var i = 0; i< 15; i++) {
		arr[i] = new Array(15);
		for (var j = 0; j < 15; j++) {
			arr[i][j] = chessData[i][j];
		}
	}
	arr[x][y] = num;
	for (var i = x, j = y; i >= 0 && j >= 0;) {
		if (arr[i][j] == num) {
			count++;
		} else if (arr[i][j] == 0) {
			live += 1; //空位标记
			i = -1;
		} else {
			death += 1;
			i = -1;
		}
		i--;
		j--;
	}
	for (var i = x, j = y; i <= 14 && j <= 14;) {
		if (arr[i][j] == num) {
			count++;
		} else if (arr[i][j] == 0) {
			live += 1; //空位标记
			i = 100;
		} else {
			death += 1;
			i = 100;
		}
		i++;
		j++;
	}
	count -= 1;
	return model(count, death);
}

function rightTop(x, y, num) {
	var death = 0; //0表示两边都没堵住,且可以成5，1表示一边堵住了，可以成5,2表示是死棋，不予考虑
	var live = 0;
	var count = 0;
	var arr = new Array(15);
	for (var i = 0; i< 15; i++) {
		arr[i] = new Array(15);
		for (var j = 0; j < 15; j++) {
			arr[i][j] = chessData[i][j];
		}
	}
	arr[x][y] = num;
	for (var i = x, j = y; i >= 0 && j <= 14;) {
		if (arr[i][j] == num) {
			count++;
		} else if (arr[i][j] == 0) {
			live += 1; //空位标记
			i = -1;
		} else {
			death += 1;
			i = -1;
		}
		i--;
		j++;
	}
	for (var i = x, j = y; i <= 14 && j >= 0;) {
		if (arr[i][j] == num) {
			count++;
		} else if (arr[i][j] == 0) {
			live += 1; //空位标记
			i = 100;
		} else {
			death += 1;
			i = 100;
		}
		i++;
		j--;
	}
	count -= 1;
	return model(count, death);
}
/*罗列相等效果的棋型(此处只考虑常见的情况，双成五，双活四等少概率事件不考虑)
 *必胜棋：成五=活四==双活三=冲四+活三=双冲四*/
function model(count, death) {
	var LEVEL_ONE = 0;//单子
	var LEVEL_TWO = 1;//眠2，眠1
	var LEVEL_THREE = 1500;//眠3，活2
	var LEVEL_FOER = 4000;//冲4，活3
	var LEVEL_FIVE = 10000;//活4
	var LEVEL_SIX = 100000;//成5
	if (count == 1 && death == 1) {
		return LEVEL_TWO; //眠1
	} else if (count == 2) {
		if (death == 0) {
			return LEVEL_THREE; //活2
		} else if (death == 1) {
			return LEVEL_TWO; //眠2
		} else {
			return LEVEL_ONE; //死棋
		}
	} else if (count == 3) {
		if (death == 0) {
			return LEVEL_FOER; //活3
		} else if (death == 1) {
			return LEVEL_THREE; //眠3
		} else {
			return LEVEL_ONE; //死棋
		}
	} else if (count == 4) {
		if (death == 0) {
			return LEVEL_FIVE; //活4
		} else if (death == 1) {
			return LEVEL_FOER; //冲4
		} else {
			return LEVEL_ONE; //死棋
		}
	} else if (count == 5) {
		return LEVEL_SIX; //成5
	}
	return LEVEL_ONE;
}