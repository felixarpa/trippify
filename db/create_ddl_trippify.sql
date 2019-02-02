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