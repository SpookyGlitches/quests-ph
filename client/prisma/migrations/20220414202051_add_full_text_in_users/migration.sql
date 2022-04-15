-- CreateIndex
CREATE FULLTEXT INDEX `User_displayName_fullName_idx` ON `User`(`displayName`, `fullName`);
