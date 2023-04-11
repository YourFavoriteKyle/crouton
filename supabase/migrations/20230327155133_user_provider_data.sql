create table "public"."provider_data" (
    "id" uuid not null,
    "access_token" text not null,
    "refresh_token" text not null,
    "expires_at" timestamp without time zone not null,
    "token_type" text not null,
    "scopes" text not null,
    "created_at" timestamp with time zone not null default now()
);
alter table "public"."provider_data" enable row level security;
CREATE UNIQUE INDEX provider_data_pkey ON public.provider_data USING btree (id);
alter table "public"."provider_data" add constraint "provider_data_pkey" PRIMARY KEY using index "provider_data_pkey";
alter table "public"."provider_data" add constraint "provider_data_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;
alter table "public"."provider_data" validate constraint "provider_data_id_fkey";
create policy "Enable all for users based on user_id"
on "public"."provider_data"
as permissive
for all
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));
