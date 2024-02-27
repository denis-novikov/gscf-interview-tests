class MainPage {

    elements = {
        depositWidgetBtn: () => cy.get('[ng-click="deposit()"]'),
        depositInput: () => cy.get('.form-control'),
        depositAmountBtn: () => cy.get('form > button'),
        message: () => cy.get('[ng-show="message"]'),
        balanceField: () => cy.contains('Balance').children('.ng-binding').eq(1),
        transactionBtn: () => cy.get('[ng-click="transactions()"]'),
        transactionTable: () => cy.get('table'),
        transactionAmounts: () => cy.get('tbody > tr > .ng-binding:nth-of-type(2)'),
    }
    
    clickDepositWidgetBtn() {
        this.elements.depositWidgetBtn().click();
        this.elements.depositInput().should('be.visible');
    }

    depositAmount(depositValue) {
        this.elements.depositInput().type(depositValue);
        this.elements.depositAmountBtn().click();
    }

    getMessage() {
        return this.elements.message();
    }

    getBalanceAmount() {
        return this.elements.balanceField();
    }

    clickTransactionWidget() {
        this.elements.transactionBtn().click();
    }
    
    getTransactionAmountSum() {
        return this.elements.transactionAmounts()
          .extractStrings()
          .stringsToNumbers()
          .sum();
    }

    isTransactionTableVisible() {
        this.elements.transactionTable()
        .then($table => {
            if (cy.wrap($table).find('#anchor0').length < 1) {
              let currentTime = new Dates
              cy.get('#start').type(currentTime.toISOString().slice(0, 16))
              cy.get('tbody').should('be.visible')
            }
          })
    }
}

export default MainPage;