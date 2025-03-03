// pages/discuss/discuss.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rectangleData: [],
    allData: []
  },

  ButtonAddPost: function() {
    wx.navigateTo({
      url: '/pages/addPost/addPost'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchRandomDataFromServer();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const newPost = wx.getStorageSync('newPost');
    if (newPost) {
      this.updateFirstRectangle(newPost);
      wx.removeStorageSync('newPost');
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.fetchRandomDataFromServer();
    wx.stopPullDownRefresh();
  },

  /**
   * 从服务器获取随机数据
   */
  fetchRandomDataFromServer() {
    wx.request({
      url: 'https://localhost:7008/api/Post/GetRandomPosts', // 请替换为实际的 API 地址
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const allData = res.data;
          this.setData({ allData });
          this.updateRectangleData();
        }
      },
      fail: (err) => {
        console.error('获取数据失败', err);
      }
    });
  },

  /**
   * 更新矩形区域的数据
   */
  updateRectangleData() {
    const { allData } = this.data;
    const rectangleData = allData.slice(0, 5); // 取前 5 条数据
    this.setData({ rectangleData });
  },

  /**
   * 更新第一个矩形区域的数据
   */
  updateFirstRectangle(newPost) {
    const { rectangleData } = this.data;
    rectangleData[0] = {
      ...newPost,
      color: 'red'
    };
    this.setData({ rectangleData });
  },

  /**
   * 导航到详情页面
   */
  navigateToDetail(e) {
    const index = e.currentTarget.dataset.index;
    const { rectangleData } = this.data;
    const item = rectangleData[index];
    wx.navigateTo({
        url: `/pages/detail/detail?title=${item.title}&content=${item.content}&postId=${item.postId}` // 添加 postId 参数
        
    });
  },
  onReachBottom() {
    this.fetchRandomDataFromServer();
  }
})