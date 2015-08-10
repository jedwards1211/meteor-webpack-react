# meteor-webpack-react

This is a port of the Meteor sample-todos tutorial to a React UI built by Webpack.  There is only a little bit of code to remove if you want to use this as an app skeleton.  (But we're about to put it into a branch so that `master` is just an empty skeleton).

## Advantages over serving the UI straight out of the Meteor project

* `require`/ES6 `import` let you avoid Meteor global variables/load order issues
* `react-hot-loader` reloads React components without reloading the entire page
  when you make changes
* If you `require` your styles with Webpack, it will also reload them without
  reloading the entire page when you make changes to them
* Using an npm module in the browser is as simple as `npm install` and `require`
  * This puts a large part of the React ecosystem (which revolves around Webpack/npm)
    at your fingertips
* Other Webpack loaders are great too, for example:
  * you can break up your CSS into one file per React component, and then `require`
    them in your JSX files
  * or if you want to use Sass, you can `require` the Sass files
  * or you can use `url-loader` to `require` an image file and get a URL to stick in
    an `<img>` tag
* If you use Webpack for your server code too, both the server and the client can `require`
  shared code.  This way you can avoid creating global variables for Meteor collections or
  anything else

## How it works

The `meteor` directory contains `dev` and `prod` folders for development and production mode.  The script to run
dev mode hides `prod` (as `.prod`) and unhides `dev`, and vice versa for the script to run prod mode.

In prod mode, `meteor` gets the webpack client and server bundles via the soft links `meteor/prod/client/main.js` and `meteor/server/main.js`.  Two instances of `webpack --watch` are running, one to make the client bundle and one to make the server bundle.

In dev mode, both `webpack-dev-server` and `meteor` run simultaneously on different ports (9090 and 3000, respectively), and a `webpack --watch` is also running to compile and output the server code.  A script in `meteor/dev/loadClientBundle.html` inserts a `<script>` tag linking to the bundle from webpack-dev-server via port 9090 on the page's host.  (It's a bit weird I know, but one can't have a relative URL to a different port, and just putting a script tag to `http://localhost:9090/...` wouldn't work if you're testing on separate device from your dev box).

### Windows note

`meteor/.prod/client/main.js` is a soft link to `../../../webpack/assets/client.bundle.js`.  
(Similarly for the server bundle.) I don't know
if the soft link will work on Windows.  If not, you can just copy the bundle in, but *make sure
to rename it to `main.js`* so that Meteor loads it after everything else.

## Running (dev mode)

```
> cd webpack
> npm install
> npm run dev
```
Make sure to wait for Meteor to say it's listening, for the client `webpack-dev-server` and server `webpack --watch` to print out module/bundle info.  The site won't work until all are ready.

## Running (prod mode)

```
> cd webpack
> npm install
> npm run prod
```
Make sure to wait for Meteor to say it's listening, and for the client and server `webpack --watch` processes to print out module/bundle info.  The site won't work until all are ready.

## Production build

```
> cd webpack
> npm install
> npm run build
```


## Testing Production build
(i.e. smoke testing it)
```
> cd webpack
> npm install
> npm run test-built
```
