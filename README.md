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

## Install a css framework 
[react-bootstrap](https://react-bootstrap.github.io/)
- uses bootstrap css via a cdn on index.html which is very logic for performances and bundle size 
  - we could of course install it with npm but it is not mandatory as we don't plan to customize sass files 
- has all bootstrap beloved components implemented in React which will save us a lot of development time 

## Note on css management 
We'll manage the css as follows : 
- use bootstrap classes where possible 
- with that in mind :
  - App-wide css is in src > index.css 
  - Component specific css is in its dedicated css module 
    - [official doc](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
    - css modules are scoped to their React component avoiding any nameClash etc 
  - for dynamic style : first think dynamic class (className) attribute
  - if not easily doable : go for inline style attribute 

## Validation 
For validation we'll use [validator.js library](https://github.com/validatorjs/validator.js/) because this is the library used by sequelize which is the API's ORM

Although it's not possible to ensure perfect compatibility between back and front validation (sequelize probably modifies the behavior of validator.js)
, we can ensure the best consistency by using this library

Notice that all validation methods provided by the package accept as value to be tested a string, if another type is provided will throw a TypeError 

We wanted the validation logic for each entity to be grouped in a single file rather than being distributed across several components, so we decided to implement Models 

As the creation of getters and setters is time-consuming and verbose, we've decided to create a method to create them automatically. Of course, these methods can always be rewritten, so we don't lose any OOP-related functionality, with the exception of the es6 syntax of the classes for getters and setters.

Validation functions are static (and not instance methods), since we wanted to be able to validate data at entity creation, and creating a class instance at this stage makes no sense.

the code structure is always the same for any model 
```javascript

export class Post extends Model {
	static propertyValidatorMapper = {
		/* 
		    this static property is mandatory and very important as 
		    the parent class (Model) uses this property and assumes the structure of the object is this one
		 */
		userId: {
			validator: this.validatePK,
			errorMessage: 'user Id error message',
		},
		id: {
			validator: this.validatePK,
			errorMessage: 'id error message',
		},
		title: {
			validator: this.validateTitle,
			errorMessage: 'title error message',
		},
		body: {
			validator: this.validateBody,
			errorMessage: 'body error message',
		},
	}

	constructor(userId, id, title, body) {
		super()
		this.userId = userId
		this.id = id
		this.title = title
		this.body = body
	}

	static validatePK(value) {
		// as mentionned validators are static 
		return isInt(value, { min: 1 })
	}

	static validateTitle(value) {
		return isLength(value, { min: 5 })
	}

	static validateBody(value) {
		return isLength(value, { min: 20 })
	}
}

```

regarding the Model class (parent class) 
- it is an abstract class 
- automatic getter and setter creation based on propertyValidatorMapper static property 
- implements static method validate which will raise a StableValidationError with provided message if a validator fails 
- implements a serialize method which will be useful for 
  - api communication 
  - store communication (redux or other) which dont like to manage class instances but prefer javascript objects 
```javascript
export class Model {
	constructor() {
		if (this.constructor === Model) {
			throw new Error('Abstract Model class should not be instantiated')
		}

		// automatic getter and setters generation , beware it does not allow to use the syntactic sugars for setters and getters definitions
		Object.keys(this.constructor.propertyValidatorMapper).forEach(property => {
			Object.defineProperty(this, property, {
				get() {
					return this[`_${property}`]
				},
				set(value) {
					this.constructor.validate(property, `${value}`) //force string casting as validator functions require a string to validate
					this[`_${property}`] = value
				},
				configurable: true,
				enumerable: true,
			})
		})
	}

	static propertyValidatorMapper = {}

	static validate(property, value) {
		if (!(property in this.propertyValidatorMapper)) {
			throw new StableModelPropertyNotFoundError(`property ${property} does not exist`)
		}
		if (!this.propertyValidatorMapper[property]['validator'](value)) {
			throw new StableValidationError(this.propertyValidatorMapper[property]['errorMessage'])
		}
	}

	serialize() {
		// returns an object with the structure {getterName: getterValue} for the instance
        // exemple with Post => {userId: 1, id: 2, title: '...', body: '...'} 
		const serialized = {}
		const modelContext = this

		Object.getOwnPropertyNames(this)
			.filter(property => property.startsWith('_'))
			.forEach(property => {
				const getterName = property.slice(1)
				serialized[getterName] = modelContext[getterName]
			})
		return serialized
	}
}
```

GUI validation 
- submit event : validation (but it is quit too late for a proper UX)
- onblur event : validation 
- input event : validation IF the field has already triggered a blur event
- we believe we thus offer an excellent user experience 

As the validation implies a lot a logic and as we didn't want to pollute our code with redundant logic , we decided to implement a custom hook which will be used by most / every field of the app

## Translations 

We first wanted to use this [package](https://www.npmjs.com/package/i18n) because 
- the same package is used by the backend, and we want to be consistent 
- it is light, and we don't plan to use a lot of "complicated" features 

But turned out that the package is node-compatible only as it uses fs 

We will therefore switch to first google result : [i18next](https://react.i18next.com/) (and probably adjust translation management in backend) 
```
  npm install react-i18next i18next --save
```
as noticed the doc tells us to import 2 packages 
  - i18next is the "proper" translator package 
  - react-i18n ... well adds to react-hooks ! 

We'll configure the packages as show in the official step by step guide [guide](https://react.i18next.com/latest/using-with-hooks)

As the package contains many useful functions: we don't need to manage the i18n instance which holds critical data such as current lang, we should normally have to implement / deal 
- a singleton to prevent multiple incompatible i18n instances 
- and provide this single instance to the whole application (via a store or more likely a react context for this usage)

### Translation managements 
First we'd like to mention we prefer .js over .json files 

And we decided to build the application on a "module" mode which is a bit odoo-like 

therefore we need to merge translations of each module to one place which will then provide all available translations to i18n instance : See utils / LocalUtils.js 

### Nice to have but not implemented 
- use a browser lang detector 
- and do not load all translations at once (which could lead to perf issues but the application is not that big !)
- implement a 'name_clash' method in case of unwanted duplicated key merge but the goal here is to show that it's possible to handle multi-lang not to implement our own package



