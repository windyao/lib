// register the down load component
Vue.component('lottery-turntable', {
    template: '#html-lottery-turntable',
    props: {
        awards: Array,//奖品数据
        width: '100%',
        height: '100%',        
        circles: Number,//转几圈
        duration: Number,//转几秒
        chance: Number//抽奖机会
    },    
    data: function () {
        return {
            timer: null,
            currentNum: -1,//当前格子下标
            start: 0,//从第一格开始转
            cellNum: 8,//一共8个抽奖格子
            maxNum: (this.chance || 3),//抽奖次数
            circle: (this.circles || 3),//转几圈
            time: (this.duration || 1),//转几秒
            currentIdx: -1//当前激活哪一格
        }
    },
    created: function () {},
    methods: {
        initAward: function (data) {
            if (!data) {
                return {};
            } else {
                return {
                    'style': {
                        backgroundImage: 'url(' + data.pic + ')'
                    },
                    'name': data.name
                };
            }
        },
        active: function (n) {
            return (this.start % this.cellNum) == n ? 'active' : '';
        },
        run: function (n) {
            if (this.maxNum < 1) {//抽奖机会用完了
                return false;
            }

            var self = this;
            //如果有外部输入的下标，则采用外部输入的下标
            var num = (typeof n != 'undefined') ? (this.cellNum * this.circle + n + 1) : ( parseInt(Math.random() * (this.cellNum * this.circle - this.cellNum) + this.cellNum) );
            var t = parseInt(this.time * 1000 / num);

            this.timer = setInterval(function () {
                if (self.start < num) {
                    self.start++;
                    self.currentIdx = self.start % self.cellNum;
                    console.log(self.currentIdx);
                } else {
                    window.clearInterval(self.timer);
                    self.timer = null;
                    self.start = self.start % self.cellNum;
                    self.currentIdx = self.start;
                }
            }, t);

            this.maxNum--;//每次抽奖就减一
        }
    }
});
