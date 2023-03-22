//获取各种元素：
var cause = document.getElementById('cause').value;
var date = document.getElementById('date-text').value;
var number = document.getElementById('date-text1').value




//转化函数：
var change = (number) => {
    var result;
    if (number == "第一大节") { result = 1; }
    else if (number == "第二大节") { result = 2; }
    else if (number == "第三大节") { result = 3; }
    else { result = 4; }
    /* 可以通过对象来创建 */
    return result;
}
let user_id =  localStorage.getItem('id');
console.log(user_id);

//判断时间是否合理：
var judged = (judge) => {
    
    var dated = new Date();
    
    let day = dated.getDate();
    if (day < 10) {
        day = "0" + day;
   }

    let month = dated.getMonth();
    
    month = month + 1;
    if (month < 10) {
        month = "0" + month;
    }

    let year = dated.getFullYear();
     
    var nowdate = year + "-" + month + "-" + day;
    var date = document.getElementById('date-text').value;
    console.log("你选的时间是"+date);
    console.log("现在的时间是"+nowdate);
    
    if (date>=nowdate) {
       return 1;
    }
    else {
        return 0;
    }




}

//点击确认后执行：
function isconfirm(){
    //获取各种元素：
    var cause = document.getElementById('cause').value;
    var date = document.getElementById('date-text').value;

    var number = document.getElementById('date-text1').value
    //将第几大节转化为数字：
    var resulted = change(number);
   
    var indexd = 0;
    var index = confirm('是否确认请假');
    //获取判断时间是否合理：
    var judge = judged(resulted);
   

    //这块是再次确认之后向后端传入信息
    if (cause =='') {
        alert("原因不能为空");
    }
    if (date =='') {
        alert("时间不能为空");
    }
    if (!judge) {
        alert("请假时间不合理，请重新选择请假时间");
    }
    if (cause!=''&& date != ''&&judge) {
        indexd= 1;
    }
    
    if (index&&indexd) {
        axios({
            headers: {
                "Content-type": "application/json",
            },
            method: 'post',
            url: 'https://zkr.shenzhuo.vip/user/ask_leave',
            data: {
                user_id: `${user_id}`,
                leave_reason: `${cause}`,
                leave_date: `${date}`,
                leave_class: `${resulted}`,
            }
          
        }).then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                alert("请假成功");
            }
            // alert(res.data);
            // if (res.data != "未查询到研学信息") {
            //     alert("成功请假");
            //     console.log("已成功请假");
            // }
            // else {
            //     alert("为查询到研学信息，请重新确认");
            // }
        }).catch(function (error) {
           
            alert(error.response.data);
           
        })
       
       

        
    }
    // if (index&&indexd) {
    //     axios({
    //         headers: { "Content-type": "application/json" },
    //         method: 'get',
    //         url: 'http://6xa4kvxq.shenzhuo.vip:47020/api/getdata/'
    //     }).then((res) => {
    //         console.log(res.data.username);
    //     })
        

    // }
};