angular-response-lag
=============

Development interceptor that simulates server response lag.

#### Installation

Install with bower:

```
$ bower --save-dev install angular-response-lag
```

Make your application module dependend on the `delay` module:

```
angular.module('myApp', [ 'responseLag' ]);
```

Configure the module if needed:

```
angular.module('myApp').config(function(responseLagConfig) {

  // Enable or disable the module
  responseLagConfig.enabled = true; 
  
  // Minimum response delay (default: 200)
  responseLagConfig.timeout.min = 750;
  
  // Maximum response delay (default: 1500)
  responseLagConfig.timeout.max = 2500;
  
  // Url patterns that should not be delayed
  delayConfig.excludes.push(/.*\.md/i);
  
});
```

