var req = require.context('../app', true, /__tests__\/(client\/)?unit\/.*\.jsx?$/);
req.keys().forEach(req);
