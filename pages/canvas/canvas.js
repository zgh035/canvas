import canvas from '../../utils/chart'
import column from '../../utils/chart/column';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctx  : null,
    dataArr: [[2007, 750], [2008, 425], [2009, 960], [2010, 700], [2011, 800], [2012, 975], [2013, 375], [2014, 775]],
    canvas : {
      height : 300,
      width : 300
    },
    cWidth : 30,
    cHeight: 30,
    cMargin : 20,
    cSpace : null,
    originX : 0,
    originY : 0,
    bMargin : null,
    tobalBars : null,
    bWidth : null,
    maxValue : null,
    totalYNomber : null,
    gradient : null,
    ctr : null,
    numctr : null,
    speed : null,
    mousePosition : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.data.ctx = wx.createCanvasContext('canvas');
    // // this.data.ctx.fill('#000000');
    // // this.data.ctx.fillRect(0,10,10,10);
    // // this.data.ctx.draw();
    // this.initChart();
    // this.drawLineLabelMarkers();
    // this.data.ctx.draw();

      canvas.Chart({
          el : wx.createCanvasContext('canvas'),
      }).initChart();


      new column({
          el : wx.createCanvasContext('column'),
          width : 300,
          height : 300,
          xCount : 10,
          yCount : 10,
          data : [['asdf',10],['asdf',130],['asdf',530]]
      }).draw();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  start () {
    this.data.ctx.fill('#f0a000');
    this.data.ctx.fillRect(0, 50, 50, 50);
    this.data.ctx.draw();
    initChart();
  },
  initChart () {
    // 图表信息
    this.data.cMargin = 30;
    this.data.cSpace = 60;
    this.data.cHeight = this.data.canvas.height - this.data.cMargin * 2 - this.data.cSpace;
    this.data.cWidth = this.data.canvas.width - this.data.cMargin * 2 - this.data.cSpace;
    // this.data.originX = this.data.cMargin + this.data.cSpace;
    // this.data.originY = this.data.cMargin + this.data.cHeight;

    // 柱状图信息
    this.data.bMargin = 15;
    this.data.tobalBars = this.data.dataArr.length;
    this.data.bWidth = parseInt(this.data.cWidth / this.data.tobalBars - this.data.bMargin);
    this.data.maxValue = 0;
    for (var i = 0; i < this.data.dataArr.length; i++) {
      var barVal = parseInt(this.data.dataArr[i][1]);
      if (barVal > this.data.maxValue) {
        this.data.maxValue = barVal;
      }
    }
    this.data.maxValue += 50;
    this.data.totalYNomber = 10;
    // 运动相关
    this.data.ctr = 1;
    this.data.numctr = 100;
    this.data.speed = 10;

    //柱状图渐变色
    this.data.gradient = this.data.ctx.createLinearGradient(0, 0, 0, 300);
    this.data.gradient.addColorStop(0, 'green');
    this.data.gradient.addColorStop(1, 'rgba(67,203,36,1)');
  },
  drawLineLabelMarkers () {
    this.data.ctx.translate(0.5, 0.5);  // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
    this.data.ctx.font = "12px Arial";
    this.data.ctx.lineWidth = 1;
    this.data.ctx.fillStyle = "#000";
    this.data.ctx.strokeStyle = "#000";
    // y轴
    this.drawLine(this.data.originX, this.data.originY, this.data.originX, this.data.cMargin);
    // x轴
    this.drawLine(this.data.originX, this.data.originY, this.data.originX + this.data.cWidth, this.data.originY);

    // 绘制标记
    // drawMarkers();
    this.data.ctx.translate(-0.5, -0.5);  // 还原位置
  },
  drawLine(x, y, X, Y) {
    console.log(x,y,X,Y)
    this.data.ctx.beginPath();
    this.data.ctx.moveTo(x, y);
    this.data.ctx.lineTo(X, Y);
    this.data.ctx.stroke();
    this.data.ctx.closePath();
  }
})