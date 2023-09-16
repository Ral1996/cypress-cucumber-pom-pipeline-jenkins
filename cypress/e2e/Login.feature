@LoginWebPage
Feature: Test Login Page For Demo Cypress.io

    This is a test automation demo with Cypress, Cucumber and NodeJS tools and technologies.

    @LoginWebPage @ValidCredential
    Scenario Outline: User Should Be Able To Login Using Valid Credentials
        Given Visit Practice Test Automation Website
        Then User Provide Username "<username>"
        Then User Provide Password "<password>"
        Then User Click On Login Button To Log In Into The Practice Test Automation Website
        Then User Read The Text Of Successfully Log In Into The Website
        Then User Click On Logout Button For Reply To The Login Website

        Examples:
            | username      | password     |
            | standard_user | secret_sauce |

    @LoginWebPage @InvalidCredential
    Scenario Outline: User Should Not Be Able To Login Using Invalid Credentials
        Given Visit Practice Test Automation Website
        Then User Provide Username "<usernames>"
        Then User Provide Password "<passwords>"
        Then User Click On Login Button To Log In Into The Practice Test Automation Website
        Then User See An Alert Error "<alert_response>"


        Examples:
            | usernames       | passwords    | alert_response                                                            |
            | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                       |
            | standard_user   | 1234         | Epic sadface: Username and password do not match any user in this service |

# Scenario: User Should Be Able To Login Using Invalid Credentials
# Given Visit Practice Test Automation Website
# Then User Provide Username
# Then User Provide Password
# Then User Click On Login Button To Log In Into The Practice Test Automation Website
# Then User Read The Text Of Successfully Log In Into The Website
# Then User Click On Logout Button For Reply To The Login Website