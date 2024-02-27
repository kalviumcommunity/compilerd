# <img alt="Kalvium" src="https://kalvium.community/images/sidebar-2d-logo.svg" width="80"/> Kalvium

---

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url] -->






## Table of contents : 
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
  </li>
  <li><a href="#quick-usage">Quick Usage</a></li>
  <li><a href="#contribution">Contribution</a>
    <ul>    
        <li><a href="#Prerequisites">Prerequisites</a></li>
    </ul>
    <ul>    
        <li><a href="#setting-up">Setting up</a></li>
    </ul>
    <ul>    
        <li><a href="#making-changes">Making Changes</a></li>
    </ul>
    <ul>    
        <li><a href="#running-tests">Running Tests</a></li>
    </ul>
    <ul>    
        <li><a href="#Guidelines">Guidelines</a></li>
    </ul>
  </li>
  <li><a href="#license">License</a></li>

</ol>



## About The Project : 
Compilerd is a online code judge for evaluating code submissions passed to it. It compiles and executes code in several languages and returns the result and various other properties in the response. The judge supports several languages including C++, Python, C, JavaScript (Node.js) and Java. 
This is a service that is build using nodejs and express in the backend.
It is fully customizable and can be adjusted as per requirement. Also, it has been tried and tested on Google Cloud Run and it just works seamlessly.


## Quick Usage :
We will run the project locally and try to make a request to see a sample use case :
  - Clone the repo : ```git clone <web-url>```
  - Change directory to the project's root folder.
  - Install dependencies : ```npm install```
  - Build docker image : ```docker build -t <tag> .```
  - Run the docker container with the built image : ```docker run -p 3000:3000 -e OPENAI_API_KEY=<your-api-key> -e ALLOWED_RAM=<allowed-ram-value> <image-name>```
  - Now we have the service running on localhost ```http://localhost:3000/```
  - Open postman and try to make a POST request on ```http://localhost:3000/api/execute/``` with given payload :
    ```json 
        {
            "language" : "nodejs", 
            "script" : "console.log('hello world')"
        } 
    ```
  - You should see something like this in the response : 
    ```json
        {
            "output": "hello world\n",
            "execute_time": null,
            "status_code": 200,
            "memory": null,
            "cpu_time": null,
            "output_files": [],
            "compile_message": "",
            "error": 0
        }
    ```

## Languages supported :
  - C
  - CPP
  - Python
  - Java
  - Node.js
  - Ruby

## Contribution :

### Prerequisites:
For local development we should have the following dependencies set up locally in our system
  - Nodejs : [nodejs](https://nodejs.org/en/download)
  - Npm : this comes automatically with nodejs installation
  - Docker : [docker](https://docs.docker.com/get-docker/)
  - Postman or alternative : [Postman](https://www.postman.com/downloads/)
  - Git : [Git](https://git-scm.com/downloads)


### Setting up :
  - Fork the repository using Github UI.
  - Clone locally from the forked repo.

### Making changes:
  - Make sure to create a new branch on top of the main branch : ```git checkout -b <name>```
  - After making changes we can commit them using ```git commit -am <commit-name>```


### Running tests : 
  - It is important to make sure that changes are not breaking, hence they should be tested aginst provided suite of test cases in repo.
  - Run the server in a docker container by using below commands :
    - ```docker build -t <tag-name> .```
    - ```docker run -p 3000:3000 -e OPENAI_API_KEY=<your-api-key> -e ALLOWED_RAM=<allowed-ram-value> <image-name>```
  - Execute the test script by running command ```node ./tests/test.js```
  - Summary can be seen on the console when all the tests have finished.



### Guidelines :
 - Provide Detailed Pull Requests
   - Clearly describe the problem you're solving or the feature you're adding
   - Provide context, background, and any relevant information
 - Adhere to the project's coding standards and style guides
 - Update documentation as needed for your changes
   - Ensure that your code is well-documented and easy for others to understand
 - Ensure that your contributions are well-tested
 - Maintain consistency with the existing codebase



<!-- LICENSE -->
## License : 



[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
