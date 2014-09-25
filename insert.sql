DROP TABLE IF EXISTS shows;

CREATE TABLE shows( id SERIAL PRIMARY KEY, name VARCHAR, imdb_id VARCHAR, img_url VARCHAR, twitter_handle VARCHAR,
  wiki_link VARCHAR, createdAt DATE, updatedAt DATE );

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('The Mindy Project','tt2211129','http://ib2.huluim.com/show_key_art/11248?size=1600x600&region=US','MindyProjectFOX','http://en.wikipedia.org/wiki/The_Mindy_Project');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('New Girl','tt1826940','http://ib1.huluim.com/show_key_art/7529?size=1600x600&region=US','NewGirlonFOX','http://en.wikipedia.org/wiki/New_Girl');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('Drunk History','tt2712612','http://ib.huluim.com/show_key_art/14658?size=1600x600&region=US','drunkhistory','http://en.wikipedia.org/wiki/Drunk_History');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('Jimmy Kimmel','tt0320037','http://ib3.huluim.com/show_key_art/2526?size=1600x600&region=US','JimmyKimmelLive','http://en.wikipedia.org/wiki/Jimmy_Kimmel_Live!');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('Masterchef','tt1694423','http://ib2.huluim.com/show_key_art/4726?size=1600x600&region=US','MASTERCHEFonFOX','http://en.wikipedia.org/wiki/MasterChef_(U.S._TV_series)');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('Hells Kitchen','tt0437005','http://ib3.huluim.com/show_key_art/148?size=1600x600&region=US','HellsKitchenFOX','http://en.wikipedia.org/wiki/Hell%27s_Kitchen_(U.S._TV_series)');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('The Bachelorette','tt0348894','http://ib4.huluim.com/show_key_art/4412?size=1600x600&region=US','BacheloretteABC','http://en.wikipedia.org/wiki/The_Bachelorette');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('The Bachelor','tt0313038','http://ib1.huluim.com/show_key_art/3708?size=1600x600&region=US','BachelorABC','http://en.wikipedia.org/wiki/The_Bachelor_(U.S._TV_series)');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('Scandal','tt1837576','http://ib3.huluim.com/show_key_art/9673?size=1600x600&region=US','ScandalABC','http://en.wikipedia.org/wiki/Scandal_(TV_series)');
INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('South Park','tt0121955','http://ib.huluim.com/assets/new-mastheads/sprk_headsup_multi_mh_nd.png?size=1600x600','SouthPark','http://en.wikipedia.org/wiki/South_Park');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('The Daily Show with Jon Stewart','tt0115147','http://ib1.huluim.com:80/show_key_art/902?size=1600x600&region=US','TheDailyShow','http://en.wikipedia.org/wiki/The_Daily_Show');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('Parks and Recreation','tt1266020','http://ib2.huluim.com/show_key_art/1968?size=1600x600&region=US','parksandrecnbc','http://en.wikipedia.org/wiki/Parks_and_Recreation');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('Brooklyn Nine-Nine','tt2467372','http://ib3.huluim.com:80/show_key_art/15137?size=1600x600&region=US','Brooklyn99FOX','http://en.wikipedia.org/wiki/Brooklyn_Nine-Nine');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('Modern Family','tt1442437','http://ib3.huluim.com/show_key_art/2553?size=1600x600&region=US','ModernFam','http://en.wikipedia.org/wiki/Modern_Family');

INSERT INTO shows (name, imdb_id, img_url, twitter_handle, wiki_link)
VALUES
  ('The Simpsons','tt0096697','http://ib3.huluim.com/show_key_art/58?region=US&size=1600x600','TheSimpsons','http://en.wikipedia.org/wiki/The_Simpsons');