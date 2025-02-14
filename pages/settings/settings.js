const app = getApp()

Page({
  data: {
    workTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    longBreakInterval: 4,
    autoStart: false,
    notification: true,
    vibration: true,
    sound: true
  },

  onShow() {
    this.loadSettings();
  },

  loadSettings() {
    const globalData = app.globalData;
    this.setData({
      workTime: globalData.workTime,
      breakTime: globalData.breakTime,
      longBreakTime: globalData.longBreakTime,
      longBreakInterval: globalData.longBreakInterval,
      autoStart: globalData.autoStart,
      notification: globalData.notification,
      vibration: globalData.vibration,
      sound: globalData.sound
    });
  },

  onWorkTimeChange(e) {
    app.globalData.workTime = e.detail.value;
    app.saveConfig();
  },

  onBreakTimeChange(e) {
    app.globalData.breakTime = e.detail.value;
    app.saveConfig();
  },

  onLongBreakTimeChange(e) {
    app.globalData.longBreakTime = e.detail.value;
    app.saveConfig();
  },

  onLongBreakIntervalChange(e) {
    app.globalData.longBreakInterval = e.detail.value;
    app.saveConfig();
  },

  onAutoStartChange(e) {
    app.globalData.autoStart = e.detail.value;
    app.saveConfig();
  },

  onNotificationChange(e) {
    app.globalData.notification = e.detail.value;
    app.saveConfig();
  },

  onVibrationChange(e) {
    app.globalData.vibration = e.detail.value;
    app.saveConfig();
  },

  onSoundChange(e) {
    app.globalData.sound = e.detail.value;
    app.saveConfig();
  }
})