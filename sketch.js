let spriteSheet;
let walkSheet;
let jumpSheet;
let pushSheet;
let toolSheet;
let spriteSheet2;
let smileSheet2;
let downSheet2;
let spriteSheet3;
let singSheet4;
let spriteSheet5;
let bgImage;
let walkSheet5;


let stopAnimation = [];
let walkAnimation = [];
let jumpAnimation = [];
let pushAnimation = [];
let toolAnimation = [];
let stopAnimation2 = [];
let smileAnimation2 = [];
let downAnimation2 = [];
let stopAnimation3 = [];
let singAnimation4 = [];
let walkAnimation5 = [];
let stopAnimation5 = [];
let stopAnimation4 = [];


const stopNumberOfFrames = 15;
const walkNumberOfFrames = 9;
const jumpNumberOfFrames = 14;
const pushNumberOfFrames = 4;
const toolNumberOfFrames = 5;


const stopNumberOfFrames2 = 8;
const smileNumberOfFrames2 = 5;
const downNumberOfFrames2 = 12;
const stopNumberOfFrames3 = 8;
const singNumberOfFrames4 = 8;
const walkNumberOfFrames5 = 7;
const stopNumberOfFrames5 = 5;
const stopNumberOfFrames4 = 8;


let frameWidth;
let walkFrameWidth;
let frameWidth3, frameHeight3;
let frameWidth4, frameHeight4;
let singFrameWidth4, singFrameHeight4;
let frameWidth5, frameHeight5;
let walkFrameWidth5, walkFrameHeight5;


// 角色的位置和速度
let x, y, x2, y2, x3, y3, x4, y4, x5, y5, x5_orig, y5_orig;
let speed = 5;
let direction = 1; // 1 for right, -1 for left
let direction2 = 1; // 1 for right, -1 for left for character 2


// 跳躍相關變數
let isJumping = false;
let velocityY = 0;
let gravity = 0.6;
let jumpStrength = -15; // 負數代表向上
let groundY;


// 角色2 狀態相關變數
let isSmiling2 = false;
let isDown2 = false; // 新增：角色2是否被擊倒的狀態
let downFrame2 = 0;
const downAnimationSpeed2 = 8; // 倒下動畫速度
let smileFrame2 = 0;
const smileAnimationSpeed2 = 8; // 數字越小越快
const proximityThreshold = 150; // 觸發微笑的距離
const verticalProximityThreshold = 100; // 觸發對話的垂直距離


// 對話相關變數
let nameInput;
let playerName = '';
let conversationState = 0; // 0: idle, 1: asking, 2: correct, 3: incorrect


// 角色3 對話相關變數
let conversationState3 = 0; // 0: idle, 1: chatting, 2: waiting_for_name
let nameInput3;
let playerQuestion = '';
let character3Answer = '';

// 角色3 回答資料庫
const stewieAnswers = {
  '你好': [
    "你好啊！今天天氣真不錯。",
    "嗨！有什麼我可以效勞的嗎？",
    "你好，見到你真高興，凡人。"
  ],
  '名字': [
    "我叫 Stewie，你呢？",
    "你可以叫我 Stewie Griffin，未來的世界之王。",
    "Stewie，為您效勞。"
  ],
  '秘密': [
    "我正在計畫統治世界，但...別告訴任何人！",
    "我的秘密？嗯...我其實是個天才。",
    "噓...我把 Brian 的骨頭藏起來了。"
  ],
  '喜歡': [
    "我喜歡毀滅的快感和精密的儀器。",
    "我喜歡 Rupert，我唯一的摯友，我的泰迪熊。",
    "我喜歡看著我的計畫完美實現。"
  ],
  '淡江大學': [
    "啊，淡江大學！我知道那裡，據說風景很美，適合策劃一些...偉大的計畫。",
    "淡江大學？我聽說那裡的學生很有潛力，或許可以招募幾個來當我的手下。",
    "那裡的宮燈教室很有名，對吧？一個充滿古典氣息的地方，也許藏著什麼古老的秘密。"
  ]
};

const stewieDefaultAnswers = [
  "這真是個深奧的問題，讓我想想...",
  "哈哈，你問到點上了！",
  "這讓我想起有一次我和 Brian...",
  "嗯，這很複雜，牽涉到量子物理學和我的時光機。",
  "我得查一下我的邪惡計畫藍圖，稍等一下。",
  "這個嘛... 答案藏在勝利之中！",
  "有趣的想法，我從沒從這個角度思考過。"
];

// 角色4 對話相關變數
let conversationState4 = 0; // 0: idle, 1: asking, 2: replied_normal, 3: replied_sing_intro, 4: singing_animation
let nameInput4;
let currentQuestion4 = null;
let character4Feedback = '';
let brianQuestionPool = []; // 儲存Brian當前回合的題目池

// 角色4 問題與回覆資料庫
const brianQuestions = [
  {
    question: "你今天心情好嗎？",
    getReply: (answer) => {
      if (answer.includes('不好') || answer.includes('不開心') || answer.includes('難過')) {
        return "那我唱歌給你聽吧!";
      } else {
        return `聽起來很棒！保持好心情喔。`;
      }
    }
  },
  {
    question: "你叫什麼名字？",
    getReply: (answer) => `你好，${answer}！很高興認識你。`
  },
  {
    question: "你今年幾歲？",
    getReply: (answer) => `${answer}歲啊，真是個美好的年紀。`
  },
  {
    question: "你是男生還是女生？",
    getReply: (answer) => `了解了！`
  },
  {
    question: "你最喜歡的顏色是什麼？",
    getReply: (answer) => `${answer}是個很棒的顏色！我也喜歡。`
  },
  {
    question: "你喜歡小狗還是小貓？",
    getReply: (answer) => `真巧，我也很喜歡${answer}！`
  }
];

