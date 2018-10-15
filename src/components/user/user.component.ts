Vue.component('ibiz-header-user', {
    template: `
        <div style="float:right;">
            <dropdown>
                <div style="font-size: 15px;cursor: pointer;margin-right: 10px;">
                    <span>{{ user.name }} &nbsp;&nbsp;</span>
                    <span><img :src="user.avatar" style="width: 40px;padding-top: 10px;float: right;" /></span>
                </div>
                <dropdown-menu slot="list" style="font-size: 15px !important;">
                    <dropdown-item style="font-size: 15px !important;" @click="installRTData">
                        <span> <i aria-hidden="true" class="fa fa-cogs" style="margin-right: 8px;"></i></span>
                        <span>安装依赖</span>
                    </dropdown-item>
                    <dropdown-item style="font-size: 15px !important;" @click="logout">
                        <span> <i aria-hidden="true" class="fa fa-cogs" style="margin-right: 8px;"></i></span>
                        <span>退出登陆</span>
                    </dropdown-item>
                </dropdown-menu>
            </dropdown>
        </div>
    `,
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
        this.iBizHttp.post(IBizEnvironment.AppLogin, { srfaction: 'getcuruserinfo' }).subscribe((result) => {
            if (result.ret === 0) {
                if (Object.keys(result.data).length !== 0) {
                    let _data: any = {};
                    Object.assign(_data, result.data);
                    Object.assign(this.user, {
                        name: _data.username,
                        email: _data.loginname,
                        id: _data.userid,
                        time: +new Date
                    });
                }
            }
        }, (error) => {
            console.log(error);
        });
    },
    methods: {
        installRTData() {
            this.iBizHttp.post(IBizEnvironment.InstallRTData, {}).subscribe((result) => {
                if (result.ret === 0) {
                    this.iBizNotification.success('成功', result.info);
                } else {
                    this.iBizNotification.error('错误', result.info);
                }
            }, (error) => {
                this.iBizNotification.error('错误', error.info);
            });
        },
        logout() {
            const curUrl: string = decodeURIComponent(window.location.href);
            window.location.href = `../api/uacloginout.do?RU=${curUrl}`;
        }
    }
});