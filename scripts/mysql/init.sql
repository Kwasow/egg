-- Select database
USE egg;
GRANT ALL PRIVILEGES ON egg.* TO 'egg-user'@'%';
FLUSH PRIVILEGES;

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

CREATE TABLE Resources (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name TEXT,
  original_file_name TEXT,
  file_path TEXT
);

CREATE TABLE Speakers (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  position Integer,
  name Text,
  description Text,
  picture INT,
  FOREIGN KEY (picture) REFERENCES Resources(id)
);

CREATE TABLE Experts (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  position Integer,
  name Text,
  description Text,
  picture INT,
  FOREIGN KEY (picture) REFERENCES Resources(id)
);

CREATE TABLE News (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  body TEXT,
  published_date TEXT,
  picture INT,
  FOREIGN KEY (picture) REFERENCES Resources(id)
);

-- Create test user
-- User details:
--   - login: admin
--   - password: admin
INSERT INTO EggUser (username, passwd_hash)
VALUES ('admin', '$2y$10$Mbhv49o0OwWcb1uOv3YaB.cyMhfygftmpjZgwBrv65tYcZzh2tXs2');
