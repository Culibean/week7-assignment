CREATE TABLE IF NOT EXISTS uncluttrUsers (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar (255)
);

CREATE TABLE IF NOT EXISTS uncluttrTasks (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  task_test TEXT,
  room TEXT,
  task_type TEXT,
  time_available INT,
  scheduled_day DATE,
  is_completed BOOLEAN default FALSE,
  completed_at timestamp,
  shared_to_community BOOLEAN default TRUE,
  celebration_count int default 0,
  created_at timestamp default NOW()
);

CREATE TABLE IF NOT EXISTS uncluttrGenerator (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  task_text text,
  room text,
  task_type text,
  time_estimated int
);

INSERT INTO uncluttrusers (username) VALUES 
('ulrike'),
('simon'),
('bella'),
('lumiere'),
('olaf'),
('elsa'),
('aladdin'),
('moana');


ALTER TABLE uncluttrtasks
ADD COLUMN user_id INT


INSERT INTO uncluttrtasks (user_id, task_text, room, task_type, time_available, scheduled_day, is_completed, completed_at, shared_to_community, celebration_count) VALUES
(1, 'Clear off the desk surface', 'office', 'sorting', 10, '2025-01-17', FALSE, NULL, TRUE, 0),
(1, 'Wipe down kitchen counters', 'kitchen', 'cleaning', 5, '2025-01-17', TRUE, NOW() - INTERVAL '2 hours', TRUE, 3),
(2, 'Organise the shoe rack', 'hallway', 'sorting', 10, '2025-01-18', FALSE, NULL, TRUE, 0),
(2, 'Vacuum the living room', 'living room', 'cleaning', 20, '2025-01-17', TRUE, NOW() - INTERVAL '1 day', TRUE, 2),
(3, 'Declutter bedside table', 'bedroom', 'sorting', 10, '2025-01-20', FALSE, NULL, TRUE, 0),
(3, 'Clean bathroom sink', 'bathroom', 'cleaning', 10, '2025-01-17', TRUE, NOW() - INTERVAL '3 hours', TRUE, 4),
(4, 'Polish dining table', 'dining room', 'cleaning', 15, '2025-01-18', FALSE, NULL, TRUE, 0),
(4, 'Sort through one shelf of books', 'living room', 'sorting', 15, '2025-01-18', TRUE, NOW() - INTERVAL '30 minutes', TRUE, 1),
(5, 'Clean the microwave interior', 'kitchen', 'cleaning', 10, '2025-01-17', TRUE, NOW() - INTERVAL '4 hours', TRUE, 5),
(5, 'Organise winter accessories', 'hallway', 'sorting', 10, '2025-01-19', FALSE, NULL, TRUE, 0),
(6, 'Wipe bathroom mirror', 'bathroom', 'cleaning', 5, '2025-01-17', FALSE, NULL, TRUE, 0),
(6, 'Sort makeup drawer', 'bedroom', 'sorting', 15, '2025-01-20', TRUE, NOW() - INTERVAL '1 hour', TRUE, 2),
(7, 'Sweep balcony floor', 'balcony', 'cleaning', 10, '2025-01-18', FALSE, NULL, TRUE, 0),
(7, 'Organise small items in drawer', 'bedroom', 'sorting', 10, '2025-01-17', TRUE, NOW() - INTERVAL '5 hours', TRUE, 1),
(8, 'Clean fridge shelves', 'kitchen', 'cleaning', 20, '2025-01-19', FALSE, NULL, TRUE, 0),
(8, 'Sort beach gear box', 'storage', 'sorting', 15, '2025-01-18', TRUE, NOW() - INTERVAL '6 hours', TRUE, 3);


