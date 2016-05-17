// register the down load component
Vue.component('down-load', {
    template: '#html-down-load',
    props: {
        data: [{}]
    },
    created: function () {
        this.getStatus();
    },
    timer: null,
    methods: {
        getStatus: function () {
            var self = this;
            var checkStatus = function () {
                var pid = '';//pid
                var installed = false;//
                var tempItem;
                for (var i = 0; i < self.data.length; i++) {
                    if (NearMeAppStoreJsApi) {//
                        tempItem = self.data[i];
                        pid = tempItem['id'];
                        installed = NearMeAppStoreJsApi.isInstalledByPid(pid);
                        tempItem['appStatus'] = {
                            'downloaded': installed,
                            'undownload': !installed
                        }
                        tempItem['txt'] = (installed ? '已获取' : '获取');
                        tempItem['disabled'] = installed;

                        if (!installed) {//
                            tempItem['status'] = NearMeAppStoreJsApi.getButtonStatus(pid);
                            tempItem['progress'] = NearMeAppStoreJsApi.getProgress(pid);
                            if (tempItem['progress'] >= 100) {
                                tempItem['progress'] = 0;
                            }
                            if (tempItem['status'] == 2) {//处于暂停状态
                                tempItem['txt'] = '继续';
                            } else if (tempItem['status'] == 1) {//下载状态
                                tempItem['txt'] = (tempItem['progress'] + '%');
                            }
                        }
                    }
                }
            }
            if (this.data.length > 0) {
                setInterval(function () {
                    checkStatus();
                }, 1000);
            }
        },
        download: function (app) {
            if (typeof NearMeAppStoreJsApi.downloadByPid == 'function') {
                NearMeAppStoreJsApi.downloadByPid(app.id);
                this.$dispatch('down-load', app.id);
            }
        }
    }
});
