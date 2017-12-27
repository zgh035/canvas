// import column from 'chart/column';
//
// console.log(column)
//
// console.log(new column({
//     el : 1,
//     width : 300,
//     height : 300
// }));

class canvasT {
    constructor (options) {
        this.options = options;
    }

    Chart ({el,width = 0,height = 0,cWidth = 0,cHeight = 0,cMargin = 0,cSpace = 0,originX = 0,originY = 0}) {
        this.ctx = el;
        this.width = width;
        this.height = height;
        //canvas的实际宽度
        this.cWidth = cWidth;
        //canvas的实际高度
        this.cHeight = cHeight;
        this.cMargin = cMargin;
        this.cSpace = cSpace;
        this.originX = originX;
        this.originY = originY;
        this.canvas = {
            height : 300,
            width : 350
        };
        //最大y轴值
        this.maxValue = 0;
        //y轴需要的刻度值
        this.totalYNomber = 10;
        //水平刻度数
        this.tobalBars = this.options.length;
        return this;
    }

    initChart () {
        this.cMargin = 30;
        this.cSpace  = 60;
        this.cHeight = this.canvas.height - this.cMargin*2 - this.cSpace;
        this.cWidth = this.canvas.width - this.cMargin*2 - this.cSpace;
        this.originX = this.cMargin + this.cSpace;
        this.originY = this.cMargin + this.cHeight;
        this.bMargin = 15;
        this.bWidth = parseInt( this.cWidth/this.tobalBars - this.bMargin );
        this.drawLineLabelMarkers();

        this.maxValue = 0;
        for(let i=0; i<this.options.length; i++){
            let barVal = parseInt( this.options[i][1] );
            if( barVal > this.maxValue ){
                this.maxValue = barVal;
            }
        }
        this.maxValue += 50;

        //y轴
        this.drawLine(this.originX,this.originY,this.originX,this.cMargin);
        // x轴
        this.drawLine(this.originX, this.originY, this.originX+this.cWidth, this.originY);
        this.drawMarkers()
        // this.ctx.draw()
        this.ctx.draw()
    }

    /**
     * 画线的方法
     * @param x
     * @param y
     * @param X
     * @param Y
     */
    drawLine (x,y,X,Y) {
        console.log(x,y,X,Y)
        this.ctx.beginPath();
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(X,Y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.strokeStyle = "#000";
    }

    /**
     * 绘制图标表轴，标签和标志
     */
    drawLineLabelMarkers () {
        this.ctx.translate(0.5,0.5);
        this.ctx.font = "12px Arial";
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = "#000";
        this.ctx.strokeStyle = "#000";
    }

    /**
     * 绘制标记
     */
    drawMarkers () {
        this.ctx.strokeStyle = "red";
        //绘制y轴
        //y轴刻度最小值
        let oneVal = parseInt(this.maxValue / this.totalYNomber);
        this.ctx.textAlign = "right";
        for(let i = 0;i < this.totalYNomber; i++){
            let markerVal =i * oneVal;
            let xMarker = this.originX - 25;
            let yMarker = parseInt(this.cHeight * (1 - markerVal / this.maxValue)) + this.cMargin;
            this.ctx.fillText(markerVal,xMarker,yMarker + 3,this.cSpace);
            if(i > 0) {
                this.drawLine(this.originX,yMarker,this.originX + 5,yMarker)
            }
        }

        // 绘制 x
        this.ctx.textAlign = "center";
        for(let i=0; i<this.tobalBars; i++){
            let markerVal = this.options[i][0];
            let xMarker = parseInt( this.originX + this.cWidth*(i/this.tobalBars)+this.bMargin+this.bWidth/2 );
            let yMarker = this.originY+15;
            this.ctx.fillText(markerVal, xMarker, yMarker, this.cSpace); // 文字
            if(i > 0) {
                this.drawLine(xMarker,this.originY,xMarker,this.originY - 5)
            }
        }
    }
}

let canvas = new canvasT([[2007, 750], [2008, 425], [2009, 960], [2010, 700], [2011, 800], [2012, 975], [2013, 375], [2014, 775]]);

module.exports = canvas;