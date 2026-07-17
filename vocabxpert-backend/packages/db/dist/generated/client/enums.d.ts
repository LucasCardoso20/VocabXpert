export declare const TargetLevel: {
    readonly BEGINNER: "BEGINNER";
    readonly INTERMEDIATE: "INTERMEDIATE";
    readonly ADVANCED: "ADVANCED";
};
export type TargetLevel = (typeof TargetLevel)[keyof typeof TargetLevel];
export declare const ReviewOutcome: {
    readonly KNOWN: "KNOWN";
    readonly UNKNOWN: "UNKNOWN";
};
export type ReviewOutcome = (typeof ReviewOutcome)[keyof typeof ReviewOutcome];
export declare const ExerciseType: {
    readonly RANDOM: "RANDOM";
    readonly MULTIPLE_CHOICE_TRANSLATION: "MULTIPLE_CHOICE_TRANSLATION";
    readonly CREATE_SENTENCE: "CREATE_SENTENCE";
    readonly CLOZE: "CLOZE";
    readonly FLASHCARD: "FLASHCARD";
    readonly MATCH: "MATCH";
    readonly DICTATION: "DICTATION";
    readonly CHOOSE_CORRECT_EXAMPLE: "CHOOSE_CORRECT_EXAMPLE";
    readonly WORD_ORDER: "WORD_ORDER";
};
export type ExerciseType = (typeof ExerciseType)[keyof typeof ExerciseType];
export declare const StudyScope: {
    readonly LAST_10: "LAST_10";
    readonly ALL: "ALL";
    readonly DUE: "DUE";
};
export type StudyScope = (typeof StudyScope)[keyof typeof StudyScope];
//# sourceMappingURL=enums.d.ts.map