// layui Html子页面文章展示效果js

layui.use(['element', "layer", 'form', "laypage"], function(){
    const element = layui.element;
    const layer = layui.layer;
    let form = layui.form;
    let laypage = layui.laypage;
    const $ = layui.$;

    element.tabDelete("demo", "xxx");

    // laypage 分页插件
    laypage.render({
        elem: 'laypage',
        count: $("#laypage").data("maxnum"), //数据总数，从服务端得到
        limit: 6, // 每页显示条数
        groups:3, // 连续出现的页码个数
        curr: location.pathname.replace('/html/page/', ''), // 起始页
        jump(obj, first){
            //obj包含了当前分页的所有参数
            $("#laypage a").each((i, v) => {
                let pageValue = `/html/page/${$(v).data("page")}`;
                v.href = pageValue;
            })
        }
    });
});

