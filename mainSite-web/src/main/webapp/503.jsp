<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" language="java" %>
<%@ page session="false" %>
<% response.setStatus( 503 ); %>
<!doctype html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>503-该页面无法访问</title>
    <link rel="stylesheet" href="http://pictest.ofcard.com/ofss/css/page.css" />
</head>
<body>
<div class="errorPage-wrapper error-503">
    <ul class="actionLinks">
        <li>
            <h3>服务器无法处理请求</h3>
        </li>
        <li>
            <i class="icon icon-refresh"></i>
            <a href="">再来一次</a>
        </li>
        <li>
            <i class="icon icon-share"></i>
            <a href="">敢不敢再来啊</a>
        </li>
    </ul>
</div>
</body>
</html>