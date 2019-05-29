import ApiService from './ApiService';

export default class AuthService extends ApiService {
    handling = false;

    // 获取小程序登录并验证用户是否存在
    async login (code, accessToken) {
        if (this.handling) {
            return false;
        }

        this.handling = true;
        // 服务器交互代码
        let response = await this.httpGet(`/wx/login/${code}`, {
            access_token: accessToken
        }, false);
        this.handling = false;
        return response.data;
    }

    // 获取assess_token
    async accessToken (appId, appSecret) {
        let timestamp = new Date().getTime();
        let appIdAppSecret = appId + appSecret;
        let appIdAppSecretMD5 = this.service('md5').encrypt(appIdAppSecret);
        let appIdAppSecretMD5Timestamp = appIdAppSecretMD5 + timestamp;
        let sign = this.service('md5').encrypt(appIdAppSecretMD5Timestamp);
        let response = await this.httpGet(`/app/access`, {
            app_id: appId,
            sign: sign,
            timestamp: timestamp
        }, false);
        return response.data;
    }

    // 提交用户信息并保存
    async mpRegister (accessToken, userInfo, signature, rawData, iv, encryptedData) {
        let response = await this.httpPost(`/wx/register/user/?access_token=${accessToken}`, {
            user_info: userInfo,
            raw_data: rawData,
            signature: signature,
            encrypted_data: encryptedData,
            iv: iv
        }, false);
        return response.data;
    }

    // 提交手机号
    async setMobile (encryptedData, iv) {
        let response = await this.httpPost(`/save/mobile`, {
            encrypted_data: encryptedData,
            iv: iv
        });
        return response.data;
    }

    // 获取用户信息
    async getUserInfo () {
        let response = null;
        if (this.handling) {
            return false;
        }
        this.handling = true;
        if (this.$application.needMock()) {
            response = await this.service('mock.myInfo').mock();
        } else {
            response = await this.httpGet(`/user/info`, {});
        }
        this.handling = false;
        return response.data;
    }
}
