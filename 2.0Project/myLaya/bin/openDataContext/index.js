let startPosx = 0;
let startPosy = 0;
let rankgameWidth = 600;
let rankgameHeight = 800;
let gameStageWidth = 600;
let gameStageHeight = 800;
let canvasHeight;
let currentAvatar;
let currentNickname;
let currentCity;
let openState;
let rankList;
let selfCntScore = 0;
let dataRank;
wx.getUserInfo({
  openIdList: ["selfOpenId"],
  success: function (res) {
    if ('data' in res && res.data.length) {
      currentAvatar = (res.data[0].avatarUrl);
      currentNickname = res.data[0].nickName;
      currentCity = res.data[0].country + "," + res.data[0].province + "," + res.data[0].city;
      getRankList();
    }
  }
});

function init() {
  rankWidth = rankgameWidth * (gameStageWidth / stageWidth);

  rankHeight = rankgameHeight * (gameStageHeight / stageHeight);
  barWidth = rankWidth;
  barHeight = rankHeight / perPageMaxNum;
  preOffsetY = (rankHeight - barHeight) / (perPageMaxNum + 1) + 4;

  fontSize = Math.floor(rankWidth / 25);
  startX = startPosx * (stageWidth / gameStageWidth);
  startY = startPosy * (stageHeight / gameStageHeight);
  avatarSize = barHeight - 30;
  intervalX = barWidth / 20;
  textOffsetY = (barHeight - fontSize) / 2;
  textMaxSize = barWidth / 4;
  indexWidth = context.measureText("99").width;

  initposY = startPosy * (stageHeight / gameStageHeight);
  dataRank && (endposY = initposY - dataRank.length * preOffsetY + rankHeight);

  if (dataRank && dataRank.length * preOffsetY <= rankHeight) {
    endposY = initposY;
  }
}

/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
const assetsUrl = {
  img_Division: "openDataContext/assets/img_Division.png",
  img_no1: "openDataContext/assets/img_no1.png",
  img_no2: "openDataContext/assets/img_no2.png",
  img_no3: "openDataContext/assets/img_no3.png"
};

let assets = {};

//获取canvas渲染上下文
const context = sharedCanvas.getContext("2d");
context.globalCompositeOperation = "source-over";

const totalGroup = [];

/**
 * 创建排行榜
 */
function drawRankPanel() {
  //绘制背景
  context.globalCompositeOperation = "source-over";
  currentGroup = dataRank ? dataRank : totalGroup;
  drawRankByGroup(currentGroup);
  isAdd = false;
  drawBottom();
}

var selfDataRank = null;
var isAdd = false;
function drawBottom() {
  if (avterUrlCount == 0) {
    selfDataRank && drawByData(selfDataRank, 0, 9.65 * preOffsetY);
  }
  else {
    isAdd = true;
    setTimeout(function () {
      drawBottom();
    }, 30);
  }
}

/**
 * 根据当前绘制组绘制排行榜
 */
function drawRankByGroup(currentGroup) {
  for (let i = 0; i < currentGroup.length; i++) { 
    var data = currentGroup[i];
    if (data.avatarUrl == currentAvatar) {
      selfDataRank = data;
    }
    drawByData(data, i);
  }
}
var avterUrlCount = 0;
/**
 * 根据绘制信息以及当前i绘制元素
 */