// 角色5 對話相關變數
let conversationState5 = 0; // 0: IDLE, 1: WALKING_TO_PLAYER, 2: HINTING, 3: PRAISING, 4: PRAISE_DELAY, 5: WALKING_BACK
let hint5Text = '';
let hint5StartTime = 0;
const hint5Duration = 4000; // 提示顯示時間 (4秒) 


// 攻擊相關變數
let isAttacking = false;
let isSinging4 = false; // 新增：角色4是否在唱歌的狀態
let attackFrame = 0;
let singDelayStartTime = 0; // 唱歌前的延遲計時器
let singFrame4 = 0;
let singRepeatCount = 0; // 唱歌動畫重複次數計數
const attackAnimationSpeed = 6; // 數字越小越快


// 發射物陣列
let projectiles = [];


// 按鈕相關變數
let nextButton;
let tryAgainButton;


// 題庫相關變數
let questionBank;
let currentQuestion;
let questionPool = []; // 儲存當前回合的題目池
const singRepetitions = 4; // 唱歌動畫重複次數
const questionsPerRound = 5; // 每回合出題數量



function preload() {
  // 預先載入圖片
  // 請確保您的資料夾結構是 sketch.js 旁邊有 1/stop/stop.png
  spriteSheet = loadImage('1/stop/stop.png');
  walkSheet = loadImage('1/walk/walk.png');
  jumpSheet = loadImage('1/jump/jump.png');
  pushSheet = loadImage('1/push/push.png');
  toolSheet = loadImage('1/tool/tool.png');
  spriteSheet2 = loadImage('2/stop/stop_2.png');
  smileSheet2 = loadImage('2/smile/smile_2.png');
  downSheet2 = loadImage('2/down/down_2.png'); // 載入角色2的倒下動畫
  spriteSheet3 = loadImage('3/stop/stop.png'); // 載入角色3的站立動畫
  singSheet4 = loadImage('4/sing/sing.png');
  walkSheet5 = loadImage('5/walk/walk.png'); // 載入角色5走路動畫
  spriteSheet5 = loadImage('5/stop/stop.png'); // 載入角色5的站立動畫
  spriteSheet4 = loadImage('4/stop/stop.png'); // 載入角色4的站立動畫
  bgImage = loadImage('map/1.png'); // 載入背景圖片


  // 載入題庫 CSV 檔案
  questionBank = loadTable('questions.csv', 'csv', 'header');
}


function setup() {
  // 建立一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);


  // 初始化角色位置在畫面中央
  x = width / 2;
  y = height / 2 - 90; // 將角色1向上移動100像素
  x2 = width / 2 - 600; // 將角色2放在更左邊
  y2 = height / 2 - 375; // 向上移動 50 像素
  x3 = width / 2 + 500; // 將角色3放在更右邊
  y3 = height / 2 - 300; // 向上移動 50 像素
  x4 = width / 2 - 660; // 將角色4的X座標設為對稱位置
  y4 = y2 + 650; // 將角色4再往下移
  x5 = width / 2 + 660; // 將角色5的X座標設為對稱位置
  y5 = y4; // 角色5的Y座標與角色4相同 (平行)
  x5_orig = x5; // 儲存角色5的原始位置
  y5_orig = y5;


  // 計算單一畫格的寬度
  frameWidth = spriteSheet.width / stopNumberOfFrames;
  let frameHeight = spriteSheet.height;
  for (let i = 0; i < stopNumberOfFrames; i++) {
    let frame = spriteSheet.get(i * frameWidth, 0, frameWidth, frameHeight);
    stopAnimation.push(frame);
  }


  // 計算單一畫格的寬度並切割走路動畫
  walkFrameWidth = walkSheet.width / walkNumberOfFrames;
  let walkFrameHeight = walkSheet.height;
  for (let i = 0; i < walkNumberOfFrames; i++) {
    let frame = walkSheet.get(
      i * walkFrameWidth, 0, 
      walkFrameWidth, walkFrameHeight
    );
    walkAnimation.push(frame);
  }


  // 計算單一畫格的寬度並切割跳躍動畫
  let jumpFrameWidth = jumpSheet.width / jumpNumberOfFrames;
  let jumpFrameHeight = jumpSheet.height;
  for (let i = 0; i < jumpNumberOfFrames; i++) {
    let frame = jumpSheet.get(
      i * jumpFrameWidth, 0,
      jumpFrameWidth, jumpFrameHeight
    );
    jumpAnimation.push(frame);
  }


  // 計算單一畫格的寬度並切割攻擊動畫
  let pushFrameWidth = pushSheet.width / pushNumberOfFrames;
  let pushFrameHeight = pushSheet.height;
  for (let i = 0; i < pushNumberOfFrames; i++) {
    let frame = pushSheet.get(
      i * pushFrameWidth, 0,
      pushFrameWidth, pushFrameHeight
    );
    pushAnimation.push(frame);
  }


  // 計算單一畫格的寬度並切割發射物動畫
  let toolFrameWidth = toolSheet.width / toolNumberOfFrames;
  let toolFrameHeight = toolSheet.height;
  for (let i = 0; i < toolNumberOfFrames; i++) {
    let frame = toolSheet.get(
      i * toolFrameWidth, 0, toolFrameWidth, toolFrameHeight);
    toolAnimation.push(frame);
  }


  // 計算新角色單一畫格的寬度並切割站立動畫
  let frameWidth2 = spriteSheet2.width / stopNumberOfFrames2;
  let frameHeight2 = spriteSheet2.height;
  for (let i = 0; i < stopNumberOfFrames2; i++) {
    let frame = spriteSheet2.get(i * frameWidth2, 0, frameWidth2, frameHeight2);
    stopAnimation2.push(frame);
  }


  // 計算新角色微笑動畫的畫格
  let smileFrameWidth2 = smileSheet2.width / smileNumberOfFrames2;
  let smileFrameHeight2 = smileSheet2.height;
  for (let i = 0; i < smileNumberOfFrames2; i++) {
    let frame = smileSheet2.get(i * smileFrameWidth2, 0, smileFrameWidth2, smileFrameHeight2);
    smileAnimation2.push(frame);
  }


  // 計算角色2倒下動畫的畫格
  let downFrameWidth2 = downSheet2.width / downNumberOfFrames2;
  let downFrameHeight2 = downSheet2.height;
  for (let i = 0; i < downNumberOfFrames2; i++) {
    let frame = downSheet2.get(i * downFrameWidth2, 0, downFrameWidth2, downFrameHeight2);
    downAnimation2.push(frame);
  }

  // 計算角色3單一畫格的寬度並切割站立動畫
  frameWidth3 = spriteSheet3.width / stopNumberOfFrames3;
  frameHeight3 = spriteSheet3.height;
  for (let i = 0; i < stopNumberOfFrames3; i++) {
    let frame = spriteSheet3.get(i * frameWidth3, 0, frameWidth3, frameHeight3);
    stopAnimation3.push(frame);
  }

  // 計算角色4唱歌動畫單一畫格的寬度並切割
  singFrameWidth4 = singSheet4.width / singNumberOfFrames4;
  singFrameHeight4 = singSheet4.height;
  for (let i = 0; i < singNumberOfFrames4; i++) {
    let frame = singSheet4.get(i * singFrameWidth4, 0, singFrameWidth4, singFrameHeight4);
    singAnimation4.push(frame);
  }

  // 移除舊的輸入框，避免重複
  if (nameInput) {
    nameInput.remove();
    nameInput = null;
  }

  // 計算角色4單一畫格的寬度並切割站立動畫
  frameWidth4 = spriteSheet4.width / stopNumberOfFrames4;
  frameHeight4 = spriteSheet4.height;
  for (let i = 0; i < stopNumberOfFrames4; i++) {
    let frame = spriteSheet4.get(i * frameWidth4, 0, frameWidth4, frameHeight4);
    stopAnimation4.push(frame);
  }

  // 計算角色5單一畫格的寬度並切割站立動畫
  frameWidth5 = spriteSheet5.width / stopNumberOfFrames5;
  frameHeight5 = spriteSheet5.height;
  for (let i = 0; i < stopNumberOfFrames5; i++) {
    let frame = spriteSheet5.get(i * frameWidth5, 0, frameWidth5, frameHeight5);
    stopAnimation5.push(frame);
  }

  // 計算角色5走路動畫單一畫格的寬度並切割
  walkFrameWidth5 = walkSheet5.width / walkNumberOfFrames5;
  walkFrameHeight5 = walkSheet5.height;
  for (let i = 0; i < walkNumberOfFrames5; i++) {
    let frame = walkSheet5.get(i * walkFrameWidth5, 0, walkFrameWidth5, walkFrameHeight5);
    walkAnimation5.push(frame);
  }
}


