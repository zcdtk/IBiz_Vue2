"use strict";
Vue.component('ibiz-header-user', {
    template: "\n        <div style=\"float:right;\">\n            <dropdown @on-click=\"userSelect($event)\">\n                <div style=\"font-size: 15px;cursor: pointer;margin-right: 10px;\">\n                    <span>{{ user.name }} &nbsp;&nbsp;</span>\n                    <span><img :src=\"user.avatar\" style=\"width: 40px;padding-top: 10px;float: right;\" /></span>\n                </div>\n                <dropdown-menu slot=\"list\" style=\"font-size: 15px !important;\">\n                    <dropdown-item name=\"insrt\" style=\"font-size: 15px !important;\">\n                        <span> <i aria-hidden=\"true\" class=\"fa fa-cogs\" style=\"margin-right: 8px;\"></i></span>\n                        <span>\u5B89\u88C5\u4F9D\u8D56</span>\n                    </dropdown-item>\n                    <dropdown-item name=\"logout\" style=\"font-size: 15px !important;\">\n                        <span> <i aria-hidden=\"true\" class=\"fa fa-cogs\" style=\"margin-right: 8px;\"></i></span>\n                        <span>\u9000\u51FA\u767B\u9646</span>\n                    </dropdown-item>\n                </dropdown-menu>\n            </dropdown>\n        </div>\n    ",
    data: function () {
        var data = {
            iBizHttp: new IBizHttp(),
            iBizNotification: new IBizNotification(),
            user: {
                name: '匿名访问',
                avatar: '../../../assets/img/avatar.png',
            }
        };
        return data;
    },
    mounted: function () {
        var _this = this;
        _this.iBizHttp.post("/" + IBizEnvironment.SysName + IBizEnvironment.AppLogin, { srfaction: 'getcuruserinfo' }).subscribe(function (result) {
            if (result.ret === 0) {
                if (Object.keys(result.data).length !== 0) {
                    var _data = {};
                    Object.assign(_data, result.data);
                    Object.assign(_this.user, {
                        name: _data.username,
                        email: _data.loginname,
                        id: _data.userid,
                        time: +new Date
                    });
                }
            }
        }, function (error) {
            console.log(error);
        });
    },
    methods: {
        installRTData: function () {
            var _this = this;
            _this.iBizHttp.post("/" + IBizEnvironment.SysName + IBizEnvironment.InstallRTData, {}).subscribe(function (result) {
                if (result.ret === 0) {
                    _this.iBizNotification.success('成功', result.info);
                }
                else {
                    _this.iBizNotification.error('错误', result.info);
                }
            }, function (error) {
                _this.iBizNotification.error('错误', error.info);
            });
        },
        logout: function () {
            var curUrl = decodeURIComponent(window.location.href);
            window.location.href = "/" + IBizEnvironment.SysName + IBizEnvironment.Logout + "?RU=" + curUrl;
        },
        userSelect: function (name) {
            console.log(name);
            if (Object.is(name, 'insrt')) {
                this.installRTData();
            }
            else if (Object.is(name, 'logout')) {
                this.logout();
            }
        }
    }
});
