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


CREATE SEQUENCE trippify_route_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE trippify_route_id_seq
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


CREATE TABLE trippify_route
(
    id integer NOT NULL DEFAULT nextval('trippify_route_id_seq'::regclass),
    route character varying(500) COLLATE pg_catalog."default",
    CONSTRAINT trippify_route_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE trippify_route
    OWNER to trippify;


CREATE TABLE trippify_participant
(
    id integer NOT NULL DEFAULT nextval('trippify_participant_id_seq'::regclass),
    trip_id integer NOT NULL,
    route_id integer DEFAULT NULL,
    name character varying(50) COLLATE pg_catalog."default",
    origin character varying(500) COLLATE pg_catalog."default",
    music_genre character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT trippify_participant_pkey PRIMARY KEY (id),
    CONSTRAINT trippify_participant_trip_fkey FOREIGN KEY (trip_id)
        REFERENCES trippify_trip (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT trippify_participant_route_fkey FOREIGN KEY (route_id)
        REFERENCES trippify_route (id) MATCH SIMPLE
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
    name character varying(50) COLLATE pg_catalog."default",
    brand character varying(50) COLLATE pg_catalog."default",
    model character varying(50) COLLATE pg_catalog."default",
    available_seats integer,
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
insert into trippify_trip values (default, 'Royal Hackaway 2019', 'Best hackathon ever', 'Windsor Building, University in Egham, England', 'EUR');

insert into trippify_participant values (default, 1, default, 'Bernat', 'Charing Cross Station, London, UK', 'rock');
insert into trippify_participant values (default, 1, default, 'Albert', 'Camden Town, London, UK', 'chill');
insert into trippify_participant values (default, 1, default, 'Felix', 'Liverpool Street, London, UK', 'indie');
insert into trippify_participant values (default, 1, default, 'Elena', 'Waterloo Station, London, UK', 'pop');
insert into trippify_participant values (default, 1, default, 'Ferja', 'North Wembley Station, Wembley, UK', 'classical');
insert into trippify_participant values (default, 1, default, 'David', 'Alperton Station, Wembley, UK', 'soul');
insert into trippify_participant values (default, 1, default, 'Gorka', 'St Georges Shopping Centre, Harrow, UK', 'dance');
insert into trippify_participant values (default, 1, default, 'Andreu', 'Dartford Grammar School, Dartford, UK', 'funk');
insert into trippify_participant values (default, 1, default, 'Carlota', 'North Kent College, Dartford, UK', 'punk');
insert into trippify_participant values (default, 1, default, 'Victor', 'Dartford Station, Dartford, UK', 'house');

insert into trippify_car values (default, 1, 'Tixerino', 'Renault', 'Clio', 4);
insert into trippify_car values (default, 6, 'El bicho', 'Citroen', 'C3', 4);
insert into trippify_car values (default, 9, 'Gracia car', 'Honda', 'Civic', 4);