function draw() {
  // 設定背景顏色
  // 將圖片的繪製基準點設為左上角來繪製背景
  imageMode(CORNER);
  image(bgImage, 0, 0, width, height);

  // --- 物理與狀態更新 ---
  // 將圖片的繪製基準點設為中心
  imageMode(CENTER);

  if (isJumping) {
    // 如果在跳躍中，應用重力並更新 y 座標
    velocityY += gravity;
    y += velocityY;


    // 如果角色落回地面
    if (y >= groundY) {
      y = groundY; // 確保角色不會掉到地下
      velocityY = 0;
      isJumping = false; // 結束跳躍
    }
  }


  if (isAttacking) {
    // 如果不在跳躍但在攻擊中
    attackFrame++;
    if (attackFrame >= pushNumberOfFrames * attackAnimationSpeed) {
      // 攻擊動畫結束
      isAttacking = false;
      attackFrame = 0;
      // 產生一個發射物
      projectiles.push({
        x: x + (direction * 50), // 從角色前方產生
        y: y,
        direction: direction,
        speed: 40, // 增加發射物速度，使其飛得更遠
        frame: 0
      });
    }
  } else {
    // 如果不在攻擊中，處理移動
    if (keyIsDown(68)) { // 'D' key
      x += speed;
      direction = 1;
    }
    if (keyIsDown(65)) { // 'A' key
      x -= speed;
      direction = -1;
    }
    // 只有在不跳躍時才能上下移動
    if (!isJumping) {
      if (keyIsDown(87)) { // 'W' key
        y -= speed;
      }
      if (keyIsDown(83)) { // 'S' key
        y += speed;
      }
    }
  }


  // 使用 constrain() 函式將角色的 x 座標限制在畫布範圍內
  x = constrain(x, stopAnimation[0].width / 2, width - stopAnimation[0].width / 2);
  y = constrain(y, stopAnimation[0].height / 2, height - stopAnimation[0].height / 2);


  // --- 繪圖 ---


  // 繪製所有發射物
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    p.x += p.speed * p.direction;
    p.frame++;


    push();
    translate(p.x, p.y);
    scale(p.direction, 1);
    let frameIndex = floor(p.frame / 4) % toolNumberOfFrames;
    image(toolAnimation[frameIndex], 0, 0);
    pop();


    // 檢查發射物是否擊中角色2
    let hitThreshold = 50; // 判定擊中的距離
    if (abs(p.x - x2) < hitThreshold && abs(p.y - y2) < hitThreshold) {
      if (!isDown2) { // 只有在角色還沒倒下時才觸發
        isDown2 = true; // 設定角色2為被擊倒狀態
        downFrame2 = 0; // 重置倒下動畫計數器
        isSmiling2 = false; // 確保不會同時微笑
      }
      projectiles.splice(i, 1); // 移除擊中的發射物
      continue; // 繼續下一個循環，避免檢查已移除的物件
    } else if (p.x > width || p.x < 0) {
      projectiles.splice(i, 1);
    }
  }


  // 根據角色1的位置決定角色2的方向
  if (x < x2) {
    direction2 = -1; // 角色1在左邊，角色2朝左
  } else {
    direction2 = 1; // 角色1在右邊，角色2朝右
  }


  // --- 對話狀態機 ---
  let isClose = abs(x - x2) < proximityThreshold && abs(y - y2) < verticalProximityThreshold;


  if (isClose && conversationState === 0) {
    // 靠近時開始對話
    if (isDown2) {
      isDown2 = false; // 如果角色2是倒下的，靠近時讓它恢復
    }
    // 只有在題庫載入成功且還沒提問時，才開始提問
    if (questionBank && questionBank.getRowCount() > 0) {
      if (questionPool.length === 0) {
        // 如果題目池為空，則重新生成一組隨機且不重複的題目
        let allQuestions = questionBank.getRows();
        let tempPool = [];
        let availableIndices = Array.from({length: allQuestions.length}, (_, i) => i); // 建立所有題目的索引陣列

        // 從所有題目中隨機選取 questionsPerRound 題不重複的題目
        // 確保不會選取超過實際題目數量
        let numToPick = min(questionsPerRound, allQuestions.length);
        for (let i = 0; i < numToPick; i++) {
          let randomIndex = floor(random(availableIndices.length));
          let questionIndex = availableIndices[randomIndex];
          tempPool.push(allQuestions[questionIndex]);
          availableIndices.splice(randomIndex, 1); // 移除已選取的索引，確保不重複
        }
        questionPool = tempPool;
      }

      currentQuestion = questionPool.shift(); // 從題目池中取出第一道題目並移除
      conversationState = 1;

    }
  } else if (!isClose && conversationState !== 0) {
    // 離開時結束對話
    conversationState = 0;
    playerName = '';
    if (nameInput) {
      nameInput.remove();
      nameInput = null;
    }
    // 無論如何都移除按鈕
    removeButtons();
  }

  // --- 角色4 對話狀態機 ---
  let isClose4 = abs(x - x4) < proximityThreshold && abs(y - y4) < verticalProximityThreshold;

  if (isClose4 && conversationState4 === 0) {
    // 靠近時，隨機選一個問題開始對話
    if (brianQuestionPool.length === 0) {
      // 如果題目池為空，則重新生成一組隨機且不重複的題目
      brianQuestionPool = shuffle(brianQuestions.slice()); // 複製一份並打亂
    }
    currentQuestion4 = brianQuestionPool.shift(); // 從題目池中取出第一道題目並移除
    conversationState4 = 1; // 進入提問狀態
    isSinging4 = false;
    singRepeatCount = 0; // 重置唱歌重複次數
  } else if (!isClose4 && conversationState4 !== 0) {
    // 離開時結束對話
    conversationState4 = 0;
    character4Feedback = '';
    currentQuestion4 = null;
    if (nameInput4) {
      nameInput4.remove();
      nameInput4 = null;
    }
    if (nextButton) {
      nextButton.remove();
      nextButton = null;
    }
    singRepeatCount = 0; // 離開時重置唱歌重複次數
    brianQuestionPool = []; // 離開時清空題目池
    isSinging4 = false;
  }
  // --- 角色3 對話狀態機 ---
  let isClose3 = abs(x - x3) < proximityThreshold && abs(y - y3) < verticalProximityThreshold;

  if (isClose3 && conversationState3 === 0) {
    // 靠近時開始對話
    conversationState3 = 1; // 進入聊天狀態
  } else if (!isClose3 && conversationState3 !== 0) {
    // 離開時結束對話
    conversationState3 = 0;
    playerQuestion = '';
    character3Answer = '';
    if (nameInput3) {
      nameInput3.remove();
      nameInput3 = null;
    }
  }

  // 根據對話狀態決定是否微笑 (提問或顯示回饋時都微笑)，且角色沒有被擊倒
  if (conversationState > 0 && !isDown2) {
    isSmiling2 = true;
  } else {
    isSmiling2 = false;
  }

  // 檢查是否需要觸發角色5的稱讚
  // 當玩家答對(state 2)且角色5正在提示(state 2)時
  if (conversationState === 2 && conversationState5 === 2) {
    conversationState5 = 3; // 切換到稱讚狀態
    hint5StartTime = millis(); // 重置計時器用於稱讚顯示
  }
  // --- 角色5 提示狀態機 ---
  switch (conversationState5) {
    case 1: // WALKING_TO_PLAYER
      let targetX = x + 120; // 走到玩家的右邊，距離拉遠一點
      let targetY = y + 80; // 走到玩家的右下角
      let dx = targetX - x5;
      let dy = targetY - y5;
      let dist = sqrt(dx * dx + dy * dy);
      if (dist > speed) {
        x5 += (dx / dist) * speed;
        y5 += (dy / dist) * speed;
      } else {
        x5 = targetX;
        y5 = targetY;
        conversationState5 = 2; // 到達目的地，開始提示
      }
      break;
    case 2: // HINTING
      // 停在原地等待，直到玩家答對
      break;
    case 3: // PRAISING
      if (millis() - hint5StartTime > 2000) { // 稱讚顯示2秒
        conversationState5 = 4; // 稱讚結束，進入延遲狀態
        hint5StartTime = millis(); // 重置計時器用於延遲
      }
      break;
    case 4: // PRAISE_DELAY
      if (millis() - hint5StartTime > 200) { // 延遲0.5秒
        conversationState5 = 5; // 延遲結束，開始走回去
      }
      break;
    case 5: // WALKING_BACK
      let dx_back = x5_orig - x5;
      let dy_back = y5_orig - y5;
      let dist_back = sqrt(dx_back * dx_back + dy_back * dy_back);
      if (dist_back > speed) {
        x5 += (dx_back / dist_back) * speed;
        y5 += (dy_back / dist_back) * speed;
      } else {
        x5 = x5_orig;
        y5 = y5_orig;
        conversationState5 = 0; // 回到原位，進入IDLE狀態
      }
      break;
  }


  // 繪製新角色 (如果動畫已準備好)
  if (stopAnimation2.length > 0) {
    push();
    translate(x2, y2);
    scale(direction2, 1); // 根據方向翻轉角色2


    if (isDown2 && downAnimation2.length > 0) {
      // 播放一次倒下動畫
      let frameIndex = floor(downFrame2 / downAnimationSpeed2);
      if (frameIndex < downNumberOfFrames2) {
        image(downAnimation2[frameIndex], 0, 0);
        downFrame2++; // 遞增動畫計數器
      } else {
        // 動畫播放完畢，恢復站立
        isDown2 = false;
      }
    } else if (isSmiling2) {
      // 播放微笑動畫
      // 讓動畫循環播放
      image(smileAnimation2[floor(frameCount / smileAnimationSpeed2) % smileNumberOfFrames2], 0, 0);
    } else {
      // 播放站立動畫
      image(stopAnimation2[floor(frameCount / 8) % stopNumberOfFrames2], 0, 0);
    }


    pop();
  }


  // 如果角色2正在微笑且沒有被擊倒，則在其上方顯示對話框
  if (isSmiling2 && !isDown2 && smileAnimation2.length > 0) {
    let dialogueText = "";
    let boxWidth = 300; // 增加對話框寬度，以容納更多文字
    let boxHeight = 100; // 增加對話框高度，以容納更多文字


    if (conversationState === 1) {
      if (currentQuestion) {
        dialogueText = currentQuestion.getString('題目'); // 從題庫取得題目文字
      } else {
        dialogueText = "題庫載入中...";
      }


      // 如果輸入框不存在，則創建它
      if (!nameInput) {
        nameInput = createInput();
        nameInput.size(150);
      }
      // 持續更新輸入框位置在角色1的頭上
      let inputX = x - nameInput.width / 2;
      let inputY = y - stopAnimation[0].height / 2 - 40; // 放在角色1頭頂上方40像素處
      nameInput.position(inputX, inputY);


    } else if (conversationState === 2) { // 答對了
      dialogueText = currentQuestion.getString('答對回饋').trim();
      // 顯示 "下一題" 按鈕
      if (!nextButton) {
        const smileImgHeight = smileAnimation2[0].height;
        const boxY = y2 + smileImgHeight / 2 + boxHeight / 2 + 20; // 計算對話框的Y座標
        nextButton = createButton('下一題');
        const buttonX = x2 - nextButton.width / 2;
        const buttonY = boxY + boxHeight / 2 + 10; // 將按鈕放在對話框下方
        nextButton.position(buttonX, buttonY);
        nextButton.mousePressed(() => {
          conversationState = 0; // 重置對話狀態以觸發新問題
          currentQuestion = null; // 明確清除當前問題
          removeButtons();
        });
      }
    } else if (conversationState === 3) { // 答錯了
      const wrongFeedback = currentQuestion.getString('答錯回饋').trim(); // 例如 "不對喔，再想一下。"
      dialogueText = wrongFeedback; // 只顯示答錯回饋，不顯示提示
      // 顯示 "再答一次" 按鈕
      if (!tryAgainButton) {
        const smileImgHeight = smileAnimation2[0].height;
        const boxY = y2 + smileImgHeight / 2 + boxHeight / 2 + 20; // 計算對話框的Y座標
        tryAgainButton = createButton('再答一次');
        const buttonX = x2 - tryAgainButton.width / 2;
        const buttonY = boxY + boxHeight / 2 + 10; // 將按鈕放在對話框下方
        tryAgainButton.position(buttonX, buttonY);
        tryAgainButton.mousePressed(() => {
          conversationState = 1; // 回到提問狀態
          removeButtons();
        });
      }
    }


    push();
    // 設定對話框樣式
    // 取得當前微笑圖片的高度來定位對話框
    let smileImgHeight = smileAnimation2[0].height;
    let boxX = x2; // 對話框的X座標
    let boxY = y2 + smileImgHeight / 2 + boxHeight / 2 + 20; // 放在角色下方一點


    // 使用新的可愛對話框函數
    drawCuteDialogueBox(boxX, boxY, boxWidth, boxHeight, 'blue', x2 * y2);

    // 設定文字樣式並繪製對話內容
    fill(0); // 黑色文字
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    
    // 使用新的文字處理函數來換行
    const lines = wrapText(dialogueText, boxWidth - 20, textSize());
    const lineHeight = 20; // 每行文字的高度，可根據字體大小調整
    const totalTextHeight = lines.length * lineHeight;
    let textStartY = boxY - totalTextHeight / 2 + lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], boxX, textStartY + i * lineHeight);
    }
    pop();
  }

  // --- 繪製角色4 --- (動畫邏輯)
  if (stopAnimation4.length > 0) {
    push();
    translate(x4, y4);

    if (conversationState4 === 3) { // 準備唱歌狀態 (顯示對話框，等待延遲)
      if (millis() - singDelayStartTime >= 1000) { // 延遲1秒後開始唱歌
        conversationState4 = 4; // 切換到唱歌動畫狀態
        singFrame4 = 0; // 重置唱歌動畫幀
        singRepeatCount = 0; // 重置唱歌重複次數
      }
      // 播放站立動畫
      let frameIndex = floor(frameCount / 8) % stopNumberOfFrames4;
      // 放大角色4 (1.5倍)
      image(stopAnimation4[frameIndex], 0, 0, frameWidth4 * 1.5, frameHeight4 * 1.5);
    } else if (conversationState4 === 4 && singAnimation4.length > 0) { // 唱歌動畫狀態
      let frameIndex = floor(singFrame4 / 8) % singNumberOfFrames4;
      image(singAnimation4[frameIndex], 0, 0, singFrameWidth4 * 1.5, singFrameHeight4 * 1.5);
      singFrame4++;

      // 檢查是否完成一輪動畫
      if (singFrame4 >= singNumberOfFrames4 * 8) {
        singRepeatCount++;
        singFrame4 = 0; // 重置動畫幀，準備下一輪
        if (singRepeatCount >= singRepetitions) { // 達到重複次數
          conversationState4 = 2; // 唱歌結束後回到回覆狀態
          singRepeatCount = 0; // 重置重複次數
        }
      }
    } else { // 預設站立動畫 (idle, asking, replied_normal)
      let frameIndex = floor(frameCount / 8) % stopNumberOfFrames4;
      image(stopAnimation4[frameIndex], 0, 0, frameWidth4 * 1.5, frameHeight4 * 1.5);
    }
    pop();
  }

  // --- 繪製角色4的對話框 ---
  if ((conversationState4 === 1 || conversationState4 === 2 || conversationState4 === 3) && currentQuestion4) {
    let dialogueText4 = "";
    const boxWidth = 300;
    const lineHeight = 22;

    if (conversationState4 === 1) { // 提問階段
      dialogueText4 = currentQuestion4.question;
      // 如果輸入框不存在，則創建它
      if (!nameInput4) {
        nameInput4 = createInput();
        nameInput4.size(150);
        nameInput4.position(-width, -height); // 先藏起來
      }
      // 持續更新輸入框位置在角色1的頭上
      nameInput4.position(x - nameInput4.width / 2, y - stopAnimation[0].height / 2 - 40);

    } else if (conversationState4 === 2) { // 回覆階段
      dialogueText4 = character4Feedback;
      // 只有在正常回覆狀態才顯示按鈕
      if (!nextButton) {
        const boxHeight = max(100, wrapText(dialogueText4, boxWidth - 30, 18).length * lineHeight + 20);
        let boxY = y4 - (frameHeight4 * 1.5) / 2 - boxHeight / 2 - 10;
        nextButton = createButton('繼續聊天');
        let buttonX = x4 - nextButton.width / 2;
        let buttonY = boxY - boxHeight / 2 - 40; // 將按鈕放在對話框上方
        nextButton.position(buttonX, buttonY);
        nextButton.mousePressed(() => {
          conversationState4 = 0; // 重置狀態以觸發新問題
          removeButtons();
        });
      }
    } else if (conversationState4 === 3) { // 準備唱歌階段
      dialogueText4 = character4Feedback; // 顯示 "那我唱歌給你聽吧!"
    }

    const lines = wrapText(dialogueText4, boxWidth - 30, 18);
    const boxHeight = max(100, lines.length * lineHeight + 20);

    let boxX = x4;
    let boxY = y4 - (frameHeight4 * 1.5) / 2 - boxHeight / 2 - 10;
    drawCuteDialogueBox(boxX, boxY, boxWidth, boxHeight, 'green', x4 * y4);

    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    const totalTextHeight = lines.length * lineHeight;
    let textStartY = boxY - totalTextHeight / 2 + lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], boxX, textStartY + i * lineHeight);
    }
  }

  // --- 繪製角色3的對話框 ---
  if (conversationState3 > 0) {
    let dialogueText3 = "";
    const boxWidth = 300;
    const lineHeight = 22; // 設定每行文字的高度

    if (conversationState3 === 1 || conversationState3 === 2) { // 聊天階段 或 等待名字階段
      // 如果有回答，顯示回答；否則顯示初始問候語
      dialogueText3 = character3Answer || "有什麼問題想問嗎～";
      // 如果輸入框不存在，則創建它
      if (!nameInput3) {
        nameInput3 = createInput();
        nameInput3.size(150);
        nameInput3.position(-width, -height); // 先藏起來
      }
      // 持續更新輸入框位置在角色1的頭上，並讓它顯示出來
      nameInput3.position(x - nameInput3.width / 2, y - stopAnimation[0].height / 2 - 40);
    }

    // 使用新的文字處理函數來換行
    const lines = wrapText(dialogueText3, boxWidth - 30, 18);

    // 根據行數動態計算對話框高度
    const boxHeight = max(100, lines.length * lineHeight + 20); // 最小高度為100

    push();
    // 設定對話框樣式
    let boxX = x3;
    let boxY = y3 - (frameHeight3 * 1.5) / 2 - boxHeight / 2 - 10; // 放在角色3頭頂上方
    
    // 使用新的可愛對話框函數
    drawCuteDialogueBox(boxX, boxY, boxWidth, boxHeight, 'pink', x3 * y3);
    // 設定文字樣式並繪製對話內容
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    
    // 逐行繪製文字，使其在動態高度的對話框中垂直居中
    const totalTextHeight = lines.length * lineHeight;
    let textStartY = boxY - totalTextHeight / 2 + lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], boxX, textStartY + i * lineHeight);
    }
    pop();
  }

  // --- 繪製角色3 ---
  if (stopAnimation3.length > 0) {
    push();
    translate(x3, y3);

    // 根據角色1的位置決定角色3的方向
    let direction3 = (x < x3) ? -1 : 1;
    scale(direction3, 1); // 根據方向翻轉角色3

    // 播放站立動畫
    let frameIndex = floor(frameCount / 8) % stopNumberOfFrames3;
    // 放大角色3 (1.5倍)
    image(stopAnimation3[frameIndex], 0, 0, frameWidth3 * 1.5, frameHeight3 * 1.5);

    pop();
  }

  // --- 繪製角色5 ---
  if (stopAnimation5.length > 0) {
    push();
    translate(x5, y5);    
    let direction5 = 1;

    if (conversationState5 === 1) { // 走向玩家
      direction5 = (x > x5) ? 1 : -1;
      scale(direction5, 1);
      image(walkAnimation5[floor(frameCount / 4) % walkNumberOfFrames5], 0, 0, walkFrameWidth5 * 1.2, walkFrameHeight5 * 1.2);
    } else if (conversationState5 >= 2 && conversationState5 <= 4) { // 提示中、稱讚中或延遲中
      direction5 = (x > x5) ? 1 : -1;
      scale(direction5, 1);
      image(stopAnimation5[floor(frameCount / 8) % stopNumberOfFrames5], 0, 0, frameWidth5 * 1.2, frameHeight5 * 1.2);
    } else if (conversationState5 === 5) { // 走回去
      direction5 = (x5_orig > x5) ? 1 : -1;
      scale(direction5, 1);
      image(walkAnimation5[floor(frameCount / 4) % walkNumberOfFrames5], 0, 0, walkFrameWidth5 * 1.2, walkFrameHeight5 * 1.2);
    } else { // IDLE
      scale(-1, 1); // 預設朝左
      image(stopAnimation5[floor(frameCount / 8) % stopNumberOfFrames5], 0, 0, frameWidth5 * 1.2, frameHeight5 * 1.2);
    }
    pop();
  }

  // --- 繪製角色5的提示框 ---
  if (conversationState5 >= 1 && conversationState5 <= 4) { // 在走路、提示、稱讚和延遲狀態都顯示對話框
    let dialogueText5 = "";
    if (conversationState5 === 1) {
      dialogueText5 = "我來給你提示了"; // 走路時顯示的文字
    } else if (conversationState5 === 2) {
      dialogueText5 = hint5Text; // 停止時顯示的實際提示
    } else if (conversationState5 === 3 || conversationState5 === 4) {
      dialogueText5 = "太棒了，你真聰明！"; // 稱讚的文字
    }

    const boxWidth = 300;
    const lineHeight = 22;
    const lines = wrapText(dialogueText5, boxWidth - 30, 18); // 使用動態文字
    const boxHeight = max(100, lines.length * lineHeight + 20);

    // 將提示框定位在角色5的頭上
    let boxX = x5;
    let boxY = y5 - (frameHeight5 * 1.2) / 2 - boxHeight / 2 - 10;

    // 使用黃色主題的對話框來顯示提示
    drawCuteDialogueBox(boxX, boxY, boxWidth, boxHeight, 'yellow', x5_orig * y5_orig);

    // 繪製文字
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    const totalTextHeight = lines.length * lineHeight;
    let textStartY = boxY - totalTextHeight / 2 + lineHeight / 2;
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], boxX, textStartY + i * lineHeight);
    }
  }

  // 繪製角色
  push();
  translate(x, y);
  scale(direction, 1); // 根據方向翻轉圖片


  if (isJumping) {
    // 播放跳躍動畫
    let frameIndex = floor(map(velocityY, jumpStrength, -jumpStrength, 0, jumpNumberOfFrames - 1));
    frameIndex = constrain(frameIndex, 0, jumpNumberOfFrames - 1);    
    image(jumpAnimation[frameIndex], 0, 0, jumpAnimation[frameIndex].width * 0.9, jumpAnimation[frameIndex].height * 0.9);
  } else if (isAttacking) {
    // 播放攻擊動畫
    let frameIndex = floor(attackFrame / attackAnimationSpeed);
    image(pushAnimation[frameIndex], 0, 0, pushAnimation[frameIndex].width * 0.9, pushAnimation[frameIndex].height * 0.9);
  } else if (keyIsDown(68) || keyIsDown(65) || keyIsDown(87) || keyIsDown(83)) { // 'D', 'A', 'W', or 'S'
    // 播放走路動畫
    image(walkAnimation[floor(frameCount / 4) % walkNumberOfFrames], 0, 0, walkAnimation[0].width * 0.9, walkAnimation[0].height * 0.9);
  } else {
    // 播放站立動畫
    image(stopAnimation[floor(frameCount / 8) % stopNumberOfFrames], 0, 0, stopAnimation[0].width * 0.9, stopAnimation[0].height * 0.9);
  }
  pop();
}


