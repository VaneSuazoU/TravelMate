import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('TravelMate App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getPageTitle()).toContain('TravelMate');
  });

  it('should navigate to login page', async () => {
    await page.navigateTo();
    await page.getLoginButton().click();
    expect(await browser.getCurrentUrl()).toContain('/login');
  });

  it('should log in successfully', async () => {
    await browser.get('/login');
    await page.getInputByPlaceholder('Username').sendKeys('testuser');
    await page.getInputByPlaceholder('Password').sendKeys('testpass');
    await page.getSubmitButton().click();
    expect(await browser.getCurrentUrl()).toContain('/home');
  });

  it('should display destinations', async () => {
    await browser.get('/home');
    await page.getDestinationsButton().click();
    expect(await browser.getCurrentUrl()).toContain('/destinations');
    const destinations = await page.getDestinationsList();
    expect(destinations.length).toBeGreaterThan(0);
  });

  it('should add a new destination', async () => {
    await browser.get('/destinations');
    const initialCount = (await page.getDestinationsList()).length;
    await page.getInputByPlaceholder('Destination Name').sendKeys('New Test Destination');
    await page.getInputByPlaceholder('Description').sendKeys('A beautiful place to visit');
    await page.getSubmitButton().click();
    const newCount = (await page.getDestinationsList()).length;
    expect(newCount).toBe(initialCount + 1);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});