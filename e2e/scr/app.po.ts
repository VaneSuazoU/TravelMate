import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return element(by.css('ion-title')).getText();
  }

  getLoginButton() {
    return element(by.css('ion-button[routerLink="/login"]'));
  }

  getDestinationsButton() {
    return element(by.css('ion-button[routerLink="/destinations"]'));
  }

  getInputByPlaceholder(placeholder: string) {
    return element(by.css(`ion-input[placeholder="${placeholder}"]`));
  }

  getSubmitButton() {
    return element(by.css('ion-button[type="submit"]'));
  }

  getDestinationsList() {
    return element.all(by.css('ion-item.destination'));
  }
}