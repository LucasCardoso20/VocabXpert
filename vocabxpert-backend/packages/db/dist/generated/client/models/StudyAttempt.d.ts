import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model StudyAttempt
 *
 */
export type StudyAttemptModel = runtime.Types.Result.DefaultSelection<Prisma.$StudyAttemptPayload>;
export type AggregateStudyAttempt = {
    _count: StudyAttemptCountAggregateOutputType | null;
    _avg: StudyAttemptAvgAggregateOutputType | null;
    _sum: StudyAttemptSumAggregateOutputType | null;
    _min: StudyAttemptMinAggregateOutputType | null;
    _max: StudyAttemptMaxAggregateOutputType | null;
};
export type StudyAttemptAvgAggregateOutputType = {
    aiScore: number | null;
    aiLatencyMs: number | null;
};
export type StudyAttemptSumAggregateOutputType = {
    aiScore: number | null;
    aiLatencyMs: number | null;
};
export type StudyAttemptMinAggregateOutputType = {
    id: string | null;
    exerciseId: string | null;
    userId: string | null;
    outcome: $Enums.ReviewOutcome | null;
    aiScore: number | null;
    aiFeedback: string | null;
    aiVerdict: string | null;
    aiModel: string | null;
    aiLatencyMs: number | null;
    createdAt: Date | null;
};
export type StudyAttemptMaxAggregateOutputType = {
    id: string | null;
    exerciseId: string | null;
    userId: string | null;
    outcome: $Enums.ReviewOutcome | null;
    aiScore: number | null;
    aiFeedback: string | null;
    aiVerdict: string | null;
    aiModel: string | null;
    aiLatencyMs: number | null;
    createdAt: Date | null;
};
export type StudyAttemptCountAggregateOutputType = {
    id: number;
    exerciseId: number;
    userId: number;
    response: number;
    outcome: number;
    aiScore: number;
    aiFeedback: number;
    aiVerdict: number;
    aiModel: number;
    aiLatencyMs: number;
    createdAt: number;
    _all: number;
};
export type StudyAttemptAvgAggregateInputType = {
    aiScore?: true;
    aiLatencyMs?: true;
};
export type StudyAttemptSumAggregateInputType = {
    aiScore?: true;
    aiLatencyMs?: true;
};
export type StudyAttemptMinAggregateInputType = {
    id?: true;
    exerciseId?: true;
    userId?: true;
    outcome?: true;
    aiScore?: true;
    aiFeedback?: true;
    aiVerdict?: true;
    aiModel?: true;
    aiLatencyMs?: true;
    createdAt?: true;
};
export type StudyAttemptMaxAggregateInputType = {
    id?: true;
    exerciseId?: true;
    userId?: true;
    outcome?: true;
    aiScore?: true;
    aiFeedback?: true;
    aiVerdict?: true;
    aiModel?: true;
    aiLatencyMs?: true;
    createdAt?: true;
};
export type StudyAttemptCountAggregateInputType = {
    id?: true;
    exerciseId?: true;
    userId?: true;
    response?: true;
    outcome?: true;
    aiScore?: true;
    aiFeedback?: true;
    aiVerdict?: true;
    aiModel?: true;
    aiLatencyMs?: true;
    createdAt?: true;
    _all?: true;
};
export type StudyAttemptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StudyAttempt to aggregate.
     */
    where?: Prisma.StudyAttemptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StudyAttempts to fetch.
     */
    orderBy?: Prisma.StudyAttemptOrderByWithRelationInput | Prisma.StudyAttemptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StudyAttemptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StudyAttempts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StudyAttempts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned StudyAttempts
    **/
    _count?: true | StudyAttemptCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: StudyAttemptAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: StudyAttemptSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StudyAttemptMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StudyAttemptMaxAggregateInputType;
};
export type GetStudyAttemptAggregateType<T extends StudyAttemptAggregateArgs> = {
    [P in keyof T & keyof AggregateStudyAttempt]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStudyAttempt[P]> : Prisma.GetScalarType<T[P], AggregateStudyAttempt[P]>;
};
export type StudyAttemptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudyAttemptWhereInput;
    orderBy?: Prisma.StudyAttemptOrderByWithAggregationInput | Prisma.StudyAttemptOrderByWithAggregationInput[];
    by: Prisma.StudyAttemptScalarFieldEnum[] | Prisma.StudyAttemptScalarFieldEnum;
    having?: Prisma.StudyAttemptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StudyAttemptCountAggregateInputType | true;
    _avg?: StudyAttemptAvgAggregateInputType;
    _sum?: StudyAttemptSumAggregateInputType;
    _min?: StudyAttemptMinAggregateInputType;
    _max?: StudyAttemptMaxAggregateInputType;
};
export type StudyAttemptGroupByOutputType = {
    id: string;
    exerciseId: string;
    userId: string;
    response: runtime.JsonValue;
    outcome: $Enums.ReviewOutcome;
    aiScore: number | null;
    aiFeedback: string | null;
    aiVerdict: string | null;
    aiModel: string | null;
    aiLatencyMs: number | null;
    createdAt: Date;
    _count: StudyAttemptCountAggregateOutputType | null;
    _avg: StudyAttemptAvgAggregateOutputType | null;
    _sum: StudyAttemptSumAggregateOutputType | null;
    _min: StudyAttemptMinAggregateOutputType | null;
    _max: StudyAttemptMaxAggregateOutputType | null;
};
export type GetStudyAttemptGroupByPayload<T extends StudyAttemptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StudyAttemptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StudyAttemptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StudyAttemptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StudyAttemptGroupByOutputType[P]>;
}>>;
export type StudyAttemptWhereInput = {
    AND?: Prisma.StudyAttemptWhereInput | Prisma.StudyAttemptWhereInput[];
    OR?: Prisma.StudyAttemptWhereInput[];
    NOT?: Prisma.StudyAttemptWhereInput | Prisma.StudyAttemptWhereInput[];
    id?: Prisma.StringFilter<"StudyAttempt"> | string;
    exerciseId?: Prisma.StringFilter<"StudyAttempt"> | string;
    userId?: Prisma.StringFilter<"StudyAttempt"> | string;
    response?: Prisma.JsonFilter<"StudyAttempt">;
    outcome?: Prisma.EnumReviewOutcomeFilter<"StudyAttempt"> | $Enums.ReviewOutcome;
    aiScore?: Prisma.FloatNullableFilter<"StudyAttempt"> | number | null;
    aiFeedback?: Prisma.StringNullableFilter<"StudyAttempt"> | string | null;
    aiVerdict?: Prisma.StringNullableFilter<"StudyAttempt"> | string | null;
    aiModel?: Prisma.StringNullableFilter<"StudyAttempt"> | string | null;
    aiLatencyMs?: Prisma.IntNullableFilter<"StudyAttempt"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"StudyAttempt"> | Date | string;
    exercise?: Prisma.XOR<Prisma.StudyExerciseScalarRelationFilter, Prisma.StudyExerciseWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type StudyAttemptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    exerciseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    response?: Prisma.SortOrder;
    outcome?: Prisma.SortOrder;
    aiScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiFeedback?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiVerdict?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiModel?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiLatencyMs?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    exercise?: Prisma.StudyExerciseOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type StudyAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.StudyAttemptWhereInput | Prisma.StudyAttemptWhereInput[];
    OR?: Prisma.StudyAttemptWhereInput[];
    NOT?: Prisma.StudyAttemptWhereInput | Prisma.StudyAttemptWhereInput[];
    exerciseId?: Prisma.StringFilter<"StudyAttempt"> | string;
    userId?: Prisma.StringFilter<"StudyAttempt"> | string;
    response?: Prisma.JsonFilter<"StudyAttempt">;
    outcome?: Prisma.EnumReviewOutcomeFilter<"StudyAttempt"> | $Enums.ReviewOutcome;
    aiScore?: Prisma.FloatNullableFilter<"StudyAttempt"> | number | null;
    aiFeedback?: Prisma.StringNullableFilter<"StudyAttempt"> | string | null;
    aiVerdict?: Prisma.StringNullableFilter<"StudyAttempt"> | string | null;
    aiModel?: Prisma.StringNullableFilter<"StudyAttempt"> | string | null;
    aiLatencyMs?: Prisma.IntNullableFilter<"StudyAttempt"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"StudyAttempt"> | Date | string;
    exercise?: Prisma.XOR<Prisma.StudyExerciseScalarRelationFilter, Prisma.StudyExerciseWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type StudyAttemptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    exerciseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    response?: Prisma.SortOrder;
    outcome?: Prisma.SortOrder;
    aiScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiFeedback?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiVerdict?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiModel?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiLatencyMs?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.StudyAttemptCountOrderByAggregateInput;
    _avg?: Prisma.StudyAttemptAvgOrderByAggregateInput;
    _max?: Prisma.StudyAttemptMaxOrderByAggregateInput;
    _min?: Prisma.StudyAttemptMinOrderByAggregateInput;
    _sum?: Prisma.StudyAttemptSumOrderByAggregateInput;
};
export type StudyAttemptScalarWhereWithAggregatesInput = {
    AND?: Prisma.StudyAttemptScalarWhereWithAggregatesInput | Prisma.StudyAttemptScalarWhereWithAggregatesInput[];
    OR?: Prisma.StudyAttemptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StudyAttemptScalarWhereWithAggregatesInput | Prisma.StudyAttemptScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"StudyAttempt"> | string;
    exerciseId?: Prisma.StringWithAggregatesFilter<"StudyAttempt"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"StudyAttempt"> | string;
    response?: Prisma.JsonWithAggregatesFilter<"StudyAttempt">;
    outcome?: Prisma.EnumReviewOutcomeWithAggregatesFilter<"StudyAttempt"> | $Enums.ReviewOutcome;
    aiScore?: Prisma.FloatNullableWithAggregatesFilter<"StudyAttempt"> | number | null;
    aiFeedback?: Prisma.StringNullableWithAggregatesFilter<"StudyAttempt"> | string | null;
    aiVerdict?: Prisma.StringNullableWithAggregatesFilter<"StudyAttempt"> | string | null;
    aiModel?: Prisma.StringNullableWithAggregatesFilter<"StudyAttempt"> | string | null;
    aiLatencyMs?: Prisma.IntNullableWithAggregatesFilter<"StudyAttempt"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StudyAttempt"> | Date | string;
};
export type StudyAttemptCreateInput = {
    id?: string;
    response: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome: $Enums.ReviewOutcome;
    aiScore?: number | null;
    aiFeedback?: string | null;
    aiVerdict?: string | null;
    aiModel?: string | null;
    aiLatencyMs?: number | null;
    createdAt?: Date | string;
    exercise: Prisma.StudyExerciseCreateNestedOneWithoutAttemptsInput;
    user: Prisma.UserCreateNestedOneWithoutStudyAttemptsInput;
};
export type StudyAttemptUncheckedCreateInput = {
    id?: string;
    exerciseId: string;
    userId: string;
    response: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome: $Enums.ReviewOutcome;
    aiScore?: number | null;
    aiFeedback?: string | null;
    aiVerdict?: string | null;
    aiModel?: string | null;
    aiLatencyMs?: number | null;
    createdAt?: Date | string;
};
export type StudyAttemptUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    response?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome?: Prisma.EnumReviewOutcomeFieldUpdateOperationsInput | $Enums.ReviewOutcome;
    aiScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    aiFeedback?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiVerdict?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiLatencyMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exercise?: Prisma.StudyExerciseUpdateOneRequiredWithoutAttemptsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStudyAttemptsNestedInput;
};
export type StudyAttemptUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    exerciseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    response?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome?: Prisma.EnumReviewOutcomeFieldUpdateOperationsInput | $Enums.ReviewOutcome;
    aiScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    aiFeedback?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiVerdict?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiLatencyMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyAttemptCreateManyInput = {
    id?: string;
    exerciseId: string;
    userId: string;
    response: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome: $Enums.ReviewOutcome;
    aiScore?: number | null;
    aiFeedback?: string | null;
    aiVerdict?: string | null;
    aiModel?: string | null;
    aiLatencyMs?: number | null;
    createdAt?: Date | string;
};
export type StudyAttemptUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    response?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome?: Prisma.EnumReviewOutcomeFieldUpdateOperationsInput | $Enums.ReviewOutcome;
    aiScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    aiFeedback?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiVerdict?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiLatencyMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyAttemptUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    exerciseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    response?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome?: Prisma.EnumReviewOutcomeFieldUpdateOperationsInput | $Enums.ReviewOutcome;
    aiScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    aiFeedback?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiVerdict?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiLatencyMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyAttemptListRelationFilter = {
    every?: Prisma.StudyAttemptWhereInput;
    some?: Prisma.StudyAttemptWhereInput;
    none?: Prisma.StudyAttemptWhereInput;
};
export type StudyAttemptOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StudyAttemptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    exerciseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    response?: Prisma.SortOrder;
    outcome?: Prisma.SortOrder;
    aiScore?: Prisma.SortOrder;
    aiFeedback?: Prisma.SortOrder;
    aiVerdict?: Prisma.SortOrder;
    aiModel?: Prisma.SortOrder;
    aiLatencyMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StudyAttemptAvgOrderByAggregateInput = {
    aiScore?: Prisma.SortOrder;
    aiLatencyMs?: Prisma.SortOrder;
};
export type StudyAttemptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    exerciseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    outcome?: Prisma.SortOrder;
    aiScore?: Prisma.SortOrder;
    aiFeedback?: Prisma.SortOrder;
    aiVerdict?: Prisma.SortOrder;
    aiModel?: Prisma.SortOrder;
    aiLatencyMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StudyAttemptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    exerciseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    outcome?: Prisma.SortOrder;
    aiScore?: Prisma.SortOrder;
    aiFeedback?: Prisma.SortOrder;
    aiVerdict?: Prisma.SortOrder;
    aiModel?: Prisma.SortOrder;
    aiLatencyMs?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StudyAttemptSumOrderByAggregateInput = {
    aiScore?: Prisma.SortOrder;
    aiLatencyMs?: Prisma.SortOrder;
};
export type StudyAttemptCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudyAttemptCreateWithoutUserInput, Prisma.StudyAttemptUncheckedCreateWithoutUserInput> | Prisma.StudyAttemptCreateWithoutUserInput[] | Prisma.StudyAttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudyAttemptCreateOrConnectWithoutUserInput | Prisma.StudyAttemptCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StudyAttemptCreateManyUserInputEnvelope;
    connect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
};
export type StudyAttemptUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudyAttemptCreateWithoutUserInput, Prisma.StudyAttemptUncheckedCreateWithoutUserInput> | Prisma.StudyAttemptCreateWithoutUserInput[] | Prisma.StudyAttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudyAttemptCreateOrConnectWithoutUserInput | Prisma.StudyAttemptCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StudyAttemptCreateManyUserInputEnvelope;
    connect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
};
export type StudyAttemptUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudyAttemptCreateWithoutUserInput, Prisma.StudyAttemptUncheckedCreateWithoutUserInput> | Prisma.StudyAttemptCreateWithoutUserInput[] | Prisma.StudyAttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudyAttemptCreateOrConnectWithoutUserInput | Prisma.StudyAttemptCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StudyAttemptUpsertWithWhereUniqueWithoutUserInput | Prisma.StudyAttemptUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StudyAttemptCreateManyUserInputEnvelope;
    set?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    disconnect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    delete?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    connect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    update?: Prisma.StudyAttemptUpdateWithWhereUniqueWithoutUserInput | Prisma.StudyAttemptUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StudyAttemptUpdateManyWithWhereWithoutUserInput | Prisma.StudyAttemptUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StudyAttemptScalarWhereInput | Prisma.StudyAttemptScalarWhereInput[];
};
export type StudyAttemptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudyAttemptCreateWithoutUserInput, Prisma.StudyAttemptUncheckedCreateWithoutUserInput> | Prisma.StudyAttemptCreateWithoutUserInput[] | Prisma.StudyAttemptUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudyAttemptCreateOrConnectWithoutUserInput | Prisma.StudyAttemptCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StudyAttemptUpsertWithWhereUniqueWithoutUserInput | Prisma.StudyAttemptUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StudyAttemptCreateManyUserInputEnvelope;
    set?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    disconnect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    delete?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    connect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    update?: Prisma.StudyAttemptUpdateWithWhereUniqueWithoutUserInput | Prisma.StudyAttemptUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StudyAttemptUpdateManyWithWhereWithoutUserInput | Prisma.StudyAttemptUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StudyAttemptScalarWhereInput | Prisma.StudyAttemptScalarWhereInput[];
};
export type StudyAttemptCreateNestedManyWithoutExerciseInput = {
    create?: Prisma.XOR<Prisma.StudyAttemptCreateWithoutExerciseInput, Prisma.StudyAttemptUncheckedCreateWithoutExerciseInput> | Prisma.StudyAttemptCreateWithoutExerciseInput[] | Prisma.StudyAttemptUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?: Prisma.StudyAttemptCreateOrConnectWithoutExerciseInput | Prisma.StudyAttemptCreateOrConnectWithoutExerciseInput[];
    createMany?: Prisma.StudyAttemptCreateManyExerciseInputEnvelope;
    connect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
};
export type StudyAttemptUncheckedCreateNestedManyWithoutExerciseInput = {
    create?: Prisma.XOR<Prisma.StudyAttemptCreateWithoutExerciseInput, Prisma.StudyAttemptUncheckedCreateWithoutExerciseInput> | Prisma.StudyAttemptCreateWithoutExerciseInput[] | Prisma.StudyAttemptUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?: Prisma.StudyAttemptCreateOrConnectWithoutExerciseInput | Prisma.StudyAttemptCreateOrConnectWithoutExerciseInput[];
    createMany?: Prisma.StudyAttemptCreateManyExerciseInputEnvelope;
    connect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
};
export type StudyAttemptUpdateManyWithoutExerciseNestedInput = {
    create?: Prisma.XOR<Prisma.StudyAttemptCreateWithoutExerciseInput, Prisma.StudyAttemptUncheckedCreateWithoutExerciseInput> | Prisma.StudyAttemptCreateWithoutExerciseInput[] | Prisma.StudyAttemptUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?: Prisma.StudyAttemptCreateOrConnectWithoutExerciseInput | Prisma.StudyAttemptCreateOrConnectWithoutExerciseInput[];
    upsert?: Prisma.StudyAttemptUpsertWithWhereUniqueWithoutExerciseInput | Prisma.StudyAttemptUpsertWithWhereUniqueWithoutExerciseInput[];
    createMany?: Prisma.StudyAttemptCreateManyExerciseInputEnvelope;
    set?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    disconnect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    delete?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    connect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    update?: Prisma.StudyAttemptUpdateWithWhereUniqueWithoutExerciseInput | Prisma.StudyAttemptUpdateWithWhereUniqueWithoutExerciseInput[];
    updateMany?: Prisma.StudyAttemptUpdateManyWithWhereWithoutExerciseInput | Prisma.StudyAttemptUpdateManyWithWhereWithoutExerciseInput[];
    deleteMany?: Prisma.StudyAttemptScalarWhereInput | Prisma.StudyAttemptScalarWhereInput[];
};
export type StudyAttemptUncheckedUpdateManyWithoutExerciseNestedInput = {
    create?: Prisma.XOR<Prisma.StudyAttemptCreateWithoutExerciseInput, Prisma.StudyAttemptUncheckedCreateWithoutExerciseInput> | Prisma.StudyAttemptCreateWithoutExerciseInput[] | Prisma.StudyAttemptUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?: Prisma.StudyAttemptCreateOrConnectWithoutExerciseInput | Prisma.StudyAttemptCreateOrConnectWithoutExerciseInput[];
    upsert?: Prisma.StudyAttemptUpsertWithWhereUniqueWithoutExerciseInput | Prisma.StudyAttemptUpsertWithWhereUniqueWithoutExerciseInput[];
    createMany?: Prisma.StudyAttemptCreateManyExerciseInputEnvelope;
    set?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    disconnect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    delete?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    connect?: Prisma.StudyAttemptWhereUniqueInput | Prisma.StudyAttemptWhereUniqueInput[];
    update?: Prisma.StudyAttemptUpdateWithWhereUniqueWithoutExerciseInput | Prisma.StudyAttemptUpdateWithWhereUniqueWithoutExerciseInput[];
    updateMany?: Prisma.StudyAttemptUpdateManyWithWhereWithoutExerciseInput | Prisma.StudyAttemptUpdateManyWithWhereWithoutExerciseInput[];
    deleteMany?: Prisma.StudyAttemptScalarWhereInput | Prisma.StudyAttemptScalarWhereInput[];
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type StudyAttemptCreateWithoutUserInput = {
    id?: string;
    response: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome: $Enums.ReviewOutcome;
    aiScore?: number | null;
    aiFeedback?: string | null;
    aiVerdict?: string | null;
    aiModel?: string | null;
    aiLatencyMs?: number | null;
    createdAt?: Date | string;
    exercise: Prisma.StudyExerciseCreateNestedOneWithoutAttemptsInput;
};
export type StudyAttemptUncheckedCreateWithoutUserInput = {
    id?: string;
    exerciseId: string;
    response: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome: $Enums.ReviewOutcome;
    aiScore?: number | null;
    aiFeedback?: string | null;
    aiVerdict?: string | null;
    aiModel?: string | null;
    aiLatencyMs?: number | null;
    createdAt?: Date | string;
};
export type StudyAttemptCreateOrConnectWithoutUserInput = {
    where: Prisma.StudyAttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudyAttemptCreateWithoutUserInput, Prisma.StudyAttemptUncheckedCreateWithoutUserInput>;
};
export type StudyAttemptCreateManyUserInputEnvelope = {
    data: Prisma.StudyAttemptCreateManyUserInput | Prisma.StudyAttemptCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type StudyAttemptUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.StudyAttemptWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudyAttemptUpdateWithoutUserInput, Prisma.StudyAttemptUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StudyAttemptCreateWithoutUserInput, Prisma.StudyAttemptUncheckedCreateWithoutUserInput>;
};
export type StudyAttemptUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.StudyAttemptWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudyAttemptUpdateWithoutUserInput, Prisma.StudyAttemptUncheckedUpdateWithoutUserInput>;
};
export type StudyAttemptUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.StudyAttemptScalarWhereInput;
    data: Prisma.XOR<Prisma.StudyAttemptUpdateManyMutationInput, Prisma.StudyAttemptUncheckedUpdateManyWithoutUserInput>;
};
export type StudyAttemptScalarWhereInput = {
    AND?: Prisma.StudyAttemptScalarWhereInput | Prisma.StudyAttemptScalarWhereInput[];
    OR?: Prisma.StudyAttemptScalarWhereInput[];
    NOT?: Prisma.StudyAttemptScalarWhereInput | Prisma.StudyAttemptScalarWhereInput[];
    id?: Prisma.StringFilter<"StudyAttempt"> | string;
    exerciseId?: Prisma.StringFilter<"StudyAttempt"> | string;
    userId?: Prisma.StringFilter<"StudyAttempt"> | string;
    response?: Prisma.JsonFilter<"StudyAttempt">;
    outcome?: Prisma.EnumReviewOutcomeFilter<"StudyAttempt"> | $Enums.ReviewOutcome;
    aiScore?: Prisma.FloatNullableFilter<"StudyAttempt"> | number | null;
    aiFeedback?: Prisma.StringNullableFilter<"StudyAttempt"> | string | null;
    aiVerdict?: Prisma.StringNullableFilter<"StudyAttempt"> | string | null;
    aiModel?: Prisma.StringNullableFilter<"StudyAttempt"> | string | null;
    aiLatencyMs?: Prisma.IntNullableFilter<"StudyAttempt"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"StudyAttempt"> | Date | string;
};
export type StudyAttemptCreateWithoutExerciseInput = {
    id?: string;
    response: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome: $Enums.ReviewOutcome;
    aiScore?: number | null;
    aiFeedback?: string | null;
    aiVerdict?: string | null;
    aiModel?: string | null;
    aiLatencyMs?: number | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStudyAttemptsInput;
};
export type StudyAttemptUncheckedCreateWithoutExerciseInput = {
    id?: string;
    userId: string;
    response: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome: $Enums.ReviewOutcome;
    aiScore?: number | null;
    aiFeedback?: string | null;
    aiVerdict?: string | null;
    aiModel?: string | null;
    aiLatencyMs?: number | null;
    createdAt?: Date | string;
};
export type StudyAttemptCreateOrConnectWithoutExerciseInput = {
    where: Prisma.StudyAttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudyAttemptCreateWithoutExerciseInput, Prisma.StudyAttemptUncheckedCreateWithoutExerciseInput>;
};
export type StudyAttemptCreateManyExerciseInputEnvelope = {
    data: Prisma.StudyAttemptCreateManyExerciseInput | Prisma.StudyAttemptCreateManyExerciseInput[];
    skipDuplicates?: boolean;
};
export type StudyAttemptUpsertWithWhereUniqueWithoutExerciseInput = {
    where: Prisma.StudyAttemptWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudyAttemptUpdateWithoutExerciseInput, Prisma.StudyAttemptUncheckedUpdateWithoutExerciseInput>;
    create: Prisma.XOR<Prisma.StudyAttemptCreateWithoutExerciseInput, Prisma.StudyAttemptUncheckedCreateWithoutExerciseInput>;
};
export type StudyAttemptUpdateWithWhereUniqueWithoutExerciseInput = {
    where: Prisma.StudyAttemptWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudyAttemptUpdateWithoutExerciseInput, Prisma.StudyAttemptUncheckedUpdateWithoutExerciseInput>;
};
export type StudyAttemptUpdateManyWithWhereWithoutExerciseInput = {
    where: Prisma.StudyAttemptScalarWhereInput;
    data: Prisma.XOR<Prisma.StudyAttemptUpdateManyMutationInput, Prisma.StudyAttemptUncheckedUpdateManyWithoutExerciseInput>;
};
export type StudyAttemptCreateManyUserInput = {
    id?: string;
    exerciseId: string;
    response: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome: $Enums.ReviewOutcome;
    aiScore?: number | null;
    aiFeedback?: string | null;
    aiVerdict?: string | null;
    aiModel?: string | null;
    aiLatencyMs?: number | null;
    createdAt?: Date | string;
};
export type StudyAttemptUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    response?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome?: Prisma.EnumReviewOutcomeFieldUpdateOperationsInput | $Enums.ReviewOutcome;
    aiScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    aiFeedback?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiVerdict?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiLatencyMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    exercise?: Prisma.StudyExerciseUpdateOneRequiredWithoutAttemptsNestedInput;
};
export type StudyAttemptUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    exerciseId?: Prisma.StringFieldUpdateOperationsInput | string;
    response?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome?: Prisma.EnumReviewOutcomeFieldUpdateOperationsInput | $Enums.ReviewOutcome;
    aiScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    aiFeedback?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiVerdict?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiLatencyMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyAttemptUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    exerciseId?: Prisma.StringFieldUpdateOperationsInput | string;
    response?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome?: Prisma.EnumReviewOutcomeFieldUpdateOperationsInput | $Enums.ReviewOutcome;
    aiScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    aiFeedback?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiVerdict?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiLatencyMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyAttemptCreateManyExerciseInput = {
    id?: string;
    userId: string;
    response: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome: $Enums.ReviewOutcome;
    aiScore?: number | null;
    aiFeedback?: string | null;
    aiVerdict?: string | null;
    aiModel?: string | null;
    aiLatencyMs?: number | null;
    createdAt?: Date | string;
};
export type StudyAttemptUpdateWithoutExerciseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    response?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome?: Prisma.EnumReviewOutcomeFieldUpdateOperationsInput | $Enums.ReviewOutcome;
    aiScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    aiFeedback?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiVerdict?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiLatencyMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudyAttemptsNestedInput;
};
export type StudyAttemptUncheckedUpdateWithoutExerciseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    response?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome?: Prisma.EnumReviewOutcomeFieldUpdateOperationsInput | $Enums.ReviewOutcome;
    aiScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    aiFeedback?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiVerdict?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiLatencyMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyAttemptUncheckedUpdateManyWithoutExerciseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    response?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    outcome?: Prisma.EnumReviewOutcomeFieldUpdateOperationsInput | $Enums.ReviewOutcome;
    aiScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    aiFeedback?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiVerdict?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiLatencyMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyAttemptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    exerciseId?: boolean;
    userId?: boolean;
    response?: boolean;
    outcome?: boolean;
    aiScore?: boolean;
    aiFeedback?: boolean;
    aiVerdict?: boolean;
    aiModel?: boolean;
    aiLatencyMs?: boolean;
    createdAt?: boolean;
    exercise?: boolean | Prisma.StudyExerciseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studyAttempt"]>;
