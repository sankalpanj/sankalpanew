CREATE TABLE `children` (
	`id` text PRIMARY KEY NOT NULL,
	`member_id` text NOT NULL,
	`name` text NOT NULL,
	`age` text NOT NULL,
	`date_of_birth` text NOT NULL,
	FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`message` text DEFAULT '',
	`created_at` text DEFAULT '2025-03-11T10:30:30.616Z' NOT NULL,
	`phone` text DEFAULT 'N/A',
	`subject` text DEFAULT 'No Subject'
);
--> statement-breakpoint
CREATE TABLE `members` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`spouse_name` text,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip` text NOT NULL,
	`telephone` text NOT NULL,
	`spouse_telephone` text,
	`email` text NOT NULL,
	`spouse_email` text,
	`date_of_birth` text NOT NULL,
	`spouse_date_of_birth` text,
	`anniversary` text,
	`created_at` text DEFAULT '2025-03-11T10:30:30.614Z' NOT NULL,
	`membership_start_date` text DEFAULT '',
	`membership_end_date` text DEFAULT '',
	`amount` integer DEFAULT 0,
	`status` text DEFAULT 'pending',
	`payment_date` text DEFAULT '',
	`stripe_customer_id` text DEFAULT '',
	`stripe_subscription_id` text DEFAULT '',
	`stripe_plan_id` text DEFAULT '',
	`stripe_product_id` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`member_id` text NOT NULL,
	`paypal_transaction_id` text NOT NULL,
	`amount` text NOT NULL,
	`status` text NOT NULL,
	`payment_date` text NOT NULL,
	`membership_start_date` text NOT NULL,
	`membership_end_date` text NOT NULL,
	`created_at` text DEFAULT '2025-03-11T10:30:30.615Z' NOT NULL,
	`updated_at` text DEFAULT '2025-03-11T10:30:30.615Z' NOT NULL,
	FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE cascade
);
