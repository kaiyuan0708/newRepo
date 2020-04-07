CREATE TABLE "public"."staff" (
    "staff_id" SERIAL PRIMARY KEY,
    "logon_id" varchar NOT NULL,
    "logon_password" varchar NOT NULL,
	"staff_name" varchar,
    "email" varchar,
	"last_logon_dt" timestamp,
    "created_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_type" varchar DEFAULT 'staff',
    "suspend_login" boolean DEFAULT FALSE
);

CREATE TABLE "public"."session" (
    "session_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "staff_id" int8 NOT NULL REFERENCES staff (staff_id),
    "ip_address" VARCHAR NOT NULL,
    "created_dt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("session_id")
);

CREATE TABLE "public"."customer" (
    "customer_id" SERIAL PRIMARY KEY,
    "customer_full_name" varchar NOT NULL,
    "company_name" varchar,
	"company_type" varchar,
    "customer_designation" varchar,
	"country_code" varchar,
	"contact" varchar,
	"email" varchar,
	"address" varchar,
	"website_type" varchar,
	"website_url" varchar,
    "created_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"delete_flag" boolean DEFAULT FALSE
);

CREATE TABLE "public"."address" (
    "address_id" SERIAL PRIMARY KEY,
    "address" varchar(1000) NOT NULL,
    "customer_id" int,
    "created_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"delete_flag" boolean DEFAULT FALSE,
	"is_primary" boolean DEFAULT FALSE
);

CREATE TABLE "public"."contact" (
    "contact_id" SERIAL PRIMARY KEY,
    "contact_number" varchar NOT NULL,
    "customer_id" int,
    "created_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"delete_flag" boolean DEFAULT FALSE,
	"is_primary" boolean DEFAULT FALSE,
	"country_code" char(2) DEFAULT NULL
);

CREATE TABLE "public"."country" (
    "country_id" SERIAL PRIMARY KEY,
    "iso" char(2) NOT NULL,
    "country_name" varchar NOT NULL,
    "nicename" varchar NOT NULL,
    "iso3" char(3) DEFAULT NULL,
	"numcode" int,
	"dialcode" varchar NOT NULL
);

CREATE TABLE "public"."email" (
    "email_id" SERIAL PRIMARY KEY,
    "email_address" varchar(1000) NOT NULL,
    "customer_id" int,
    "created_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"delete_flag" boolean DEFAULT FALSE,
	"is_primary" boolean DEFAULT FALSE
);

CREATE TABLE "public"."website" (
    "website_id" SERIAL PRIMARY KEY,
    "website_url" varchar NOT NULL,
	"website_type" varchar NOT NULL,
    "customer_id" int,
    "created_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_dt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"delete_flag" boolean DEFAULT FALSE
);