export type StudyAttemptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    exerciseId?: boolean;
    userId?: boolean;
    response?: boolean;
    outcome?: boolean;
    aiScore?: boolean;
    aiFeedback?: boolean;
    aiVerdict?: boolean;
    aiModel?: boolean;
    aiLatencyMs?: boolean;
    createdAt?: boolean;
    exercise?: boolean | Prisma.StudyExerciseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studyAttempt"]>;
export type StudyAttemptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    exerciseId?: boolean;
    userId?: boolean;
    response?: boolean;
    outcome?: boolean;
    aiScore?: boolean;
    aiFeedback?: boolean;
    aiVerdict?: boolean;
    aiModel?: boolean;
    aiLatencyMs?: boolean;
    createdAt?: boolean;
    exercise?: boolean | Prisma.StudyExerciseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studyAttempt"]>;
export type StudyAttemptSelectScalar = {
    id?: boolean;
    exerciseId?: boolean;
    userId?: boolean;
    response?: boolean;
    outcome?: boolean;
    aiScore?: boolean;
    aiFeedback?: boolean;
    aiVerdict?: boolean;
    aiModel?: boolean;
    aiLatencyMs?: boolean;
    createdAt?: boolean;
};
export type StudyAttemptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "exerciseId" | "userId" | "response" | "outcome" | "aiScore" | "aiFeedback" | "aiVerdict" | "aiModel" | "aiLatencyMs" | "createdAt", ExtArgs["result"]["studyAttempt"]>;
export type StudyAttemptInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    exercise?: boolean | Prisma.StudyExerciseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StudyAttemptIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    exercise?: boolean | Prisma.StudyExerciseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StudyAttemptIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    exercise?: boolean | Prisma.StudyExerciseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $StudyAttemptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StudyAttempt";
    objects: {
        exercise: Prisma.$StudyExercisePayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        exerciseId: string;
        userId: string;
        response: runtime.JsonValue;
        outcome: $Enums.ReviewOutcome;
        aiScore: number | null;
        aiFeedback: string | null;
        aiVerdict: string | null;
        aiModel: string | null;
        aiLatencyMs: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["studyAttempt"]>;
    composites: {};
};
export type StudyAttemptGetPayload<S extends boolean | null | undefined | StudyAttemptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload, S>;
export type StudyAttemptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StudyAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StudyAttemptCountAggregateInputType | true;
};
export interface StudyAttemptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StudyAttempt'];
        meta: {
            name: 'StudyAttempt';
        };
    };
    /**
     * Find zero or one StudyAttempt that matches the filter.
     * @param {StudyAttemptFindUniqueArgs} args - Arguments to find a StudyAttempt
     * @example
     * // Get one StudyAttempt
     * const studyAttempt = await prisma.studyAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudyAttemptFindUniqueArgs>(args: Prisma.SelectSubset<T, StudyAttemptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StudyAttemptClient<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one StudyAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudyAttemptFindUniqueOrThrowArgs} args - Arguments to find a StudyAttempt
     * @example
     * // Get one StudyAttempt
     * const studyAttempt = await prisma.studyAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudyAttemptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StudyAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudyAttemptClient<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StudyAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyAttemptFindFirstArgs} args - Arguments to find a StudyAttempt
     * @example
     * // Get one StudyAttempt
     * const studyAttempt = await prisma.studyAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudyAttemptFindFirstArgs>(args?: Prisma.SelectSubset<T, StudyAttemptFindFirstArgs<ExtArgs>>): Prisma.Prisma__StudyAttemptClient<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StudyAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyAttemptFindFirstOrThrowArgs} args - Arguments to find a StudyAttempt
     * @example
     * // Get one StudyAttempt
     * const studyAttempt = await prisma.studyAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudyAttemptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StudyAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudyAttemptClient<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more StudyAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudyAttempts
     * const studyAttempts = await prisma.studyAttempt.findMany()
     *
     * // Get first 10 StudyAttempts
     * const studyAttempts = await prisma.studyAttempt.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const studyAttemptWithIdOnly = await prisma.studyAttempt.findMany({ select: { id: true } })
     *
     */
    findMany<T extends StudyAttemptFindManyArgs>(args?: Prisma.SelectSubset<T, StudyAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a StudyAttempt.
     * @param {StudyAttemptCreateArgs} args - Arguments to create a StudyAttempt.
     * @example
     * // Create one StudyAttempt
     * const StudyAttempt = await prisma.studyAttempt.create({
     *   data: {
     *     // ... data to create a StudyAttempt
     *   }
     * })
     *
     */
    create<T extends StudyAttemptCreateArgs>(args: Prisma.SelectSubset<T, StudyAttemptCreateArgs<ExtArgs>>): Prisma.Prisma__StudyAttemptClient<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many StudyAttempts.
     * @param {StudyAttemptCreateManyArgs} args - Arguments to create many StudyAttempts.
     * @example
     * // Create many StudyAttempts
     * const studyAttempt = await prisma.studyAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StudyAttemptCreateManyArgs>(args?: Prisma.SelectSubset<T, StudyAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many StudyAttempts and returns the data saved in the database.
     * @param {StudyAttemptCreateManyAndReturnArgs} args - Arguments to create many StudyAttempts.
     * @example
     * // Create many StudyAttempts
     * const studyAttempt = await prisma.studyAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many StudyAttempts and only return the `id`
     * const studyAttemptWithIdOnly = await prisma.studyAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StudyAttemptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StudyAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a StudyAttempt.
     * @param {StudyAttemptDeleteArgs} args - Arguments to delete one StudyAttempt.
     * @example
     * // Delete one StudyAttempt
     * const StudyAttempt = await prisma.studyAttempt.delete({
     *   where: {
     *     // ... filter to delete one StudyAttempt
     *   }
     * })
     *
     */
    delete<T extends StudyAttemptDeleteArgs>(args: Prisma.SelectSubset<T, StudyAttemptDeleteArgs<ExtArgs>>): Prisma.Prisma__StudyAttemptClient<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one StudyAttempt.
     * @param {StudyAttemptUpdateArgs} args - Arguments to update one StudyAttempt.
     * @example
     * // Update one StudyAttempt
     * const studyAttempt = await prisma.studyAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StudyAttemptUpdateArgs>(args: Prisma.SelectSubset<T, StudyAttemptUpdateArgs<ExtArgs>>): Prisma.Prisma__StudyAttemptClient<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more StudyAttempts.
     * @param {StudyAttemptDeleteManyArgs} args - Arguments to filter StudyAttempts to delete.
     * @example
     * // Delete a few StudyAttempts
     * const { count } = await prisma.studyAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StudyAttemptDeleteManyArgs>(args?: Prisma.SelectSubset<T, StudyAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StudyAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudyAttempts
     * const studyAttempt = await prisma.studyAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StudyAttemptUpdateManyArgs>(args: Prisma.SelectSubset<T, StudyAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StudyAttempts and returns the data updated in the database.
     * @param {StudyAttemptUpdateManyAndReturnArgs} args - Arguments to update many StudyAttempts.
     * @example
     * // Update many StudyAttempts
     * const studyAttempt = await prisma.studyAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more StudyAttempts and only return the `id`
     * const studyAttemptWithIdOnly = await prisma.studyAttempt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends StudyAttemptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StudyAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one StudyAttempt.
     * @param {StudyAttemptUpsertArgs} args - Arguments to update or create a StudyAttempt.
     * @example
     * // Update or create a StudyAttempt
     * const studyAttempt = await prisma.studyAttempt.upsert({
     *   create: {
     *     // ... data to create a StudyAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudyAttempt we want to update
     *   }
     * })
     */
    upsert<T extends StudyAttemptUpsertArgs>(args: Prisma.SelectSubset<T, StudyAttemptUpsertArgs<ExtArgs>>): Prisma.Prisma__StudyAttemptClient<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of StudyAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyAttemptCountArgs} args - Arguments to filter StudyAttempts to count.
     * @example
     * // Count the number of StudyAttempts
     * const count = await prisma.studyAttempt.count({
     *   where: {
     *     // ... the filter for the StudyAttempts we want to count
     *   }
     * })
    **/
    count<T extends StudyAttemptCountArgs>(args?: Prisma.Subset<T, StudyAttemptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StudyAttemptCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a StudyAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudyAttemptAggregateArgs>(args: Prisma.Subset<T, StudyAttemptAggregateArgs>): Prisma.PrismaPromise<GetStudyAttemptAggregateType<T>>;
    /**
     * Group by StudyAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends StudyAttemptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StudyAttemptGroupByArgs['orderBy'];
    } : {
        orderBy?: StudyAttemptGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StudyAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudyAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the StudyAttempt model
     */
    readonly fields: StudyAttemptFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for StudyAttempt.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StudyAttemptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    exercise<T extends Prisma.StudyExerciseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudyExerciseDefaultArgs<ExtArgs>>): Prisma.Prisma__StudyExerciseClient<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the StudyAttempt model
 */
export interface StudyAttemptFieldRefs {
    readonly id: Prisma.FieldRef<"StudyAttempt", 'String'>;
    readonly exerciseId: Prisma.FieldRef<"StudyAttempt", 'String'>;
    readonly userId: Prisma.FieldRef<"StudyAttempt", 'String'>;
    readonly response: Prisma.FieldRef<"StudyAttempt", 'Json'>;
    readonly outcome: Prisma.FieldRef<"StudyAttempt", 'ReviewOutcome'>;
    readonly aiScore: Prisma.FieldRef<"StudyAttempt", 'Float'>;
    readonly aiFeedback: Prisma.FieldRef<"StudyAttempt", 'String'>;
    readonly aiVerdict: Prisma.FieldRef<"StudyAttempt", 'String'>;
    readonly aiModel: Prisma.FieldRef<"StudyAttempt", 'String'>;
    readonly aiLatencyMs: Prisma.FieldRef<"StudyAttempt", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"StudyAttempt", 'DateTime'>;
}
/**
 * StudyAttempt findUnique
 */
export type StudyAttemptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptInclude<ExtArgs> | null;
    /**
     * Filter, which StudyAttempt to fetch.
     */
    where: Prisma.StudyAttemptWhereUniqueInput;
};
/**
 * StudyAttempt findUniqueOrThrow
 */
export type StudyAttemptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptInclude<ExtArgs> | null;
    /**
     * Filter, which StudyAttempt to fetch.
     */
    where: Prisma.StudyAttemptWhereUniqueInput;
};
/**
 * StudyAttempt findFirst
 */
export type StudyAttemptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptInclude<ExtArgs> | null;
    /**
     * Filter, which StudyAttempt to fetch.
     */
    where?: Prisma.StudyAttemptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StudyAttempts to fetch.
     */
    orderBy?: Prisma.StudyAttemptOrderByWithRelationInput | Prisma.StudyAttemptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StudyAttempts.
     */
    cursor?: Prisma.StudyAttemptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StudyAttempts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StudyAttempts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StudyAttempts.
     */
    distinct?: Prisma.StudyAttemptScalarFieldEnum | Prisma.StudyAttemptScalarFieldEnum[];
};
/**
 * StudyAttempt findFirstOrThrow
 */
