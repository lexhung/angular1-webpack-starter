const [isLoggedIn, userInfo] = [Symbol(), Symbol()];
class UserSerivce {
    constructor ($http, $q, $rootScope, Event, AjaxError) {
        Object.assign(this, {$http, $q, $rootScope, Event, AjaxError});
        // private variable
        this[isLoggedIn] = false;
        this[userInfo] = null;
    }

    isLoggedIn () {
        return this[isLoggedIn];
    }

    checkLoggedInStatus () {
        const self = this;
        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                self._setUser(data.result.user);
                self.$rootScope.$broadcast(self.Event.AUTH_SESSION_VALID, data.result.user);
                return data.result.user;
            }

            return self.$q.reject(data.message);
        }

        function _error (reason) {
            self._clearUser();
            return self.AjaxError.catcher(reason);
        }

        return this.$http.get('api/user/loginstatus')
            .then(_success)
            .catch(_error);
    }

    login (email, password) {
        const self = this;
        const req = {
            email,
            password
        };
        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                self._setUser(data.result.user);
                self.$rootScope.$broadcast(self.Event.AUTH_LOGIN, data.result.user);
                return data.result.user;
            }
            return self.$q.reject(data.message);
        }

        function _error (reason) {
            self._clearUser();
            return self.AjaxError.catcher(reason);
        }

        return this.$http.post('api/user/login', req)
            .then(_success)
            .catch(_error);
    }

    logout () {
        const self = this;
        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                self._clearUser();
                self.$rootScope.$broadcast(self.Event.AUTH_LOGOUT);
                return self.$q.resolve(data);
            }

            return self.$q.reject(data.message);
        }

        function _error (reason) {
            // log out user even API is failed
            self._clearUser();
            return self.AjaxError.catcher(reason);
        }

        return this.$http.post('api/user/logout').then(_success).catch(_error);
    }

    getUserInfo () {
        return this[userInfo];
    }

    getProductSummary () {
        const self = this;
        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                return data.result.summary;
            }
            return self.$q.reject(data.message);
        }
        return this.$http.get('api/user/products')
            .then(_success)
            .catch(this.AjaxError.catcher.bind(this.AjaxError));
    }

    _setUser (userData) {
        this[isLoggedIn] = true;
        this[userInfo] = userData;
    }

    _clearUser () {
        this[isLoggedIn] = false;
        this[userInfo] = null;
    }
}

UserSerivce.$inject = ['$http', '$q', '$rootScope', 'Event', 'AjaxErrorHandler'];

export default UserSerivce;
