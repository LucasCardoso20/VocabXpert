import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model UserLearningLanguage
 *
 */
export type UserLearningLanguage = Prisma.UserLearningLanguageModel;
/**
 * Model Interest
 *
 */
export type Interest = Prisma.InterestModel;
/**
 * Model UserInterest
 *
 */
export type UserInterest = Prisma.UserInterestModel;
/**
 * Model VocabList
 *
 */
export type VocabList = Prisma.VocabListModel;
/**
 * Model Vocab
 *
 */
export type Vocab = Prisma.VocabModel;
/**
 * Model VocabExample
 *
 */
export type VocabExample = Prisma.VocabExampleModel;
/**
 * Model VocabNote
 *
 */
export type VocabNote = Prisma.VocabNoteModel;
/**
 * Model VocabReview
 *
 */
export type VocabReview = Prisma.VocabReviewModel;
/**
 * Model VocabProgress
 *
 */
export type VocabProgress = Prisma.VocabProgressModel;
/**
 * Model StudySession
 *
 */
export type StudySession = Prisma.StudySessionModel;
/**
 * Model StudyExercise
 *
 */
export type StudyExercise = Prisma.StudyExerciseModel;
/**
 * Model StudyAttempt
 *
 */
export type StudyAttempt = Prisma.StudyAttemptModel;
//# sourceMappingURL=client.d.ts.map