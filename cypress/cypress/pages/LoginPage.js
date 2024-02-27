class LoginPage {

    elements = {
        customerBtn: () => cy.contains('Customer Login'),
        customerDropdown: () => cy.get('#userSelect'),
        customerLoginBtn: () => cy.contains('Login'),
    }
    
    loginAsCustomer() {
        this.elements.customerBtn().click();
    }

    selectCustomer(customerName) {
        this.elements.customerDropdown().select(customerName);
    }

    clickLoginBtn() {
        this.elements.customerLoginBtn().click();
    }
}

export default LoginPage;

