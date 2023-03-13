-- \echo 'Delete and recreate planner db?'
-- \prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
USE testdb;

-- \i planner-schema.sql
