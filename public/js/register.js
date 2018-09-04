// layui用户注册登录模块加载js

// 加载layui.element,layui.laypage模块
layui.use(['element', "layer"], function(){
    const element = layui.element;
    const layer = layui.layer;
    const $ = layui.$;
  
    // $submit = $(".layui-show button[type!=reset]")
    let $username = $(".layui-show input[name=username]");
    let $password = $(".layui-show input[name=password]");
    let $password2 = $(".layui-show input[name=confirmPWD]");
    let $city = $(".layui-show input[name=city]");
    
    /* 
        $username.on("input", () => {
            let username = $username.val();
            if(val.length < 6)return;
        });
    */
  
    $password2.on("blur", function (){
        const pwd = $password.val();
        if($(this).val() !== pwd){
            layer.msg("两次密码不一致");
            $(this).val("");
        }
    })
});

// 加载layui.form模块
layui.use('form', function(){
    let form = layui.form;
    
    //监听提交
    form.on('submit(formDemo)', function(){
        // layer.msg(JSON.stringify(data.field));
        
        console.log(JSON.stringify(data.field));
        
        return true;
    });
});






