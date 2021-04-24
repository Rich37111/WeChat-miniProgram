const db = wx.cloud.database();
const app = getApp();
const config = require("../../config.js");
Page({

      /**
       * 页面的初始数据
       */
      data: {
            ids: -1,
            userInfo:{},
            hasUserInfo: false,
            canIUseGetUserProfile: false,
            wxnum: '',
            qqnum: '',
            email: '',
            campus: JSON.parse(config.data).campus,
      },
      onLoad() {
            if (wx.getUserProfile) {
              this.setData({
                canIUseGetUserProfile: true
              })
            }
          },
       
          
      choose(e) {
            let that = this;
            that.setData({
                  ids: e.detail.value
            })
            //下面这种办法无法修改页面数据
            /* this.data.ids = e.detail.value;*/
      },
     

      getUserProfile(e) {
            // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
            // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
            wx.getUserProfile({
              desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
              success: (res) => {
                    console.log('获取用户信息成功',res)     //这里的信息是对的
                    let user = res.userInfo
                    wx.setStorageSync('user', user)         //将用户信息缓存到本地，下次同一用户再次登录时就不用再授权了
                    this.setData({
                        userInfo: user,
                        hasUserInfo: true
                      })
                      console.log('getUserProfile的参数e',e)      //里面没有有用信息
                  //   db.collection('user').add({
                  //       data: {
                  //            _id:user._id,
                  //            _openid:user._openid,
                  //             campus:{
                  //                   id:user.campus.id,
                  //                   name:user.campus.name,
                  //             },
                  //             email:user.email,
                  //             info:{
                  //                   avatarUrl:user.avatarUrl,
                  //                   city:user.city,
                  //                   country:user.country,
                  //                   gender:user.gender,
                  //                   language:user.language,
                  //                   nickName:user.nickName,
                  //                   province:user.province,
                  //             },
                  //             parse:user.parse,
                  //             qqnum:user.qqnum,
                  //             stamp:user.stamp,
                  //             userful:user.userful,
                  //             wxnum:user.wxnum,
                  //       }
                  //   })
                
              },
              fail: res=> {
                    console.log('获取用户信息失败',res)
              } 
             })
          },   

      wxInput(e) {
            this.data.wxnum = e.detail.value;
      },
      qqInput(e) {
            this.data.qqnum = e.detail.value;
      },
      emInput(e) {
            this.data.email = e.detail.value;
      },
      getUserInfo(e) {
            let that = this;
            console.log('getUserInfo的参数e',e);            //参数信息不对

            let test = e.detail.errMsg.indexOf("ok");
            if (test == '-1') {
                  wx.showToast({
                        title: '请授权后方可使用',
                        icon: 'none',
                        duration: 2000
                  });
            } else {
                  // that.setData({
                  //       //这里有问题，e中的userinfo不对
                  //       userInfo: e.detail.userInfo
                  // }) 
                  that.check();
            }
      },
      //校检
      check() {
            let that = this;
            //校检手机
            let phone = that.data.phone;
            if (phone == '') {
                  wx.showToast({
                        title: '请先获取您的电话',
                        icon: 'none',
                        duration: 2000
                  });
                  return false
            }
            //校检校区
            let ids = that.data.ids;
            let campus = that.data.campus;
            if (ids == -1) {
                  wx.showToast({
                        title: '请先获取您的校区',
                        icon: 'none',
                        duration: 2000
                  });
            }
            //校检邮箱
            let email = that.data.email;
            if (!(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(email))) {
                  wx.showToast({
                        title: '请输入常用邮箱',
                        icon: 'none',
                        duration: 2000
                  });
                  return false;
            }
            //校检QQ号
            let qqnum = that.data.qqnum;
            if (qqnum !== '') {
                  if (!(/^\s*[.0-9]{5,11}\s*$/.test(qqnum))) {
                        wx.showToast({
                              title: '请输入正确QQ号',
                              icon: 'none',
                              duration: 2000
                        });
                        return false;
                  }
            }
            //校检微信号
            let wxnum = that.data.wxnum;
            if (wxnum !== '') {
                  if (!(/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(wxnum))) {
                        wx.showToast({
                              title: '请输入正确微信号',
                              icon: 'none',
                              duration: 2000
                        });
                        return false;
                  }
            }
            wx.showLoading({
                  title: '正在提交',
            })
            db.collection('user').add({
                  data: {
                        campus: that.data.campus[that.data.ids],
                        qqnum: that.data.qqnum,
                        email: that.data.email,
                        wxnum: that.data.wxnum,
                        stamp: new Date().getTime(),
                        info: that.data.userInfo,
                        useful: true,
                        parse: 0,
                  },
                  success: function(res) {
                        console.log('sssssssssssssssssssssssssss',res)
                        db.collection('user').doc(res._id).get({
                              success: function(res) {
                                    app.userinfo = res.data;
                                    app.openid = res.data._openid;
                                    wx.navigateBack({})
                              },
                        })
                  },
                  fail() {
                        wx.hideLoading();
                        wx.showToast({
                              title: '注册失败，请重新提交',
                              icon: 'none',
                        })
                  }
            })
      },


      getdetail() {
            let that = this;
            db.collection('user').where({
                  _openid: app.openid
            }).get({
                  success: function(res) {
                        let info = res.data[0];
                        that.setData({
                              phone: info.phone,
                              qqnum: info.qqnum,
                              wxnum: info.wxnum,
                              email: info.email,
                              ids: info.campus.id,
                              _id: info._id
                        })
                  },
                  fail() {
                        wx.showToast({
                              title: '获取失败',
                              icon: 'none'
                        })
                        let e = setTimeout(
                              wx.navigateBack({}), 2000
                        )
                  }
            })
      },
})