INSERT INTO uncluttrgenerator (task_text, room, task_type, time_estimated) values
('Clear off one small surface', 'office', 'sorting', 5),
('Wipe down kitchen counters', 'kitchen', 'cleaning', 5),
('Wipe bathroom mirror', 'bathroom', 'cleaning', 5),
('Dust one window sill', 'living room', 'cleaning', 5),
('Sort five items from a drawer', 'bedroom', 'sorting', 10),
('Organise the shoe rack', 'hallway', 'sorting', 10),
('Clean the microwave interior', 'kitchen', 'cleaning', 10),
('Sort your coat rack', 'hallway', 'sorting', 10),
('Declutter the bedside table', 'bedroom', 'sorting', 15),
('Sort one shelf of books', 'living room', 'sorting', 15),
('Organise bathroom products', 'bathroom', 'sorting', 15),
('Clean fridge door shelves', 'kitchen', 'cleaning', 15),
('Hoover one room', 'living room', 'cleaning', 20),
('Organise one kitchen drawer', 'kitchen', 'sorting', 20),
('Sort your bill pile', 'office', 'sorting', 20),
('Wipe light switches and handles', 'kitchen', 'cleaning', 20),
('Deep clean the bathroom sink area', 'bathroom', 'cleaning', 30),
('Sort a full bookshelf section', 'living room', 'sorting', 30),
('Clean the fridge interior', 'kitchen', 'cleaning', 30),
('Organise wardrobe top shelf', 'bedroom', 'sorting', 30),
('Deep clean the shower or tub', 'bathroom', 'cleaning', 45),
('Sort and fold all laundry', 'bedroom', 'sorting', 45),
('Declutter the entire desk area', 'office', 'sorting', 45),
('Clean all kitchen surfaces thoroughly', 'kitchen', 'cleaning', 45),
('Full room reset: tidy, dust, hoover', 'living room', 'cleaning', 60),
('Organise entire wardrobe', 'bedroom', 'sorting', 60),
('Deep clean the kitchen', 'kitchen', 'cleaning', 60),
('Sort and reorganise tool box', 'storage', 'sorting', 60);


SELECT user_id, task_text, room, task_type, time_available FROM uncluttrtasks;

SELECT user_id, task_text, room, task_type, time_available FROM uncluttrtasks WHERE is_completed=FALSE



SELECT * FROM uncluttrtasks WHERE user_id = 1 AND is_completed = FALSE ORDER BY created_at DESC;

SELECT * FROM uncluttrtasks WHERE is_completed = TRUE AND shared_to_community = TRUE ORDER BY completed_at DESC;

UPDATE uncluttrtasks SET celebration_count = celebration_count + 1 WHERE id = 1 RETURNING *;

UPDATE uncluttrtasks SET shared_to_community = FALSE;
UPDATE uncluttrtasks SET shared_to_community = TRUE WHERE is_completed = TRUE;

SELECT * from uncluttrgenerator ORDER BY time_estimated ASC;

SELECT * from uncluttrtasks WHERE user_id = 1 AND is_completed = TRUE ORDER BY completed_at DESC;

SELECT * FROM uncluttrtasks WHERE id=1;

UPDATE uncluttrtasks SET is_completed = TRUE, completed_at = NOW() WHERE id = 1 returning*;

DELETE FROM uncluttrtasks WHERE id = 1 RETURNING*

UPDATE uncluttrtasks SET is_completed = TRUE, shared_to_community = TRUE, completed_at=NOW() WHERE id=1 RETURNING *;

UPDATE uncluttrtasks SET celebration_count = celebration_count + 1 WHERE id=1 RETURNING *;

SELECT uncluttrtasks.id,uncluttrtasks.task_text, 

INSERT INTO uncluttrusers (username) VALUES 1 RETURNING *;

alter table uncluttrusers add constraint unique_username unique (username);



SELECT uncluttrtasks.id, uncluttrtasks.task_text, uncluttrtasks.room, uncluttrtasks.celebration_count, uncluttrtasks.completed_at, uncluttrusers.username FROM uncluttrtasks LEFT JOIN uncluttrusers ON uncluttrtasks.user_id = uncluttrusers.id WHERE uncluttrtasks.is_completed = TRUE ORDER BY uncluttrtasks.completed_at DESC;


alter TABLE uncluttrtasks ADD foreign key (user_id) REFERENCES uncluttrusers(id);