function keyPressed() {
  // 只有在角色不在跳躍或攻擊時才能觸發新動作
  if (isJumping || isAttacking) return;


  if (keyCode === 32) { // Spacebar
    isJumping = true;
    velocityY = jumpStrength;
    groundY = y; // 將當前 y 設為地面
  } else if (keyCode === DOWN_ARROW) { // Down Arrow key
    isAttacking = true;
    attackFrame = 0;
  } else if (keyCode === ENTER && conversationState === 1) {
    // 當正在回答問題時按下 Enter
    const userAnswer = nameInput.value();
    const correctAnswer = currentQuestion.getString('答案').trim();
    if (userAnswer === correctAnswer) {
      conversationState = 2; // 切換到答對回饋狀態
    } else { 
      conversationState = 3; // 切換到答錯回饋狀態
      // 觸發角色5的提示
      if (currentQuestion) {
        conversationState5 = 1; // 開始走向玩家
        hint5Text = currentQuestion.getString('提示').trim(); // 取得提示文字
      }
    }
    // 移除輸入框，準備顯示按鈕
    if (nameInput) {
      nameInput.remove();
      nameInput = null;
    }
  } else if (keyCode === ENTER && conversationState3 === 1 && nameInput3 && nameInput3.value() !== '') { // 狀態1: 正常聊天
    // 當正在向角色3提問時按下 Enter
    playerQuestion = nameInput3.value().toLowerCase(); // 將問題轉為小寫以便比對
    let foundAnswer = false;

    // 遍歷關鍵字資料庫
    for (const keyword in stewieAnswers) {
      if (playerQuestion.includes(keyword)) {
        // 如果找到關鍵字，從對應的答案陣列中隨機選一個
        character3Answer = random(stewieAnswers[keyword]);
        foundAnswer = true;
        // 如果 Stewie 問了你的名字，切換到等待回答的狀態
        if (character3Answer === "我叫 Stewie，你呢？") {
          conversationState3 = 2; // 切換到等待名字的狀態
        }
        break; // 找到就跳出迴圈
      }
    }

    // 如果沒有找到任何關鍵字，從預設答案中隨機選一個
    if (!foundAnswer) {
      character3Answer = random(stewieDefaultAnswers);
    }

    // 清空輸入框，準備下一次輸入
    nameInput3.value('');
  } else if (keyCode === ENTER && conversationState3 === 2 && nameInput3 && nameInput3.value() !== '') { // 狀態2: 回答名字
    // 當 Stewie 等待你的名字時按下 Enter
    const newPlayerName = nameInput3.value();
    character3Answer = `哈囉 ${newPlayerName}，很高興認識你！`;

    // 清空輸入框並回到正常聊天狀態
    nameInput3.value('');
    conversationState3 = 1;
  } else if (keyCode === ENTER && conversationState4 === 1 && nameInput4 && nameInput4.value() !== '') {
    // 當正在回答角色4的問題時按下 Enter
    const userAnswer = nameInput4.value();
    character4Feedback = currentQuestion4.getReply(userAnswer.toLowerCase());

    if (character4Feedback === "那我唱歌給你聽吧!") { // 如果是唱歌觸發語句
      singDelayStartTime = millis(); // 記錄開始延遲的時間
      conversationState4 = 3; // 切換到準備唱歌狀態
    } else {
      conversationState4 = 2; // 切換到回覆狀態
    }
    
    // 移除輸入框
    nameInput4.remove();
    nameInput4 = null;
  }
}

