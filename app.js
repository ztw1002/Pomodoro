App({
  globalData: {
    workTime: 25, // 工作时长（分钟）
    breakTime: 5, // 休息时长（分钟）
    longBreakTime: 15, // 长休息时长（分钟）
    longBreakInterval: 4, // 长休息间隔（番茄钟数）
    autoStart: false, // 自动开始下一个计时
    notification: true, // 通知提醒
    vibration: true, // 振动提醒
    sound: true, // 声音提醒
    statistics: {
      totalPomodoros: 0, // 总番茄钟数
      totalWorkTime: 0, // 总专注时间（分钟）
      dailyPomodoros: {}, // 每日番茄钟数据
    }
  },

  onLaunch() {
    // 从本地存储加载配置
    const config = wx.getStorageSync('pomodoro_config');
    if (config) {
      Object.assign(this.globalData, config);
    }

    // 从本地存储加载统计数据
    const stats = wx.getStorageSync('pomodoro_stats');
    if (stats) {
      this.globalData.statistics = stats;
    }
  },

  // 保存配置到本地存储
  saveConfig() {
    wx.setStorageSync('pomodoro_config', {
      workTime: this.globalData.workTime,
      breakTime: this.globalData.breakTime,
      longBreakTime: this.globalData.longBreakTime,
      longBreakInterval: this.globalData.longBreakInterval,
      autoStart: this.globalData.autoStart,
      notification: this.globalData.notification,
      vibration: this.globalData.vibration,
      sound: this.globalData.sound
    });
  },

  // 保存统计数据到本地存储
  saveStatistics() {
    wx.setStorageSync('pomodoro_stats', this.globalData.statistics);
  },

  // 更新统计数据
  updateStatistics() {
    const today = new Date().toISOString().split('T')[0];
    const stats = this.globalData.statistics;
    
    stats.totalPomodoros++;
    stats.totalWorkTime += this.globalData.workTime;
    
    if (!stats.dailyPomodoros[today]) {
      stats.dailyPomodoros[today] = 0;
    }
    stats.dailyPomodoros[today]++;
    
    this.saveStatistics();
  }
})