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
    proList:null,
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    objectArray: [
      { id: 5, unique: 'unique_5' },
      { id: 4, unique: 'unique_4' },
      { id: 3, unique: 'unique_3' },
      { id: 2, unique: 'unique_2' },
      { id: 1, unique: 'unique_1' },
      { id: 0, unique: 'unique_0' },
    ],
    numberArray: [1, 2, 3, 4],
    condition:false,
    item:{
      index:0,
      msg:'this is a template',
      time:'2016-09-15'
    }
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

    
  },
  switch: function (e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function (e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function (e) {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  },
  tapName:function(event){
    // console.log(event)
    wx.showToast({
      title: 'click me!',
    })
  },
  handleTap1:function(){
    wx.showToast({
      title: 'handleTap1!',
    })
  },
  handleTap2: function () {
    wx.showToast({
      title: 'handleTap2!',
    })
  },
  handleTap3: function () {
    wx.showToast({
      title: 'handleTap3!',
    })
  },
 
})
