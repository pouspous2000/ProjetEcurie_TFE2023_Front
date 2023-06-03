# GIT CONVENTION 

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

As in the Python Language : "we're all consenting adults here" which implies which implies that compliance with the above procedure is in no way restrictive. 






