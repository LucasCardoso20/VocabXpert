import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model StudyExercise
 *
 */
export type StudyExerciseModel = runtime.Types.Result.DefaultSelection<Prisma.$StudyExercisePayload>;
export type AggregateStudyExercise = {
    _count: StudyExerciseCountAggregateOutputType | null;
    _min: StudyExerciseMinAggregateOutputType | null;
    _max: StudyExerciseMaxAggregateOutputType | null;
};
export type StudyExerciseMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    userId: string | null;
    vocabId: string | null;
    type: $Enums.ExerciseType | null;
    createdAt: Date | null;
};
export type StudyExerciseMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    userId: string | null;
    vocabId: string | null;
    type: $Enums.ExerciseType | null;
    createdAt: Date | null;
};
export type StudyExerciseCountAggregateOutputType = {
    id: number;
    sessionId: number;
    userId: number;
    vocabId: number;
    type: number;
    payload: number;
    createdAt: number;
    _all: number;
};
export type StudyExerciseMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    vocabId?: true;
    type?: true;
    createdAt?: true;
};
export type StudyExerciseMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    vocabId?: true;
    type?: true;
    createdAt?: true;
};
export type StudyExerciseCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    vocabId?: true;
    type?: true;
    payload?: true;
    createdAt?: true;
    _all?: true;
};
export type StudyExerciseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StudyExercise to aggregate.
     */
    where?: Prisma.StudyExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StudyExercises to fetch.
     */
    orderBy?: Prisma.StudyExerciseOrderByWithRelationInput | Prisma.StudyExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StudyExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StudyExercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StudyExercises.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned StudyExercises
    **/
    _count?: true | StudyExerciseCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StudyExerciseMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StudyExerciseMaxAggregateInputType;
};
export type GetStudyExerciseAggregateType<T extends StudyExerciseAggregateArgs> = {
    [P in keyof T & keyof AggregateStudyExercise]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStudyExercise[P]> : Prisma.GetScalarType<T[P], AggregateStudyExercise[P]>;
};
export type StudyExerciseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudyExerciseWhereInput;
    orderBy?: Prisma.StudyExerciseOrderByWithAggregationInput | Prisma.StudyExerciseOrderByWithAggregationInput[];
    by: Prisma.StudyExerciseScalarFieldEnum[] | Prisma.StudyExerciseScalarFieldEnum;
    having?: Prisma.StudyExerciseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StudyExerciseCountAggregateInputType | true;
    _min?: StudyExerciseMinAggregateInputType;
    _max?: StudyExerciseMaxAggregateInputType;
};
export type StudyExerciseGroupByOutputType = {
    id: string;
    sessionId: string;
    userId: string;
    vocabId: string;
    type: $Enums.ExerciseType;
    payload: runtime.JsonValue;
    createdAt: Date;
    _count: StudyExerciseCountAggregateOutputType | null;
    _min: StudyExerciseMinAggregateOutputType | null;
    _max: StudyExerciseMaxAggregateOutputType | null;
};
export type GetStudyExerciseGroupByPayload<T extends StudyExerciseGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StudyExerciseGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StudyExerciseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StudyExerciseGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StudyExerciseGroupByOutputType[P]>;
}>>;
export type StudyExerciseWhereInput = {
    AND?: Prisma.StudyExerciseWhereInput | Prisma.StudyExerciseWhereInput[];
    OR?: Prisma.StudyExerciseWhereInput[];
    NOT?: Prisma.StudyExerciseWhereInput | Prisma.StudyExerciseWhereInput[];
    id?: Prisma.StringFilter<"StudyExercise"> | string;
    sessionId?: Prisma.StringFilter<"StudyExercise"> | string;
    userId?: Prisma.StringFilter<"StudyExercise"> | string;
    vocabId?: Prisma.StringFilter<"StudyExercise"> | string;
    type?: Prisma.EnumExerciseTypeFilter<"StudyExercise"> | $Enums.ExerciseType;
    payload?: Prisma.JsonFilter<"StudyExercise">;
    createdAt?: Prisma.DateTimeFilter<"StudyExercise"> | Date | string;
    session?: Prisma.XOR<Prisma.StudySessionScalarRelationFilter, Prisma.StudySessionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    vocab?: Prisma.XOR<Prisma.VocabScalarRelationFilter, Prisma.VocabWhereInput>;
    attempts?: Prisma.StudyAttemptListRelationFilter;
};
export type StudyExerciseOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vocabId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    session?: Prisma.StudySessionOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    vocab?: Prisma.VocabOrderByWithRelationInput;
    attempts?: Prisma.StudyAttemptOrderByRelationAggregateInput;
};
export type StudyExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.StudyExerciseWhereInput | Prisma.StudyExerciseWhereInput[];
    OR?: Prisma.StudyExerciseWhereInput[];
    NOT?: Prisma.StudyExerciseWhereInput | Prisma.StudyExerciseWhereInput[];
    sessionId?: Prisma.StringFilter<"StudyExercise"> | string;
    userId?: Prisma.StringFilter<"StudyExercise"> | string;
    vocabId?: Prisma.StringFilter<"StudyExercise"> | string;
    type?: Prisma.EnumExerciseTypeFilter<"StudyExercise"> | $Enums.ExerciseType;
    payload?: Prisma.JsonFilter<"StudyExercise">;
    createdAt?: Prisma.DateTimeFilter<"StudyExercise"> | Date | string;
    session?: Prisma.XOR<Prisma.StudySessionScalarRelationFilter, Prisma.StudySessionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    vocab?: Prisma.XOR<Prisma.VocabScalarRelationFilter, Prisma.VocabWhereInput>;
    attempts?: Prisma.StudyAttemptListRelationFilter;
}, "id">;
export type StudyExerciseOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vocabId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.StudyExerciseCountOrderByAggregateInput;
    _max?: Prisma.StudyExerciseMaxOrderByAggregateInput;
    _min?: Prisma.StudyExerciseMinOrderByAggregateInput;
};
export type StudyExerciseScalarWhereWithAggregatesInput = {
    AND?: Prisma.StudyExerciseScalarWhereWithAggregatesInput | Prisma.StudyExerciseScalarWhereWithAggregatesInput[];
    OR?: Prisma.StudyExerciseScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StudyExerciseScalarWhereWithAggregatesInput | Prisma.StudyExerciseScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"StudyExercise"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"StudyExercise"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"StudyExercise"> | string;
    vocabId?: Prisma.StringWithAggregatesFilter<"StudyExercise"> | string;
    type?: Prisma.EnumExerciseTypeWithAggregatesFilter<"StudyExercise"> | $Enums.ExerciseType;
    payload?: Prisma.JsonWithAggregatesFilter<"StudyExercise">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StudyExercise"> | Date | string;
};
export type StudyExerciseCreateInput = {
    id?: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    session: Prisma.StudySessionCreateNestedOneWithoutExercisesInput;
    user: Prisma.UserCreateNestedOneWithoutStudyExercisesInput;
    vocab: Prisma.VocabCreateNestedOneWithoutStudyExercisesInput;
    attempts?: Prisma.StudyAttemptCreateNestedManyWithoutExerciseInput;
};
export type StudyExerciseUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    userId: string;
    vocabId: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    attempts?: Prisma.StudyAttemptUncheckedCreateNestedManyWithoutExerciseInput;
};
export type StudyExerciseUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.StudySessionUpdateOneRequiredWithoutExercisesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStudyExercisesNestedInput;
    vocab?: Prisma.VocabUpdateOneRequiredWithoutStudyExercisesNestedInput;
    attempts?: Prisma.StudyAttemptUpdateManyWithoutExerciseNestedInput;
};
export type StudyExerciseUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    vocabId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.StudyAttemptUncheckedUpdateManyWithoutExerciseNestedInput;
};
export type StudyExerciseCreateManyInput = {
    id?: string;
    sessionId: string;
    userId: string;
    vocabId: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type StudyExerciseUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyExerciseUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    vocabId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyExerciseListRelationFilter = {
    every?: Prisma.StudyExerciseWhereInput;
    some?: Prisma.StudyExerciseWhereInput;
    none?: Prisma.StudyExerciseWhereInput;
};
export type StudyExerciseOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StudyExerciseCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vocabId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StudyExerciseMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vocabId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StudyExerciseMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vocabId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StudyExerciseScalarRelationFilter = {
    is?: Prisma.StudyExerciseWhereInput;
    isNot?: Prisma.StudyExerciseWhereInput;
};
export type StudyExerciseCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutUserInput, Prisma.StudyExerciseUncheckedCreateWithoutUserInput> | Prisma.StudyExerciseCreateWithoutUserInput[] | Prisma.StudyExerciseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutUserInput | Prisma.StudyExerciseCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StudyExerciseCreateManyUserInputEnvelope;
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
};
export type StudyExerciseUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutUserInput, Prisma.StudyExerciseUncheckedCreateWithoutUserInput> | Prisma.StudyExerciseCreateWithoutUserInput[] | Prisma.StudyExerciseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutUserInput | Prisma.StudyExerciseCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StudyExerciseCreateManyUserInputEnvelope;
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
};
export type StudyExerciseUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutUserInput, Prisma.StudyExerciseUncheckedCreateWithoutUserInput> | Prisma.StudyExerciseCreateWithoutUserInput[] | Prisma.StudyExerciseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutUserInput | Prisma.StudyExerciseCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StudyExerciseUpsertWithWhereUniqueWithoutUserInput | Prisma.StudyExerciseUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StudyExerciseCreateManyUserInputEnvelope;
    set?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    disconnect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    delete?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    update?: Prisma.StudyExerciseUpdateWithWhereUniqueWithoutUserInput | Prisma.StudyExerciseUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StudyExerciseUpdateManyWithWhereWithoutUserInput | Prisma.StudyExerciseUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StudyExerciseScalarWhereInput | Prisma.StudyExerciseScalarWhereInput[];
};
export type StudyExerciseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutUserInput, Prisma.StudyExerciseUncheckedCreateWithoutUserInput> | Prisma.StudyExerciseCreateWithoutUserInput[] | Prisma.StudyExerciseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutUserInput | Prisma.StudyExerciseCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StudyExerciseUpsertWithWhereUniqueWithoutUserInput | Prisma.StudyExerciseUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StudyExerciseCreateManyUserInputEnvelope;
    set?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    disconnect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    delete?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    update?: Prisma.StudyExerciseUpdateWithWhereUniqueWithoutUserInput | Prisma.StudyExerciseUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StudyExerciseUpdateManyWithWhereWithoutUserInput | Prisma.StudyExerciseUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StudyExerciseScalarWhereInput | Prisma.StudyExerciseScalarWhereInput[];
};
export type StudyExerciseCreateNestedManyWithoutVocabInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutVocabInput, Prisma.StudyExerciseUncheckedCreateWithoutVocabInput> | Prisma.StudyExerciseCreateWithoutVocabInput[] | Prisma.StudyExerciseUncheckedCreateWithoutVocabInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutVocabInput | Prisma.StudyExerciseCreateOrConnectWithoutVocabInput[];
    createMany?: Prisma.StudyExerciseCreateManyVocabInputEnvelope;
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
};
export type StudyExerciseUncheckedCreateNestedManyWithoutVocabInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutVocabInput, Prisma.StudyExerciseUncheckedCreateWithoutVocabInput> | Prisma.StudyExerciseCreateWithoutVocabInput[] | Prisma.StudyExerciseUncheckedCreateWithoutVocabInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutVocabInput | Prisma.StudyExerciseCreateOrConnectWithoutVocabInput[];
    createMany?: Prisma.StudyExerciseCreateManyVocabInputEnvelope;
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
};
export type StudyExerciseUpdateManyWithoutVocabNestedInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutVocabInput, Prisma.StudyExerciseUncheckedCreateWithoutVocabInput> | Prisma.StudyExerciseCreateWithoutVocabInput[] | Prisma.StudyExerciseUncheckedCreateWithoutVocabInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutVocabInput | Prisma.StudyExerciseCreateOrConnectWithoutVocabInput[];
    upsert?: Prisma.StudyExerciseUpsertWithWhereUniqueWithoutVocabInput | Prisma.StudyExerciseUpsertWithWhereUniqueWithoutVocabInput[];
    createMany?: Prisma.StudyExerciseCreateManyVocabInputEnvelope;
    set?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    disconnect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    delete?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    update?: Prisma.StudyExerciseUpdateWithWhereUniqueWithoutVocabInput | Prisma.StudyExerciseUpdateWithWhereUniqueWithoutVocabInput[];
    updateMany?: Prisma.StudyExerciseUpdateManyWithWhereWithoutVocabInput | Prisma.StudyExerciseUpdateManyWithWhereWithoutVocabInput[];
    deleteMany?: Prisma.StudyExerciseScalarWhereInput | Prisma.StudyExerciseScalarWhereInput[];
};
export type StudyExerciseUncheckedUpdateManyWithoutVocabNestedInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutVocabInput, Prisma.StudyExerciseUncheckedCreateWithoutVocabInput> | Prisma.StudyExerciseCreateWithoutVocabInput[] | Prisma.StudyExerciseUncheckedCreateWithoutVocabInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutVocabInput | Prisma.StudyExerciseCreateOrConnectWithoutVocabInput[];
    upsert?: Prisma.StudyExerciseUpsertWithWhereUniqueWithoutVocabInput | Prisma.StudyExerciseUpsertWithWhereUniqueWithoutVocabInput[];
    createMany?: Prisma.StudyExerciseCreateManyVocabInputEnvelope;
    set?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    disconnect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    delete?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    update?: Prisma.StudyExerciseUpdateWithWhereUniqueWithoutVocabInput | Prisma.StudyExerciseUpdateWithWhereUniqueWithoutVocabInput[];
    updateMany?: Prisma.StudyExerciseUpdateManyWithWhereWithoutVocabInput | Prisma.StudyExerciseUpdateManyWithWhereWithoutVocabInput[];
    deleteMany?: Prisma.StudyExerciseScalarWhereInput | Prisma.StudyExerciseScalarWhereInput[];
};
export type StudyExerciseCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutSessionInput, Prisma.StudyExerciseUncheckedCreateWithoutSessionInput> | Prisma.StudyExerciseCreateWithoutSessionInput[] | Prisma.StudyExerciseUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutSessionInput | Prisma.StudyExerciseCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.StudyExerciseCreateManySessionInputEnvelope;
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
};
export type StudyExerciseUncheckedCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutSessionInput, Prisma.StudyExerciseUncheckedCreateWithoutSessionInput> | Prisma.StudyExerciseCreateWithoutSessionInput[] | Prisma.StudyExerciseUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutSessionInput | Prisma.StudyExerciseCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.StudyExerciseCreateManySessionInputEnvelope;
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
};
export type StudyExerciseUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutSessionInput, Prisma.StudyExerciseUncheckedCreateWithoutSessionInput> | Prisma.StudyExerciseCreateWithoutSessionInput[] | Prisma.StudyExerciseUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutSessionInput | Prisma.StudyExerciseCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.StudyExerciseUpsertWithWhereUniqueWithoutSessionInput | Prisma.StudyExerciseUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.StudyExerciseCreateManySessionInputEnvelope;
    set?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    disconnect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    delete?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    update?: Prisma.StudyExerciseUpdateWithWhereUniqueWithoutSessionInput | Prisma.StudyExerciseUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.StudyExerciseUpdateManyWithWhereWithoutSessionInput | Prisma.StudyExerciseUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.StudyExerciseScalarWhereInput | Prisma.StudyExerciseScalarWhereInput[];
};
export type StudyExerciseUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutSessionInput, Prisma.StudyExerciseUncheckedCreateWithoutSessionInput> | Prisma.StudyExerciseCreateWithoutSessionInput[] | Prisma.StudyExerciseUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutSessionInput | Prisma.StudyExerciseCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.StudyExerciseUpsertWithWhereUniqueWithoutSessionInput | Prisma.StudyExerciseUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.StudyExerciseCreateManySessionInputEnvelope;
    set?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    disconnect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    delete?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    connect?: Prisma.StudyExerciseWhereUniqueInput | Prisma.StudyExerciseWhereUniqueInput[];
    update?: Prisma.StudyExerciseUpdateWithWhereUniqueWithoutSessionInput | Prisma.StudyExerciseUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.StudyExerciseUpdateManyWithWhereWithoutSessionInput | Prisma.StudyExerciseUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.StudyExerciseScalarWhereInput | Prisma.StudyExerciseScalarWhereInput[];
};
export type StudyExerciseCreateNestedOneWithoutAttemptsInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutAttemptsInput, Prisma.StudyExerciseUncheckedCreateWithoutAttemptsInput>;
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutAttemptsInput;
    connect?: Prisma.StudyExerciseWhereUniqueInput;
};
export type StudyExerciseUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: Prisma.XOR<Prisma.StudyExerciseCreateWithoutAttemptsInput, Prisma.StudyExerciseUncheckedCreateWithoutAttemptsInput>;
    connectOrCreate?: Prisma.StudyExerciseCreateOrConnectWithoutAttemptsInput;
    upsert?: Prisma.StudyExerciseUpsertWithoutAttemptsInput;
    connect?: Prisma.StudyExerciseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudyExerciseUpdateToOneWithWhereWithoutAttemptsInput, Prisma.StudyExerciseUpdateWithoutAttemptsInput>, Prisma.StudyExerciseUncheckedUpdateWithoutAttemptsInput>;
};
export type StudyExerciseCreateWithoutUserInput = {
    id?: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    session: Prisma.StudySessionCreateNestedOneWithoutExercisesInput;
    vocab: Prisma.VocabCreateNestedOneWithoutStudyExercisesInput;
    attempts?: Prisma.StudyAttemptCreateNestedManyWithoutExerciseInput;
};
export type StudyExerciseUncheckedCreateWithoutUserInput = {
    id?: string;
    sessionId: string;
    vocabId: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    attempts?: Prisma.StudyAttemptUncheckedCreateNestedManyWithoutExerciseInput;
};
export type StudyExerciseCreateOrConnectWithoutUserInput = {
    where: Prisma.StudyExerciseWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudyExerciseCreateWithoutUserInput, Prisma.StudyExerciseUncheckedCreateWithoutUserInput>;
};
export type StudyExerciseCreateManyUserInputEnvelope = {
    data: Prisma.StudyExerciseCreateManyUserInput | Prisma.StudyExerciseCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type StudyExerciseUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.StudyExerciseWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudyExerciseUpdateWithoutUserInput, Prisma.StudyExerciseUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StudyExerciseCreateWithoutUserInput, Prisma.StudyExerciseUncheckedCreateWithoutUserInput>;
};
export type StudyExerciseUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.StudyExerciseWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudyExerciseUpdateWithoutUserInput, Prisma.StudyExerciseUncheckedUpdateWithoutUserInput>;
};
export type StudyExerciseUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.StudyExerciseScalarWhereInput;
    data: Prisma.XOR<Prisma.StudyExerciseUpdateManyMutationInput, Prisma.StudyExerciseUncheckedUpdateManyWithoutUserInput>;
};
export type StudyExerciseScalarWhereInput = {
    AND?: Prisma.StudyExerciseScalarWhereInput | Prisma.StudyExerciseScalarWhereInput[];
    OR?: Prisma.StudyExerciseScalarWhereInput[];
    NOT?: Prisma.StudyExerciseScalarWhereInput | Prisma.StudyExerciseScalarWhereInput[];
    id?: Prisma.StringFilter<"StudyExercise"> | string;
    sessionId?: Prisma.StringFilter<"StudyExercise"> | string;
    userId?: Prisma.StringFilter<"StudyExercise"> | string;
    vocabId?: Prisma.StringFilter<"StudyExercise"> | string;
    type?: Prisma.EnumExerciseTypeFilter<"StudyExercise"> | $Enums.ExerciseType;
    payload?: Prisma.JsonFilter<"StudyExercise">;
    createdAt?: Prisma.DateTimeFilter<"StudyExercise"> | Date | string;
};
export type StudyExerciseCreateWithoutVocabInput = {
    id?: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    session: Prisma.StudySessionCreateNestedOneWithoutExercisesInput;
    user: Prisma.UserCreateNestedOneWithoutStudyExercisesInput;
    attempts?: Prisma.StudyAttemptCreateNestedManyWithoutExerciseInput;
};
export type StudyExerciseUncheckedCreateWithoutVocabInput = {
    id?: string;
    sessionId: string;
    userId: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    attempts?: Prisma.StudyAttemptUncheckedCreateNestedManyWithoutExerciseInput;
};
export type StudyExerciseCreateOrConnectWithoutVocabInput = {
    where: Prisma.StudyExerciseWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudyExerciseCreateWithoutVocabInput, Prisma.StudyExerciseUncheckedCreateWithoutVocabInput>;
};
export type StudyExerciseCreateManyVocabInputEnvelope = {
    data: Prisma.StudyExerciseCreateManyVocabInput | Prisma.StudyExerciseCreateManyVocabInput[];
    skipDuplicates?: boolean;
};
export type StudyExerciseUpsertWithWhereUniqueWithoutVocabInput = {
    where: Prisma.StudyExerciseWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudyExerciseUpdateWithoutVocabInput, Prisma.StudyExerciseUncheckedUpdateWithoutVocabInput>;
    create: Prisma.XOR<Prisma.StudyExerciseCreateWithoutVocabInput, Prisma.StudyExerciseUncheckedCreateWithoutVocabInput>;
};
export type StudyExerciseUpdateWithWhereUniqueWithoutVocabInput = {
    where: Prisma.StudyExerciseWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudyExerciseUpdateWithoutVocabInput, Prisma.StudyExerciseUncheckedUpdateWithoutVocabInput>;
};
export type StudyExerciseUpdateManyWithWhereWithoutVocabInput = {
    where: Prisma.StudyExerciseScalarWhereInput;
    data: Prisma.XOR<Prisma.StudyExerciseUpdateManyMutationInput, Prisma.StudyExerciseUncheckedUpdateManyWithoutVocabInput>;
};
export type StudyExerciseCreateWithoutSessionInput = {
    id?: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStudyExercisesInput;
    vocab: Prisma.VocabCreateNestedOneWithoutStudyExercisesInput;
    attempts?: Prisma.StudyAttemptCreateNestedManyWithoutExerciseInput;
};
export type StudyExerciseUncheckedCreateWithoutSessionInput = {
    id?: string;
    userId: string;
    vocabId: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    attempts?: Prisma.StudyAttemptUncheckedCreateNestedManyWithoutExerciseInput;
};
export type StudyExerciseCreateOrConnectWithoutSessionInput = {
    where: Prisma.StudyExerciseWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudyExerciseCreateWithoutSessionInput, Prisma.StudyExerciseUncheckedCreateWithoutSessionInput>;
};
export type StudyExerciseCreateManySessionInputEnvelope = {
    data: Prisma.StudyExerciseCreateManySessionInput | Prisma.StudyExerciseCreateManySessionInput[];
    skipDuplicates?: boolean;
};
export type StudyExerciseUpsertWithWhereUniqueWithoutSessionInput = {
    where: Prisma.StudyExerciseWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudyExerciseUpdateWithoutSessionInput, Prisma.StudyExerciseUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.StudyExerciseCreateWithoutSessionInput, Prisma.StudyExerciseUncheckedCreateWithoutSessionInput>;
};
export type StudyExerciseUpdateWithWhereUniqueWithoutSessionInput = {
    where: Prisma.StudyExerciseWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudyExerciseUpdateWithoutSessionInput, Prisma.StudyExerciseUncheckedUpdateWithoutSessionInput>;
};
export type StudyExerciseUpdateManyWithWhereWithoutSessionInput = {
    where: Prisma.StudyExerciseScalarWhereInput;
    data: Prisma.XOR<Prisma.StudyExerciseUpdateManyMutationInput, Prisma.StudyExerciseUncheckedUpdateManyWithoutSessionInput>;
};
export type StudyExerciseCreateWithoutAttemptsInput = {
    id?: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    session: Prisma.StudySessionCreateNestedOneWithoutExercisesInput;
    user: Prisma.UserCreateNestedOneWithoutStudyExercisesInput;
    vocab: Prisma.VocabCreateNestedOneWithoutStudyExercisesInput;
};
export type StudyExerciseUncheckedCreateWithoutAttemptsInput = {
    id?: string;
    sessionId: string;
    userId: string;
    vocabId: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type StudyExerciseCreateOrConnectWithoutAttemptsInput = {
    where: Prisma.StudyExerciseWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudyExerciseCreateWithoutAttemptsInput, Prisma.StudyExerciseUncheckedCreateWithoutAttemptsInput>;
};
export type StudyExerciseUpsertWithoutAttemptsInput = {
    update: Prisma.XOR<Prisma.StudyExerciseUpdateWithoutAttemptsInput, Prisma.StudyExerciseUncheckedUpdateWithoutAttemptsInput>;
    create: Prisma.XOR<Prisma.StudyExerciseCreateWithoutAttemptsInput, Prisma.StudyExerciseUncheckedCreateWithoutAttemptsInput>;
    where?: Prisma.StudyExerciseWhereInput;
};
export type StudyExerciseUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: Prisma.StudyExerciseWhereInput;
    data: Prisma.XOR<Prisma.StudyExerciseUpdateWithoutAttemptsInput, Prisma.StudyExerciseUncheckedUpdateWithoutAttemptsInput>;
};
export type StudyExerciseUpdateWithoutAttemptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.StudySessionUpdateOneRequiredWithoutExercisesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStudyExercisesNestedInput;
    vocab?: Prisma.VocabUpdateOneRequiredWithoutStudyExercisesNestedInput;
};
export type StudyExerciseUncheckedUpdateWithoutAttemptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    vocabId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyExerciseCreateManyUserInput = {
    id?: string;
    sessionId: string;
    vocabId: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type StudyExerciseUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.StudySessionUpdateOneRequiredWithoutExercisesNestedInput;
    vocab?: Prisma.VocabUpdateOneRequiredWithoutStudyExercisesNestedInput;
    attempts?: Prisma.StudyAttemptUpdateManyWithoutExerciseNestedInput;
};
export type StudyExerciseUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    vocabId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.StudyAttemptUncheckedUpdateManyWithoutExerciseNestedInput;
};
export type StudyExerciseUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    vocabId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyExerciseCreateManyVocabInput = {
    id?: string;
    sessionId: string;
    userId: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type StudyExerciseUpdateWithoutVocabInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.StudySessionUpdateOneRequiredWithoutExercisesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStudyExercisesNestedInput;
    attempts?: Prisma.StudyAttemptUpdateManyWithoutExerciseNestedInput;
};
export type StudyExerciseUncheckedUpdateWithoutVocabInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.StudyAttemptUncheckedUpdateManyWithoutExerciseNestedInput;
};
export type StudyExerciseUncheckedUpdateManyWithoutVocabInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudyExerciseCreateManySessionInput = {
    id?: string;
    userId: string;
    vocabId: string;
    type: $Enums.ExerciseType;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type StudyExerciseUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudyExercisesNestedInput;
    vocab?: Prisma.VocabUpdateOneRequiredWithoutStudyExercisesNestedInput;
    attempts?: Prisma.StudyAttemptUpdateManyWithoutExerciseNestedInput;
};
export type StudyExerciseUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    vocabId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attempts?: Prisma.StudyAttemptUncheckedUpdateManyWithoutExerciseNestedInput;
};
export type StudyExerciseUncheckedUpdateManyWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    vocabId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumExerciseTypeFieldUpdateOperationsInput | $Enums.ExerciseType;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type StudyExerciseCountOutputType
 */
