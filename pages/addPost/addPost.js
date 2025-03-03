// pages/addPost/addPost.js
Page({
  data: {
    textareaValue: '',
    titleValue: '' // 新增标题输入框的值
  },
  goBack: function() {
    wx.redirectTo({
      url: '/pages/discuss/discuss'
    })
  },
  submitForm: function() {
    // 获取 textarea 的值
  const textareaValue = this.data.textareaValue;
  const titleValue = this.data.titleValue; // 获取标题输入框的值
  // 判断标题的字符数是否超过 20 个
  if (titleValue.length > 20) {
    // 若超过，弹出提示框
    wx.showToast({
      title: '标题字符数不得超过 20 个',
      icon: 'none'
    });
    return;
  }
  if (titleValue.trim().length === 0) {
    // 若为空，弹出提示框
    wx.showToast({
      title: '标题不能为空',
      icon: 'none'
    });
    return;
  }
  // 判断 textarea 的值是否超过 750 个字符
  if (textareaValue.length > 750) {
    // 若超过，弹出提示框
    wx.showToast({
      title: '正文字符数不得超过 750 个',
      icon: 'none'
    });
    return;
  }
  // 判断 textarea 的值是否为空
  if (textareaValue.trim().length === 0) {
    // 若为空，弹出提示框
    wx.showToast({
      title: '内容字数不得少于 1',
      icon: 'none'
    });
    return;
  }

  const userInfo = wx.getStorageSync('userInfo');
  if (!userInfo) {
    wx.showToast({
      title: '用户信息获取失败',
      icon: 'none'
    });
    return;
  }

  const postData = {
    title: titleValue,
    content: textareaValue,
    avatarUrl: userInfo.avatarUrl || '../../tupiansucai/tp19.png', // 默认头像
    nickname: userInfo.nickname || '用户', // 默认昵称
    userAccount: userInfo.UserAccount
  };

  wx.request({
    url: 'https://localhost:7008/api/Post/CreatePost',
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(postData),
    success: (res) => {
      if (res.data.success) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            // 将新帖子数据存储到本地缓存中
            wx.setStorageSync('newPost', postData);
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/discuss/discuss'
              });
            }, 1500);
          }
        });
      } else {
        wx.showToast({
          title: '提交失败',
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
  // 监听 textarea 的输入事件，更新 data 中的值
  onTextareaInput: function(e) {
    this.setData({
      textareaValue: e.detail.value
    });
  },
  // 监听标题输入框的输入事件，更新 data 中的值
  onTitleInput: function(e) {
    this.setData({
      titleValue: e.detail.value
    });
  }
});