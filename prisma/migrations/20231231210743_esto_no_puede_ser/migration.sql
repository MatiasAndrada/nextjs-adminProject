/*
  Warnings:

  - You are about to drop the column `taskGroup_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `taskGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `task_group_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskGroup_id_fkey";

-- DropForeignKey
ALTER TABLE "taskGroup" DROP CONSTRAINT "taskGroup_author_id_fkey";

-- DropForeignKey
ALTER TABLE "taskGroup" DROP CONSTRAINT "taskGroup_project_id_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "taskGroup_id",
ADD COLUMN     "task_group_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "taskGroup";

-- CreateTable
CREATE TABLE "TaskGroup" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" VARCHAR(1500),
    "status" VARCHAR(18) NOT NULL,
    "progress" VARCHAR(18) NOT NULL,
    "criticality" VARCHAR(18) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskGroup_id_key" ON "TaskGroup"("id");

-- AddForeignKey
ALTER TABLE "TaskGroup" ADD CONSTRAINT "TaskGroup_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskGroup" ADD CONSTRAINT "TaskGroup_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_task_group_id_fkey" FOREIGN KEY ("task_group_id") REFERENCES "TaskGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
