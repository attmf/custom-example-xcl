# **Salesforce Marketing Cloud - Custom Activity Example**

This repository has the porpose to help you understand the basics of the Salesforce Custom Activity. The official documentantion can be obtained in the [Salesforce Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/creating-activities.htm).

I made a [Tamplate](https://github.com/RaphaelYamanaka/template-customactivity) so you can try on your own more easily.

## **First Steps**

To create, test and deploy the Custom Activity we need some things first:
* Configure .env and the DEs in Marketing Cloud
* [Node.js](https://nodejs.org/) installed
* Account at [Heroku](https://heroku.com/)

### **Files and Account Configuration**

When Cloning this repository we will adjust the .env file. First exclude the .example from the file name and change the URLs as well as the client secret and id generated in Marketing Cloud Setup.
To generate this data create an Package in "Installed Packages" with a Server-to-Server Component

In Marketing Cloud create 3 Data Extension, one for the Journey Entry Data, one for save the message we will configure in the Custom Activity and one for the Custom Activity to consult data dynamically. The Customer Key of the second we will configure in the .env file.
For the Fields, we'll needa ta a minimum:
| DE            | Fields                  |
| ------------- | ----------------------- |
| Entry Data DE | SubscriberKey, Name     |
| Save DE       | SubscriberKey, Message  |
| Consult DE    | SubscriberKey, numberID |
### **Node.js**

This Custom Activity was coded using Node.js, so every test and adjustment we want to do we'll need this engine.

After installing node and cloning this repository, run the aplication locally
```
npm install 

npm start
```

### **Heroku**