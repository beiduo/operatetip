#Operatetip for KISSY
***

##组件简介：
***

Operatetip是一个比较灵活的提示信息组件，通常用于AJAX请求等用途

##如何使用：
***

本组件依赖于KISSY框架

###调用方法
***

####CSS

引入文件

    src/css/ui-operatetip.css

####Javascript

    //KISSY的相关配置见demo.html

这个构建函数同时可以接受一个可自定义的选项对象作为可选参数，除了msg选项外其他均属可选设置

    KISSY.use('operatetip/index', function (S, OperateTip) {
        new OperateTip({
            msg: '提示信息'
        });
    });

##选项设置：

            self.id = self.get('id');
            self.status = self.get('status');
            self.classname = self.get('classname');
            self.msg = self.get('msg');
            self.top = self.get('top');
            self.mask = self.get('mask');
            self.insert = self.get('insert');
            self.tpl = self.get('tpl');
            self.show = self.get('show');
            self.hide = self.get('hide');
            self.destroy = self.get('destroy');
            self.transfer = self.get('transfer');
***

**id**: （字符串）

如果多个不同的OperateTip对象指定同一个id，则它们将公用同一个dom节点

**status**: （字符串）

success/error 可调用预置的样式

**classname**: （字符串）

供添加自定义样式

**tpl**: （字符串）

自定义模板，须符合KISSY的XTemplate模板引擎语法，如{{msg}}将被msg参数替换

**insert**: （DOM对象或选择器字符串）

如果有定义此选项，则提示信息将被插入到指定容器内，如果未定义或指定为null，则会以绝对定位的方式插入到body中

**top**：（字符串）

仅在insert未定义时有效，为绝对定位时离顶部的距离，需带px等单位

**zIndex** （字符串）

仅在insert未定义时有效，为绝对定位时的z-index值

**transfer**：（数值）

动画效果，fade/slide/空值，默认为fade，指定为空值将会无动画效果

##API

**setContent(opt)**

重设classname\status\msg\tpl。

示例

    .setContent({
        status: 'error',
        classname: 'customclass',
        msg: 'new message',
        tpl: 'new template: {{msg}}'
    });

**setStyle(opt)**

重设显示的位置和z-index

示例

    .setStyle({
        insert: '#wrapper',
        zIndex: '9999'
    });

**show()**

显示提示信息

**hide(fn)**

隐藏提示信息，接受一个回调函数

**destroy(fn)**

彻底删除提示信息，提供一个回调函数