export type StudyAttemptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptInclude<ExtArgs> | null;
    /**
     * Filter, which StudyAttempt to fetch.
     */
    where?: Prisma.StudyAttemptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StudyAttempts to fetch.
     */
    orderBy?: Prisma.StudyAttemptOrderByWithRelationInput | Prisma.StudyAttemptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StudyAttempts.
     */
    cursor?: Prisma.StudyAttemptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StudyAttempts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StudyAttempts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StudyAttempts.
     */
    distinct?: Prisma.StudyAttemptScalarFieldEnum | Prisma.StudyAttemptScalarFieldEnum[];
};
/**
 * StudyAttempt findMany
 */
export type StudyAttemptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptInclude<ExtArgs> | null;
    /**
     * Filter, which StudyAttempts to fetch.
     */
    where?: Prisma.StudyAttemptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StudyAttempts to fetch.
     */
    orderBy?: Prisma.StudyAttemptOrderByWithRelationInput | Prisma.StudyAttemptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing StudyAttempts.
     */
    cursor?: Prisma.StudyAttemptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StudyAttempts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StudyAttempts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StudyAttempts.
     */
    distinct?: Prisma.StudyAttemptScalarFieldEnum | Prisma.StudyAttemptScalarFieldEnum[];
};
/**
 * StudyAttempt create
 */
