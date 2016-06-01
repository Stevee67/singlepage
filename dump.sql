--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: get_cr_tm(); Type: FUNCTION; Schema: public; Owner: webdev
--

CREATE FUNCTION get_cr_tm() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
	NEW.cr_tm = now();
	return NEW;
END;$$;


ALTER FUNCTION public.get_cr_tm() OWNER TO webdev;

--
-- Name: client_autoinc; Type: SEQUENCE; Schema: public; Owner: webdev
--

CREATE SEQUENCE client_autoinc
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE client_autoinc OWNER TO webdev;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: webdev; Tablespace: 
--

CREATE TABLE clients (
    id integer DEFAULT nextval('client_autoinc'::regclass) NOT NULL,
    project_name character varying(200),
    client_name character varying(100) NOT NULL,
    description character varying(500),
    cr_tm timestamp without time zone,
    website character varying(100),
    phone character varying(50),
    email character varying(100) NOT NULL,
    priority integer,
    user_id integer,
    count_request integer,
    count_active_request integer
);


ALTER TABLE clients OWNER TO webdev;

--
-- Name: feature_autoinc; Type: SEQUENCE; Schema: public; Owner: webdev
--

CREATE SEQUENCE feature_autoinc
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE feature_autoinc OWNER TO webdev;

--
-- Name: feature_request; Type: TABLE; Schema: public; Owner: webdev; Tablespace: 
--

CREATE TABLE feature_request (
    id integer DEFAULT nextval('feature_autoinc'::regclass) NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(250),
    client_id integer NOT NULL,
    target_date timestamp without time zone,
    ticket_url character varying(150),
    cr_tm timestamp without time zone,
    status character varying(100),
    priority integer,
    product_area_id integer
);


ALTER TABLE feature_request OWNER TO webdev;

--
-- Name: product_area_autoinc; Type: SEQUENCE; Schema: public; Owner: webdev
--

CREATE SEQUENCE product_area_autoinc
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE product_area_autoinc OWNER TO webdev;

--
-- Name: product_areas; Type: TABLE; Schema: public; Owner: webdev; Tablespace: 
--

CREATE TABLE product_areas (
    id integer DEFAULT nextval('product_area_autoinc'::regclass) NOT NULL,
    title character varying(200)
);


ALTER TABLE product_areas OWNER TO webdev;

--
-- Name: user_autoinc; Type: SEQUENCE; Schema: public; Owner: webdev
--

CREATE SEQUENCE user_autoinc
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE user_autoinc OWNER TO webdev;

--
-- Name: users; Type: TABLE; Schema: public; Owner: webdev; Tablespace: 
--

CREATE TABLE users (
    id integer DEFAULT nextval('user_autoinc'::regclass) NOT NULL,
    name character varying(100) NOT NULL,
    cr_tm timestamp without time zone,
    role character varying(100),
    email character varying(100) NOT NULL,
    password_hash character varying(128)
);


ALTER TABLE users OWNER TO webdev;

--
-- Name: client_autoinc; Type: SEQUENCE SET; Schema: public; Owner: webdev
--

SELECT pg_catalog.setval('client_autoinc', 4, true);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: webdev
--

COPY clients (id, project_name, client_name, description, cr_tm, website, phone, email, priority, user_id, count_request, count_active_request) FROM stdin;
1	User managment project	Jim	At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.	2016-06-01 15:44:01.486113	www.test.com	888 5555 5555	ee@email.com	1	2	\N	\N
2	Benefits calculation app	Jeck	At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.	2016-06-01 15:44:53.50068	www.tesst.com	888 5555 5555	see@email.com	2	2	\N	\N
3	Android	Sem	At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.	2016-06-01 15:45:25.548197	www.sim.com	888 5555 5555	sessae@email.com	2	2	\N	\N
4	SS	Mickel	At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.	2016-06-01 15:45:51.304432	www.sidssm.com	888 5555 5555	exe@email.com	3	2	\N	\N
\.


--
-- Name: feature_autoinc; Type: SEQUENCE SET; Schema: public; Owner: webdev
--

SELECT pg_catalog.setval('feature_autoinc', 10, true);


--
-- Data for Name: feature_request; Type: TABLE DATA; Schema: public; Owner: webdev
--

