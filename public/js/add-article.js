// layui 添加文章效果js

layui.use(['form', 'layedit', "element"], function (){
    const form = layui.form;
    const layedit = layui.layedit;
    const element = layui.element;
    const $ = layui.$;

    const index = layedit.build('article-content', {
        hideTool: [
        'image' //插入图片
        ]
    }); // 构建编辑器

    form.on("submit(send)", res => {
        const { tips, title } = res.field;

        if(layedit.getText(index).trim().length === 0)return layer.alert("请输入内容");
        
        const data = {
            tips,
            title,
            content: layedit.getText(index)
        }

        $.post("/article", data, msg => {
            if(msg.status){
                layer.alert('发表成功', res => {
                    location.href = "/html";
                })
            } else {
                layer.alert(`发表失败，失败信息：${msg.msg}`);
            }
        })
    })

    //- let res = 0
    //- const proving = () => {
    //-   const sym = ["+", '-', '*', '/']
    //-   let num1 = parseInt(Math.random()*100)
    //-   let num2 = parseInt(Math.random()*100)
    //-   let str = num1 + sym[parseInt(Math.random() * (sym.length - 1))] + num2
    //-   $(".result").html(str)
    //-   res = eval(str)
    //- }
    //- proving()
    //- // 验证
    //- $("button").on("click", () => {
    //-   if($("#L_vercode").val()*1 === res){
    //-   }
    //- })
});