function drawByData(data, i, tartY) {
  var cnty = (tartY ? tartY : startY) + i * preOffsetY;
  if (startPosy * (stageHeight / gameStageHeight) - barHeight > cnty) {
    return; 
  }

  if (startPosy * (stageHeight / gameStageHeight) + rankHeight < cnty) {
    return;
  }
  var bili = (stageWidth / gameStageWidth);
  
  let x = startX + 50 * bili;
  //绘制底框
  context_drawImage(assets.img_Division, 0,
    (tartY ? tartY : startY) + i * preOffsetY + 8,
    rankWidth * bili, barHeight - 25 * bili);
  x += 10 * bili;
  //设置字体
  context.textAlign = 'center';
  if (data.avatarUrl == currentAvatar && !tartY) {
    context.fillStyle = "#a52a2a";
  }
  else {
    context.fillStyle = "#2d75a6";
  }

  context.font = fontSize + "px Arial";
  var textOffsetY = 75 * bili;
  if (data.key > 3) {
    context.fillText(data.key, x + 18 * bili, (tartY ? tartY : startY) + i * preOffsetY + textOffsetY, textMaxSize);
  }
  else {
    context_drawImage(assets["img_no" + data.key], x - 40 * bili,
      (tartY ? tartY : startY) + i * preOffsetY + (barHeight - assets["img_no" + data.key].height * bili) / 2,
      assets["img_no" + data.key].width * bili, assets["img_no" + data.key].height * bili);
  }
 
  x += indexWidth + intervalX;
  if (assets[data.openid]) {
    context_drawImage(assets[data.openid], startX + 120 * bili, (tartY ? tartY : startY) + i * preOffsetY + (barHeight - avatarSize) / 2, avatarSize, avatarSize);
  }
  else {
    var img = wx.createImage();
    img.src = data.avatarUrl;
    avterUrlCount++;
    img.onload = function () {
      avterUrlCount--;
      context.globalCompositeOperation = "source-over";
      context_drawImage(img, startX + 120 * bili, (tartY ? tartY : startY) + i * preOffsetY + (barHeight - avatarSize) / 2, avatarSize, avatarSize);
    };
  }

  context.textAlign = 'left';
  x += avatarSize + intervalX + 10 * bili;

  context.fillText((data.nickname && data.nickname.length > 6) ? (data.nickname.substr(0, 5)) + "..." : data.nickname, x + 100 * bili - textMaxSize / 2, (tartY ? tartY : startY) + i * preOffsetY + textOffsetY, textMaxSize);
  x += textMaxSize + intervalX;
  context.textAlign = 'center';
  context.fillText(JSON.parse(data.KVDataList[0]["value"]), x + 80 * bili, (tartY ? tartY : startY) + i * preOffsetY + textOffsetY, textMaxSize);

}

function onTouchEnd(event) {
  automove();
}

let renderDirty = true;
let currentGroup = [];
let perPageMaxNum = 10;
let page = 0;
let stageWidth;
let stageHeight;
let rankWidth;
let rankHeight;
let barWidth;
let barHeight;
let offsetX_barToRank
let startX;
let startY;
let preOffsetY;
let fontSize;
let textOffsetY;
let avatarSize;
let textMaxSize;
let intervalX;
let indexWidth;

wx.onTouchEnd((event) => {
  lastMoveY = 0;
  if (!requestAnimationFrameID) {
    return;
  }
  const l = event.changedTouches.length;
  for (let i = 0; i < l; i++) {
    onTouchEnd(event.changedTouches[i]);
  }
});
var initposY;
var endposY;

wx.onTouchStart((event) => {
  if (!requestAnimationFrameID) {
    return;
  }
  lastMoveY = 0;
  allMoveSet = 0;
  clearInterval(inter);
});

wx.onTouchMove((event) => {
  if (!requestAnimationFrameID) {
    return;
  }
  clearInterval(inter);
  const l = event.changedTouches.length;
  for (let i = 0; i < l; i++) {
    onTouchMove(event.changedTouches[i]);
  }
});

var inter = 0;
function automove() {
  var time = new Date().getTime() - startTime;
  var speed = allMoveSet / time * 20;// * 667 / canvasHeight;
  if (Math.abs(speed) < 10) {
    return;
  }
  inter = setInterval(function () {
    speed = speed * 0.90
    startY += speed;
    if (startY > initposY) {
      startY = initposY;
      renderDirty = true;
      clearInterval(inter);
      return;
    }
    else if (startY < endposY) {
      startY = endposY;
      renderDirty = true;
      clearInterval(inter);
      return;
    }
    if (startY == initposY || startY == endposY) {
      return;
    }
    renderDirty = true;
    if (Math.abs(speed) < 10) {
      clearInterval(inter);
      return;
    }
  }, 30);
}
let lastMoveY = 0;
let dir = 0;
var startTime = 0;
var allMoveSet = 0;
function onTouchMove(event) {
  var nowMoveY = event.clientY * sharedCanvas.height / gameStageHeight;
  if (nowMoveY < startPosy) {
    return;
  }
  if (nowMoveY > startPosy + rankHeight) {
    return;
  }
  if (lastMoveY) {
    startY += nowMoveY - lastMoveY;
    allMoveSet += nowMoveY - lastMoveY;
    if (startY >= initposY) {
      startY = initposY;
      dir != 1 && (renderDirty = true);
      dir = 1;
    }
    else if (startY <= endposY) {
      startY = endposY;
      dir != 2 && (renderDirty = true);
      dir = 2;
    }
    else {
      renderDirty = true;
      dir = 0;
    }

  }
  else {
    startTime = new Date().getTime();
  }
  lastMoveY = nowMoveY;
}



