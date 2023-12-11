CREATE DATABASE scalingsoft;
USE scalingsoft;

CREATE TABLE `roles` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(45) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`roleId`)
);

INSERT INTO `roles` (`roleId`, `roleName`, `status`) VALUES
(1,	'ADMIN',	1),
(2,	'DEMO',	1);

CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `attempts` int NOT NULL,
  `createUser` varchar(45) NOT NULL,
  `createDate` datetime NOT NULL,
  `modifiedUser` varchar(45) DEFAULT NULL,
  `modifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`)
);

INSERT INTO `user` (`userId`, `roleId`, `username`, `password`, `firstName`, `lastName`, `status`, `attempts`, `createUser`, `createDate`, `modifiedUser`, `modifiedDate`) VALUES
(1,	1,	'admin',	'$2y$10$3GApNMAIob7hhgURyyzSQul8sexMmH8CjnKaREZ.F1UlDVG9b7o7y',	'admin',	'admin',	1,	0,	'admin',	'2023-11-24 01:32:57',	NULL,	NULL),
(6,	2,	'demo',	'$2y$10$xHLEMK3IbNBH9m30VdcN8.k2ZH8PgEYkD2tmgekcliFpYDW6I6pZy',	'demo',	'demo',	1,	0,	'demo',	'2023-12-07 06:02:10',	NULL,	NULL);

-- create procedures

CREATE PROCEDURE `create_user_sp`(IN `username` varchar(45), IN `password` varchar(255), IN `firstname` varchar(45), IN `lastname` varchar(45), IN `status` tinyint, IN `created` varchar(45), IN `role` int)
insert into user
(roleId,username,password,firstName,lastName,status,attempts,createUser,createDate,modifiedUser,modifiedDate)
values(role,username,password,firstname,lastname,status,0,created,now(),null,null);

CREATE PROCEDURE `find_user_sp`(IN `user` varchar(45))
select u.userId,u.username,u.password,ro.roleId, ro.roleName, u.attempts
from user u
inner join roles ro on ro.roleId = u.roleId
where u.username = user and u.status = 1;

CREATE PROCEDURE `login_sp`(IN `user` varchar(45), IN `password` varchar(45))
select * from user
where username = user and status = 1;

CREATE PROCEDURE `read_role_sp`()
select * from roles;

CREATE PROCEDURE `read_user_sp`()
select u.userId, u.username, u.firstName, u.lastName, u.status, u.roleId, ro.roleName
from user u
inner join roles ro on ro.roleId = u.roleId;

CREATE PROCEDURE `update_attempts`(IN `id` int, IN `attempts` int)
update user
set attempts = attempts
where userId = id;

CREATE PROCEDURE `update_status_sp`(IN `id` int, IN `status` tinyint)
update user
set status = status
where userId = id;

CREATE PROCEDURE `update_user_sp`(IN `id` int, IN `role` int, IN `username` varchar(45), IN `firstname` varchar(45), IN `lastname` varchar(45), IN `status` tinyint, IN `modified` varchar(45))
update user
set roleId=role,username=username,firstName=names,lastName=lastnames,
status=status,modifiedUser=modified,modifiedDate=now()
where userId = id;
