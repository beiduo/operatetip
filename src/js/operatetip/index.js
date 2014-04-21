KISSY.add(function (S, Node, Base, XTemplate) {
    "use strict";
    /*jslint browser:true */
    /*jslint devel: true */
    /*jslint node: true */

    var $ = S.all;


    function OperateTip(cfg) {

        if (this instanceof OperateTip) {

            OperateTip.superclass.constructor.call(this, cfg);
        } else {

            return new OperateTip(cfg);
        }
    }

    OperateTip.ATTRS = {
        id: {
            value: ''
        },
        status: {
            value: ''
        },
        classname: {
            value: ''
        },
        msg: {
            value: ''
        },
        top: {
            value: '0'
        },
        zIndex: {
            value: 'inherit'
        },
        insert: {
            value: null
        },
        mask: {
            value: null
        },
        tpl: {
            value: '{{msg}}'
        },
        transfer: {
            value: 'fade'
        },
        show: {
            value: function () {
                var self = this;

                if (self.transfer === 'fade') {
                    $(self.node).fadeIn();
                } else if (self.transfer === 'slide') {
                    $(self.node).slideDown();
                } else {
                    $(self.node).show();
                }
                

                return self;
            }
        },
        hide: {
            value: function (fn, fn2) {
                var self = this;

                if (typeof fn === 'function') {
                    if (self.transfer === 'fade') {
                        $(self.node).fadeOut(1, function () {
                            fn();
                            if (typeof fn2 === 'function') {
                                fn2();
                            }
                        });
                    } else if (self.transfer === 'slide') {
                        $(self.node).slideUp(1, function () {
                            fn();
                            if (typeof fn2 === 'function') {
                                fn2();
                            }
                        });
                    } else {
                        $(self.node).hide();
                        fn();
                        if (typeof fn2 === 'function') {
                            fn2();
                        }
                    }
                    
                } else {
                    if (self.transfer === 'fade') {
                        $(self.node).fadeOut();
                    } else if (self.transfer === 'slide') {
                        $(self.node).slideUp();
                    } else {
                        $(self.node).hide();
                    }
                }

                if (typeof self.mask === 'object') {
                    try {
                        self.mask.removeMask();
                    } catch (e) {}
                }

                return self;
            }
        },
        destroy: {
            value: function (fn) {
                var self = this,
                    fn2 = fn;

                self.hide(function () {
                    var key;

                    $(self.node).remove();

                    for (key in self) {
                        if (self.hasOwnProperty(key)) {
                            delete self[key];
                        }
                    }
                }, fn2);

                return self;
            }
        }
    };

    S.extend(OperateTip, Base, {
        initializer: function () {
            var self = this;
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
            self.zIndex = self.get('zIndex');

            if (document.getElementById(self.id)) {
                self.node = document.getElementById(self.id);
            } else {
                self.node = document.createElement('div');
                self.node.id = self.id;
            }

            self.node.style.display = 'none';

            self.setStyle().setContent().show();

            return self;
        },
        setContent: function (opt) {
            var key, self = this;

            if (typeof opt === 'object') {
                for (key in opt) {
                    if (opt.hasOwnProperty(key)) {
                        self[key] = opt[key];
                    }
                }
            }

            self.node.className = 'ui-operatetip ' + self.classname + ' ' + self.status;
            self.node.innerHTML = new XTemplate(self.tpl).render(self);

            return self;
        },
        setStyle: function (opt) {
            var key, fn, self = this;

            if (typeof opt === 'object') {
                for (key in opt) {
                    if (opt.hasOwnProperty(key)) {
                        self[key] = opt[key];
                    }
                }
            }

            fn = function () {
                self.node.style.position = 'absolute';
                self.node.style.width = '100%';
                self.node.style.top = self.top;
                self.node.style.left = '0';
                self.node.style.zIndex = self.zIndex;
                document.body.appendChild(self.node);
            };

            if (self.insert) {
                self.node.style.position = 'static';
                try {
                    $(self.insert).prepend($(self.node));
                } catch (e) {
                    fn();
                }
            } else {
                fn();
            }

            return self;
        }
    });

    return OperateTip;
}, {
    requires: ['node', 'base', 'xtemplate']
});