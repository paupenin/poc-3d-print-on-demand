CREATE TABLE IF NOT EXISTS "poc_user_address" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"street" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poc_user_address" ADD CONSTRAINT "poc_user_address_user_id_poc_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."poc_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_address_user_id_idx" ON "poc_user_address" USING btree ("user_id");