export type StudyExerciseCountOutputType = {
    attempts: number;
};
export type StudyExerciseCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attempts?: boolean | StudyExerciseCountOutputTypeCountAttemptsArgs;
};
/**
 * StudyExerciseCountOutputType without action
 */
export type StudyExerciseCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExerciseCountOutputType
     */
    select?: Prisma.StudyExerciseCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * StudyExerciseCountOutputType without action
 */
export type StudyExerciseCountOutputTypeCountAttemptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudyAttemptWhereInput;
};
export type StudyExerciseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    vocabId?: boolean;
    type?: boolean;
    payload?: boolean;
    createdAt?: boolean;
    session?: boolean | Prisma.StudySessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
    attempts?: boolean | Prisma.StudyExercise$attemptsArgs<ExtArgs>;
    _count?: boolean | Prisma.StudyExerciseCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studyExercise"]>;
export type StudyExerciseSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    vocabId?: boolean;
    type?: boolean;
    payload?: boolean;
    createdAt?: boolean;
    session?: boolean | Prisma.StudySessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studyExercise"]>;
export type StudyExerciseSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    vocabId?: boolean;
    type?: boolean;
    payload?: boolean;
    createdAt?: boolean;
    session?: boolean | Prisma.StudySessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studyExercise"]>;
export type StudyExerciseSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    vocabId?: boolean;
    type?: boolean;
    payload?: boolean;
    createdAt?: boolean;
};
export type StudyExerciseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "userId" | "vocabId" | "type" | "payload" | "createdAt", ExtArgs["result"]["studyExercise"]>;
export type StudyExerciseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.StudySessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
    attempts?: boolean | Prisma.StudyExercise$attemptsArgs<ExtArgs>;
    _count?: boolean | Prisma.StudyExerciseCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StudyExerciseIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.StudySessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
};
export type StudyExerciseIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.StudySessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
};
export type $StudyExercisePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StudyExercise";
    objects: {
        session: Prisma.$StudySessionPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        vocab: Prisma.$VocabPayload<ExtArgs>;
        attempts: Prisma.$StudyAttemptPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        userId: string;
        vocabId: string;
        type: $Enums.ExerciseType;
        payload: runtime.JsonValue;
        createdAt: Date;
    }, ExtArgs["result"]["studyExercise"]>;
    composites: {};
};
export type StudyExerciseGetPayload<S extends boolean | null | undefined | StudyExerciseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload, S>;
export type StudyExerciseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StudyExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StudyExerciseCountAggregateInputType | true;
};
export interface StudyExerciseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StudyExercise'];
        meta: {
            name: 'StudyExercise';
        };
    };
    /**
     * Find zero or one StudyExercise that matches the filter.
     * @param {StudyExerciseFindUniqueArgs} args - Arguments to find a StudyExercise
     * @example
     * // Get one StudyExercise
     * const studyExercise = await prisma.studyExercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudyExerciseFindUniqueArgs>(args: Prisma.SelectSubset<T, StudyExerciseFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StudyExerciseClient<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one StudyExercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudyExerciseFindUniqueOrThrowArgs} args - Arguments to find a StudyExercise
     * @example
     * // Get one StudyExercise
     * const studyExercise = await prisma.studyExercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudyExerciseFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StudyExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudyExerciseClient<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StudyExercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyExerciseFindFirstArgs} args - Arguments to find a StudyExercise
     * @example
     * // Get one StudyExercise
     * const studyExercise = await prisma.studyExercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudyExerciseFindFirstArgs>(args?: Prisma.SelectSubset<T, StudyExerciseFindFirstArgs<ExtArgs>>): Prisma.Prisma__StudyExerciseClient<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StudyExercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyExerciseFindFirstOrThrowArgs} args - Arguments to find a StudyExercise
     * @example
     * // Get one StudyExercise
     * const studyExercise = await prisma.studyExercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudyExerciseFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StudyExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudyExerciseClient<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more StudyExercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudyExercises
     * const studyExercises = await prisma.studyExercise.findMany()
     *
     * // Get first 10 StudyExercises
     * const studyExercises = await prisma.studyExercise.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const studyExerciseWithIdOnly = await prisma.studyExercise.findMany({ select: { id: true } })
     *
     */
    findMany<T extends StudyExerciseFindManyArgs>(args?: Prisma.SelectSubset<T, StudyExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a StudyExercise.
     * @param {StudyExerciseCreateArgs} args - Arguments to create a StudyExercise.
     * @example
     * // Create one StudyExercise
     * const StudyExercise = await prisma.studyExercise.create({
     *   data: {
     *     // ... data to create a StudyExercise
     *   }
     * })
     *
     */
    create<T extends StudyExerciseCreateArgs>(args: Prisma.SelectSubset<T, StudyExerciseCreateArgs<ExtArgs>>): Prisma.Prisma__StudyExerciseClient<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many StudyExercises.
     * @param {StudyExerciseCreateManyArgs} args - Arguments to create many StudyExercises.
     * @example
     * // Create many StudyExercises
     * const studyExercise = await prisma.studyExercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StudyExerciseCreateManyArgs>(args?: Prisma.SelectSubset<T, StudyExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many StudyExercises and returns the data saved in the database.
     * @param {StudyExerciseCreateManyAndReturnArgs} args - Arguments to create many StudyExercises.
     * @example
     * // Create many StudyExercises
     * const studyExercise = await prisma.studyExercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many StudyExercises and only return the `id`
     * const studyExerciseWithIdOnly = await prisma.studyExercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StudyExerciseCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StudyExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a StudyExercise.
     * @param {StudyExerciseDeleteArgs} args - Arguments to delete one StudyExercise.
     * @example
     * // Delete one StudyExercise
     * const StudyExercise = await prisma.studyExercise.delete({
     *   where: {
     *     // ... filter to delete one StudyExercise
     *   }
     * })
     *
     */
    delete<T extends StudyExerciseDeleteArgs>(args: Prisma.SelectSubset<T, StudyExerciseDeleteArgs<ExtArgs>>): Prisma.Prisma__StudyExerciseClient<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one StudyExercise.
     * @param {StudyExerciseUpdateArgs} args - Arguments to update one StudyExercise.
     * @example
     * // Update one StudyExercise
     * const studyExercise = await prisma.studyExercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StudyExerciseUpdateArgs>(args: Prisma.SelectSubset<T, StudyExerciseUpdateArgs<ExtArgs>>): Prisma.Prisma__StudyExerciseClient<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more StudyExercises.
     * @param {StudyExerciseDeleteManyArgs} args - Arguments to filter StudyExercises to delete.
     * @example
     * // Delete a few StudyExercises
     * const { count } = await prisma.studyExercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StudyExerciseDeleteManyArgs>(args?: Prisma.SelectSubset<T, StudyExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StudyExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudyExercises
     * const studyExercise = await prisma.studyExercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StudyExerciseUpdateManyArgs>(args: Prisma.SelectSubset<T, StudyExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StudyExercises and returns the data updated in the database.
     * @param {StudyExerciseUpdateManyAndReturnArgs} args - Arguments to update many StudyExercises.
     * @example
     * // Update many StudyExercises
     * const studyExercise = await prisma.studyExercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more StudyExercises and only return the `id`
     * const studyExerciseWithIdOnly = await prisma.studyExercise.updateManyAndReturn({
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
    updateManyAndReturn<T extends StudyExerciseUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StudyExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one StudyExercise.
     * @param {StudyExerciseUpsertArgs} args - Arguments to update or create a StudyExercise.
     * @example
     * // Update or create a StudyExercise
     * const studyExercise = await prisma.studyExercise.upsert({
     *   create: {
     *     // ... data to create a StudyExercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudyExercise we want to update
     *   }
     * })
     */
    upsert<T extends StudyExerciseUpsertArgs>(args: Prisma.SelectSubset<T, StudyExerciseUpsertArgs<ExtArgs>>): Prisma.Prisma__StudyExerciseClient<runtime.Types.Result.GetResult<Prisma.$StudyExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of StudyExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyExerciseCountArgs} args - Arguments to filter StudyExercises to count.
     * @example
     * // Count the number of StudyExercises
     * const count = await prisma.studyExercise.count({
     *   where: {
     *     // ... the filter for the StudyExercises we want to count
     *   }
     * })
    **/
    count<T extends StudyExerciseCountArgs>(args?: Prisma.Subset<T, StudyExerciseCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StudyExerciseCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a StudyExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudyExerciseAggregateArgs>(args: Prisma.Subset<T, StudyExerciseAggregateArgs>): Prisma.PrismaPromise<GetStudyExerciseAggregateType<T>>;
    /**
     * Group by StudyExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyExerciseGroupByArgs} args - Group by arguments.
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
    groupBy<T extends StudyExerciseGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StudyExerciseGroupByArgs['orderBy'];
    } : {
        orderBy?: StudyExerciseGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StudyExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudyExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the StudyExercise model
     */
    readonly fields: StudyExerciseFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for StudyExercise.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StudyExerciseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.StudySessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudySessionDefaultArgs<ExtArgs>>): Prisma.Prisma__StudySessionClient<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    vocab<T extends Prisma.VocabDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VocabDefaultArgs<ExtArgs>>): Prisma.Prisma__VocabClient<runtime.Types.Result.GetResult<Prisma.$VocabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    attempts<T extends Prisma.StudyExercise$attemptsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudyExercise$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudyAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the StudyExercise model
 */
export interface StudyExerciseFieldRefs {
    readonly id: Prisma.FieldRef<"StudyExercise", 'String'>;
    readonly sessionId: Prisma.FieldRef<"StudyExercise", 'String'>;
    readonly userId: Prisma.FieldRef<"StudyExercise", 'String'>;
    readonly vocabId: Prisma.FieldRef<"StudyExercise", 'String'>;
    readonly type: Prisma.FieldRef<"StudyExercise", 'ExerciseType'>;
    readonly payload: Prisma.FieldRef<"StudyExercise", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"StudyExercise", 'DateTime'>;
}
/**
 * StudyExercise findUnique
 */
export type StudyExerciseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which StudyExercise to fetch.
     */
    where: Prisma.StudyExerciseWhereUniqueInput;
};
/**
 * StudyExercise findUniqueOrThrow
 */
export type StudyExerciseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which StudyExercise to fetch.
     */
    where: Prisma.StudyExerciseWhereUniqueInput;
};
/**
 * StudyExercise findFirst
 */
export type StudyExerciseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which StudyExercise to fetch.
     */
    where?: Prisma.StudyExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StudyExercises to fetch.
     */
    orderBy?: Prisma.StudyExerciseOrderByWithRelationInput | Prisma.StudyExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StudyExercises.
     */
    cursor?: Prisma.StudyExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StudyExercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StudyExercises.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StudyExercises.
     */
    distinct?: Prisma.StudyExerciseScalarFieldEnum | Prisma.StudyExerciseScalarFieldEnum[];
};
/**
 * StudyExercise findFirstOrThrow
 */
export type StudyExerciseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which StudyExercise to fetch.
     */
    where?: Prisma.StudyExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StudyExercises to fetch.
     */
    orderBy?: Prisma.StudyExerciseOrderByWithRelationInput | Prisma.StudyExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StudyExercises.
     */
    cursor?: Prisma.StudyExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StudyExercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StudyExercises.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StudyExercises.
     */
    distinct?: Prisma.StudyExerciseScalarFieldEnum | Prisma.StudyExerciseScalarFieldEnum[];
};
/**
 * StudyExercise findMany
 */
