/*
  Warnings:

  - Added the required column `questTaskid` to the `QuestTaskFinisher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quest` ADD COLUMN `wiki` LONGTEXT NOT NULL DEFAULT '[{"type":"h1","children":[{"text":"Welcome"}]},{"type":"p","children":[{"text":"This is our Wiki where you can find tips, resources, and strategies to increase the success of us achieving our wishes. If you want to add here, just send me a message in our chat and I''ll do it for you!"}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":""},{"type":"a","url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","children":[{"text":"watch this awesome tip!"}]},{"text":""}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":""}]}]';

-- AlterTable
ALTER TABLE `questtaskfinisher` ADD COLUMN `questTaskid` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `QuestTaskFinisher` ADD CONSTRAINT `QuestTaskFinisher_questTaskid_fkey` FOREIGN KEY (`questTaskid`) REFERENCES `QuestTask`(`questTaskid`) ON DELETE RESTRICT ON UPDATE CASCADE;
