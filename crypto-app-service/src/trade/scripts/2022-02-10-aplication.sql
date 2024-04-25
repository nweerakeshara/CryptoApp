-- Table: public.application

-- DROP TABLE IF EXISTS public.application;

CREATE TABLE IF NOT EXISTS public.application
(
    id integer NOT NULL DEFAULT nextval('application_id_seq'::regclass),
    "appName" character varying COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    url character varying COLLATE pg_catalog."default" NOT NULL,
    "appId" character varying COLLATE pg_catalog."default",
    CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.application
    OWNER to postgres;