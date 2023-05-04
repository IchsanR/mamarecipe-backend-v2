CREATE DATABASE mamarecipe;

CREATE TABLE users(
  id_user UUID primary key,
  name text,
  email varchar(100),
  password text,
  phone varchar(50),
  profile_pic text
);

CREATE TABLE recipe(
  id_recipe UUID primary key,
  id_user UUID,
  FOREIGN KEY (id_user) references users(id_user) on delete cascade,
  image text,
  title text,
  ingredients text,
  description text,
  steps text,
  view_count integer,
  liked_count integer,
  saved_count integer
);

CREATE TABLE liked(
  id_liked serial primary key UNIQUE,
  id_user UUID,
  id_recipe UUID,
  FOREIGN KEY (id_user) references users(id_user) on delete cascade,
  FOREIGN KEY (id_recipe) references recipe(id_recipe) on delete cascade
);

CREATE TABLE saved(
  id_saved serial primary key UNIQUE,
  id_user UUID,
  id_recipe UUID,
  FOREIGN KEY (id_user) references users(id_user) on delete cascade,
  FOREIGN KEY (id_recipe) references recipe(id_recipe) on delete cascade
);

CREATE TABLE comment(
  id_comment serial primary key UNIQUE,
  id_user UUID,
  id_recipe UUID,
  description text,
  upload_time text,
  ms text,
  FOREIGN KEY (id_user) references users(id_user) on delete cascade,
  FOREIGN KEY (id_recipe) references recipe(id_recipe) on delete cascade
);
