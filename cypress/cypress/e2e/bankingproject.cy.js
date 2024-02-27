import LoginPage from "../pages/LoginPage"
import MainPage from "../pages/MainPage"

describe('test banking project', () => {

  let testdata;

  beforeEach('Open the page', () => {
    cy.fixture('testdata.json').then(data => {
      testdata = data;
    });
    cy.visit('/');
  })

  it('Login using the customer', () => {
    const loginpage = new LoginPage();
    const mainpage = new MainPage();

    loginpage.loginAsCustomer();
    loginpage.selectCustomer(testdata.username);
    loginpage.clickLoginBtn();

    mainpage.clickDepositWidgetBtn();
    mainpage.depositAmount(100);
    mainpage.getMessage()
      .should('have.text', 'Deposit Successful');
    mainpage.depositAmount(10);
    mainpage.getMessage()
      .should('have.text', 'Deposit Successful');
    mainpage.depositAmount(5);
    mainpage.getMessage()
      .should('have.text', 'Deposit Successful');

    mainpage.getBalanceAmount()
      .should('have.text', '115');

    mainpage.clickTransactionWidget();
    mainpage.isTransactionTableVisible();

    mainpage.getTransactionAmountSum()
    .should('eq', 115);;
  });
})