export type StudyAttemptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptInclude<ExtArgs> | null;
    /**
     * The data needed to create a StudyAttempt.
     */
    data: Prisma.XOR<Prisma.StudyAttemptCreateInput, Prisma.StudyAttemptUncheckedCreateInput>;
};
/**
 * StudyAttempt createMany
 */
export type StudyAttemptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudyAttempts.
     */
    data: Prisma.StudyAttemptCreateManyInput | Prisma.StudyAttemptCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * StudyAttempt createManyAndReturn
 */
export type StudyAttemptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * The data used to create many StudyAttempts.
     */
    data: Prisma.StudyAttemptCreateManyInput | Prisma.StudyAttemptCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * StudyAttempt update
 */
export type StudyAttemptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptInclude<ExtArgs> | null;
    /**
     * The data needed to update a StudyAttempt.
     */
    data: Prisma.XOR<Prisma.StudyAttemptUpdateInput, Prisma.StudyAttemptUncheckedUpdateInput>;
    /**
     * Choose, which StudyAttempt to update.
     */
    where: Prisma.StudyAttemptWhereUniqueInput;
};
/**
 * StudyAttempt updateMany
 */
export type StudyAttemptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update StudyAttempts.
     */
    data: Prisma.XOR<Prisma.StudyAttemptUpdateManyMutationInput, Prisma.StudyAttemptUncheckedUpdateManyInput>;
    /**
     * Filter which StudyAttempts to update
     */
    where?: Prisma.StudyAttemptWhereInput;
    /**
     * Limit how many StudyAttempts to update.
     */
    limit?: number;
};
/**
 * StudyAttempt updateManyAndReturn
 */
