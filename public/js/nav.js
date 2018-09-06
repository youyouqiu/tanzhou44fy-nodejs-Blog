// layui 首页登录模块个人中心下拉框效果js

layui.use(['element', "layer", 'form'], function(){
    const element = layui.element;
    const layer = layui.layer;
    let form = layui.form;
    const $ = layui.$;
   
    const $liS = $(".user").eq(0);
    const $olS = $("#usertab");

    $liS.on("mouseenter", function (){
        $olS.addClass("usertab2").removeClass("usertab1");
    });

    $liS.on("mouseleave", function (){
        $olS.addClass("usertab1").removeClass("usertab2");
    })
});
    
