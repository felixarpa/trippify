CREATE USER trippify WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  PASSWORD 'trippify1234';


CREATE DATABASE trippify
    WITH
    OWNER = trippify
    ENCODING = 'utf8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default;


ALTER ROLE trippify IN DATABASE trippify SET search_path TO trippify;