export type StudyExerciseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which StudyExercises to fetch.
     */
    where?: Prisma.StudyExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StudyExercises to fetch.
     */
    orderBy?: Prisma.StudyExerciseOrderByWithRelationInput | Prisma.StudyExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing StudyExercises.
     */
    cursor?: Prisma.StudyExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StudyExercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StudyExercises.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StudyExercises.
     */
    distinct?: Prisma.StudyExerciseScalarFieldEnum | Prisma.StudyExerciseScalarFieldEnum[];
};
/**
 * StudyExercise create
 */
export type StudyExerciseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseInclude<ExtArgs> | null;
    /**
     * The data needed to create a StudyExercise.
     */
    data: Prisma.XOR<Prisma.StudyExerciseCreateInput, Prisma.StudyExerciseUncheckedCreateInput>;
};
/**
 * StudyExercise createMany
 */
export type StudyExerciseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudyExercises.
     */
    data: Prisma.StudyExerciseCreateManyInput | Prisma.StudyExerciseCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * StudyExercise createManyAndReturn
 */
export type StudyExerciseCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * The data used to create many StudyExercises.
     */
    data: Prisma.StudyExerciseCreateManyInput | Prisma.StudyExerciseCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * StudyExercise update
 */
export type StudyExerciseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseInclude<ExtArgs> | null;
    /**
     * The data needed to update a StudyExercise.
     */
    data: Prisma.XOR<Prisma.StudyExerciseUpdateInput, Prisma.StudyExerciseUncheckedUpdateInput>;
    /**
     * Choose, which StudyExercise to update.
     */
    where: Prisma.StudyExerciseWhereUniqueInput;
};
/**
 * StudyExercise updateMany
 */
