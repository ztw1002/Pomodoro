const app = getApp()

Page({
  data: {
    totalPomodoros: 0,
    totalHours: 0,
    dailyStats: []
  },

  onShow() {
    this.loadStatistics();
  },

  loadStatistics() {
    const stats = app.globalData.statistics;
    const totalHours = Math.floor(stats.totalWorkTime / 60);

    // 获取近7天的数据
    const dailyStats = [];
    const today = new Date();
    let maxCount = 0;

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = stats.dailyPomodoros[dateStr] || 0;
      maxCount = Math.max(maxCount, count);

      dailyStats.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        count: count,
        percentage: 0 // 先设为0，后面计算
      });
    }

    // 计算百分比
    if (maxCount > 0) {
      dailyStats.forEach(item => {
        item.percentage = Math.floor((item.count / maxCount) * 100);
      });
    }

    this.setData({
      totalPomodoros: stats.totalPomodoros,
      totalHours: totalHours,
      dailyStats: dailyStats
    });
  }
})