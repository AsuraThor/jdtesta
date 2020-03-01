class Swiper {
    constructor(sel, obj) {
        this.sel = sel;
        this.obj = obj;

        this.el = document.querySelector(this.sel);
        this.rightBtn = this.el.querySelector('.rightBtn')
        this.leftBtn = this.el.querySelector('.leftBtn')

        this.pageNum = 0; //记录播放的 页码 

        this.oLis = this.el.querySelectorAll('.item li')
        this.oPageLis = this.el.querySelectorAll('.page li')
        let circle = document.querySelectorAll('.page li')
        this.auto(this.pageNum)
        // 按钮的单击
        this.btnsEvent()
        let thata = this;
        
        //如果为true则自动轮换
        if (this.obj.autoPlay == true) {
            
            //自动播放
            let timer = setInterval(() => {
            this.next()
            }, this.obj.dur);
            
            //鼠标进入图片时图片停止自动轮换
            this.el.onmouseenter = function() {
                clearInterval(timer)
            }
            //离开时图片继续轮换
            this.el.onmouseleave = () => {
                timer = setInterval(() => {
                    this.next()
                }, this.obj.dur)
            }
            
        } else {}
        let that = this;
        
        //点击圆点轮换
        for (let i = 0; i < this.oPageLis.length; i++) {
            this.oPageLis[i].onclick = function() {
                
                //清除格式
                for (let j = 0; j < that.oPageLis.length; j++) {
                    that.oPageLis[j].style.background = 'rgba(255,255,255,0.3)'
                }
                //给被点击的li添加style
                this.style.background = 'white'
                
                //调用函数，图片淡入淡出
                animate(that.oLis[that.pageNum], {
                    opacity: 0
                })
                that.pageNum = i;
                animate(that.oLis[that.pageNum], {
                    opacity: 1
                })
            }
        }
    }
    
    
    // 按钮的单击
    btnsEvent() {
        let that = this;
        this.rightBtn.onclick = function() {
            that.next()

        }
        this.leftBtn.onclick = function() {
            that.previous()
        }
    }
    
    //圆点切换函数
    auto(i){
        for (let j = 0; j < this.oPageLis.length; j++) {
            this.oPageLis[j].style.background = 'rgba(255,255,255,0.3)'
        }
        this.oPageLis[i].style.background = 'white'
    }

    //点击切换下一张
    next() {
        animate(this.oLis[this.pageNum], {
            opacity: 0
        })
        this.pageNum++;
        if (this.pageNum == 5) {
            this.pageNum = 0;
        }
        animate(this.oLis[this.pageNum], {
            opacity: 1
        })
        this.auto(this.pageNum)
    }
    
    //点击切换上一张
    previous() {
        animate(this.oLis[this.pageNum], {
            opacity: 0
        })
        this.pageNum--;
        console.log(this.pageNum)
        if (this.pageNum == -1) {
            this.pageNum = 4;
        }
        animate(this.oLis[this.pageNum], {
            opacity: 1
        })
        this.auto(this.pageNum)
    }
}

new Swiper('.slideimg', {
    autoPlay: true,
    dur: 2000
})