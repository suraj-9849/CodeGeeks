-- AlterTable
CREATE SEQUENCE problem_pid_seq;
ALTER TABLE "Problem" ALTER COLUMN "pid" SET DEFAULT nextval('problem_pid_seq');
ALTER SEQUENCE problem_pid_seq OWNED BY "Problem"."pid";
