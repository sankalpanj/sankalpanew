ALTER TABLE `contacts` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-03-11T16:54:27.162Z';--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-03-11T16:54:27.161Z';--> statement-breakpoint
ALTER TABLE `members` ADD `gender` text DEFAULT 'Others';--> statement-breakpoint
ALTER TABLE `members` ADD `occupation` text DEFAULT 'N/A';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-03-11T16:54:27.162Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-03-11T16:54:27.162Z';