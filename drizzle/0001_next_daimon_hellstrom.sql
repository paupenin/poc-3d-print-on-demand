CREATE TABLE IF NOT EXISTS "poc_order_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_url" varchar(255) NOT NULL,
	"quantity" integer NOT NULL,
	"material" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "poc_order" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar(255) DEFAULT 'created' NOT NULL,
	"price" integer NOT NULL,
	"payment_receipt_url" varchar(255),
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DROP TABLE "poc_post";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poc_order_item" ADD CONSTRAINT "poc_order_item_order_id_poc_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."poc_order"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poc_order" ADD CONSTRAINT "poc_order_created_by_poc_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."poc_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_item_order_id_idx" ON "poc_order_item" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_created_by_idx" ON "poc_order" USING btree ("created_by");