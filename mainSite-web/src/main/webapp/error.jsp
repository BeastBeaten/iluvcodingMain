<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" language="java" %>
<%@ page session="false" %>
<% response.setStatus( 500 ); %>
<!doctype html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>500-服务器内部错误</title>
    <link rel="stylesheet" href="http://pictest.ofcard.com/ofss/css/page.css" />
</head>
<body>
<div class="errorPage-wrapper error-500">

    <ul class="actionLinks">
        <li>
            <h3>服务器内部出错了</h3>
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
<%--<% if (exception != null) { %>--%>
<%--<%--%>
    <%--exception.printStackTrace(new java.io.PrintWriter(out));--%>

<%--%>--%>
<%--<% } else if ((Exception)request.getAttribute("javax.servlet.error.exception") != null) { %>--%>
<%--<% ((Exception)request.getAttribute("javax.servlet.error.exception")).printStackTrace(new java.io.PrintWriter(out)); %>--%>
<%--<% } %>--%>
</body>
</html>