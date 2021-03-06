set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


create table "public"."users" (
  "userId"              serial,
  "username"            text          not null,
  "hashedPassword"      text          not null,
  "createdAt"           timestamptz(6)  not null default now(),
  primary key ("userId"),
  unique ("username")
);

create table "public"."books" (
  "title"               text          not null,
  "author"              text,
  "bookId"              text          not null,
  "coverUrl"            text,
  "pageCount"           integer,
  "addedAt"             timestamptz(6) not null default now(),
  primary key ("bookId")
);

create table "public"."readingList" (
  "addedId"              serial,
  "userId"               integer,
  "title"                text not null,
  "bookId"               text not null,
  "rating"               integer,
  "isRead"               boolean,
  "addedAt"              timestamptz(6) not null default now(),
  primary key ("userId", "bookId"),
   foreign key ("userId")
    references "users" ("userId"),
   foreign key ("bookId")
    references "books" ("bookId")
);
