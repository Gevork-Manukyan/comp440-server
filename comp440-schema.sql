CREATE TABLE users (
    username    VARCHAR(70) NOT NULL PRIMARY KEY,
    password    TEXT NOT NULL,
    firstName   VARCHAR(50) NOT NULL,
    lastName    VARCHAR(50) NOT NULL,
    email       VARCHAR(70) NOT NULL
);