/**
 * 將文字進行換行處理，支援強制切斷長單詞
 * @param {string} text 要處理的文字
 * @param {number} maxWidth 最大寬度
 * @param {number} size 文字大小
 * @returns {string[]} 換行後的文字陣列
 */
function wrapText(text, maxWidth, size) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  push();
  textSize(size);

  for (const word of words) {
    // 檢查單詞本身是否就超過寬度
    if (textWidth(word) > maxWidth) {
      // 強制切斷長單詞
      let tempWord = word;
      while (textWidth(tempWord) > maxWidth) {
        let i = tempWord.length;
        while (textWidth(tempWord.substring(0, i)) > maxWidth) i--;
        lines.push(tempWord.substring(0, i));
        tempWord = tempWord.substring(i);
      }
      currentLine = tempWord + ' ';
    } else if (textWidth(currentLine + word) > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine.trim() !== '') {
    lines.push(currentLine.trim());
  }

  pop();
  return lines;
}

/**
 * 繪製一個帶有裝飾的可愛對話框
 * @param {number} x 中心點X座標
 * @param {number} y 中心點Y座標
 * @param {number} w 寬度
 * @param {number} h 高度
 * @param {string} theme 主題 ('pink', 'blue', 'green', 'yellow')
 * @param {number} seed 固定的隨機種子
 */
