SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `isbn` varchar(13) DEFAULT NULL,
  `price` numeric(5,2) DEFAULT NULL,
  `inventory` int DEFAULT NULL,
  `is_delete` int,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `books` VALUES ('1', 'The Lord of the Rings', 'J.R.R.Tolkien', '9787208121652', '10', '100',0);
INSERT INTO `books` VALUES ('2', 'And Then There Were None', 'Agatha Christie', '9787020065394', '20', '100',0);
INSERT INTO `books` VALUES ('3', 'Dream of the Red Chamber', 'Cao Xueqin', '9787546907802', '30', '100',0);
INSERT INTO `books` VALUES ('4', 'The Heaven Sword and Dragon Saber', 'Jin Yong', '9787806553350', '40', '100',0);
INSERT INTO `books` VALUES ('5', 'The Godfather', 'Mario Puzo', '9787544701334', '50', '100',0);
INSERT INTO `books` VALUES ('6', 'Le Comte de Monte-Cristo', 'Alexandre Dumas', '9787532720187', '60', '100',0);
INSERT INTO `books` VALUES ('7', 'The Million Pound Note', 'Mark Twain', '9787532232475', '70', '100',0);
INSERT INTO `books` VALUES ('8', 'JoJo''s Bizarre Adventure', 'Araki Hirohiko', '9789861152370', '80', '100',0);


DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `book_id` int DEFAULT NULL,
  `order_id` int NOT NULL ,
  `number` integer,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `order_items` VALUES (1, 1, 1, 10);
INSERT INTO `order_items` VALUES (2, 2, 1, 20);
INSERT INTO `order_items` VALUES (3, 3, 1, 10);
INSERT INTO `order_items` VALUES (4, 4, 1, 20);
INSERT INTO `order_items` VALUES (5, 5, 1, 10);

INSERT INTO `order_items` VALUES (6, 1, 2, 10);
INSERT INTO `order_items` VALUES (7, 2, 2, 20);
INSERT INTO `order_items` VALUES (8, 3, 2, 10);
INSERT INTO `order_items` VALUES (9, 4, 2, 20);
INSERT INTO `order_items` VALUES (10, 5, 2, 10);

INSERT INTO `order_items` VALUES (11, 6, 3, 10);
INSERT INTO `order_items` VALUES (12, 7, 3, 10);
INSERT INTO `order_items` VALUES (13, 8, 3, 10);


DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `username` varchar(45) NOT NULL,
  `order_id` int NOT NULL,
  `tot_price` numeric(10,2),
  `date` varchar(20),
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `orders` VALUES ('root', 1, 2100, '2020-06-01');
INSERT INTO `orders` VALUES ('zyt', 2, 2100, '2020-06-02');
INSERT INTO `orders` VALUES ('root', 3, 2100, '2020-06-03');



DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `administrator` int,
  `ban` int,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `users` VALUES ('root', '998998', 'root@sjtu.edu.cn',1, 0);
INSERT INTO `users` VALUES ('zytt', '998998', 'zytt@sjtu.edu.cn',1, 0);
INSERT INTO `users` VALUES ('jojo', '998998', 'jojo@sjtu.edu.cn',1, 0);
INSERT INTO `users` VALUES ('zyt', '998998', 'zyt@qq.com',0, 0);
INSERT INTO `users` VALUES ('star platinum', '998998', 'star_platinum@sjtu.edu.cn',0, 0);
INSERT INTO `users` VALUES ('the world', '998998', 'the_world@sjtu.edu.cn',0, 1);
INSERT INTO `users` VALUES ('dio', '998998', 'dio@sjtu.edu.cn',0, 1);

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `username` varchar(255) NOT NULL,
  `book_id` int(11) NOT NULL,
  `book_name` varchar(255) ,
  `tot_number` int(11) ,
  `tot_price` numeric(5,2) ,
  PRIMARY KEY (`username`,`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


