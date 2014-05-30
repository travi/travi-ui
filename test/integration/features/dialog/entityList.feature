Feature: Dialog integration with the entity list

  Scenario: entity list is updated after new entity added through dialog
    Given on an entity list page
    Given add button has been clicked
    Given a dialog containing a form has been launched
    When the form has been submitted successfully
    Then the new entity is shown in the list