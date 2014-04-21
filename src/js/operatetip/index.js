KISSY.add(function (S, Node, Base, XTemplate) {
    "use strict";
    /*jslint browser:true */
    /*jslint devel: true */
    /*jslint node: true */

    var $ = S.all;


    function operateTip(cfg) {
        var self = this;

        if (self instanceof operateTip) {

            operateTip.superclass.constructor.call(self, cfg);
        } else {

            return new operateTip(cfg);
        }
    }

    operateTip.ATTRS = {
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
            value: null,
        },
        mask: {
            value: null
        },
        tpl: {
            value: '{{msg}}'
        },
        show: {
            value: function () {
                var self = this;

                $(self.node).fadeIn();

                return self;
            }
        },
        hide: {
            value: function (fn, fn2) {
                var self = this;

                if (typeof fn === 'function') {
                    $(self.node).fadeOut(1, function () {
                        fn();
                        if (typeof fn2 === 'function') {
                            fn2();
                        }
                    });
                } else {
                    $(self.node).fadeOut();
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
                        if (self.hasOwnProperty(key)){
                            delete self[key];
                        }
                    }
                }, fn2);

                return self;
            }
        }
    };

    S.extend(operateTip, Base, {
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
                self.node.style.top = self.top + 'px';
                self.node.style.left = '0';
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

    return operateTip;
}, {
    requires: ['node', 'base', 'xtemplate']
});