/**
 * 是否加载过资源的标记量
 */
let hasLoadRes;

/**
 * 资源加载
 */
function preloadAssets(assetsUrl, callBack = null) {
  let preloaded = 0;
  let count = 0;
  for (let asset in assetsUrl) {
    count++;
    const img = wx.createImage();
    img.onload = () => {
      preloaded++;
      if (preloaded == count) {
        hasLoadRes = true;
        if (callBack) {
          callBack();
        }
      }

    }
    img.src = assetsUrl[asset];
    assets[asset] = img;
  }
}


/**
 * 绘制屏幕
 * 这个函数会在加载完所有资源之后被调用
 */
function createScene() {
  
  if (sharedCanvas.width && sharedCanvas.height) {
    stageWidth = sharedCanvas.width;
    stageHeight = sharedCanvas.height;
    init();
    return true;
  } else {
    return false;
  }
}


//记录requestAnimationFrame的ID
let requestAnimationFrameID;
let hasCreateScene;

/**
 * 增加来自主域的监听函数
 */

function addOpenDataContextListener() {
  wx.onMessage((data) => {
    console.log(data);
    if (data.command == 'clearcanvase' && !data.type) {
      context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
    }else if (data.command == 'open' && !data.type) {
      cntScore = 0;
      init();
      renderDirty = true;
      dir = 0;
      requestAnimationFrameID = requestAnimationFrame(loop);
    } else if (data.command == 'close' && requestAnimationFrameID && !data.type) {
      cancelAnimationFrame(requestAnimationFrameID);
      context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
      requestAnimationFrameID = null;
    } else if (data.command == "drawpass" && !data.type) {
      if (requestAnimationFrameID) {
        cancelAnimationFrame(requestAnimationFrameID);
        requestAnimationFrameID = null;
      }
      drawPass(data.score);
    }
    else if (data.command == "update" && !data.type) {
      if (requestAnimationFrameID) {
        cancelAnimationFrame(requestAnimationFrameID);
        requestAnimationFrameID = null;
      }
      cntScore = 0;
      data.score = JSON.parse(data.score);
      if (data.score.score <= selfCntScore) {
        return;
      }
      setUserInfo(data.score)
    }
    else if (data.command == "clearScore" && !data.type) {
      cntScore = 0;
    }
    else if (data.command = "range" && !data.type) {
      if (requestAnimationFrameID) {
        cancelAnimationFrame(requestAnimationFrameID);
        requestAnimationFrameID = null;
      }
      if (dataRank) {
        for (let i = 0; i < dataRank.length; i++) {
          var data = dataRank[i];
          if (dataRank[i].avatarUrl == currentAvatar) {
            if (!dataRank[i - 1]) {
              drawRankrange(0, 2);
            }
            else if (!dataRank[i + 1]) {
              drawRankrange(i - 2 < 0 ? 0 : i - 2, i);
            }
            else {
              drawRankrange(i - 1, i + 1);
            }
            return;
          }
        }
      }
      drawRankrange(0, 2);
    }
  });
}

function drawRankrange(startI, endI) {
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
  if (dataRank) {
    var bili = (stageWidth / gameStageWidth);
    var avatarSize = 104 * bili;
    var cntI = 0;
    for (var i = startI; i < dataRank.length && i <= endI; i++) {
      var data = dataRank[i];
      if (!data) {
        continue;
      }
      let x = (stageWidth - 540 * bili - avatarSize) / 2 + cntI * 280 * bili;

      //设置字体
      context.textAlign = 'center';
      context.fillStyle = "#3894eb";//"#465b56";
      context.font = "30px Arial";
      context.fillStyle = "#3894eb";
      context.fillText(data.key, x + avatarSize / 2, 72 * bili, avatarSize);
      if (assets[data.openid]) {
        context_drawImage(assets[data.openid], x, 75 * bili, avatarSize, avatarSize);
      }
      else {
        var img = wx.createImage();
        img.src = data.avatarUrl;
        img.x = x;
        img.onload = function () {
          context.globalCompositeOperation = "source-over";
          context_drawImage(img, img.x, 75 * bili, avatarSize, avatarSize);
        };
      }
      context.font = "26px Arial";
      context.fillStyle = "#3894eb";
      context.fillText(data.nickname + "", x + avatarSize / 2, avatarSize + 100 * bili + 20, avatarSize * 3);
      context.fillText(JSON.parse(data.KVDataList[0]["value"]), x + avatarSize / 2, avatarSize + 130 * bili + 40, avatarSize);
      cntI++;
    }
  }
}

