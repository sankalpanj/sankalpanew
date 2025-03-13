ALTER TABLE `contacts` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-03-11T12:43:10.825Z';--> statement-breakpoint
ALTER TABLE `contacts` ADD `userType` text;--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-03-11T12:43:10.824Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-03-11T12:43:10.825Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-03-11T12:43:10.825Z';