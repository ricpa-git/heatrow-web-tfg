create database heatrow;

-- Tabla USERS --
create table users (
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(50),
email VARCHAR(100),
password VARCHAR(255),  -- hasheada
role ENUM('admin'),       -- solo admin, no usuarios normales
created_at DATETIME
);

-- Tabla DJs --
create table djs (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50),
bio TEXT,
image VARCHAR(255)  -- url del cartel o foto
);

-- Tabla Events --
create table events (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(100),
description TEXT,
date DATETIME,
location VARCHAR(100),
image VARCHAR(255),  -- cartel del evento
dice_link VARCHAR(255),  -- link de compra de entradas
created_at DATETIME
);

-- Tabla relacional EVENTS y DJS --
CREATE TABLE events_djs (
    event_id INT NOT NULL,
    dj_id INT NOT NULL,
    PRIMARY KEY (event_id, dj_id),
    CONSTRAINT fk_event
        FOREIGN KEY (event_id) REFERENCES events(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_dj
        FOREIGN KEY (dj_id) REFERENCES djs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);