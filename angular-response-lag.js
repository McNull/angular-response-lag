/*!
 https://github.com/McNull/angular-delay
 License: MIT
 */

(function (responseLag) {
  responseLag.constant('responseLagConfig', {
    enabled: true, // Enable or disable the delay
    timeout: {
      min: 200, // Minimum delay
      max: 1500 // Maximum delay
    },
    excludes: [] // Array of RegExp of urls to exclude
  });

  responseLag.factory('delayHttpInterceptor',
    ['$q', '$templateCache', '$timeout', 'responseLagConfig',
      function ($q, $templateCache, $timeout, responseLagConfig) {

        function includeRequest(config) {
          if (responseLagConfig.enabled && $templateCache.get(config.url) === undefined) {

            var patterns = responseLagConfig.excludes;
            var i = patterns.length;

            while (i--) {
              if (patterns[i].test(config.url)) {
                return false;
              }
            }

            return true;
          }
        }

        var t1 = responseLagConfig.timeout.min;
        var t2 = responseLagConfig.timeout.max - t1;

        return {
          request: function (config) {

            // Don't delay cached requests

            if (!includeRequest(config)) {
              return config;
            }

            var d = $q.defer();

            var delay = Math.floor(Math.random() * t2) + t1;

            $timeout(function () {
              d.resolve(config);
            }, delay);

            return d.promise;
          }
        };
      }]);

  responseLag.config(['$httpProvider',
    function ($httpProvider) {
      $httpProvider.interceptors.push('delayHttpInterceptor');
    }]);

})(angular.module('responseLag', []));
