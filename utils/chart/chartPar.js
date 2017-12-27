/**
 * canvas图父类
 */
class chart {
    /**
     * 构造器
     * @param el canvas元素
     * @param width canvas宽度
     * @param height canvas高度
     */
    constructor ({ el , width = 100,height = 100}) {
        // if(new.target === chart){
        //     throw new Error('不能够实例化父类！');
        // }
        this.ctx = el;
        this.width = width;
        this.height = height;
    }

    /**
     * 开始画图
     */
    draw () {
        this.ctx.draw();
    }
}

module.exports = chart;