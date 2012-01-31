
<%
    String debug = Boolean.parseBoolean(request.getParameter("debug-qualifier")) ? "/lib" : "";
%>
<link rel="stylesheet" type="text/css" href="${param['relPath']}js/geoext/resources/css/geoext-all.css" />
<script type="text/javascript" src="${param['relPath']}js/geoext<%= debug %>/GeoExt.js"></script>
<script type="text/javascript" src="${param['relPath']}js/geoext/lib/overrides/override-ext-ajax.js"></script>