function drawCuteDialogueBox(x, y, w, h, theme = 'pink', seed = 1) {
  let borderColor, fillColor, dotColor;

  if (theme === 'blue') {
    borderColor = color(135, 206, 250); // 淺藍 (LightSkyBlue)
    fillColor = color(224, 255, 255, 230); // 淡青色 (LightCyan)
    dotColor = color(135, 206, 250); // 淺藍
  } else if (theme === 'green') {
    borderColor = color(152, 251, 152); // 淺綠 (PaleGreen)
    fillColor = color(240, 255, 240, 230); // 蜜瓜綠 (Honeydew)
    dotColor = color(152, 251, 152); // 淺綠
  } else if (theme === 'yellow') {
    borderColor = color(255, 215, 0); // 金色 (Gold)
    fillColor = color(255, 250, 205, 230); // 檸檬色 (LemonChiffon)
    dotColor = color(255, 215, 0); // 金色
  } else { // 預設為粉色
    borderColor = color(255, 182, 193); // 淺粉色 (LightPink)
    fillColor = color(255, 228, 225, 230); // 粉色 (MistyRose)
    dotColor = color(255, 182, 193); // 淺粉色
  }

  push();
  rectMode(CENTER);
  
  // --- 繪製主體和邊框 ---
  strokeWeight(3); // 邊框加粗
  stroke(borderColor);
  fill(fillColor);
  rect(x, y, w, h, 20); // 圓角加大

  // --- 繪製裝飾 ---
  // 在對話框周圍隨機撒上星星和圓點
  // 為了讓每次繪製的裝飾位置固定，使用x,y座標作為隨機種子
  randomSeed(seed); 
  for (let i = 0; i < 15; i++) {
    // 隨機選擇在上下邊緣還是在左右邊緣
    let px, py;
    if (random() > 0.5) { // 上下
      px = x + random(-w / 2, w / 2);
      py = y + (h / 2 + random(5, 15)) * (random() > 0.5 ? 1 : -1);
    } else { // 左右
      px = x + (w / 2 + random(5, 15)) * (random() > 0.5 ? 1 : -1);
      py = y + random(-h / 2, h / 2);
    }

    if (random() > 0.6) { // 畫星星
      fill(211, 211, 211, 200); // 銀色 (LightGray)
      let starSize = random(3, 7); // 大小兩種星星
      drawStar(px, py, starSize, starSize / 2, 5);
    } else { // 畫圓點
      fill(dotColor, 200);
      circle(px, py, random(4, 8));
    }
  }
  pop();
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function removeButtons() {
  if (nextButton) {
    nextButton.remove();
    nextButton = null;
  }
  if (tryAgainButton) {
    tryAgainButton.remove();
    tryAgainButton = null;
  }
}

function windowResized() {
  // 當視窗大小改變時，自動調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  y2 = height / 2 - 200; // 更新新角色的 y 座標
  y3 = height / 2 - 200; // 更新角色3的 y 座標
  y4 = y2 + 530; // 更新角色4的 y 座標
  // 如果角色5不在移動中，才更新其原始位置
  if (conversationState5 === 0) {
    y5_orig = y4;
    y5 = y4; // 更新角色5的 y 座標，使其與角色4平行
  }
}
