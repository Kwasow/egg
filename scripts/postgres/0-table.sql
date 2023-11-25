-- Select database
\connect egg;

-- Create tables
CREATE TABLE Session (
  session_id VARCHAR(64),
  username VARCHAR(30),
  last_used TIMESTAMP
);

CREATE TABLE EggUser (
    username VARCHAR(30),
    passwd_hash VARCHAR(60)
);

-- Create test user
-- User details:
--   - login: admin
--   - password: admin
INSERT INTO EggUser (username, passwd_hash)
VALUES ('admin', '$2y$10$4H5RHFBkc0qs1ZLHMjqcp../MneknqoyLM44YkC4QoAPw3a70qsZm');
