<template>
	<table class="oppo-lottery" cellspacing="5" width="{{width}}" height="{{height}}">
        <colgroup><col width="33%" /><col width="33%" /><col width="33%" /></colgroup>
        <tr><td class="cell" v-bind:style="initAward(awards[0])['style']" :class="{'active': 0 == currentIdx}">{{initAward(awards[0])['name']}}</td><td class="cell" :style="initAward(awards[1])['style']" :class="{'active': 1 == currentIdx}">{{initAward(awards[1])['name']}}</td><td class="cell" :style="initAward(awards[2])['style']" :class="{'active': 2 == currentIdx}">{{initAward(awards[2])['name']}}</td></tr>
        <tr><td class="cell" :style="initAward(awards[7])['style']" :class="{'active': 7 == currentIdx}">{{initAward(awards[7])['name']}}</td><td class="center-cell">
            <button type="button" @click="run()">抽奖x{{maxNum}}</button>
        </td><td class="cell" :style="initAward(awards[3])['style']" :class="{'active': 3 == currentIdx}">{{initAward(awards[3])['name']}}</td></tr>
        <tr><td class="cell" :style="initAward(awards[6])['style']" :class="{'active': 6 == currentIdx}">{{initAward(awards[6])['name']}}</td><td class="cell" :style="initAward(awards[5])['style']" :class="{'active': 5 == currentIdx}">{{initAward(awards[5])['name']}}</td><td class="cell" :style="initAward(awards[4])['style']" :class="{'active': 4 == currentIdx}">{{initAward(awards[4])['name']}}</td></tr>
    </table>
</template>

<script>
export default {
  props: {
        awards: Array,//奖品数据
        width: '100%',
        height: '100%',        
        circles: Number,//转几圈
        duration: Number,//转几秒
        chance: Number//抽奖机会
    },    
    data() {
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
    created() {},
    methods: {
        initAward(D) {
            if (!D) {
                return {};
            } else {
                return {
                    'style': {
                        backgroundImage: 'url(' + D.pic + ')'
                    },
                    'name': D.name
                };
            }
        },
        active(n) {
            return (this.start % this.cellNum) == n ? 'active' : '';
        },
        run(n) {
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
}
</script>

<style scoped>
.oppo-lottery {
    border-collapse: separate;
}

.oppo-lottery td {
    text-align: center;
    vertical-align: top;
    background-color: #f0f0f0;
    background-position: 50% 50%;
    background-size: 60% auto;
    background-repeat: no-repeat;
    border-spacing: 5px;
    border-radius: 5px;
    background-clip: padding-box;
    height: 64px;
    position: relative;
    vertical-align: bottom;
}

.oppo-lottery td.center-cell {
    background: none;    
}

.oppo-lottery td p {
    line-height: 1;
    margin: 0;
    position: absolute;
    bottom: 5px;
    width: 100%;
}

.oppo-lottery td.active {
    border: 2px solid #ccc;
}

.oppo-lottery td.center-cell {
    vertical-align: middle;
}

.oppo-lottery button {
    cursor: pointer;
}

.oppo-lottery-msg{
    display: inline-block;
}

.oppo-lottery-img {
    margin-top: 10%;
    max-width: 50px;
    max-height: 30px;
}
</style>
