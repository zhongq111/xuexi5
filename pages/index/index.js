// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  ButtonStudy(){
    wx.redirectTo({
      url: '/pages/study/study',
    })
  },
  ButtonExam(){
    wx.redirectTo({
      url: '/pages/exam/exam',
    })
  },
  ButtonDiscuss(){
    wx.redirectTo({
      url: '/pages/discuss/discuss',
    })
  },
  ButtonChoose(){
    wx.redirectTo({
      url: '/pages/choose/choose',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (!isLoggedIn) {
      // 如果未登录，跳转到登录页面
      wx.redirectTo({
        url: '/pages/logs/logs'
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(typeof this.getTabBar==="function"&&this.getTabBar()){
      this.getTabBar().setData({
        active:0
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})