
let time = document.getElementById('time');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');

  let startTime;       // Startボタンクリック時の時刻
  let timeOutid;       // ID
  let elapsedTime = 0; // StartからStopまでの経過時間

  function countUp() {
    let d = new Date(Date.now() - startTime + elapsedTime);
    /* padStart()で二桁または三桁固定表示とする */
    let m = String(d.getMinutes()).padStart(2, '0');
    let s = String(d.getSeconds()).padStart(2, '0');
    let ms = String(d.getMilliseconds()).padStart(2, '0');
    /* 描画 */
    time.textContent = `${m}:${s}.${ms}`;

    timeOutid = setTimeout(() => {
      //再帰呼び出し
      countUp();
    }, 10);
  }

  // 状態:初期 または Reset直後
  function setButtonStateInitial() {
    startButton.classList.remove('inactive'); // 活性
    stopButton.classList.add('inactive')    // 非活性
    resetButton.classList.add('inactive')   // 非活性
  }

  // 状態:タイマー動作中
  function setButtonStateRunning() {
    startButton.classList.add('inactive')   // 非活性
    stopButton.classList.remove('inactive');  // 活性
    resetButton.classList.add('inactive')   // 非活性
  }

  // 状態:タイマー停止中
  function setButtonStateStopped() {
    startButton.classList.remove('inactive'); // 活性
    stopButton.classList.add('inactive')    // 非活性
    resetButton.classList.remove('inactive'); // 活性
  }

  // ボタンを'初期'状態とする
  setButtonStateInitial()

  // Startボタンクリック
  // タイマーを開始します
  startButton.addEventListener('click', () => {
    if (startButton.classList.contains('inactive') === true) {
      return;
    }
    // ボタンをタイマー'動作中'状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  // Stopボタンクリック
  // …タイマーを停止します
  stopButton.addEventListener('click', () => {
    if (stopButton.classList.contains('inactive') === true) {
      return;
    }
    // タイマーを'停止中'状態とする
    setButtonStateStopped();
    clearTimeout(timeOutid);
    elapsedTime += Date.now() - startTime;
  });

  // Resetボタンクリック
  // …タイマーを「00:00.000」で上書きします
  resetButton.addEventListener('click', () => {
    if (resetButton.classList.contains('inactive') === true) {
      return;
    }
    // ボタンを'初期'状態とする
    setButtonStateInitial()
    time.textContent = '00:00:000';
    elapsedTime = 0;
  });