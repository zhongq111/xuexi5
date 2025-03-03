// pages/person/person.js
Page({
  data: {
    userInfo: {
      avatarUrl: '',
      nickname: '',
      gender: 0,
      class: '',
      signature: '',
      phone: ''
    },
    editUserInfo: {},
    isEditPopupShow: false,
    genderList: ['男', '女', '未知'],
    defaultAvatarUrl: '../../tupiansucai/tp19.png' // 默认黑白头像的 URL
  },

  onLoad() {
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (!isLoggedIn) {
      // 如果未登录，跳转到登录页面
      wx.redirectTo({
        url: '/pages/login/login'
      });
      return;
    }

    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      // 判断头像是否为空，如果为空则使用默认头像
      const avatarUrl = userInfo.avatarUrl ? userInfo.avatarUrl : this.data.defaultAvatarUrl;
      userInfo.avatarUrl = avatarUrl;

      // 判断昵称是否为空，如果为空则默认为“用户”
      if (!userInfo.nickname) {
        userInfo.nickname = '用户';
      }

      this.setData({
        userInfo: userInfo,
        editUserInfo: userInfo
      });
    }
  },

  // 打开修改表单
  openEditPopup() {
    this.setData({
      isEditPopupShow: true
    });
  },

  // 关闭修改表单
  closeEditPopup() {
    this.setData({
      isEditPopupShow: false
    });
  },

  // 选择头像
  chooseAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        console.log('chooseMedia success res:', res);
        if (res.tempFiles && res.tempFiles.length > 0) {
          const filePath = res.tempFiles[0].tempFilePath;
          wx.getFileSystemManager().readFile({
            filePath: filePath,
            encoding: 'base64',
            success: (base64Res) => {
              this.setData({
                'editUserInfo.avatarUrl': `data:image/jpeg;base64,${base64Res.data}`
              });
            },
            fail: (err) => {
              console.log('读取文件失败:', err);
            }
          });
        } else {
          wx.showToast({
            title: '未选择任何文件',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.log('chooseMedia fail:', err);
      }
    });
  },

  // 昵称输入事件
  onNicknameInput(e) {
    this.setData({
      'editUserInfo.nickname': e.detail.value
    });
  },

  // 性别选择事件
  onGenderChange(e) {
    this.setData({
      'editUserInfo.gender': parseInt(e.detail.value) + 1
    });
  },

  // 签名输入事件
  onSignatureInput(e) {
    this.setData({
      'editUserInfo.signature': e.detail.value
    });
  },

  // 手机号输入事件
  onPhoneInput(e) {
    this.setData({
      'editUserInfo.phone': e.detail.value
    });
  },

  // 保存修改
  saveChanges() {
    const userAccount = wx.getStorageSync('userInfo')?.UserAccount; // 获取用户账号
    if (!userAccount) {
      wx.showToast({
        title: '用户账号获取失败',
        icon: 'none'
      });
      return;
    }

    const editUserInfo = this.data.editUserInfo;

    wx.request({
      url: 'https://localhost:7008/api/User/UpdateUserInfo', // 替换为实际的后端 API 地址
      method: 'POST',
      header: {
        'Content-Type': 'application/json' // 设置请求头为 JSON 格式
      },
      data: JSON.stringify({ // 将数据转换为 JSON 字符串
        userAccount: userAccount,
        avatarUrl: editUserInfo.avatarUrl,
        nickname: editUserInfo.nickname,
        gender: editUserInfo.gender,
        signature: editUserInfo.signature,
        phone: editUserInfo.phone
      }),
      success: (res) => {
        if (res.data.success) {
          this.setData({
            userInfo: this.data.editUserInfo,
            isEditPopupShow: false
          });
          wx.setStorageSync('userInfo', this.data.editUserInfo); // 更新本地存储的用户信息
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
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
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        active: 2
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

  },

  // 退出登录
  ButtonSignOut() {
    wx.redirectTo({
      url: '/pages/logs/logs'
    });
    wx.removeStorageSync('isLoggedIn'); // 清除登录状态
    wx.removeStorageSync('userInfo'); // 清除用户信息
  }
})