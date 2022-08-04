
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
        email:[/@/,'邮箱格式错误']
    });

const layer = layui.layer;
// 初始化用户信息
const initUserInfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success:res=>{
                    const {status,message,data}=res
                    if(status!==0) return layer.msg(message)
                    form.val('formUserInfo',data)
                }
  });
};
initUserInfo();

// 重置表单数据
$("#btnReset").click((e) => {
    e.preventDefault();
    initUserInfo()
});

$('.layui-form').submit(function(e){
e.preventDefault();
$.ajax({
    type:'GET',
    url: "/my/userinfo",
    data:form.val('formUserInfo'),
    success:function(res){
//console.log(res);
const {message,status}=res
if(status!==0)return layer.mes(message)
;

window.parent.getUserInfo();
    }
})
})