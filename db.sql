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
  iduser UUID references users(id_user) on delete cascade,
  image text,
  ingredients text,
  video text,
  title text
);

CREATE TABLE liked(
  id_liked serial primary key,
  iduser UUID references users(id_user) on delete cascade,
  idrecipe UUID references recipe(id_recipe) on delete cascade
);

CREATE TABLE saved(
  id_saved serial primary key,
  iduser UUID references users(id_user) on delete cascade,
  idrecipe UUID references recipe(id_recipe) on delete cascade
);

CREATE TABLE comment(
  id_comment serial primary key,
  iduser UUID references users(id_user) on delete cascade,
  idrecipe UUID references recipe(id_recipe) on delete cascade,
  description text
);
