# GIT CONVENTION 
## Commit structure 
Commit structure 
```
    FRONT_BRANCHNAME_[TYPE][Module][ShortDescription]: Long description if needed 
```
- FRONT : distinguish the commit category , all possible values are [FRONT, BACK, MIXED, DEVOPS, SYSADMIN]
- BRANCHNAME : the project will contain many branches that we intend to delete after merging them into the dev branch, but we need this information at commit level after branch deletion 
- [TYPE]
  - ADD: add functionality
  - CLEAN: code cleanup (eslint - prettier like job)
  - DOC: CRUD on any documentation (>< comment expect javadoc like comment)
  - FIX: bug fix 
  - IMP: code improvement (code refactoring, architecture change without functionality addition, ...)
  - TEST: CRUD on any test
- [Module] ex Horse, PascalCase
- [Short Description] ex model implemented 
- [Optional Long Description] anything relevant 

As in Python Language : "we're all consenting adults here" which implies that compliance with the above procedure is in no way restrictive. 

## Pre-hooks
- precommit: prettier check 
- prepush : test 
- "we're all consenting adults here" and so you can of course bypass pre-commit hooks 

## Nice to have but not implemented 
- github actions

# Project 
## Installation 
project creation using the npm command 
```
  npm init react-app stable_front
```
[related doc](https://create-react-app.dev/)
which was recommended by React until recently. 
The current recommendations are Next.js Remix Gastby but are not adapted to our case since 
- we wish to separate the backend project from the frontend project
- we want to keep the possibility of creating a React Native mobile application
[previous recommendation](https://legacy.reactjs.org/docs/create-a-new-react-app.html#:~:text=Create%20React%20App%20is%20a,single%2Dpage%20application%20in%20React.&text=npx%20on%20the%20first%20line,that%20comes%20with%20npm%205.2%2B.)
[current_recommendation](https://react.dev/learn/start-a-new-react-project#nextjs)

Why use this command?
- local development (hot reload , ...)
- modern javascript support (ES6 and ES7)
- asset import 
- styling (css , pre-cess, ...) management including css modules 
- unit tests pre-configured with jest 
- eslint installation 
- facilitate the creation of production bundle
- facilitate deployment 
- ...

Note that the npm audit report indicates the presence of 6 errors 6 high severity vulnerabilities.

But as pointed out by the community and the project creator, these errors are not at all problematic.
- [stackoverflow](https://stackoverflow.com/questions/72848628/why-am-i-getting-6-high-severity-vulnerabilities-on-using-create-react-app)
- [Dan Abramov](https://overreacted.io/npm-audit-broken-by-design/)

## Configure commit hooks 

As we want to ensure a certain consistency in the code, we start by configuring pre-commit hooks for 
- eslint 
- prettier
- test with jest 

## Context 

eslint is already installed on the project and as mentionned in create-react-app [link](https://create-react-app.dev/docs/setting-up-your-editor/)
- a custom eslint config will only affect editor integration but won't affect terminal and browser lint output , which is ... suboptimal 
- we will therefore rely on prettier for code formatting [official doc](https://prettier.io/docs/en/index.html)

## Installation and configuration of prettier
install prettier as a dev dependency
``` 
  npm install --save-dev prettier
```
configure prettier 
- see .prettierignore and prettierrc files 

notice we decided to focus javascript files exclusively as we don't care too much about css and json files 

## Pre-commit configuration 
[git official doc](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
as it can be tricky we decided to use lint-staged as a dependency to facilitate the pre-commit hook using husky 
[prettier official recommendation](https://prettier.io/docs/en/precommit.html)

and add a dedicated script in package.json because we want to be able to see prettier and eslint output manually 

**package.json**
```
    "eslint-check": "eslint .",
    "prettier-check": "prettier --check .",
```







