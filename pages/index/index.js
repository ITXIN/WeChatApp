//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    staffA: { firstName: 'Hulk', lastName: 'Hu' },
    staffB: { firstName: 'Shang', lastName: 'You' },
    staffC: { firstName: 'Gideon', lastName: 'Lin' },
    view:'app',
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList:null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   this.setData({
     test:'01',
   })
   this.getProList();
  },
  toDetail:function(e){
    console.log(e);
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var proList = this.data.proList;
    var title = proList[index].proName;
    // wx.navigateTo({
    //   url: '/pages/detail/detail?title='+title,
    // })
    wx.setStorageSync('title', title);
    wx.navigateTo({
      url: '/pages/detail/detail',
    })

  },
  getProList:function(){
    var self = this;
    wx.request({
      url: 'http://guozhaoxi.top/wx/data.json',
      method:'GET',
      success:function(res){
        console.log(res);
        self.setData({
          proList:res.data,
        })

      }
    })
  },
  copy:function(){
    if(wx.setClipboardData){
      app.globalData.globalTitle = "xiugai";
      wx.setClipboardData({
        data: '这是我要复制的内容',
        success: function (res) {
          wx.showModal({
            title: app.globalData.globalTitle,
            content: 'app.globalData.globalTitle',
          })


          // wx.showModal({
          //   title: '复制成功',
          //   content: '内容已经复制成功',
          // })
          // wx.getClipboardData({
          //   success:function(res){
          //     console.log(res.data);
          //   }
          // })
        }
      })

    }else{
      wx.showModal({
        title: '提示',
        content: '您的微信版本太低，请升级',
      })
    }

    
  }
 
})
