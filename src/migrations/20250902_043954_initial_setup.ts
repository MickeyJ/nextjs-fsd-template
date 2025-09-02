import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_permissions" AS ENUM('manage_events', 'manage_members', 'view_reports', 'send_emails', 'manage_payments', 'edit_website');
  CREATE TYPE "public"."enum_users_billing_payment_methods_type" AS ENUM('card', 'bank');
  CREATE TYPE "public"."enum_users_interests" AS ENUM('networking', 'education', 'volunteering', 'social', 'professional', 'mentorship');
  CREATE TYPE "public"."enum_users_tags" AS ENUM('vip', 'volunteer', 'donor', 'board_alumni', 'founding');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'staff', 'board', 'member', 'guest');
  CREATE TYPE "public"."enum_users_membership_status" AS ENUM('active', 'expired', 'pending', 'cancelled', 'none');
  CREATE TYPE "public"."enum_users_status" AS ENUM('active', 'inactive', 'suspended', 'banned');
  CREATE TYPE "public"."enum_events_timezone" AS ENUM('America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York', 'UTC');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published', 'cancelled', 'completed');
  CREATE TYPE "public"."enum_event_registrations_status" AS ENUM('pending', 'confirmed', 'waitlisted', 'cancelled', 'attended', 'no-show');
  CREATE TYPE "public"."enum_event_registrations_registration_type" AS ENUM('member', 'non-member', 'student', 'vip', 'sponsor', 'speaker');
  CREATE TYPE "public"."enum_event_registrations_payment_method" AS ENUM('free', 'credit-card', 'cash', 'check', 'comp');
  CREATE TYPE "public"."enum_media_category" AS ENUM('general', 'event', 'member', 'sponsor', 'document');
  CREATE TYPE "public"."enum_members_membership_status" AS ENUM('active', 'inactive', 'pending');
  CREATE TYPE "public"."enum_membership_types_duration" AS ENUM('monthly', 'quarterly', 'annual', 'lifetime');
  CREATE TABLE "users_permissions" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_permissions",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_billing_payment_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_users_billing_payment_methods_type",
  	"last4" varchar,
  	"is_default" boolean
  );
  
  CREATE TABLE "users_interests" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_interests",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"display_name" varchar,
  	"bio" varchar,
  	"avatar_id" integer,
  	"phone" varchar,
  	"date_of_birth" timestamp(3) with time zone,
  	"role" "enum_users_role" DEFAULT 'member' NOT NULL,
  	"email_verified" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone,
  	"membership_status" "enum_users_membership_status" DEFAULT 'none',
  	"membership_type_id" integer,
  	"membership_member_number" varchar,
  	"membership_join_date" timestamp(3) with time zone,
  	"membership_renewal_date" timestamp(3) with time zone,
  	"membership_expiration_date" timestamp(3) with time zone,
  	"membership_auto_renew" boolean DEFAULT false,
  	"membership_lifetime" boolean DEFAULT false,
  	"billing_stripe_customer_id" varchar,
  	"billing_total_donated" numeric DEFAULT 0,
  	"billing_total_paid" numeric DEFAULT 0,
  	"preferences_newsletter" boolean DEFAULT true,
  	"preferences_event_notifications" boolean DEFAULT true,
  	"preferences_renewal_reminders" boolean DEFAULT true,
  	"preferences_show_in_directory" boolean DEFAULT true,
  	"preferences_share_contact_info" boolean DEFAULT false,
  	"last_login" timestamp(3) with time zone,
  	"login_count" numeric DEFAULT 0,
  	"notes" varchar,
  	"status" "enum_users_status" DEFAULT 'active',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"summary" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"location_name" varchar NOT NULL,
  	"location_address" varchar NOT NULL,
  	"location_coordinates" geometry(Point),
  	"event_date" timestamp(3) with time zone NOT NULL,
  	"start_time" varchar NOT NULL,
  	"end_time" varchar NOT NULL,
  	"timezone" "enum_events_timezone" DEFAULT 'America/Los_Angeles',
  	"image_id" integer,
  	"image_url" varchar,
  	"platforms_wild_apricot" boolean DEFAULT false,
  	"platforms_meetup" boolean DEFAULT false,
  	"platforms_eventbrite" boolean DEFAULT false,
  	"platforms_wild_apricot_id" varchar,
  	"platforms_meetup_id" varchar,
  	"platforms_eventbrite_id" varchar,
  	"registration_enabled" boolean DEFAULT true,
  	"registration_capacity" numeric,
  	"registration_price" numeric DEFAULT 0,
  	"registration_registration_deadline" timestamp(3) with time zone,
  	"status" "enum_events_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"event_registrations_id" integer
  );
  
  CREATE TABLE "event_registrations_guest_names" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"email" varchar
  );
  
  CREATE TABLE "event_registrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"registration_number" varchar NOT NULL,
  	"event_id" integer NOT NULL,
  	"user_id" integer NOT NULL,
  	"status" "enum_event_registrations_status" DEFAULT 'pending' NOT NULL,
  	"registration_type" "enum_event_registrations_registration_type" DEFAULT 'member' NOT NULL,
  	"number_of_guests" numeric DEFAULT 0,
  	"payment_amount" numeric DEFAULT 0 NOT NULL,
  	"payment_method" "enum_event_registrations_payment_method" DEFAULT 'free',
  	"payment_stripe_payment_id" varchar,
  	"payment_paid_at" timestamp(3) with time zone,
  	"dietary_restrictions" varchar,
  	"special_requests" varchar,
  	"check_in_checked_in" boolean DEFAULT false,
  	"check_in_checked_in_at" timestamp(3) with time zone,
  	"check_in_checked_in_by_id" integer,
  	"notes" varchar,
  	"email_confirmation_sent" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"category" "enum_media_category" DEFAULT 'general',
  	"credit" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "members_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"membership_status" "enum_members_membership_status" DEFAULT 'pending',
  	"join_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "membership_types_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar NOT NULL,
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "membership_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"stripe_price_id" varchar,
  	"duration" "enum_membership_types_duration" DEFAULT 'annual' NOT NULL,
  	"features_event_discount_percentage" numeric,
  	"features_max_guests" numeric,
  	"features_can_access_member_directory" boolean DEFAULT true,
  	"features_can_post_jobs" boolean DEFAULT false,
  	"features_can_sponsor_events" boolean DEFAULT false,
  	"features_priority_registration" boolean DEFAULT false,
  	"eligibility_min_age" numeric,
  	"eligibility_max_age" numeric,
  	"eligibility_requires_verification" boolean DEFAULT false,
  	"eligibility_requirements" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"is_featured" boolean DEFAULT false,
  	"max_members" numeric,
  	"renewal_reminder" numeric DEFAULT 30,
  	"color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"events_id" integer,
  	"event_registrations_id" integer,
  	"media_id" integer,
  	"members_id" integer,
  	"membership_types_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"members_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_permissions" ADD CONSTRAINT "users_permissions_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_billing_payment_methods" ADD CONSTRAINT "users_billing_payment_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_interests" ADD CONSTRAINT "users_interests_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_tags" ADD CONSTRAINT "users_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_membership_type_id_membership_types_id_fk" FOREIGN KEY ("membership_type_id") REFERENCES "public"."membership_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_event_registrations_fk" FOREIGN KEY ("event_registrations_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_registrations_guest_names" ADD CONSTRAINT "event_registrations_guest_names_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_check_in_checked_in_by_id_users_id_fk" FOREIGN KEY ("check_in_checked_in_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members_sessions" ADD CONSTRAINT "members_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "membership_types_benefits" ADD CONSTRAINT "membership_types_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."membership_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_registrations_fk" FOREIGN KEY ("event_registrations_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_membership_types_fk" FOREIGN KEY ("membership_types_id") REFERENCES "public"."membership_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_permissions_order_idx" ON "users_permissions" USING btree ("order");
  CREATE INDEX "users_permissions_parent_idx" ON "users_permissions" USING btree ("parent_id");
  CREATE INDEX "users_billing_payment_methods_order_idx" ON "users_billing_payment_methods" USING btree ("_order");
  CREATE INDEX "users_billing_payment_methods_parent_id_idx" ON "users_billing_payment_methods" USING btree ("_parent_id");
  CREATE INDEX "users_interests_order_idx" ON "users_interests" USING btree ("order");
  CREATE INDEX "users_interests_parent_idx" ON "users_interests" USING btree ("parent_id");
  CREATE INDEX "users_tags_order_idx" ON "users_tags" USING btree ("order");
  CREATE INDEX "users_tags_parent_idx" ON "users_tags" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_membership_membership_type_idx" ON "users" USING btree ("membership_type_id");
  CREATE UNIQUE INDEX "users_membership_membership_member_number_idx" ON "users" USING btree ("membership_member_number");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_image_idx" ON "events" USING btree ("image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_event_registrations_id_idx" ON "events_rels" USING btree ("event_registrations_id");
  CREATE INDEX "event_registrations_guest_names_order_idx" ON "event_registrations_guest_names" USING btree ("_order");
  CREATE INDEX "event_registrations_guest_names_parent_id_idx" ON "event_registrations_guest_names" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "event_registrations_registration_number_idx" ON "event_registrations" USING btree ("registration_number");
  CREATE INDEX "event_registrations_event_idx" ON "event_registrations" USING btree ("event_id");
  CREATE INDEX "event_registrations_user_idx" ON "event_registrations" USING btree ("user_id");
  CREATE INDEX "event_registrations_check_in_check_in_checked_in_by_idx" ON "event_registrations" USING btree ("check_in_checked_in_by_id");
  CREATE INDEX "event_registrations_updated_at_idx" ON "event_registrations" USING btree ("updated_at");
  CREATE INDEX "event_registrations_created_at_idx" ON "event_registrations" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "members_sessions_order_idx" ON "members_sessions" USING btree ("_order");
  CREATE INDEX "members_sessions_parent_id_idx" ON "members_sessions" USING btree ("_parent_id");
  CREATE INDEX "members_updated_at_idx" ON "members" USING btree ("updated_at");
  CREATE INDEX "members_created_at_idx" ON "members" USING btree ("created_at");
  CREATE UNIQUE INDEX "members_email_idx" ON "members" USING btree ("email");
  CREATE INDEX "membership_types_benefits_order_idx" ON "membership_types_benefits" USING btree ("_order");
  CREATE INDEX "membership_types_benefits_parent_id_idx" ON "membership_types_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "membership_types_slug_idx" ON "membership_types" USING btree ("slug");
  CREATE INDEX "membership_types_updated_at_idx" ON "membership_types" USING btree ("updated_at");
  CREATE INDEX "membership_types_created_at_idx" ON "membership_types" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_event_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("event_registrations_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");
  CREATE INDEX "payload_locked_documents_rels_membership_types_id_idx" ON "payload_locked_documents_rels" USING btree ("membership_types_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_members_id_idx" ON "payload_preferences_rels" USING btree ("members_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_permissions" CASCADE;
  DROP TABLE "users_billing_payment_methods" CASCADE;
  DROP TABLE "users_interests" CASCADE;
  DROP TABLE "users_tags" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "event_registrations_guest_names" CASCADE;
  DROP TABLE "event_registrations" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "members_sessions" CASCADE;
  DROP TABLE "members" CASCADE;
  DROP TABLE "membership_types_benefits" CASCADE;
  DROP TABLE "membership_types" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_permissions";
  DROP TYPE "public"."enum_users_billing_payment_methods_type";
  DROP TYPE "public"."enum_users_interests";
  DROP TYPE "public"."enum_users_tags";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_users_membership_status";
  DROP TYPE "public"."enum_users_status";
  DROP TYPE "public"."enum_events_timezone";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum_event_registrations_status";
  DROP TYPE "public"."enum_event_registrations_registration_type";
  DROP TYPE "public"."enum_event_registrations_payment_method";
  DROP TYPE "public"."enum_media_category";
  DROP TYPE "public"."enum_members_membership_status";
  DROP TYPE "public"."enum_membership_types_duration";`)
}
