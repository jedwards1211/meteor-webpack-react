# meteor-webpack-react

This is a port of the Meteor sample-todos tutorial to a React UI built by Webpack.

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

## Switching between dev/prod config

This product ships in dev mode by default.  To switch to production mode, do the following:
```
> cd meteor/client
> mv .prod prod
```

And likewise, to switch back to dev mode, rename it back to `.prod`.

`meteor.html` contains a simple script that checks if the prod bundle has been loaded, and if
not, links in the webpack-dev-server bundle instead.

### Windows note

`.prod/client/main.js` is a soft link to `../../../webpack/dist/bundle.js`.  I don't know
if the soft link will work on Windows.  If not, you can just copy the bundle in, but *make sure
to rename it to `main.js`* so that Meteor loads it after everything else.

## Running (dev mode)

```
> cd webpack
> npm install
> npm run dev
```
Make sure to wait for Meteor to say it's listening, and for webpack-dev-server to print out the list of modules.  The site won't work until both are ready.

## Running (prod mode)

```
> cd webpack
> webpack
> cd ../meteor/
> mv .prod prod
> meteor
```

## React production note

The Meteor `react-packages`' `react-runtime-prod` package doesn't include the
production build of React.  So instead of using that package, I include the production
build of React in `meteor/.prod/client/react-with-addons-0.13.3.min.js`, and get it
into Webpack by aliasing `react$` and `react/addons$` to a simple script that just does
`export default window.React`.
