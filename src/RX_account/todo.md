1. setState函数不会马上执行state合并，所以后续操作不能马上依赖新的state。
2. 每次setState之后界面会被刷新，setState函数应该在操作响应函数里调用，不能在界面渲染函数里调用。
3. array.sort函数在node和在RN里处理不同，在RN里回调函数需返回1或-1，不能返回bool值。

1. KeyboardAvoidingView不完全避免遮挡问题，用keyboardVerticalOffset似乎可以解决。
2. 地址输入大段文字问题。

