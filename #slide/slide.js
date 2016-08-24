  // curslide 和zshowing的索引一致
    var curslide = 0;
    var slidelist = document.querySelector(".zslidelist");
    var slides = document.querySelectorAll(".zslide");
    var len = slides.length;
      /*为了增强友好性 万一没加载成功js*/
    document.querySelector(".zslidectrl").style.display = "block";
    /*为了增强友好性 万一没加载成功js*/
    /* function nextShowing() {
       slides[curslide].className = "zslide";
       // 0%3 = 0; 1%3=1; 2%3=2;///// 3%3=0;4%3=1;
       curslide = (++curslide) % len;
       slides[curslide].className = "zslide zshowing";
     }*/
    var loop = setInterval(nextShowing, 1000);
    /* 以下是控件内容 没控件的时候上面就行*/
    var pausebtn = document.querySelector(".zpause");
    var prevbtn = document.querySelector(".zprev");
    var nextbtn = document.querySelector(".znext");
    var zpageitems = document.querySelectorAll(".zpageitem");
    // 是否在播放
    var playing = true;
    pausebtn.onclick = function() {
      playing ? pauseSlideShow() : playSlideShow();
    }
    prevbtn.onclick = function() {
      prevShowing();
      pauseSlideShow();
    }
    nextbtn.onclick = function() {
      nextShowing();
      pauseSlideShow();
    }

    for (var i = 0; i < len; i++) {
      zpageitems[i].onclick = (function(n) {
        return function() {
          goToSlide(n);
        };
      })(i);
    }
  // 停止播放
  function pauseSlideShow() {
    clearInterval(loop);
    loop = null;
    playing = false;
    pause.innerHTML = "播放";
  }
// 继续播放
  function playSlideShow() {
    loop = setInterval(nextShowing, 1000);
    playing = true;
    pause.innerHTML = "停止"
  }
// 去哪张幻灯片
  function goToSlide(n) {
    slides[curslide].className = "zslide";
    // 小索引
    zpageitems[curslide].className = "zpageitem";
    // 因为n可能小于0 比如0的时候 0-1 = -1  这句是关键 恩 很关键
    curslide = (n + len) % len;
    slides[curslide].className = "zslide zshowing";
    // 小索引
    zpageitems[curslide].className = "zpageitem zshowing";
  }
// 去下一张幻灯片
  function nextShowing() {
    goToSlide(curslide + 1);

  }
// 去上一张幻灯片
  function prevShowing() {
    goToSlide(curslide - 1);
  }


