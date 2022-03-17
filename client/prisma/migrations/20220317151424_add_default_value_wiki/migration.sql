/*
  Warnings:

  - Made the column `wiki` on table `quest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `quest` MODIFY `wiki` TEXT NOT NULL DEFAULT '[{"type":"h1","children":[{"text":"Welcome"}]},{"type":"p","children":[{"text":"This is our Wiki where you can find tips, resources, and strategies to increase the success of us achieving our wishes. If you want to add here, just send me a message in our chat and I''ll do it for you!"}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":""},{"type":"a","url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","children":[{"text":"watch this awesome tip!"}]},{"text":""}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":""}]}]';
