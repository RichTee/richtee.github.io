describe('richtee.github.io register', function() {
  it('should add a user', function() {
    browser.get('https://richtee.github.io/#!/register');

    element(by.css("#firstName")).clear().sendKeys("ProtractorFN");
    element(by.css("#Text1")).clear().sendKeys("ProtractorLN");
    element(by.css("#username")).clear().sendKeys("ProtractorUser");
    element(by.css("#password")).clear().sendKeys("ProtractorPassword");
    element(by.css('body > div > div > div > div > div > form > div.form-actions > button')).click();

    expect(browser.getCurrentUrl()).toContain('login');
  });
});