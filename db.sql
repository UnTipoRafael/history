create table user(
	id INT NOT NULL AUTO_INCREMENT primary key,
	id_fb INT NOT NULL unique,
	nombre varchar(10) NOT NULL unique,
	password varchar(10) NOT NULL
);


create table history(
	id INT NOT NULL AUTO_INCREMENT primary key,

	title varchar(70) not null,
	date_time datetime not null,

	longitud varchar(25) not null,
	latitud varchar(25) not null,

	description varchar(500),
	img varchar(200),
	type int,

	id_user int not null
);

create table type(
	id INT NOT NULL AUTO_INCREMENT primary key,
	nombre varchar(20) not null unique
);