function setUserInfo(data) {
  if (selfDataRank) {
    selfDataRank.KVDataList[0] = JSON.stringify(data);
  }
  wx.setUserCloudStorage({
    KVDataList: [{ key: 'da', value: JSON.stringify(data) }],
    success: function (res) {
      getRankList();
    }
  })
}
function checkOpenidIsExist(openid) {
  for (var i = 0; i < dataRank.length; i++) {
    if (dataRank[i].openid == openid) {
      return true;
    }
  }
  return false;
}
function getRankList() {
  wx.getGroupCloudStorage({
    keyList: ['da'],
    success: res => {
      dataRank = res.data;
      wx.getFriendCloudStorage({
        keyList: ['da'],
        success: res => {
          for (var i = 0; i < res.data.length; i++) {
            if (!checkOpenidIsExist(res.data[i].openid)) {
              dataRank.push(res.data[i]);
            }
          }
          sortDataRankList();
        }
      });
    },
    fail: res => {
      wx.getFriendCloudStorage({
        keyList: ['da'],
        success: res => {
          dataRank = res.data;
          sortDataRankList();
        }
      });
    }
  });
}

function sortDataRankList() {
  dataRank.sort(function (x, y) {
    if (parseInt(JSON.parse(x.KVDataList[0]["value"])) < parseInt(JSON.parse(y.KVDataList[0]["value"]))) {
      return 1;
    } else if (parseInt(JSON.parse(x.KVDataList[0]["value"])) > parseInt(JSON.parse(y.KVDataList[0]["value"]))) {
      return -1;
    } else {
      return 0;
    }
  });
  for (var i = 0; i < dataRank.length; i++) {
    dataRank[i].key = i + 1;
  }
  var per = {};
  for (var i = 0; i < dataRank.length; i++) {
    per[dataRank[i].openid] = dataRank[i].avatarUrl;
  }
  preloadAssets(per);
  for (var i = 0; i < dataRank.length; i++) {
    if (dataRank[i].avatarUrl == currentAvatar) {
      selfCntScore = parseInt(JSON.parse(dataRank[i].KVDataList[0]["value"]).score);
      break;
    }
  }
}

preloadAssets(assetsUrl);
createScene();
addOpenDataContextListener();
var cntScore = 0;
function drawPass(score) {
  if (!dataRank) {
    return;
  }
  if (score < cntScore) {
    return;
  }
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
  context.font = "25px Arial";
  var len = dataRank.length;
  for (var i = len - 1; i >= 0; i--) {
    if (JSON.parse(dataRank[i].KVDataList[0]["value"]) > score) {
      var img = wx.createImage();
      img.src = dataRank[i].avatarUrl;
      img.onload = function () {
        context_drawImage(img, 13, 8, 60, 60);
      }
      context.fillStyle = "#fffff8";
      context.textAlign = 'left';
      context.fillText((dataRank[i].nickname && dataRank[i].nickname.length > 4) ? (dataRank[i].nickname.substr(0, 3)) + "..." : dataRank[i].nickname, 90, 33, 104);
      cntScore = JSON.parse(dataRank[i].KVDataList[0]["value"]);
      context.fillText(JSON.parse(dataRank[i].KVDataList[0]["value"]), 90, 68, 104);
      return;
    }
  }
  context.fillStyle = "#fffff8";
  context.fillText("无人可敌", 70, 34, 104);
}

function loop() {
  if (renderDirty) {
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
    drawRankPanel();
    renderDirty = false;
  }
  requestAnimationFrameID = requestAnimationFrame(loop);
}

function context_drawImage(image, x, y, width, height) {
  if (image.width != 0 && image.height != 0 && context) {
    context.globalCompositeOperation = "source-over";
    if (width && height) {
      context.drawImage(image, x, y, width, height);
    } else {
      context.drawImage(image, x, y, width, height);
    }
  }
}
