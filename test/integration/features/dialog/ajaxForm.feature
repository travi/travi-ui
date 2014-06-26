Feature: Forms in dialogs should be automatically ajaxified

  Scenario: dialog is closed after successful form submission
    Given a dialog containing a form with key "" has been launched
    When the form has been submitted successfully
    Then the dialog should be closed

  Scenario: dialog stays open after form submission failure
    Given a dialog containing a form with key "" has been launched
    When the form has been submitted with a failure
    Then the dialog should still be open

  Scenario: validation errors shown within dialog
    Given a dialog containing a form with key "" has been launched
    When the form has been submitted with a validation error
    Then the dialog should still be open
    Then the validation errors should be shown