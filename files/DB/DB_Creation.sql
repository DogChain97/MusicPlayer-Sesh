create database musicPlayer;
use musicPlayer;
create table USER(u_name varchar(50) PRIMARY KEY, email varchar(50), password varchar(64));
create table GENRE(g_id integer PRIMARY KEY, g_name varchar(20));
create table ARTIST(a_id integer PRIMARY KEY, a_name varchar(20));
create table SONG(s_id integer PRIMARY KEY, s_name varchar(50), genre_id integer, artist_id integer, FOREIGN KEY (genre_id) REFERENCES GENRE(g_id), FOREIGN KEY (artist_id) REFERENCES ARTIST(a_id));
create table PLAYLIST(pl_id integer PRIMARY KEY, user_name varchar(50), pl_name varchar(15), song_id integer, FOREIGN KEY (user_name) REFERENCES USER(u_name), FOREIGN KEY (song_id) REFERENCES SONG(s_id));
show tables;