// all data used by e2e mock service is here
(function () {
    'use strict';

    angular
        .module('appTest')
        .factory('mockData', mockData);

    function mockData () {
        var _loginStatus = false;
        var service = {
            loginStatus: _loginStatus,
            userInfo: _userInfo
        };

        return service;
    }

    var _userInfo = {
        'name': 'PinkyJie'
    };

})();