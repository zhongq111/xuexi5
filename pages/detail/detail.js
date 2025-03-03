// pages/detail/diail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    isPopupShow: false,
    isReplyPopupShow: false,
    comment: '',
    reply: '',
    comments: [],
    textareaValue: '',
    replyValue: '',
    replyIndex: -1,
    userInfo: {
      avatarUrl: '',
      nickname: ''
    },
    defaultAvatarUrl: '../../tupiansucai/tp19.png', // 默认黑白头像的 URL
    defaultNickname: '用户' // 默认昵称
  },
  ButtonAddPost() {
    this.setData({
      isPopupShow: true
    });
  },

  // 输入框内容变化时更新评论数据
  onInputChange1(e) {
    this.setData({
      comment: e.detail.value,
      textareaValue: e.detail.value
    });
  },
  fetchComments() {
    const postId = parseInt(this.data.postId, 10);
    wx.request({
      url: `https://localhost:7008/api/Post/GetCommentsByPostId?postId=${postId}`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const comments = res.data;
          this.setData({ comments });
        }
      },
      fail: (err) => {
        console.error('获取评论失败', err);
      }
    });
  },
  // 发送评论
  sendComment() {
    const comment = this.data.comment;
    if (comment.length > 100) {
        wx.showToast({
            title: '评论过长',
            icon: 'none'
        });
        return;
    }
    if (comment.trim() === '') {
        wx.showToast({
            title: '评论不能为空',
            icon: 'none'
        });
        return;
    }
    const { avatarUrl, nickname } = this.data.userInfo;
    const postId = parseInt(this.data.postId, 10); // 转换为整数类型
    wx.request({
        url: 'https://localhost:7008/api/Post/AddComment',
        method: 'POST',
        data: {
            CommentNumber: postId,
            Comment: comment,
            AvatarUrl: avatarUrl,
            Nickname: nickname,
            UserAccount: ''
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: (res) => {
            if (res.data.success) {
                wx.showToast({
                    title: '评论添加成功',
                    icon: 'success'
                });
                // 将新评论添加到评论列表的头部
                const newComment = {
                  comment: comment,
                  avatarUrl: avatarUrl,
                  nickname: nickname,
                  replies: []
                };
                const newComments = [newComment, ...this.data.comments];
                this.setData({
                    comments: newComments,
                    comment: '',
                    textareaValue: '',
                    isPopupShow: false
                });
            } else {
                wx.showToast({
                    title: res.data.message,
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

  // 关闭弹出层
  closePopup() {
    this.setData({
      isPopupShow: false,
      comment: '',
      textareaValue: ''
    });
  },

  // 打开回复弹出层
  openReplyPopup(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      isReplyPopupShow: true,
      replyIndex: index
    });
  },

  // 输入框内容变化时更新回复数据
  onReplyInputChange(e) {
    this.setData({
      reply: e.detail.value,
      replyValue: e.detail.value
    });
  },

  // 关闭回复弹出层
  closeReplyPopup() {
    this.setData({
      isReplyPopupShow: false,
      reply: '',
      replyValue: '',
      replyIndex: -1
    });
  },

  // 切换回复的显示状态
  toggleReplyVisibility(e) {
    const index = e.currentTarget.dataset.index;
    const newComments = [...this.data.comments];
    newComments[index].isExpanded = !newComments[index].isExpanded;
    this.setData({
      comments: newComments
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      title: options.title,
      content: options.content,
      postId: options.postId // 假设 URL 中传递了 postId 参数
    });

    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      // 判断头像是否为空，如果为空则使用默认头像
      const avatarUrl = userInfo.avatarUrl ? userInfo.avatarUrl : this.data.defaultAvatarUrl;
      // 判断昵称是否为空，如果为空则默认为“用户”
      const nickname = userInfo.nickname ? userInfo.nickname : this.data.defaultNickname;
      this.setData({
        userInfo: {
          avatarUrl,
          nickname
        }
      });
    }

    this.fetchComments(); // 新增：加载评论
  },
  // 监听标题输入框的输入事件，更新 data 中的值
  onInputChange: function(e) {
    this.setData({
      textareaValue: e.detail.value
    });
  }
})