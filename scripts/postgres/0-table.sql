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

CREATE TABLE Speakers (
  id SERIAL PRIMARY KEY,
  position Integer,
  name Text,
  description_pl Text,
  description_en Text,
  picture Text
);

CREATE TABLE Experts (
  id SERIAL PRIMARY KEY,
  position Integer,
  name Text,
  description_pl Text,
  description_en Text,
  picture Text
);

CREATE TABLE News (
  id SERIAL PRIMARY KEY,
  title_pl TEXT,
  title_en TEXT,
  text_pl TEXT,
  text_en TEXT,
  image TEXT,
  published_date TEXT
);

CREATE TABLE Resources (
  id SERIAL PRIMARY KEY,
  name TEXT,
  type TEXT,
  file_path TEXT
);

-- Create test user
-- User details:
--   - login: admin
--   - password: admin
INSERT INTO EggUser (username, passwd_hash)
VALUES ('admin', '$2y$10$Mbhv49o0OwWcb1uOv3YaB.cyMhfygftmpjZgwBrv65tYcZzh2tXs2');
