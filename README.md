## Getting Started

1. Create a Bluemix Account

  [Sign up](https://console.ng.bluemix.net/registration/) in Bluemix, or use an existing account. Watson Services in Beta are free to use.

2. Download and install the [Cloud-foundry CLI](https://github.com/cloudfoundry/cli) tool

3. Edit the `manifest.yml` file and change the `<application-name>` to something unique.  

  ```none
  applications:
  - services:
    - personality-insights
    name: <application-name>
    command: node app.js
    path: .
    memory: 256M
  ```
  The name you use will determinate your application url initially, e.g. `<application-name>.mybluemix.net`.

4. Connect to Bluemix in the command line tool

        $ cf api https://api.ng.bluemix.net
        $ cf login -u <your user ID>
5. Create the Personality Insights service in Bluemix via Web UI and name it personality-insights-service

6. Push it live!
          
        $ cf push
      

