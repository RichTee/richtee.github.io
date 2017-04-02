describe('richtee.github.io register', function() {
  // expects register e2e to execute first
  it('should login', function() {
    browser.get('https://richtee.github.io/#!/login');

    element(by.css("#username")).clear().sendKeys("ProtractorUser");
    element(by.css("#password")).clear().sendKeys("ProtractorPassword");
    element(by.css('body > div > div > div > div > div > form > div.form-actions > button')).click();

    expect(browser.getCurrentUrl()).toContain('https://richtee.github.io/#!/');
  });
});