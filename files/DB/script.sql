use musicplayer;
select * from genre;
SELECT g_img, g_name FROM genre;
ALTER TABLE genre AUTO_INCREMENT=9;
select * from artist;
ALTER TABLE artist AUTO_INCREMENT=13;
SELECT * FROM song;
ALTER TABLE song AUTO_INCREMENT=37;
SELECT s_img,s_name,a_name,g_name FROM song JOIN artist ON artist_id = a_id JOIN genre ON g_id = genre_id ORDER BY s_name;
SELECT s_img,s_name,a_name,g_img FROM song JOIN artist ON artist_id = a_id JOIN genre ON g_id = genre_id WHERE g_name="Pop" ORDER BY s_name;
