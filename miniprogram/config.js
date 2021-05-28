var data = {
      //云开发环境id
      env: 'rich-4gbsq7ct21c19fbd',
      //分享配置
      share_title: '四川师范大学二手书',
      share_img: '/images/poster.jpg', //可以是网络地址，本地文件路径要填绝对位置
      share_poster:'https://7269-rich-4gbsq7ct21c19fbd-1304790203.tcb.qcloud.la/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E6%A0%87%E5%87%86%E8%89%B2%E7%89%88.png?sign=647a97804129aaba54a951a555ee26f3&t=1620818093',//必须为网络地址
      //客服联系方式
      kefu: {
            weixin: 'RDZ-577',
            qq: '1660415124',
            gzh: 'https://7269-rich-4gbsq7ct21c19fbd-1304790203.tcb.qcloud.la/%E5%B7%9D%E5%B8%88%E4%BA%8C%E6%89%8B%E4%B9%A6_%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%89%A9%E6%96%99%E5%9B%BE.jpg?sign=831550e6830a3904ac13da6766e510e5&t=1620817531', //公众号二维码必须为网络地址
            phone: '' //如果你不设置电话客服，就留空
      },
      //默认启动页背景图，防止请求失败完全空白 
      //可以是网络地址，本地文件路径要填绝对位置
      bgurl: '/images/startBg.jpg',
      //校区
      campus: [{
                  name: '狮子山校区',
                  id: 0
            },
            {
                  name: '成龙校区',
                  id: 1
            },

      ],
      //配置种类
      college: [{
                  name: '通用',
                  id: -1
            },
            {
                  name: '教材',
                  id: 0
            },
            {
                  name: '考试',
                  id: 1
            },
            {
                  name: '小说',
                  id: 2
            },
            {
                  name: '杂志',
                  id: 3
            },
            {
                  name: '漫画',
                  id: 4
            },
            {
                  name: '励志',
                  id: 5
            },
            {
                  name: '美食',
                  id: 6
            },
            {
                  name: '科技',
                  id: 7
            },
            {
                  name: '经管',
                  id: 8
            },
            {
                  name: '艺术',
                  id: 9
            },
            {
                  name: '文化',
                  id: 10
            },
            {
                  name: '其他',
                  id: 11
            },
            
      ],
}
//ignore following
function formTime(creatTime) {
      let date = new Date(creatTime),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
      if (M < 10) {
            M = '0' + M;
      }
      if (D < 10) {
            D = '0' + D;
      }
      if (H < 10) {
            H = '0' + H;
      }
      if (m < 10) {
            m = '0' + m;
      }
      if (s < 10) {
            s = '0' + s;
      }
      return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s;
}

function days() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      if (month < 10) {
            month = '0' + month;
      }
      if (day < 10) {
            day = '0' + day;
      }
      let date = year + "" + month + day;
      return date;
}
module.exports = {
      data: JSON.stringify(data),
      formTime: formTime,
      days: days
}