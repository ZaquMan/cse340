# Newsletter Control

CSE340 Final Project

This project adds two main features to the CSE340 Car website: subscribing to, and viewing newsletters, and creating and removing newsletters.

A potential third feature is setting up sending newsletters, which would properly align with the option to subscribe.

## Database Interactions

* [x] Add a new column added to the accounts database to track if the user is subscribed to newsletters

* [x] Add a new table to store newsletters

  Needs columns for newsletter title, body, and published date

* [x] Queries will be need to be added to the setup sql script to alter the account table, adding the subscription column, and create the new table for newsletters.

## Model Additions and Alterations

* [x] The account model will need a function to add and remove an account's subscription status.

* [x] A new model will be needed for creating, (sending), displaying and deleting newsletters

## Controller Chaos

* [ ] The controller for the account page may need to be updated to properly render the subscription status.  That, or it may just be a view change, depending on how the account details section actually gets drawn out.

* [ ] A controller for newsletter actions will be needed.  There will need to be controllers for:

  * [ ] Writing a newsletter

  * [ ] Receiving the POST request with the new newsletter

  * [ ] Listing current newsletters

  * [ ] Viewing newsletters

  * [ ] Receiving POST requests to delete the currently viewed newsletter (assuming the user is authorized)

## View Changes

* [ ] Account management view needs to show the subscription option as a simple toggle / checkbox

* [ ] Newsletter Creation view is needed to write a newsletter

* [ ] A list of newsletters

* [ ] The contents of a newsletter, and if authorized, a button to delete the newsletter

## Data Validation

* [ ] An account can not subscribe to a newsletter without having an email address. (In practice this will never happen since an email is needed to create an account.)

* [ ] A newsletter can not be created without a title and body.

I don't know if confirmation before deleting counts as data validation, but it will be included.

## Error Handling

* [ ] Attempting to view newsletters or the newsletter list without having subscribed to newsletters should generate an error with a message on how to subscribe.

  Is this how things work in real life? No, but I need something to be an easily demonstrable error.

* [ ] Attempting to submit an invalid newsletters will throw an error message to display to the user.

* If there is a way to trigger the delete functionality on a non-authorized account, there should be an error when it is triggered.
