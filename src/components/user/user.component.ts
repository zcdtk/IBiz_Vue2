Vue.component('ibiz-header-user', {
    template: `
        <div style="float:right;">
            <dropdown @on-click="userSelect($event)">
                <div style="font-size: 15px;cursor: pointer;margin-right: 10px;">
                    <span>{{ user.name }} &nbsp;&nbsp;</span>
                    <span><img :src="user.avatar" style="width: 40px;padding-top: 10px;float: right;" /></span>
                </div>
                <dropdown-menu slot="list" style="font-size: 15px !important;">
                    <dropdown-item name="insrt" style="font-size: 15px !important;">
                        <span> <i aria-hidden="true" class="fa fa-cogs" style="margin-right: 8px;"></i></span>
                        <span>安装依赖</span>
                    </dropdown-item>
                    <dropdown-item name="logout" style="font-size: 15px !important;">
                        <span> <i aria-hidden="true" class="fa fa-cogs" style="margin-right: 8px;"></i></span>
                        <span>退出登陆</span>
                    </dropdown-item>
                </dropdown-menu>
            </dropdown>
        </div>
    `,
    data: function () {
        let data = {
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
        let _this = this;
        _this.iBizHttp.post(`/${IBizEnvironment.SysName}${IBizEnvironment.AppLogin}`, { srfaction: 'getcuruserinfo' }).subscribe(function (result) {
            if (result.ret === 0) {
                if (Object.keys(result.data).length !== 0) {
                    let _data: any = {};
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
        installRTData() {
            let _this = this;
            _this.iBizHttp.post(`/${IBizEnvironment.SysName}${IBizEnvironment.InstallRTData}`, {}).subscribe(function (result) {
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
        logout() {
            var curUrl = decodeURIComponent(window.location.href);
            window.location.href = `/${IBizEnvironment.SysName}${IBizEnvironment.Logout}?RU=${curUrl}`;
        },
        userSelect(name) {
            console.log(name);
            if (Object.is(name, 'insrt')) {
                this.installRTData();
            } else if (Object.is(name, 'logout')) {
                this.logout();
            }
        }
    }
});