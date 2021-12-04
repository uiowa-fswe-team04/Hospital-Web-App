var seleniumWebdriver = require('selenium-webdriver');
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
var {Given, Then, When} = require('cucumber');

  Given('This is a test', async function() {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();
 
    this.driver.wait(until.elementLocated(By.tagName('h1')));
 
    await this.driver.get('http://localhost:80');
    return true;
  });

  When('I click on test', function () {
    return true;
  });

  Then('I should see test', function () {
    return true;
  });

