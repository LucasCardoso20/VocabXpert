import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly UserLearningLanguage: "UserLearningLanguage";
    readonly Interest: "Interest";
    readonly UserInterest: "UserInterest";
    readonly VocabList: "VocabList";
    readonly Vocab: "Vocab";
    readonly VocabExample: "VocabExample";
    readonly VocabNote: "VocabNote";
    readonly VocabReview: "VocabReview";
    readonly VocabProgress: "VocabProgress";
    readonly StudySession: "StudySession";
    readonly StudyExercise: "StudyExercise";
    readonly StudyAttempt: "StudyAttempt";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly displayName: "displayName";
    readonly nativeLanguage: "nativeLanguage";
    readonly targetLanguage: "targetLanguage";
    readonly level: "level";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly activeLearningLanguageId: "activeLearningLanguageId";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const UserLearningLanguageScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly language: "language";
    readonly level: "level";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserLearningLanguageScalarFieldEnum = (typeof UserLearningLanguageScalarFieldEnum)[keyof typeof UserLearningLanguageScalarFieldEnum];
export declare const InterestScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type InterestScalarFieldEnum = (typeof InterestScalarFieldEnum)[keyof typeof InterestScalarFieldEnum];
export declare const UserInterestScalarFieldEnum: {
    readonly userId: "userId";
    readonly interestId: "interestId";
};
export type UserInterestScalarFieldEnum = (typeof UserInterestScalarFieldEnum)[keyof typeof UserInterestScalarFieldEnum];
export declare const VocabListScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly isDefault: "isDefault";
    readonly learningLanguageId: "learningLanguageId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VocabListScalarFieldEnum = (typeof VocabListScalarFieldEnum)[keyof typeof VocabListScalarFieldEnum];
export declare const VocabScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly listId: "listId";
    readonly word: "word";
    readonly translation: "translation";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly wordNormalized: "wordNormalized";
};
export type VocabScalarFieldEnum = (typeof VocabScalarFieldEnum)[keyof typeof VocabScalarFieldEnum];
export declare const VocabExampleScalarFieldEnum: {
    readonly id: "id";
    readonly vocabId: "vocabId";
    readonly text: "text";
};
export type VocabExampleScalarFieldEnum = (typeof VocabExampleScalarFieldEnum)[keyof typeof VocabExampleScalarFieldEnum];
export declare const VocabNoteScalarFieldEnum: {
    readonly id: "id";
    readonly vocabId: "vocabId";
    readonly text: "text";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VocabNoteScalarFieldEnum = (typeof VocabNoteScalarFieldEnum)[keyof typeof VocabNoteScalarFieldEnum];
export declare const VocabReviewScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly vocabId: "vocabId";
    readonly outcome: "outcome";
    readonly createdAt: "createdAt";
};
export type VocabReviewScalarFieldEnum = (typeof VocabReviewScalarFieldEnum)[keyof typeof VocabReviewScalarFieldEnum];
export declare const VocabProgressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly vocabId: "vocabId";
    readonly ease: "ease";
    readonly interval: "interval";
    readonly repetitions: "repetitions";
    readonly streak: "streak";
    readonly lastOutcome: "lastOutcome";
    readonly lastReviewedAt: "lastReviewedAt";
    readonly nextDueAt: "nextDueAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VocabProgressScalarFieldEnum = (typeof VocabProgressScalarFieldEnum)[keyof typeof VocabProgressScalarFieldEnum];
export declare const StudySessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly listId: "listId";
    readonly exerciseType: "exerciseType";
    readonly scope: "scope";
    readonly limit: "limit";
    readonly direction: "direction";
    readonly vocabIds: "vocabIds";
    readonly currentIndex: "currentIndex";
    readonly createdAt: "createdAt";
    readonly finishedAt: "finishedAt";
    readonly enabledExerciseTypes: "enabledExerciseTypes";
};
export type StudySessionScalarFieldEnum = (typeof StudySessionScalarFieldEnum)[keyof typeof StudySessionScalarFieldEnum];
export declare const StudyExerciseScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly userId: "userId";
    readonly vocabId: "vocabId";
    readonly type: "type";
    readonly payload: "payload";
    readonly createdAt: "createdAt";
};
export type StudyExerciseScalarFieldEnum = (typeof StudyExerciseScalarFieldEnum)[keyof typeof StudyExerciseScalarFieldEnum];
export declare const StudyAttemptScalarFieldEnum: {
    readonly id: "id";
    readonly exerciseId: "exerciseId";
    readonly userId: "userId";
    readonly response: "response";
    readonly outcome: "outcome";
    readonly aiScore: "aiScore";
    readonly aiFeedback: "aiFeedback";
    readonly aiVerdict: "aiVerdict";
    readonly aiModel: "aiModel";
    readonly aiLatencyMs: "aiLatencyMs";
    readonly createdAt: "createdAt";
};
export type StudyAttemptScalarFieldEnum = (typeof StudyAttemptScalarFieldEnum)[keyof typeof StudyAttemptScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client/runtime/client").DbNullClass;
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client/runtime/client").DbNullClass;
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
    readonly AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map