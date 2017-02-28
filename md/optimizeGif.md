# 优化网页上的gif
像很多人一样，我喜欢gif.我喜欢在文章中用它们来解释一些功能.比如说，在我["Recreating the iTunes Library"](https://bitsofco.de/challenge-itunes-library/)这篇文章中用到的很多gif，下图是其中之一
![](https://bitsofco.de/content/images/2017/01/lossy-compressed.gif)

但是，问题来了，gif很大，上面的那张的原始大小就超过了11.4MB(注意:上面的那张不是原图，我压缩了了下，不然真的太大了).最近，我发现文章里有比较大的gif时，加载就会很慢.因为gif的每一帧都用了无损压缩算法，存储成一张图片.这就意味着，在压缩的时候，没有任何图片信息损失，自然形成的gif就不小了.

为了让gif在网页上能更轻一点，我们可以做些事情.

## 使用HTML5 Video

让人很意外的是，gif的无损压缩算法让像MP4，WEBM的视频格式把文件变得比gif还小.这样的话，一种gif更轻的方法就是，用自动播放且循环的HTML5 Video来代替gif.

通过使用[video]标签的一些属性，我们可以模拟出gif，但是文件却更轻了，我们需要设定如下的属性
- autoplay:自动播放
- loop:无限循环播放
- muted:静音，虽然gif没有声频，但是对于safari浏览器自动播放视频是必要的
- playsinline:针对 iOS Safari，不会将视频切换到全屏模式
- poster:当视频下载的时候显示的图片

为了此文上面的gif，我们可以用如下代码

```
<video autoplay loop muted playsinline poster="original.jpg">  
    <source type="video/webm" src="original.webm">
    <img src="original.gif">
</video>
```
[我做了个domo](https://jsfiddle.net/huahua/p29ja2u1/)
现在，这只有1MB!!!
将GIF转换成WebM，可以使用

## 有损耗的优化

HTML5 Video并不能在任何情况都奏效，有时我们不得不使用真实的gif.比如说，当这篇博客帖子作为电子邮件投递的时候，一个真实的GIF就必须要被使用.因此，另外的优化方案就是让GIF自己变得更轻

GIF的压缩算法是无损的，但是也有一些有损压缩选项.尽管这样，gif的质量会略有下降，但是整体和原图也相差不多.

有很多有损压缩的工具.常用的有[gifsicle](https://github.com/kohler/gifsicle)和[giflossy](https://github.com/pornel/giflossy).Gifsicle是通过命令行界面管理GIF文件，Giflossy是其一个分支，提供一个有损压缩的选项(--lossy).

使用giflossy对gif进行有损压缩，可以使用如下命令行

```
gifsicle -O3 --lossy=80 -o compressed.gif original.gif
```
"-03"这个选项是告诉gifsicle用几个方法进行优化，从而看哪个最合适."--lossy=80"这个选项表示有损压缩的程度(数值越大，压缩越厉害).根据具体情况，调整这个值."-o compressed.gif"这个选项是输出的GIF的文件名.最后是输入的gif的路径

使用这个方式，可以将之前的那张11.41MB减小到6MB，缩减了47%!


## 小结
两种方式结合使用，我们可以让GIF更轻，而且不会影响效果，超赞~


本文是翻译[https://bitsofco.de/optimising-gifs/](https://bitsofco.de/optimising-gifs/),水平有限,欢迎指正~