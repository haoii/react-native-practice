1. setState函数不会马上执行state合并，所以后续操作不能马上依赖新的state。
2. 每次setState之后界面会被刷新，setState函数应该在操作响应函数里调用，不能在界面渲染函数里调用。
3. array.sort函数在node和在RN里处理不同，在RN里回调函数需返回1或-1，不能返回bool值。
4. this.setState({})不能连续调用，第二次调用没有用，第一次之后的修改不会马上生效。
5. 每次setState之后，本页页面会更新，下层组件的props如果基于本层的state，则可以得到间接更新。

1. KeyboardAvoidingView不完全避免遮挡问题，用keyboardVerticalOffset似乎可以解决。
2. 地址输入大段文字问题。
3. fetch之后提示提交是否成功。

4. 开工时间问题。
5. 发布时间问题。
6. 非必须项目，填写完没有收回键盘直接确认，会导致onEndEditing没有调用。
7. 大字体显示问题。
8. 除了首页，其他改成卡片式。首页动态加上用户信息（图像，名，时间）。
9. 每个写了材料、客户、材料商的地方，都加上链接到相应详细信息界面。
10. 订单列表汇总一下。
11. 订单是否已支付问题。
12. 各个信息编辑处理。
13. 起名字不能带有‘无’字。
14. hint对齐问题。
15. 添加材料订单时，同一个工地添加了同一种材料的处理。
16. model的unique问题。



1. cache
2. 消息队列
3. 并发
4. 测试
5. 日志


1. 时间区间选择
2. 客户、材料商关联的交易
3. 材料关联信息
4. 客户、材料商、材料、分类的删改
5. 测试
6. 工人、司机等信息
7. 其他收入、开支
8. 仓库材料管理



    <!-- 1. 不能重复。 -->
    <!-- 2. 删除。 -->
    <!-- 3. 判断是否全买了等。 -->
    <!-- 4. 显示各材料商，及已付款。 -->
    5. 客户花费统计，均价。

[
  {
    '河北':
    [
      {
        '石家庄':
        [
          
        ]
      },
      {

      },
    ]
  },
  {

  },
]


{
  "get_time": "2019-03-19T10:36:40.867Z", 
  "latest_material_orders": 
  [
    {
      "id": 6, 
      "order_date": "2019-03-19", 
      "clerk": "\u90dd\u9ad8\u5cf0", 
      "remark": null, 
      "customer_in_order": 
      {
        "\u5f20\u4e09(\u94b0\u68658-12-3)": 
        {
          "material_in_customer_in_order": 
          {
            "\u8bfa\u8d1d\u5c14-4129": 
            {
              "unit": "\u5757", 
              "quantity": 2.0, 
              "remark": null, 
              "average_price": 300.0, 
              "paid_ratio": 0.5
            }
          }
        }, 

        "WangJiu(Street 2-4)": 
        {
          "material_in_customer_in_order": 
          {
            "\u8bfa\u8d1d\u5c14-4129": 
            {
              "unit": "\u5757", 
              "quantity": 8.0, 
              "remark": null, 
              "average_price": 300.0, 
              "paid_ratio": 0.5
            }
          }
        }
      }, 
      
      "material_in_order": 
      {
        "\u8bfa\u8d1d\u5c14-4129": 
        {
          "quantity": 10.0, 
          "expense": 3000.0, 
          "unit": "\u5757", 
          "from_in_material_in_order": 
          {
            "\u91d1\u5bb6\u88571\u53f7\u4ed3\u5e93(\u4ed3\u5e93)": 
            {
              "quantity": 5.0, 
              "price": 300.0, 
              "is_paid": true, 
              "remark": null
            }, 
            "1\u53f7\u74f7\u7816\u5e97(4 )": 
            {
              "quantity": 5.0, 
              "price": 300.0, 
              "is_paid": false, 
              "remark": null
            }
          }
        }
      }
    }
  ]
}