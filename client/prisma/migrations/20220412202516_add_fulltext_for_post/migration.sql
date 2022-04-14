-- CreateIndex
CREATE FULLTEXT INDEX `Post_title_body_idx` ON `Post`(`title`, `body`);
