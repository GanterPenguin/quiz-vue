Frontend quizzes module. 

Installation

```
cd $PROJECT_ROOT
yarn add ssh://git@gitea.websm.io:2222/Buldakov/quiz-vue.git
```

```
export NODE_ENV=production
yarn gulp build-js
```

add
```js
import QuizApp from "quiz-vue";

const quizApp = new QuizApp('#quiz-app');
```
to js file

