Feature: File validation

  Scenario: Check if file is in place and has data
    Given a file named 'purchase_orders.xls' exists
    Then Verify that header have next headers
      | Buyer | Buyer | Buyer External ID | Sales Order |
    And Verify that there is more than 10 lines in file



