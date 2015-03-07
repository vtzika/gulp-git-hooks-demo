
# Form Validator

**Name:** Varvara Tzika & Maria Cristina Di Termine

**Date:** March 2015

----------------------------------------------------------------------
This project is consisted of a generic contact form validator, a contact form to show the use of the validator, the jasmine unitests, a gulp build file with multiple tasks, a precommit hook file.

### Instruction:
1. npm install -g gulp
2. git clone https://github.com/vtzika/gulp-git-hooks-demo.git
3. npm install
4. gulp (it will run the default task wich is consisted of multiple tasks)

### Git Precommit hook
If you copy the precommit_hook file to your .git/hooks/precommit file, it will run the tests, run the JShint checks and it will check your coding style based on the airbnb JS guidelines before commiting to your repository. If one of those will fail, it will not commit.

mv precommit_hook .git/hooks/precommit

Note: The airbnb guidelines for the jscs gulp task can be changed by changing the .jscsrc file.