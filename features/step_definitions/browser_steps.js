const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
var {Given, Then, When} = require('cucumber');
const assert = require('assert');

  Given('I am on the website login page', async function() {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();
 
    this.driver.wait(until.elementLocated(By.tagName('h1')));
 
    await this.driver.get('http://localhost:80');
  });

  When('I click on test', function () {
    return true;
  });

  Then('I should see login and password fields', async function () {
    var emailElements = await this.driver.findElements(By.id('inputEmail'));
    var passwordElements = await this.driver.findElements(By.id('inputPassword'));
    assert.equal(1, emailElements.length)
    assert.equal(1, passwordElements.length)
  });

