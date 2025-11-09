-- QUERY 1
INSERT INTO account(account_firstname, account_lastname, account_email, account_password)
VALUES('Tony', 'Stark', 'tony@starknet.com', 'Iam1ronM@n');

-- QUERY 2
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'TONY'
	AND account_lastname = 'STARK';

-- QUERY 3
DELETE FROM account
WHERE account_firstname = 'TONY'
	AND account_lastname = 'STARK';

-- QUERY 4
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM'
	AND inv_model = 'Hummer';

-- QUERY 5
SELECT inv_make, inv_model FROM inventory i
JOIN classification c ON i.classification_id = c.classification_id 
WHERE c.classification_name = 'Sport';

--QUERY 6
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles')
WHERE inv_image NOT LIKE '/images/vehicles%'
	AND inv_thumbnail NOT LIKE '/images/vehicles%';