export type StudyAttemptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * The data used to update StudyAttempts.
     */
    data: Prisma.XOR<Prisma.StudyAttemptUpdateManyMutationInput, Prisma.StudyAttemptUncheckedUpdateManyInput>;
    /**
     * Filter which StudyAttempts to update
     */
    where?: Prisma.StudyAttemptWhereInput;
    /**
     * Limit how many StudyAttempts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * StudyAttempt upsert
 */
export type StudyAttemptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptInclude<ExtArgs> | null;
    /**
     * The filter to search for the StudyAttempt to update in case it exists.
     */
    where: Prisma.StudyAttemptWhereUniqueInput;
    /**
     * In case the StudyAttempt found by the `where` argument doesn't exist, create a new StudyAttempt with this data.
     */
    create: Prisma.XOR<Prisma.StudyAttemptCreateInput, Prisma.StudyAttemptUncheckedCreateInput>;
    /**
     * In case the StudyAttempt was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StudyAttemptUpdateInput, Prisma.StudyAttemptUncheckedUpdateInput>;
};
/**
 * StudyAttempt delete
 */
export type StudyAttemptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptInclude<ExtArgs> | null;
    /**
     * Filter which StudyAttempt to delete.
     */
    where: Prisma.StudyAttemptWhereUniqueInput;
};
/**
 * StudyAttempt deleteMany
 */
export type StudyAttemptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StudyAttempts to delete
     */
    where?: Prisma.StudyAttemptWhereInput;
    /**
     * Limit how many StudyAttempts to delete.
     */
    limit?: number;
};
/**
 * StudyAttempt without action
 */
export type StudyAttemptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyAttempt
     */
    select?: Prisma.StudyAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyAttempt
     */
    omit?: Prisma.StudyAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyAttemptInclude<ExtArgs> | null;
};
//# sourceMappingURL=StudyAttempt.d.ts.map