1. 이 폴더 내의 파일들은 인프런 강의를 참고하고 있습니다.

2. 실습 실행 이전에
    > npm init
    > npm i @types/node
    > npm i typescript -g
    >> (mac os) sudo install typescript -g
    > sudo npm install ts-node -g

3. tsc / ts-node 컴파일러 실행
    > tsc src/index.js
    > ts-node src/index.ts

4. typescript 특징
    - 기본적으로 전역 모듈
    - 독립된 모듈로 보기 위해서는 `import, export` 처리
    - 혹은 `moduleDetection : force`