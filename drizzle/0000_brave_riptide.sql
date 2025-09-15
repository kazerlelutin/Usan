CREATE TABLE `activity_logs` (
	`id` varchar(128) NOT NULL,
	`complaint_id` varchar(128) NOT NULL,
	`action` varchar(100) NOT NULL,
	`actor_type` varchar(50) NOT NULL,
	`actor_id` varchar(128),
	`actor_name` varchar(255),
	`encrypted_content` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activity_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `complaints` (
	`id` varchar(128) NOT NULL,
	`access_code` varchar(32) NOT NULL,
	`encrypted_content` text NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'submitted',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `complaints_id` PRIMARY KEY(`id`),
	CONSTRAINT `complaints_access_code_unique` UNIQUE(`access_code`)
);
