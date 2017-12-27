/**
 * 基础方法类
 */
class base {

    /**
     * 画线的方法
     * @param x x轴开始位置
     * @param y y轴开始位置
     * @param X x轴结束位置
     * @param Y y轴结束位置
     * @param width 线条宽度
     * @param color 线条颜色
     */
    drawLine (x,y,X,Y,width = '1',color = '') {
        this.ctx.strokeStyle = color;
        this.ctx.setLineWidth(width);
        this.ctx.beginPath();
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(X,Y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * 计算[ { x:.. ,y : ...}]这种结构数据中，对象的某个元素的最值
     * @param type
     * @param data
     * @param field
     */
    countMax ({type ,data = [],field = ''}) {
        let baseNum = null;
        if(type === 'max') {
            baseNum = -Infinity;
            for(let i = 0,j = data.length;i < j;i++) {
                if(data[i][field] > baseNum){
                    baseNum = data[i][field];
                }
            }
        }else if(type === 'min'){
            for(let i = 0, j = data.length;i < j;i++){
                baseNum = Infinity;
                for(let i = 0,j = data.length;i < j;i++) {
                    if(data[i][field] < baseNum){
                        baseNum = data[i][field];
                    }
                }
            }
        }
        return baseNum;
    }

    /**
     * 写字
     * @param text 文本
     * @param x x轴坐标
     * @param y y轴坐标
     * @param align 垂直方向
     * @param baseLine 水平方向
     */
    fillText ({text = '',x = 0,y = 0,align = "right" ,baseLine = 'middle'}) {
        this.ctx.setTextAlign(align);
        this.ctx.setTextBaseline(baseLine);
        this.ctx.fillText(text,x,y);
    }

}
let baseInstance = new base();
module.exports = baseInstance;