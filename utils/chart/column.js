import chart from './chartPar';
import base from './base';

/**
 * 柱状图
 */
class column extends chart {
   constructor ({ el ,width = 100,height = 100,yCount = 10 ,data = []}) {
       super({el,width,height});
       //柱状图距离左边的距离
       this.paddingLeft = 50;
       //默认刻度的长度
       this.yScaleWidth = 5;
       //柱状图距离下边的距离
       this.paddingBottom = 30;
       //柱状图距离顶部的距离
       this.paddingTop = 20;
       //x轴的刻度数
       this.xCount = data.length;
       //y轴的刻度数
       this.yCount = yCount;
       //柱状图数据源
       this.data = data;
       //柱状图的宽度
       this.columnWidth = this.width - this.paddingLeft;
       //柱状图的高度
       this.columnHeight = parseInt((this.height- this.paddingTop) / (this.xCount + 1)) * (this.xCount + 1) ;
       //y轴方向最大数值
       this.yMaxVal = base.countMax.call(this,{type : 'max',data : this.data, field : '1'});
       this.drawCoordinate()
       // this.drawColumns();
       // this.ctx.setGlobalAlpha(0.2)
       // this.ctx.setFillStyle('red');
       // this.ctx.fillRect(100, 0, 150, 200);
       // this.ctx.drawImage('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1944805937,3724010146&fm=27&gp=0.jpg', 100, 0, 150, 200);
   }


    /**
     * 画坐标轴
     */
   drawCoordinate () {
        //画y轴
        base.drawLine.call(this,this.paddingLeft,this.columnHeight + this.paddingTop,this.paddingLeft,this.paddingTop);
        //画x轴
        base.drawLine.call(this,this.width,this.columnHeight + this.paddingTop,this.paddingLeft,this.columnHeight + this.paddingTop);

        //y轴最小刻度
        let yMinScale = parseInt( this.yMaxVal / this.yCount );
        //y轴刻度的大小
        let yMark = null,yScale;
        for(let i = 0;i <= this.yCount;i++) {
            yScale = parseInt( (this.height - this.paddingBottom) * (i / this.yCount ) );
            if(i > 0){
                yMark = parseInt( this.columnHeight * ( 1 - i / this.yCount ) ) + this.paddingTop;
            }else{
                yMark =this.columnHeight + this.paddingTop;
            }
            base.drawLine.call(this,this.paddingLeft,yMark,this.paddingLeft - this.yScaleWidth,yMark);
            base.fillText.call(this,{text : yMinScale * i,x : this.paddingLeft - 10,y : yMark,align : 'right'});
            //画虚线
            base.drawLine.call(this,this.width,yMark,this.paddingLeft,yMark,0.1);

        }
        let xMark = null;
        //x轴刻度
        for(let i = 1;i <= this.xCount;i++ ){
            xMark = parseInt( (this.columnWidth) * (i / this.xCount) ) + this.paddingLeft;
            base.drawLine.call(this,xMark,this.columnHeight + this.paddingTop,xMark, this.columnHeight + this.paddingTop + 5);
            base.fillText.call(this,{text : this.data[i - 1][0],y : this.columnHeight  + this.paddingTop + 30,x : (xMark - (this.columnWidth / this.xCount) / 2),align : 'center',baseLine : 'bottom'});
            let grd = this.ctx.createLinearGradient(this.paddingLeft,this.paddingTop,this.columnWidth,this.data[i - 1][1])
            grd.addColorStop(0, 'red');
            grd.addColorStop(1, 'blue');
            this.ctx.setFillStyle('red');
            this.ctx.fillRect(30 * (i - 1) + this.paddingLeft,this.paddingTop,10,this.data[i - 1][1]);
        }

   }

    /**
     * 画柱图
     */
   drawColumns () {
        const grd = this.ctx.createLinearGradient(0, 0, 200, 0)
        grd.addColorStop(0, 'red')
        grd.addColorStop(1, 'white')
        this.ctx.setFillStyle(grd)
       this.ctx.fillRect(this.paddingLeft,this.paddingTop,this.columnWidth,this.columnHeight);
   }


   draw () {
       super.draw();
   }
}


module.exports = column;