依赖utils的css方法


实现多方向的运动动画
curEle:当前元素
target:当前动画的目标位置,存储的是每一个方向的目标位置{left:xxx,top:xxx},这里注意没有处理单位,所以不要带单位
duration:当前动画的总时间

effect:支持以下的情况:
1)如果传递进来的是一个数字
0->linear 
["Linear","Quad-easeIn",....]
2)如果传递进来的是数组的话["Quad","easeIn"]
3)如果不传的话 默认就是linear
callback:是完成动画后的回调函数
animate(curEle, target, duration, effect, callback)