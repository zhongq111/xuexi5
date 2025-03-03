// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'login', // 当前显示的是登录还是注册表单
    username: '', // 用户名
    password: '', // 密码
    confirmPassword: '' // 确认密码（注册时使用）
  },

  /**
   * 切换到登录表单
   */
  switchToLogin() {
    this.setData({
      currentTab: 'login'
    });
  },

  /**
   * 切换到注册表单
   */
  switchToRegister() {
    this.setData({
      currentTab: 'register'
    });
  },

  /**
   * 处理用户名输入
   */
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  /**
   * 处理密码输入
   */
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 处理确认密码输入（注册时使用）
  onConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  /**
   * 处理登录按钮点击
   */
  onLogin() {
    const { username, password } = this.data;
    if (!username || !password) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none'
      });
      return;
    }
    // 发送请求到后端进行登录验证
    wx.request({
      url: 'https://localhost:7008/api/User/Login', // 修改为实际的后端 API 地址
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        UserAccount: username,
        UserPwd: password
      }),
      success: (res) => {
        if (res.data.success) {
          // 登录成功，保存登录状态到本地存储
          wx.setStorageSync('isLoggedIn', true);
          // 获取用户信息
          wx.request({
            url: 'https://localhost:7008/api/User/GetUserInfo',
            method: 'GET',
            data: {
              userAccount: username
            },
            success: (userRes) => {
              if (userRes.statusCode === 200 && userRes.data) {
                // 保存用户信息到本地存储，确保包含 UserAccount 字段
                const userInfo = userRes.data;
                userInfo.UserAccount = username; // 确保 UserAccount 被正确保存
                wx.setStorageSync('userInfo', userInfo);
                // 跳转到 index 主页
                wx.switchTab({
                  url: '/pages/index/index',
                  fail: function (err) {
                    console.log('跳转失败:', err);
                  }
                });
              } else {
                // 处理用户信息获取失败的情况
                wx.showToast({
                  title: '获取用户信息失败，请检查网络或稍后重试',
                  icon: 'none'
                });
                console.log('获取用户信息失败:', userRes);
              }
            },
            fail: (err) => {
              // 请求失败，显示提示信息
              wx.showToast({
                title: '请求失败，请稍后重试',
                icon: 'none'
              });
              console.log('请求失败:', err);
            }
          });
        } else {
          // 登录失败，显示提示信息
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        // 请求失败，显示提示信息
        wx.showToast({
          title: '请求失败，请稍后重试',
          icon: 'none'
        });
        console.log('请求失败:', err);
      }
    });
  },

  /**
   * 处理注册按钮点击
   */
  onRegister() {
    const { username, password, confirmPassword } = this.data;
    if (!username || !password || !confirmPassword) {
      wx.showToast({
        title: '用户名、密码和确认密码不能为空',
        icon: 'none'
      });
      return;
    }
    // 验证两次输入的密码是否一致
    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      });
      return;
    }
    wx.request({
      url: 'https://localhost:7008/api/User/Register',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        Username: username,
        Password: password,
      }),
      success: (res) => {
        if (res.statusCode === 400) {
          wx.showToast({
            title: res.data.message, // 显示后端返回的错误信息
            icon: 'none'
          });
        } else if (res.data.success) {
          wx.showToast({
            title: res.data.message,
            icon: 'success'
          });
          // 注册成功后可以跳转到登录页面
          this.switchToLogin();
        }
      },
      fail: (err) => {
        console.log('请求失败:', err);
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
  }
});