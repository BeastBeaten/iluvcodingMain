<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="shortcut icon" href="http://iluvcoding-pic.oss-cn-hangzhou.aliyuncs.com/iluvcodingMain/favicon.ico" type="image/x-icon">

    <title>Coding,Living,Gaming</title>

    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>

    <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <link href="http://iluvcoding-pic.oss-cn-hangzhou.aliyuncs.com/iluvcodingMain/css/carousel.css" rel="stylesheet">
</head>

<body style="padding-top:50px">
<div class="navbar-wrapper">
    <div class="container">

        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="http://www.iluvcoding.com/">C.L.G-Ing</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">首页</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">关于我 <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a><strong>不懂互联网产品设计的全栈工程师不是个好架构</strong></a></li>
                                <li role="separator" class="divider"></li>
                                <li class="dropdown-header">联系方式</li>
                                <li><a><strong>邮箱:</strong>qingshou@iluvcoding.com</a></li>
                                <li><a><strong>微信:</strong><img class="featurette-image img-responsive center-block" src="http://iluvcoding-pic.oss-cn-hangzhou.aliyuncs.com/iluvcodingMain/imgs/info/wxcode.jpg"  alt="我的微信二维码"></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </div>
</div>


<div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
        <div class="item active">
            <img class="first-slide" src="http://iluvcoding-pic.oss-cn-hangzhou.aliyuncs.com/iluvcodingMain/imgs/carousel/carousel-coding-1.jpg" alt="First slide">
            <div class="jumbotron">
            <div class="container">
                <div class="carousel-caption">
                    <h1>Coding</h1>
                    <p>世界的未来是程序员的</p>
                    <p>Programmers R The Prophets.</p>
                    <p><a class="btn btn-lg btn-primary" href="/web/preview#/preview/coding" role="button">哔--!</a></p>
                </div>
            </div>
            </div>
        </div>
        <div class="item">
            <img class="second-slide" src="http://iluvcoding-pic.oss-cn-hangzhou.aliyuncs.com/iluvcodingMain/imgs/carousel/carousel-living-2.jpg" alt="Second slide">
            <div class="jumbotron">
            <div class="container">
                <div class="carousel-caption">
                    <h1>Living</h1>
                    <p>生活不是眼前的苟且,也不是诗和远方,而是找回自我的平凡之路</p>
                    <p>Fuck yourself,Fucked by the world,Or go fuck the wolrd.</p>
                    <p><a class="btn btn-lg btn-primary" href="/web/preview#/preview/living" role="button">发现我</a></p>
                </div>
            </div>
            </div>
        </div>
        <div class="item">
            <img class="third-slide" src="http://iluvcoding-pic.oss-cn-hangzhou.aliyuncs.com/iluvcodingMain/imgs/carousel/carousel-gaming-2.jpg" alt="Third slide">
            <div class="jumbotron">
            <div class="container">
                <div class="carousel-caption">
                    <h1>Gaming</h1>
                    <p>人生不是游戏,游戏丰富人生</p>
                    <p>Life is not a game,But full it with games.</p>
                    <p><a class="btn btn-lg btn-primary" href="/web/preview#/preview/gaming" role="button">Start</a></p>
                </div>
            </div>
            </div>
        </div>
    </div>
    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div><!-- /.carousel -->


<!-- Marketing messaging and featurettes
================================================== -->
<!-- Wrap the rest of the page in another container to center all the content. -->

<div class="container marketing">

    <!-- START THE FEATURETTES -->

    <hr class="featurette-divider">

    <div class="row featurette">
        <div class="col-md-7">
            <h2 class="featurette-heading">Angular2 With Typescript<span class="text-muted">灵动的下一代前端开发模型</span></h2>
            <p class="lead">从“前后端分离”到“只有前端”，近几年各类前端开发框架大方异彩，其中基于ECMAScript5到6的各类特性的应用也趋于成熟，让我们看一下进几年的几个主流前端框架，再延伸到目前还在预热阶段的Angular2的特点和前端框架未来演进方向。</p>
        </div>
        <div class="col-md-5">
            <%--<img class="featurette-image img-responsive center-block" src="http://iluvcoding-pic.oss-cn-hangzhou.aliyuncs.com/iluvcodingMain/imgs/mainpic/angularjs2.jpg"  alt="Generic placeholder image">--%>
        </div>
        <div class="col-md-7">
            <p class="text-muted">作者：勍兽 | 发布时间：2016-07-25 10:13:46 |  <button type="button" class="btn btn-xs btn-link"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></button>  |  <button type="button" class="btn btn-xs btn-link"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></button></p>
            <%--<img class="featurette-image img-responsive center-block" src="#" data-src="holder.js/500x500/auto" alt="Generic placeholder image">--%>
        </div>
        <div class="col-md-5"></div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
        <div class="col-md-7 col-md-push-5">
            <h2 class="featurette-heading">Tommy Emmanuel<span class="text-muted">澳大利亚国宝级吉他大师</span></h2>
            <p class="lead">老Tommy是我的偶像加激励我吉他学习路上的灵魂导师，记得第一次知道这个名字是我的吉他老师在放光盘，里面一个白发大叔用一把吉他轻松写意的弹出一个乐队一样的声乐效果，突然发现原来吉他还能玩成这样，就像人生打开了一扇新的大门，让我们一起多了解下这位大叔和指弹吉他演奏。</p>
        </div>
        <div class="col-md-5 col-md-pull-7">

        </div>
        <div class="col-md-7 col-md-push-5">
            <p class="text-muted">作者：勍兽 | 发布时间：2016-08-03 16:15:31 |  <button type="button" class="btn btn-xs btn-link"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></button>  |  <button type="button" class="btn btn-xs btn-link"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></button></p>
        </div>
        <div class="col-md-5 col-md-pull-7"></div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
        <div class="col-md-7">
            <h2 class="featurette-heading">Blizzard<span class="text-muted">暴雪出品必属精品</span></h2>
            <p class="lead">从80后熟悉的星际争霸，到痴迷了一代人的暗黑破坏神系列，到中国电子竞技巅峰的WAR3,到全球现象级游戏的魔兽世界，再到最近风靡全世界的守望先锋。让我们一起随着游戏人青春的轨迹，了解一下暴雪公司的前世今生。</p>
        </div>
        <div class="col-md-5">

        </div>
        <div class="col-md-7">
            <p class="text-muted">作者：勍兽 | 发布时间：2016-07-21 08:14:23 |  <button type="button" class="btn btn-xs btn-link"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></button>  |  <button type="button" class="btn btn-xs btn-link"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></button></p>
        </div>
        <div class="col-md-5"></div>
    </div>

    <hr class="featurette-divider">

    <!-- /END THE FEATURETTES -->


    <!-- FOOTER -->
    <footer>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p>© Copyright 2016. 勍兽 | 苏ICP备16038922号-1</p>
    </footer>

</div><!-- /.container -->


<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="http://iluvcoding-pic.oss-cn-hangzhou.aliyuncs.com/iluvcodingMain/js/assets/e10-viewport-bug-workaround.js"></script>
</body>
</html>
