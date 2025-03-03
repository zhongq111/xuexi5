Page({
  data: {
    showModal: false,
    selectedCourse: '',
    courseDescriptions: {
      '社会安全': '社会安全课程涵盖社会治安、公共安全等方面的知识，帮助你了解如何在社会环境中保障自身安全。',
      '个人安全': '个人安全课程聚焦于个人生活中的各种安全问题，如人身安全、隐私保护等。',
      '网络安全': '网络安全课程介绍网络环境中的安全风险和防范措施，包括网络诈骗、信息泄露等。',
      '食品安全': '食品安全课程讲解食品的选择、储存和加工过程中的安全要点，让你吃得健康放心。',
      '交通安全': '交通安全课程传授交通规则和安全出行知识，减少交通事故的发生。',
      '环境安全': '环境安全课程关注自然环境和工作环境中的安全问题，提高你的环境安全意识。'
    }
  },
  onCourseSelect: function (e) {
    const course = e.currentTarget.dataset.course;
    this.setData({
      showModal: true,
      selectedCourse: course
    });
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  onSelectCourse: function () {
    wx.showModal({
      title: '确认选课',
      content: `你确定要选择 ${this.data.selectedCourse} 课程吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: `已成功选择 ${this.data.selectedCourse} 课程`,
            icon: 'success'
          });
          this.hideModal();
        } else if (res.cancel) {
          wx.showToast({
            title: '已取消选课',
            icon: 'none'
          });
        }
      }
    });
  }
})