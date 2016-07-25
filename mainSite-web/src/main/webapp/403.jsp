<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false" %>
<% response.setStatus( 403 ); %>
<!doctype html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>403-该页面无法访问</title>
    <link rel="stylesheet" href="http://pictest.ofcard.com/ofss/css/page.css" />
</head>
<body>
<div class="errorPage-wrapper error-403">
    <ul class="actionLinks">
        <li>
            <h3>今天我不在家哦</h3>
        </li>
        <li>
            <i class="icon icon-refresh"></i>
            <a href="">再来一次</a>
        </li>
        <li>
            <i class="icon icon-share"></i>
            <a href="">爱妃稍候，朕等等再来。</a>
        </li>
    </ul>
</div>
</body>
</html>