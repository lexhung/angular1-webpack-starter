class ResolveService {
    login (UserAPI, $q) {
        function _error () {
            return $q.reject('requireLogin');
        }

        if (UserAPI.isLoggedIn() !== true) {
            return UserAPI.checkLoggedInStatus().catch(_error);
        }

        return null;
    }
}

ResolveService.prototype.login.$inject = ['UserAPI', '$q'];

export default ResolveService;
