# Quality assurance E2E Tests

This project is a containerized version of [TestCafe](https://devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html) web-based functional testing framework. It allows to run quality assurance end2end tests in the following modes:
- with a real browser installed on your host (for development). Basically you will be asked to open the URL on the browser of your choice to start the tests.
- with headless browsers installed on a Docker image used to run tests in [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration#Run_tests_in_CI)


* __Note__: 
For development if you have [NPM](https://www.npmjs.com) and [Node](https://nodejs.org/en/) installed locally you can run the test suite _without_ using the Docker image however we strongly recommend to use it.

## Getting Started

These instructions will allow you to set the project up and running on your local machine for development and testing purposes.

### Prerequisites

- docker
- docker-compose
- GNU make

For Linux users
```shell
sudo apt-get install build-essential
```

For Mac users
You can get make with the latest version of Xcode (with [Make](https://www.gnu.org/software/make/manual/make.html)), available from Apple's [Mac Dev Center](http://developer.apple.com/mac/).

- Docker
If you will follow the set-up with Docker (see below) then install last [Docker](https://www.docker.com/community-edition) for your specific OS.

### Installing

#### Docker

- with Visual Studio Code

From the root of the project launch
```shell
code .
```

It should automatically propose you to build and run the project into a container.
If not just follow the steps indicated on Microsoft's [offical documentation](https://code.visualstudio.com/docs/remote/containers).
Then open the terminal of the container and run
```shell
make prepare
```

- without Visual Studio Code

From the root of the project
```shell
cd .devcontainer
docker-compose up -d --build --force-recreate
make prepare
```

* __Note__: 
Independently if you're running the remote container with or Visual Studio Code you will see that on the
docker-compose.yml a port configuration mapping. This mapping is used essentially if you want to
add breakpoints within the code with VS Code. 

Docker is already handling the [.env](https://docs.docker.com/compose/environment-variables/#the-env-file) file hence once configured it should be possible to run Docker by reading automatically the environment variables. Unluckily if you are using VS Code it's not actually supported (see [this](https://github.com/microsoft/vscode-remote-release/issues/222)) and therefore when you run VS code with a such configuration
```shell
- "${JAVASCRIPT_DEBUG_PORT}:9229"
```
it fails miserably. We had therefore no other choice to "harcode" it into the docker-file.yml

For more information about the port configuration please take a look at Docker's official
[documentation](https://docs.docker.com/compose/compose-file/#ports)

- commands

First install the libraries
```shell
make install
```

Then you can try to run the test suite on a specific domain with the headless way
```shell
make tests-payment-headless
```

Of if you want to try it on your host
```shell
make tests-payment
```

#### Without Docker by using Node & NPM installed on host

First install the libraries
```shell
npm install
```

Then you can try to run the test suite on a specific domain
```shell
node index.js --domain=payment --isBrowserStack=false
```

### Debugging tests with test cafe

You can stop a test and debug it by using 
```javascript
await t.debug();
```

Or you can run only a specific test by using 
```javascript
test.only('...');
```
or
```javascript
fixture.only('...');
```

For more information please refer to the official TestCafe [documentation](https://devexpress.github.io/testcafe/documentation/guides/basic-guides/debug.html).

### Distro
the distribution installed on the remote container is a [Debian 9](https://www.debian.org/releases/stretch/index.en.html) based.

### Browser versions supported

each browser installed on the container which can be run in headless mode has as specific version configurable on the .env file.
These are the versions supported by the quality assurance team therefore it will be our duty to update them when needed.

### Software packages versions

each software package within this project is versioned:
- docker-compose
- testcafe (within package.json)
- lint (within package.json)
- nodejs (within Dockefile)

### Linter
this project allows you to automatically install a [linter](https://en.wikipedia.org/wiki/Lint_(software)). We decide to choose 
one of the best for Javascript [Eslint](https://eslint.org/docs/user-guide).
You can run it either directly from the remote container if you chose to install the project with Docker
```shell
npm run lint
```

and to apply the fix
```shell
npm run lint-fix
```

or directly from your host through make
```shell
make lint
```

and to apply the fix
```shell
make lint-fix
```

### Debugging Javascript code with Visual Studio
it's possible to add break points on the code so to debug it.
By clicking on the left icon "Run" or "Ctrl+shift+d" you will find on the top a list of commands
called "e2e debug {DOMAIN}" which you can run to enable the debugging of the Javascript code.


## Page Object Pattern
[Page object is a design pattern](https://www.selenium.dev/documentation/en/guidelines_and_recommendations/page_object_models/) that is recommended as best practices. The functionality classes (PageObjects) in this design represent a logical relationship between the pages of the application. The current project takes also inspiration of: 

> "A page object wraps an HTML page, or fragment, with an application-specific API, allowing you to manipulate page elements without digging around in the HTML." by [Martin Fowler](http://martinfowler.com/bliki/PageObject.html)

> "By introducing the “elements as first class citizens” principle it is now possible to build up large test suites using this pattern. There are no additional packages required to create page objects. It turns out that ```Object.create``` provides all necessary features we need:
>
> * inheritance between page objects
> * lazy loading of elements and
> * encapsulation of methods and actions
>
> The goal behind page objects is to abstract any page information away from the actual tests. Ideally you should store all selectors or specific instructions that are unique for a certain page in a page object, so that you still can run your test after you’ve completely redesigned your page." by [WebDriverIO](http://webdriver.io/guide/testrunner/pageobjects.html)


## Conventions

### Code convention

The project follows [this coding convention](https://musement.atlassian.net/wiki/spaces/TEC/pages/1145864255/Musement+coding+conventions).

### Git commit message convention

The project follows [this Git commit message convention](https://musement.atlassian.net/wiki/spaces/TEC/pages/932872196/Write+a+Git+commit+message).

### Open a pull request

Pull requests titles must follow [this convention](https://musement.atlassian.net/wiki/spaces/TEC/pages/1035108357/Open+a+pull+request).

## Useful links
https://devexpress.github.io/testcafe/example/
https://devexpress.github.io/testcafe/documentation/getting-started/
https://devexpress.github.io/testcafe/documentation/using-testcafe/using-testcafe-docker-image.html#test-on-the-host-machine
