describe 'assigning stuff to this', ->
    Given -> @number = 24
    When  -> @number++
    And   -> @number *= 2
    Then  -> @number == 50

describe 'assigning stuff to variables', ->
    subject = null
    Given -> subject = []
    When  -> subject.push('foo')
    Then  -> subject.length == 1

describe 'Testing deferred', ->
    Given -> @t = Date.now()
    Then.after 1500, 'so much time has passed', -> Date.now() - @t >= 1500
#~