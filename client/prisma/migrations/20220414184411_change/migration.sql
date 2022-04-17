-- DropIndex
DROP INDEX `Post_title_body_idx` ON `post`;

-- CreateIndex
CREATE FULLTEXT INDEX `Post_title_idx` ON `Post`(`title`);

-- CreateIndex
CREATE FULLTEXT INDEX `Post_body_idx` ON `Post`(`body`);