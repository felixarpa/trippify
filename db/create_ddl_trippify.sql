CREATE SCHEMA trippify AUTHORIZATION trippify;

-- Id sequences
CREATE SEQUENCE trippify_trip_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE trippify_trip_id_seq
    OWNER TO trippify;


CREATE SEQUENCE trippify_participant_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE trippify_participant_id_seq
    OWNER TO trippify;


CREATE SEQUENCE trippify_car_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE trippify_car_id_seq
    OWNER TO trippify;

-- Tables
CREATE TABLE trippify_trip
(
    id integer NOT NULL DEFAULT nextval('trippify_trip_id_seq'::regclass),
    title character varying(50) COLLATE pg_catalog."default",
    description character varying(500) COLLATE pg_catalog."default",
    destination character varying(500) COLLATE pg_catalog."default",
    currency character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT trippify_trip_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE trippify_trip
    OWNER to trippify;


CREATE TABLE trippify_participant
(
    id integer NOT NULL DEFAULT nextval('trippify_participant_id_seq'::regclass),
    trip_id integer NOT NULL,
    name character varying(50) COLLATE pg_catalog."default",
    origin character varying(500) COLLATE pg_catalog."default",
    music_genre character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT trippify_participant_pkey PRIMARY KEY (id),
    CONSTRAINT trippify_participant_trip_fkey FOREIGN KEY (trip_id)
        REFERENCES trippify_trip (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE trippify_participant
    OWNER to trippify;


CREATE TABLE trippify_car
(
    id integer NOT NULL DEFAULT nextval('trippify_car_id_seq'::regclass),
    participant_id integer NOT NULL,
    car_name character varying(50) COLLATE pg_catalog."default",
    car_brand character varying(50) COLLATE pg_catalog."default",
    car_model character varying(50) COLLATE pg_catalog."default",
    car_available_seats integer,
    CONSTRAINT trippify_car_pkey PRIMARY KEY (id),
    CONSTRAINT trippify_car_participant_fkey FOREIGN KEY (participant_id)
        REFERENCES trippify_participant (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE trippify_car
    OWNER to trippify;

-- Insert values
insert into trippify_trip values (1, 'Royal Hackaway 2019', 'Best hackathon ever', 'Windsor Building, University in Egham, England', 'EUR');

insert into trippify_participant values (1, 1, 'Bernat', 'Big Ben', 'Rock');
insert into trippify_participant values (2, 1, 'Albert', 'Candem Town', 'Pop');
insert into trippify_participant values (3, 1, 'Felix', 'Liverpool Street, London', 'Punk');
insert into trippify_participant values (4, 1, 'Elena', 'Waterloo Station, London', 'Metal');

insert into trippify_car values (1, 1, 'Tixerino', 'Renault', 'Clio', 4);