export type StudyExerciseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update StudyExercises.
     */
    data: Prisma.XOR<Prisma.StudyExerciseUpdateManyMutationInput, Prisma.StudyExerciseUncheckedUpdateManyInput>;
    /**
     * Filter which StudyExercises to update
     */
    where?: Prisma.StudyExerciseWhereInput;
    /**
     * Limit how many StudyExercises to update.
     */
    limit?: number;
};
/**
 * StudyExercise updateManyAndReturn
 */
export type StudyExerciseUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * The data used to update StudyExercises.
     */
    data: Prisma.XOR<Prisma.StudyExerciseUpdateManyMutationInput, Prisma.StudyExerciseUncheckedUpdateManyInput>;
    /**
     * Filter which StudyExercises to update
     */
    where?: Prisma.StudyExerciseWhereInput;
    /**
     * Limit how many StudyExercises to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * StudyExercise upsert
 */
export type StudyExerciseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseInclude<ExtArgs> | null;
    /**
     * The filter to search for the StudyExercise to update in case it exists.
     */
    where: Prisma.StudyExerciseWhereUniqueInput;
    /**
     * In case the StudyExercise found by the `where` argument doesn't exist, create a new StudyExercise with this data.
     */
    create: Prisma.XOR<Prisma.StudyExerciseCreateInput, Prisma.StudyExerciseUncheckedCreateInput>;
    /**
     * In case the StudyExercise was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StudyExerciseUpdateInput, Prisma.StudyExerciseUncheckedUpdateInput>;
};
/**
 * StudyExercise delete
 */
export type StudyExerciseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseInclude<ExtArgs> | null;
    /**
     * Filter which StudyExercise to delete.
     */
    where: Prisma.StudyExerciseWhereUniqueInput;
};
/**
 * StudyExercise deleteMany
 */
export type StudyExerciseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StudyExercises to delete
     */
    where?: Prisma.StudyExerciseWhereInput;
    /**
     * Limit how many StudyExercises to delete.
     */
    limit?: number;
};
/**
 * StudyExercise.attempts
 */
export type StudyExercise$attemptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.StudyAttemptWhereInput;
    orderBy?: Prisma.StudyAttemptOrderByWithRelationInput | Prisma.StudyAttemptOrderByWithRelationInput[];
    cursor?: Prisma.StudyAttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudyAttemptScalarFieldEnum | Prisma.StudyAttemptScalarFieldEnum[];
};
/**
 * StudyExercise without action
 */
export type StudyExerciseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyExercise
     */
    select?: Prisma.StudyExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudyExercise
     */
    omit?: Prisma.StudyExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudyExerciseInclude<ExtArgs> | null;
};
//# sourceMappingURL=StudyExercise.d.ts.map