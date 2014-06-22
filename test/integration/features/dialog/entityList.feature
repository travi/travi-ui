Feature: Dialog integration with the entity list

  Scenario: entity list is updated after new entity added through dialog
    Given on an entity list page
    Given a dialog containing a form has been launched
    When the add-entity form has been submitted successfully
    Then the new entity is shown in the list

  Scenario: entity list is updated after existing entity updated through dialog
    Given on an entity list page
    Given a dialog containing a form has been launched
    When the update-entity form has been submitted successfully
    Then the existing entity is updated in the list

  Scenario: entity list updated after existing entity removed with confirmation dialog
    Given on an entity list page
    Given the remove link was clicked on one of the entities in the list
    When the confirm button is clicked
    Then the entity will no longer be present in the list