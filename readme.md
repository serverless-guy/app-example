# @serverless-guy/lambda example  

[![Greenkeeper badge](https://badges.greenkeeper.io/serverless-guy/app-example.svg)](https://greenkeeper.io/)

  
This is a simple app using `@serverless-guy/lambda` library.

# Installation  
  
* clone this repository
* cd to the project repo and run `npm i`
* run `serverless deploy --stage <stage_name>`

# Setting Maintenance mode  
  
Maintenance mode can be controlled inside `env.yml` by assigning "YES" or "NO" value to maintenance_mode key.  
  
# Developer's Note:  
  
Please note that, in the example, it is using jsonplaceholder as API, some data may or will not be saved if you're to use `POST` endpoint.
  
# Issues:  
  
* unable to run lambda locally due to misconfiguration
* some libraries/modules may not work on unit test
