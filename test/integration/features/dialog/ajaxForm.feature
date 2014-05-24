Feature: Forms in dialogs should be automatically ajaxified

  Scenario: dialog is closed after successful form submission
    Given a dialog containing a form has been launched
    Given the form has been submitted
    When a successful response is received
    Then the dialog should be closed