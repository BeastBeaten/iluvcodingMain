<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="shortcut icon" href="http://pic.iluvcoding.com/iluvcodingMain/coding.ico" type="image/x-icon">

    <title>Coding,Living,Gaming</title>

    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>

    <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <link href="http://pic.iluvcoding.com/iluvcodingMain/css/carousel.css" rel="stylesheet">


</head>

<body style="padding-top:50px">

<div data-ui-view=""></div>

<!-- fileModal -->
<div class="modal fade" id="fileModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">{{fileChosen.title}}</h4>
            </div>
            <div class="modal-body">
                {{fileChosen.content}}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">点赞</button>
            </div>
        </div>
    </div>
</div>

<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="http://pic.iluvcoding.com/iluvcodingMain/js/assets/e10-viewport-bug-workaround.js"></script>
<script data-main="http://pic.iluvcoding.com/iluvcodingMain/js/deploy/app-web-index.min.js" src="http://pic.iluvcoding.com/iluvcodingMain/js/lib/requiremin.js"></script>


</body>
</html>
