const app = getApp()

Page({
  data: {
    minutes: 25,
    seconds: '00',
    isRunning: false,
    isWorking: true,
    timer: null,
    remainingTime: 25 * 60,
    todayPomodoros: 0,
    todayMinutes: 0,
    completedPomodoros: 0
  },

  onLoad() {
    this.initTimer();
    this.loadTodayStats();
  },

  onUnload() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  initTimer() {
    const { workTime } = app.globalData;
    this.setData({
      minutes: workTime,
      seconds: '00',
      remainingTime: workTime * 60,
      isWorking: true
    });
  },

  loadTodayStats() {
    const today = new Date().toISOString().split('T')[0];
    const stats = app.globalData.statistics;
    this.setData({
      todayPomodoros: stats.dailyPomodoros[today] || 0,
      todayMinutes: Math.floor(stats.totalWorkTime)
    });
  },

  toggleTimer() {
    if (this.data.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  },

  startTimer() {
    this.setData({ isRunning: true });
    
    this.data.timer = setInterval(() => {
      let remaining = this.data.remainingTime - 1;
      
      if (remaining < 0) {
        this.handleTimerComplete();
        return;
      }

      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;

      this.setData({
        minutes: minutes,
        seconds: seconds < 10 ? '0' + seconds : seconds,
        remainingTime: remaining
      });
    }, 1000);
  },

  pauseTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({ isRunning: false });
    }
  },

  resetTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    this.initTimer();
    this.setData({ isRunning: false });
  },

  handleTimerComplete() {
    clearInterval(this.data.timer);
    
    if (this.data.isWorking) {
      app.updateStatistics();
      this.loadTodayStats();
      
      this.completedPomodoros++;
      const needLongBreak = this.completedPomodoros % app.globalData.longBreakInterval === 0;
      const breakTime = needLongBreak ? app.globalData.longBreakTime : app.globalData.breakTime;
      
      this.setData({
        isWorking: false,
        minutes: breakTime,
        seconds: '00',
        remainingTime: breakTime * 60,
        isRunning: false
      });
    } else {
      this.setData({
        isWorking: true,
        minutes: app.globalData.workTime,
        seconds: '00',
        remainingTime: app.globalData.workTime * 60,
        isRunning: false
      });
    }

    // 提醒用户
    if (app.globalData.notification) {
      wx.showToast({
        title: this.data.isWorking ? '休息结束，开始工作！' : '工作结束，休息一下吧！',
        icon: 'none'
      });
    }
    
    if (app.globalData.vibration) {
      wx.vibrateShort();
    }

    if (app.globalData.autoStart) {
      setTimeout(() => this.startTimer(), 1000);
    }
  }
})