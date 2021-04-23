var data = {
      //云开发环境id
      env: 'rich-4gbsq7ct21c19fbd',
      //分享配置
      share_title: '四川师范大学二手书',
      share_img: '/images/poster.jpg', //可以是网络地址，本地文件路径要填绝对位置
      share_poster:'https://7269-rich-4gbsq7ct21c19fbd-1304790203.tcb.qcloud.la/share/shareCode.png?sign=66056286937bf9a13f1149c330232fed&t=1617844332',//必须为网络地址
      //客服联系方式
      kefu: {
            weixin: 'RDZ-577',
            qq: '1660415124',
            gzh: 'https://7269-rich-4gbsq7ct21c19fbd-1304790203.tcb.qcloud.la/share/shareCode.png?sign=66056286937bf9a13f1149c330232fed&t=1617844332', //公众号二维码必须为网络地址
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
      //配置学院，建议不要添加太多，不然前端不好看
      college: [{
                  name: '通用',
                  id: -1
            },
            {
                  name: '计科',
                  id: 0
            },
            {
                  name: '经管',
                  id: 1
            },
            {
                  name: '物电',
                  id: 2
            },
            {
                  name: '数学',
                  id: 3
            },
            {
                  name: '英语',
                  id: 4
            },
            {
                  name: '汉语言',
                  id: 5
            },
            {
                  name: '化学',
                  id: 6
            },
            {
                  name: '生科',
                  id: 7
            },
            {
                  name: '心理',
                  id: 8
            },
            {
                  name: '商学',
                  id: 9
            },
            {
                  name: '法学',
                  id: 10
            },
            {
                  name: '体育',
                  id: 11
            },
            {
                  name: '舞蹈',
                  id: 12
            },
            {
                  name: '音乐',
                  id: 13
            },
            {
                  name: '其它',
                  id: 14
            },
      ],
}
//下面的就别动了
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