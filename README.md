## APIs
- [x] signup
- [ ] signin
- [ ] logout

## Authentication & Authorization
- [ ] local login (email & password)
- [ ] social login
- [ ] admin
- [ ] user group A
- [ ] user group B

## Basic CRUD - Board System
- [ ] create
- [ ] read
- [ ] update
- [ ] delete

## ETC
- [ ] unit test
- [x] debugging
> https://stackoverflow.com/a/50729890/911528
> https://stackoverflow.com/a/48415410/911528
```
[launch.json]
{
    "type": "node",
    "request": "launch",
    "name": "Debug",
    "program": "${workspaceFolder}/src/server.js",
    "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/babel-node",
    "runtimeArgs": ["--nolazy"],
    "env": {
        "NODE_PATH": "src"
    }
}
```
- [ ] API documentation
- [x] elegant error handling
- [x] elegant logger
> https://www.npmjs.com/package/tracer

- [x] Promis & async/await
- [x] request validation
> https://www.npmjs.com/package/express-validation
> https://www.npmjs.com/package/joi
- [ ] send email