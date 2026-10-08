--
-- PostgreSQL database dump
--

\restrict mA54fvA7Rk8EYq7wDwn0puTF2UVxsS54EjmaKZs3ZbXHGCOuqtR1v02tMLigoE6

-- Dumped from database version 17.11 (Debian 17.11-1.pgdg13+2)
-- Dumped by pg_dump version 17.11 (Debian 17.11-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: evidence; Type: TABLE; Schema: public; Owner: openeye
--

CREATE TABLE public.evidence (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    goal_id uuid NOT NULL,
    source_type text NOT NULL,
    source_id text,
    content text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.evidence OWNER TO openeye;

--
-- Name: goal_states; Type: TABLE; Schema: public; Owner: openeye
--

CREATE TABLE public.goal_states (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    goal_id uuid NOT NULL,
    state jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.goal_states OWNER TO openeye;

--
-- Name: goals; Type: TABLE; Schema: public; Owner: openeye
--

CREATE TABLE public.goals (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    status text DEFAULT 'active'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT goals_status_check CHECK ((status = ANY (ARRAY['active'::text, 'completed'::text, 'paused'::text, 'cancelled'::text])))
);


ALTER TABLE public.goals OWNER TO openeye;

--
-- Name: memories; Type: TABLE; Schema: public; Owner: openeye
--

CREATE TABLE public.memories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    content text NOT NULL,
    memory_type text NOT NULL,
    importance text DEFAULT 'medium'::text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT memories_importance_check CHECK ((importance = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text]))),
    CONSTRAINT memories_type_check CHECK ((memory_type = ANY (ARRAY['preference'::text, 'fact'::text, 'instruction'::text, 'context'::text])))
);


ALTER TABLE public.memories OWNER TO openeye;

--
-- Name: state_events; Type: TABLE; Schema: public; Owner: openeye
--

CREATE TABLE public.state_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    goal_id uuid NOT NULL,
    event_type text NOT NULL,
    description text,
    data jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.state_events OWNER TO openeye;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: openeye
--

CREATE TABLE public.tasks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    goal_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    status text DEFAULT 'pending'::text NOT NULL,
    priority text DEFAULT 'medium'::text NOT NULL,
    due_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT tasks_priority_check CHECK ((priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text]))),
    CONSTRAINT tasks_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'in_progress'::text, 'completed'::text, 'cancelled'::text])))
);


ALTER TABLE public.tasks OWNER TO openeye;

--
-- Name: users; Type: TABLE; Schema: public; Owner: openeye
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO openeye;

--
-- Name: evidence evidence_pkey; Type: CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.evidence
    ADD CONSTRAINT evidence_pkey PRIMARY KEY (id);


--
-- Name: goal_states goal_states_pkey; Type: CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.goal_states
    ADD CONSTRAINT goal_states_pkey PRIMARY KEY (id);


--
-- Name: goals goals_pkey; Type: CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (id);


--
-- Name: memories memories_pkey; Type: CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.memories
    ADD CONSTRAINT memories_pkey PRIMARY KEY (id);


--
-- Name: state_events state_events_pkey; Type: CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.state_events
    ADD CONSTRAINT state_events_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: evidence evidence_goal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.evidence
    ADD CONSTRAINT evidence_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goals(id) ON DELETE CASCADE;


--
-- Name: goal_states goal_states_goal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.goal_states
    ADD CONSTRAINT goal_states_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goals(id) ON DELETE CASCADE;


--
-- Name: goals goals_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goals_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: memories memories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.memories
    ADD CONSTRAINT memories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: state_events state_events_goal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.state_events
    ADD CONSTRAINT state_events_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goals(id) ON DELETE CASCADE;


--
-- Name: tasks tasks_goal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: openeye
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goals(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict mA54fvA7Rk8EYq7wDwn0puTF2UVxsS54EjmaKZs3ZbXHGCOuqtR1v02tMLigoE6