COPY feature_request (id, title, description, client_id, target_date, ticket_url, cr_tm, status, priority, product_area_id) FROM stdin;
9	dsda	dssas	1	2016-06-15 00:00:00	dsadass	2016-06-01 18:29:21.582331	TODO	2	3
10	daasd	asdsadads	1	2016-06-21 00:00:00	dasdsaasd	2016-06-01 18:29:39.812765	TODO	2	2
\.


--
-- Name: product_area_autoinc; Type: SEQUENCE SET; Schema: public; Owner: webdev
--

SELECT pg_catalog.setval('product_area_autoinc', 6, true);


--
-- Data for Name: product_areas; Type: TABLE DATA; Schema: public; Owner: webdev
--

COPY product_areas (id, title) FROM stdin;
2	Policies
3	Billing
4	Claims
5	Reports
\.


--
-- Name: user_autoinc; Type: SEQUENCE SET; Schema: public; Owner: webdev
--

SELECT pg_catalog.setval('user_autoinc', 2, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: webdev
--

COPY users (id, name, cr_tm, role, email, password_hash) FROM stdin;
2	STEVE	2016-06-01 15:03:35.650385	ADMIN	test@admin.com	pbkdf2:sha256:1000$TsPO4jS3SYTqRuTRmvMUmVPeZe9Sp6EK$b141955f571c1427c513c896a93984699c447719ed5e93fab256b226f94e0a33
\.


--
-- Name: client_pkey; Type: CONSTRAINT; Schema: public; Owner: webdev; Tablespace: 
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: feature_request_pkey; Type: CONSTRAINT; Schema: public; Owner: webdev; Tablespace: 
--

ALTER TABLE ONLY feature_request
    ADD CONSTRAINT feature_request_pkey PRIMARY KEY (id);


--
-- Name: product_areas_pkey; Type: CONSTRAINT; Schema: public; Owner: webdev; Tablespace: 
--

ALTER TABLE ONLY product_areas
    ADD CONSTRAINT product_areas_pkey PRIMARY KEY (id);


--
-- Name: uniq_cl_email; Type: CONSTRAINT; Schema: public; Owner: webdev; Tablespace: 
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT uniq_cl_email UNIQUE (email);


--
-- Name: uniq_cl_name; Type: CONSTRAINT; Schema: public; Owner: webdev; Tablespace: 
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT uniq_cl_name UNIQUE (client_name);


--
-- Name: uniq_email; Type: CONSTRAINT; Schema: public; Owner: webdev; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT uniq_email UNIQUE (email);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: webdev; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: fki_client_fk; Type: INDEX; Schema: public; Owner: webdev; Tablespace: 
--

CREATE INDEX fki_client_fk ON feature_request USING btree (client_id);


--
-- Name: fki_product_area_fk; Type: INDEX; Schema: public; Owner: webdev; Tablespace: 
--

CREATE INDEX fki_product_area_fk ON feature_request USING btree (product_area_id);


--
-- Name: fki_user_fk; Type: INDEX; Schema: public; Owner: webdev; Tablespace: 
--

CREATE INDEX fki_user_fk ON clients USING btree (user_id);


--
-- Name: client_cr_tm; Type: TRIGGER; Schema: public; Owner: webdev
--

CREATE TRIGGER client_cr_tm BEFORE INSERT ON clients FOR EACH ROW EXECUTE PROCEDURE get_cr_tm();


--
-- Name: feat_cr_tm; Type: TRIGGER; Schema: public; Owner: webdev
--

CREATE TRIGGER feat_cr_tm BEFORE INSERT ON feature_request FOR EACH ROW EXECUTE PROCEDURE get_cr_tm();


--
-- Name: user_cr_tm; Type: TRIGGER; Schema: public; Owner: webdev
--

CREATE TRIGGER user_cr_tm BEFORE INSERT ON users FOR EACH ROW EXECUTE PROCEDURE get_cr_tm();


--
-- Name: client_fk; Type: FK CONSTRAINT; Schema: public; Owner: webdev
--

ALTER TABLE ONLY feature_request
    ADD CONSTRAINT client_fk FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- Name: product_area_fk; Type: FK CONSTRAINT; Schema: public; Owner: webdev
--

ALTER TABLE ONLY feature_request
    ADD CONSTRAINT product_area_fk FOREIGN KEY (product_area_id) REFERENCES product_areas(id);


--
-- Name: user_fk; Type: FK CONSTRAINT; Schema: public; Owner: webdev
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

