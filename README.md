# basis-api-boilerplate

Boilerplate for an API written in Express, It includes:

* Documentation and examples on how to use this boilerplate
  effectively
* Full ES6/ES7 support via Babel/Babel Polyfill.
* Code to force using SSL on production servers (your job to get
  the proper certs, I suggest getting free ones using
  [LetsEncrypt](https://letsencrypt.org/))
* Some basic code for creating and validating JSON web tokens
* Jest testing, and Prettier/ESLint linting already set up, with
  NPM scripts to invoke them.
* Automatic code reloading when code changes
* Debugger configuration

## Installation

### Install node

* OSX: `brew install node`
* Ubuntu: `apt-get install nodejs`

### Start a new project

 This is a BOILERPLATE that you use for basis backend repositories.

### clone this project 

1. `git clone https://github.com/XelpmocDesignandTechPvtLtd/basis-api.git`
2. `cd basis-api `


### Pull Request Workflow

For every feature this is how you should work -

1. You are on master
2. `git pull`
3. `git checkout -b <branch_name>`
4. Make your changes
5. `git add -A`
6. `git commit -m "put in a commit message"`
7. The first time that you push a branch, you need to run `git push -u origin <branch_name>`
   For ALL OTHER TIMES, you just need to do `git push`
8. In Github, OPEN A NEW PULL REQUEST.
9. Get somebody (your team lead) to REVIEW THE CODE.

### Install dependencies

You will need to either use yarn or npm. I strongly suggest using yarn, it is much faster than NPM.

You can install it here https://yarnpkg.com/en/

You can find the list of dependencies for any Node project in its `package.json` file. To install them, simply
run:

```
yarn install
```

This will download all the Node libraries you need, and place them into the `node_modules/`
directory at the base of the project. `node` can access them so long as you run it in somewhere in
the project dir; if you want to see for yourself, open the Node REPL by running `node` with no
arguments while in the project directory, and try running `const l = require('lodash')`—it will
place the `lodash` library in the `l` variable.

## Running...

### tests

Uses the [Jest test runner](https://facebook.github.io/jest/) to
run tests.

```
yarn test
```

### lint

Uses [Prettier](https://github.com/prettier/prettier) and
[ESLint](https://eslint.org/)
to standardize coding style and check imports.

```
yarn run lint # shows lint errors
yarn run fix-lint # fixes lint errors, shows any remaining
```

### ... the development server

Run this command (which is defined in the `scripts` section of `package.json`):

```
yarn run dev-server
```

Et voilà! Visit [localhost:3000](http://localhost:3000) to see everything in action.

#### Debugger

If you are using VSCode, after running the dev server in your
terminal, you can attach the VSCode debugger by clicking the
debug panel and then hitting the play button using the
"Attach debugger" configuration.

Otherwise, you can figure out how to attach your own debugger to
Node's built-in inspector, which should work on port 9229. I hear
you can use Chrome to do this, but I haven't researched how.

To insert a breakpoint, just add the line `debugger` to your code.

####  Development environment

You should all be using VSCode - https://code.visualstudio.com/

After you have installed it, go to the extensions button on the left. In the search bar, search for these extensions and install them. You need to refresh your workspace for these to take effect.

```
dbaeumer.vscode-eslint
esbenp.prettier-vscode
```

Then go to your vscode settings and add these -

```
"eslint.autoFixOnSave": true,
"prettier.eslintIntegration": true
```




### ... the production server

Ensure all the proper environment variables are present, and then run:

```
yarn start
```

#### Required environment variables

Until you add more, these ones are *necessary* for a production deploy:

* `PRIVKEY_CERT_LOC` and `FULLCHAIN_CERT_LOC`: Location of
  SSL certificate files, as produced by LetsEncrypt's `autocert`
  script
* `JWT_SECRET`: The secret used to produce JSON Web Tokens

## Deploying


use the [`pm2` npm library](https://github.com/Unitech/pm2) to manage deployments
on a dedicated server.

### How to deploy on  dedicated server using  pm2 
* give permissions of your `.pem` file

        use chmod to set permissions so that it can be used as a key.

```
chmod 400 ~/.ssh/whatever-your-key-name-is.pem
``` 
* give path of your .pem file in `ecosystem.config.js`

    Generally, the correct place to put your `.pem` file is in your `.ssh` folder, in your user directory. The `.ssh` folder is a hidden folder.

* Install `pm2` locally and save, using --save-dev if `pm2` is not  on your local system

 ```
 yarn add pm2 --dev

```

* setup the directories on the remote this will be use only first time next time you only need to run script suggested below

```
pm2 deploy ecosystem.config.js production setup
```

* Before deploying, commit all your changes and push your branch to git and merge your branch to master.

```
yarn deploy
```




