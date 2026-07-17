import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model VocabList
 *
 */
export type VocabListModel = runtime.Types.Result.DefaultSelection<Prisma.$VocabListPayload>;
export type AggregateVocabList = {
    _count: VocabListCountAggregateOutputType | null;
    _min: VocabListMinAggregateOutputType | null;
    _max: VocabListMaxAggregateOutputType | null;
};
export type VocabListMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    isDefault: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VocabListMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    isDefault: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VocabListCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    isDefault: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type VocabListMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    isDefault?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VocabListMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    isDefault?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VocabListCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    isDefault?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type VocabListAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VocabList to aggregate.
     */
    where?: Prisma.VocabListWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VocabLists to fetch.
     */
    orderBy?: Prisma.VocabListOrderByWithRelationInput | Prisma.VocabListOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.VocabListWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VocabLists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VocabLists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned VocabLists
    **/
    _count?: true | VocabListCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: VocabListMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: VocabListMaxAggregateInputType;
};
export type GetVocabListAggregateType<T extends VocabListAggregateArgs> = {
    [P in keyof T & keyof AggregateVocabList]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVocabList[P]> : Prisma.GetScalarType<T[P], AggregateVocabList[P]>;
};
export type VocabListGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VocabListWhereInput;
    orderBy?: Prisma.VocabListOrderByWithAggregationInput | Prisma.VocabListOrderByWithAggregationInput[];
    by: Prisma.VocabListScalarFieldEnum[] | Prisma.VocabListScalarFieldEnum;
    having?: Prisma.VocabListScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VocabListCountAggregateInputType | true;
    _min?: VocabListMinAggregateInputType;
    _max?: VocabListMaxAggregateInputType;
};
export type VocabListGroupByOutputType = {
    id: string;
    userId: string;
    name: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: VocabListCountAggregateOutputType | null;
    _min: VocabListMinAggregateOutputType | null;
    _max: VocabListMaxAggregateOutputType | null;
};
export type GetVocabListGroupByPayload<T extends VocabListGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VocabListGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VocabListGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VocabListGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VocabListGroupByOutputType[P]>;
}>>;
export type VocabListWhereInput = {
    AND?: Prisma.VocabListWhereInput | Prisma.VocabListWhereInput[];
    OR?: Prisma.VocabListWhereInput[];
    NOT?: Prisma.VocabListWhereInput | Prisma.VocabListWhereInput[];
    id?: Prisma.StringFilter<"VocabList"> | string;
    userId?: Prisma.StringFilter<"VocabList"> | string;
    name?: Prisma.StringFilter<"VocabList"> | string;
    isDefault?: Prisma.BoolFilter<"VocabList"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"VocabList"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VocabList"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    vocabs?: Prisma.VocabListRelationFilter;
    studySessions?: Prisma.StudySessionListRelationFilter;
};
export type VocabListOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    vocabs?: Prisma.VocabOrderByRelationAggregateInput;
    studySessions?: Prisma.StudySessionOrderByRelationAggregateInput;
};
export type VocabListWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VocabListWhereInput | Prisma.VocabListWhereInput[];
    OR?: Prisma.VocabListWhereInput[];
    NOT?: Prisma.VocabListWhereInput | Prisma.VocabListWhereInput[];
    userId?: Prisma.StringFilter<"VocabList"> | string;
    name?: Prisma.StringFilter<"VocabList"> | string;
    isDefault?: Prisma.BoolFilter<"VocabList"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"VocabList"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VocabList"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    vocabs?: Prisma.VocabListRelationFilter;
    studySessions?: Prisma.StudySessionListRelationFilter;
}, "id">;
export type VocabListOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.VocabListCountOrderByAggregateInput;
    _max?: Prisma.VocabListMaxOrderByAggregateInput;
    _min?: Prisma.VocabListMinOrderByAggregateInput;
};
export type VocabListScalarWhereWithAggregatesInput = {
    AND?: Prisma.VocabListScalarWhereWithAggregatesInput | Prisma.VocabListScalarWhereWithAggregatesInput[];
    OR?: Prisma.VocabListScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VocabListScalarWhereWithAggregatesInput | Prisma.VocabListScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"VocabList"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"VocabList"> | string;
    name?: Prisma.StringWithAggregatesFilter<"VocabList"> | string;
    isDefault?: Prisma.BoolWithAggregatesFilter<"VocabList"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"VocabList"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"VocabList"> | Date | string;
};
export type VocabListCreateInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutListsInput;
    vocabs?: Prisma.VocabCreateNestedManyWithoutListInput;
    studySessions?: Prisma.StudySessionCreateNestedManyWithoutListInput;
};
export type VocabListUncheckedCreateInput = {
    id?: string;
    userId: string;
    name: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    vocabs?: Prisma.VocabUncheckedCreateNestedManyWithoutListInput;
    studySessions?: Prisma.StudySessionUncheckedCreateNestedManyWithoutListInput;
};
export type VocabListUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutListsNestedInput;
    vocabs?: Prisma.VocabUpdateManyWithoutListNestedInput;
    studySessions?: Prisma.StudySessionUpdateManyWithoutListNestedInput;
};
export type VocabListUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vocabs?: Prisma.VocabUncheckedUpdateManyWithoutListNestedInput;
    studySessions?: Prisma.StudySessionUncheckedUpdateManyWithoutListNestedInput;
};
export type VocabListCreateManyInput = {
    id?: string;
    userId: string;
    name: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VocabListUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VocabListUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VocabListListRelationFilter = {
    every?: Prisma.VocabListWhereInput;
    some?: Prisma.VocabListWhereInput;
    none?: Prisma.VocabListWhereInput;
};
export type VocabListOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VocabListCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VocabListMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VocabListMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VocabListScalarRelationFilter = {
    is?: Prisma.VocabListWhereInput;
    isNot?: Prisma.VocabListWhereInput;
};
export type VocabListCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VocabListCreateWithoutUserInput, Prisma.VocabListUncheckedCreateWithoutUserInput> | Prisma.VocabListCreateWithoutUserInput[] | Prisma.VocabListUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VocabListCreateOrConnectWithoutUserInput | Prisma.VocabListCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VocabListCreateManyUserInputEnvelope;
    connect?: Prisma.VocabListWhereUniqueInput | Prisma.VocabListWhereUniqueInput[];
};
export type VocabListUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VocabListCreateWithoutUserInput, Prisma.VocabListUncheckedCreateWithoutUserInput> | Prisma.VocabListCreateWithoutUserInput[] | Prisma.VocabListUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VocabListCreateOrConnectWithoutUserInput | Prisma.VocabListCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VocabListCreateManyUserInputEnvelope;
    connect?: Prisma.VocabListWhereUniqueInput | Prisma.VocabListWhereUniqueInput[];
};
export type VocabListUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VocabListCreateWithoutUserInput, Prisma.VocabListUncheckedCreateWithoutUserInput> | Prisma.VocabListCreateWithoutUserInput[] | Prisma.VocabListUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VocabListCreateOrConnectWithoutUserInput | Prisma.VocabListCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VocabListUpsertWithWhereUniqueWithoutUserInput | Prisma.VocabListUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VocabListCreateManyUserInputEnvelope;
    set?: Prisma.VocabListWhereUniqueInput | Prisma.VocabListWhereUniqueInput[];
    disconnect?: Prisma.VocabListWhereUniqueInput | Prisma.VocabListWhereUniqueInput[];
    delete?: Prisma.VocabListWhereUniqueInput | Prisma.VocabListWhereUniqueInput[];
    connect?: Prisma.VocabListWhereUniqueInput | Prisma.VocabListWhereUniqueInput[];
    update?: Prisma.VocabListUpdateWithWhereUniqueWithoutUserInput | Prisma.VocabListUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VocabListUpdateManyWithWhereWithoutUserInput | Prisma.VocabListUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VocabListScalarWhereInput | Prisma.VocabListScalarWhereInput[];
};
export type VocabListUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VocabListCreateWithoutUserInput, Prisma.VocabListUncheckedCreateWithoutUserInput> | Prisma.VocabListCreateWithoutUserInput[] | Prisma.VocabListUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VocabListCreateOrConnectWithoutUserInput | Prisma.VocabListCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VocabListUpsertWithWhereUniqueWithoutUserInput | Prisma.VocabListUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VocabListCreateManyUserInputEnvelope;
    set?: Prisma.VocabListWhereUniqueInput | Prisma.VocabListWhereUniqueInput[];
    disconnect?: Prisma.VocabListWhereUniqueInput | Prisma.VocabListWhereUniqueInput[];
    delete?: Prisma.VocabListWhereUniqueInput | Prisma.VocabListWhereUniqueInput[];
    connect?: Prisma.VocabListWhereUniqueInput | Prisma.VocabListWhereUniqueInput[];
    update?: Prisma.VocabListUpdateWithWhereUniqueWithoutUserInput | Prisma.VocabListUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VocabListUpdateManyWithWhereWithoutUserInput | Prisma.VocabListUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VocabListScalarWhereInput | Prisma.VocabListScalarWhereInput[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type VocabListCreateNestedOneWithoutVocabsInput = {
    create?: Prisma.XOR<Prisma.VocabListCreateWithoutVocabsInput, Prisma.VocabListUncheckedCreateWithoutVocabsInput>;
    connectOrCreate?: Prisma.VocabListCreateOrConnectWithoutVocabsInput;
    connect?: Prisma.VocabListWhereUniqueInput;
};
export type VocabListUpdateOneRequiredWithoutVocabsNestedInput = {
    create?: Prisma.XOR<Prisma.VocabListCreateWithoutVocabsInput, Prisma.VocabListUncheckedCreateWithoutVocabsInput>;
    connectOrCreate?: Prisma.VocabListCreateOrConnectWithoutVocabsInput;
    upsert?: Prisma.VocabListUpsertWithoutVocabsInput;
    connect?: Prisma.VocabListWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VocabListUpdateToOneWithWhereWithoutVocabsInput, Prisma.VocabListUpdateWithoutVocabsInput>, Prisma.VocabListUncheckedUpdateWithoutVocabsInput>;
};
export type VocabListCreateNestedOneWithoutStudySessionsInput = {
    create?: Prisma.XOR<Prisma.VocabListCreateWithoutStudySessionsInput, Prisma.VocabListUncheckedCreateWithoutStudySessionsInput>;
    connectOrCreate?: Prisma.VocabListCreateOrConnectWithoutStudySessionsInput;
    connect?: Prisma.VocabListWhereUniqueInput;
};
export type VocabListUpdateOneRequiredWithoutStudySessionsNestedInput = {
    create?: Prisma.XOR<Prisma.VocabListCreateWithoutStudySessionsInput, Prisma.VocabListUncheckedCreateWithoutStudySessionsInput>;
    connectOrCreate?: Prisma.VocabListCreateOrConnectWithoutStudySessionsInput;
    upsert?: Prisma.VocabListUpsertWithoutStudySessionsInput;
    connect?: Prisma.VocabListWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VocabListUpdateToOneWithWhereWithoutStudySessionsInput, Prisma.VocabListUpdateWithoutStudySessionsInput>, Prisma.VocabListUncheckedUpdateWithoutStudySessionsInput>;
};
export type VocabListCreateWithoutUserInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    vocabs?: Prisma.VocabCreateNestedManyWithoutListInput;
    studySessions?: Prisma.StudySessionCreateNestedManyWithoutListInput;
};
export type VocabListUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    vocabs?: Prisma.VocabUncheckedCreateNestedManyWithoutListInput;
    studySessions?: Prisma.StudySessionUncheckedCreateNestedManyWithoutListInput;
};
export type VocabListCreateOrConnectWithoutUserInput = {
    where: Prisma.VocabListWhereUniqueInput;
    create: Prisma.XOR<Prisma.VocabListCreateWithoutUserInput, Prisma.VocabListUncheckedCreateWithoutUserInput>;
};
export type VocabListCreateManyUserInputEnvelope = {
    data: Prisma.VocabListCreateManyUserInput | Prisma.VocabListCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type VocabListUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.VocabListWhereUniqueInput;
    update: Prisma.XOR<Prisma.VocabListUpdateWithoutUserInput, Prisma.VocabListUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.VocabListCreateWithoutUserInput, Prisma.VocabListUncheckedCreateWithoutUserInput>;
};
export type VocabListUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.VocabListWhereUniqueInput;
    data: Prisma.XOR<Prisma.VocabListUpdateWithoutUserInput, Prisma.VocabListUncheckedUpdateWithoutUserInput>;
};
export type VocabListUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.VocabListScalarWhereInput;
    data: Prisma.XOR<Prisma.VocabListUpdateManyMutationInput, Prisma.VocabListUncheckedUpdateManyWithoutUserInput>;
};
export type VocabListScalarWhereInput = {
    AND?: Prisma.VocabListScalarWhereInput | Prisma.VocabListScalarWhereInput[];
    OR?: Prisma.VocabListScalarWhereInput[];
    NOT?: Prisma.VocabListScalarWhereInput | Prisma.VocabListScalarWhereInput[];
    id?: Prisma.StringFilter<"VocabList"> | string;
    userId?: Prisma.StringFilter<"VocabList"> | string;
    name?: Prisma.StringFilter<"VocabList"> | string;
    isDefault?: Prisma.BoolFilter<"VocabList"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"VocabList"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VocabList"> | Date | string;
};
export type VocabListCreateWithoutVocabsInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutListsInput;
    studySessions?: Prisma.StudySessionCreateNestedManyWithoutListInput;
};
export type VocabListUncheckedCreateWithoutVocabsInput = {
    id?: string;
    userId: string;
    name: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    studySessions?: Prisma.StudySessionUncheckedCreateNestedManyWithoutListInput;
};
export type VocabListCreateOrConnectWithoutVocabsInput = {
    where: Prisma.VocabListWhereUniqueInput;
    create: Prisma.XOR<Prisma.VocabListCreateWithoutVocabsInput, Prisma.VocabListUncheckedCreateWithoutVocabsInput>;
};
export type VocabListUpsertWithoutVocabsInput = {
    update: Prisma.XOR<Prisma.VocabListUpdateWithoutVocabsInput, Prisma.VocabListUncheckedUpdateWithoutVocabsInput>;
    create: Prisma.XOR<Prisma.VocabListCreateWithoutVocabsInput, Prisma.VocabListUncheckedCreateWithoutVocabsInput>;
    where?: Prisma.VocabListWhereInput;
};
export type VocabListUpdateToOneWithWhereWithoutVocabsInput = {
    where?: Prisma.VocabListWhereInput;
    data: Prisma.XOR<Prisma.VocabListUpdateWithoutVocabsInput, Prisma.VocabListUncheckedUpdateWithoutVocabsInput>;
};
export type VocabListUpdateWithoutVocabsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutListsNestedInput;
    studySessions?: Prisma.StudySessionUpdateManyWithoutListNestedInput;
};
export type VocabListUncheckedUpdateWithoutVocabsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    studySessions?: Prisma.StudySessionUncheckedUpdateManyWithoutListNestedInput;
};
export type VocabListCreateWithoutStudySessionsInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutListsInput;
    vocabs?: Prisma.VocabCreateNestedManyWithoutListInput;
};
export type VocabListUncheckedCreateWithoutStudySessionsInput = {
    id?: string;
    userId: string;
    name: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    vocabs?: Prisma.VocabUncheckedCreateNestedManyWithoutListInput;
};
export type VocabListCreateOrConnectWithoutStudySessionsInput = {
    where: Prisma.VocabListWhereUniqueInput;
    create: Prisma.XOR<Prisma.VocabListCreateWithoutStudySessionsInput, Prisma.VocabListUncheckedCreateWithoutStudySessionsInput>;
};
export type VocabListUpsertWithoutStudySessionsInput = {
    update: Prisma.XOR<Prisma.VocabListUpdateWithoutStudySessionsInput, Prisma.VocabListUncheckedUpdateWithoutStudySessionsInput>;
    create: Prisma.XOR<Prisma.VocabListCreateWithoutStudySessionsInput, Prisma.VocabListUncheckedCreateWithoutStudySessionsInput>;
    where?: Prisma.VocabListWhereInput;
};
export type VocabListUpdateToOneWithWhereWithoutStudySessionsInput = {
    where?: Prisma.VocabListWhereInput;
    data: Prisma.XOR<Prisma.VocabListUpdateWithoutStudySessionsInput, Prisma.VocabListUncheckedUpdateWithoutStudySessionsInput>;
};
export type VocabListUpdateWithoutStudySessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutListsNestedInput;
    vocabs?: Prisma.VocabUpdateManyWithoutListNestedInput;
};
export type VocabListUncheckedUpdateWithoutStudySessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vocabs?: Prisma.VocabUncheckedUpdateManyWithoutListNestedInput;
};
export type VocabListCreateManyUserInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VocabListUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vocabs?: Prisma.VocabUpdateManyWithoutListNestedInput;
    studySessions?: Prisma.StudySessionUpdateManyWithoutListNestedInput;
};
export type VocabListUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vocabs?: Prisma.VocabUncheckedUpdateManyWithoutListNestedInput;
    studySessions?: Prisma.StudySessionUncheckedUpdateManyWithoutListNestedInput;
};
export type VocabListUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type VocabListCountOutputType
 */
export type VocabListCountOutputType = {
    vocabs: number;
    studySessions: number;
};
export type VocabListCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vocabs?: boolean | VocabListCountOutputTypeCountVocabsArgs;
    studySessions?: boolean | VocabListCountOutputTypeCountStudySessionsArgs;
};
/**
 * VocabListCountOutputType without action
 */
export type VocabListCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabListCountOutputType
     */
    select?: Prisma.VocabListCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * VocabListCountOutputType without action
 */
export type VocabListCountOutputTypeCountVocabsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VocabWhereInput;
};
/**
 * VocabListCountOutputType without action
 */
export type VocabListCountOutputTypeCountStudySessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudySessionWhereInput;
};
export type VocabListSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    isDefault?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    vocabs?: boolean | Prisma.VocabList$vocabsArgs<ExtArgs>;
    studySessions?: boolean | Prisma.VocabList$studySessionsArgs<ExtArgs>;
    _count?: boolean | Prisma.VocabListCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vocabList"]>;
export type VocabListSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    isDefault?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vocabList"]>;
export type VocabListSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    isDefault?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vocabList"]>;
export type VocabListSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    isDefault?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type VocabListOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["vocabList"]>;
export type VocabListInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    vocabs?: boolean | Prisma.VocabList$vocabsArgs<ExtArgs>;
    studySessions?: boolean | Prisma.VocabList$studySessionsArgs<ExtArgs>;
    _count?: boolean | Prisma.VocabListCountOutputTypeDefaultArgs<ExtArgs>;
};
export type VocabListIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VocabListIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $VocabListPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VocabList";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        vocabs: Prisma.$VocabPayload<ExtArgs>[];
        studySessions: Prisma.$StudySessionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        name: string;
        isDefault: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["vocabList"]>;
    composites: {};
};
export type VocabListGetPayload<S extends boolean | null | undefined | VocabListDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VocabListPayload, S>;
export type VocabListCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VocabListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VocabListCountAggregateInputType | true;
};
export interface VocabListDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VocabList'];
        meta: {
            name: 'VocabList';
        };
    };
    /**
     * Find zero or one VocabList that matches the filter.
     * @param {VocabListFindUniqueArgs} args - Arguments to find a VocabList
     * @example
     * // Get one VocabList
     * const vocabList = await prisma.vocabList.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VocabListFindUniqueArgs>(args: Prisma.SelectSubset<T, VocabListFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VocabListClient<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one VocabList that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VocabListFindUniqueOrThrowArgs} args - Arguments to find a VocabList
     * @example
     * // Get one VocabList
     * const vocabList = await prisma.vocabList.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VocabListFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VocabListFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VocabListClient<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VocabList that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabListFindFirstArgs} args - Arguments to find a VocabList
     * @example
     * // Get one VocabList
     * const vocabList = await prisma.vocabList.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VocabListFindFirstArgs>(args?: Prisma.SelectSubset<T, VocabListFindFirstArgs<ExtArgs>>): Prisma.Prisma__VocabListClient<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VocabList that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabListFindFirstOrThrowArgs} args - Arguments to find a VocabList
     * @example
     * // Get one VocabList
     * const vocabList = await prisma.vocabList.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VocabListFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VocabListFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VocabListClient<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more VocabLists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VocabLists
     * const vocabLists = await prisma.vocabList.findMany()
     *
     * // Get first 10 VocabLists
     * const vocabLists = await prisma.vocabList.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const vocabListWithIdOnly = await prisma.vocabList.findMany({ select: { id: true } })
     *
     */
    findMany<T extends VocabListFindManyArgs>(args?: Prisma.SelectSubset<T, VocabListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a VocabList.
     * @param {VocabListCreateArgs} args - Arguments to create a VocabList.
     * @example
     * // Create one VocabList
     * const VocabList = await prisma.vocabList.create({
     *   data: {
     *     // ... data to create a VocabList
     *   }
     * })
     *
     */
    create<T extends VocabListCreateArgs>(args: Prisma.SelectSubset<T, VocabListCreateArgs<ExtArgs>>): Prisma.Prisma__VocabListClient<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many VocabLists.
     * @param {VocabListCreateManyArgs} args - Arguments to create many VocabLists.
     * @example
     * // Create many VocabLists
     * const vocabList = await prisma.vocabList.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VocabListCreateManyArgs>(args?: Prisma.SelectSubset<T, VocabListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many VocabLists and returns the data saved in the database.
     * @param {VocabListCreateManyAndReturnArgs} args - Arguments to create many VocabLists.
     * @example
     * // Create many VocabLists
     * const vocabList = await prisma.vocabList.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many VocabLists and only return the `id`
     * const vocabListWithIdOnly = await prisma.vocabList.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VocabListCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VocabListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a VocabList.
     * @param {VocabListDeleteArgs} args - Arguments to delete one VocabList.
     * @example
     * // Delete one VocabList
     * const VocabList = await prisma.vocabList.delete({
     *   where: {
     *     // ... filter to delete one VocabList
     *   }
     * })
     *
     */
    delete<T extends VocabListDeleteArgs>(args: Prisma.SelectSubset<T, VocabListDeleteArgs<ExtArgs>>): Prisma.Prisma__VocabListClient<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one VocabList.
     * @param {VocabListUpdateArgs} args - Arguments to update one VocabList.
     * @example
     * // Update one VocabList
     * const vocabList = await prisma.vocabList.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VocabListUpdateArgs>(args: Prisma.SelectSubset<T, VocabListUpdateArgs<ExtArgs>>): Prisma.Prisma__VocabListClient<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more VocabLists.
     * @param {VocabListDeleteManyArgs} args - Arguments to filter VocabLists to delete.
     * @example
     * // Delete a few VocabLists
     * const { count } = await prisma.vocabList.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VocabListDeleteManyArgs>(args?: Prisma.SelectSubset<T, VocabListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VocabLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VocabLists
     * const vocabList = await prisma.vocabList.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VocabListUpdateManyArgs>(args: Prisma.SelectSubset<T, VocabListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VocabLists and returns the data updated in the database.
     * @param {VocabListUpdateManyAndReturnArgs} args - Arguments to update many VocabLists.
     * @example
     * // Update many VocabLists
     * const vocabList = await prisma.vocabList.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more VocabLists and only return the `id`
     * const vocabListWithIdOnly = await prisma.vocabList.updateManyAndReturn({
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
    updateManyAndReturn<T extends VocabListUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VocabListUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one VocabList.
     * @param {VocabListUpsertArgs} args - Arguments to update or create a VocabList.
     * @example
     * // Update or create a VocabList
     * const vocabList = await prisma.vocabList.upsert({
     *   create: {
     *     // ... data to create a VocabList
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VocabList we want to update
     *   }
     * })
     */
    upsert<T extends VocabListUpsertArgs>(args: Prisma.SelectSubset<T, VocabListUpsertArgs<ExtArgs>>): Prisma.Prisma__VocabListClient<runtime.Types.Result.GetResult<Prisma.$VocabListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of VocabLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabListCountArgs} args - Arguments to filter VocabLists to count.
     * @example
     * // Count the number of VocabLists
     * const count = await prisma.vocabList.count({
     *   where: {
     *     // ... the filter for the VocabLists we want to count
     *   }
     * })
    **/
    count<T extends VocabListCountArgs>(args?: Prisma.Subset<T, VocabListCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VocabListCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a VocabList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VocabListAggregateArgs>(args: Prisma.Subset<T, VocabListAggregateArgs>): Prisma.PrismaPromise<GetVocabListAggregateType<T>>;
    /**
     * Group by VocabList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabListGroupByArgs} args - Group by arguments.
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
    groupBy<T extends VocabListGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VocabListGroupByArgs['orderBy'];
    } : {
        orderBy?: VocabListGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VocabListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVocabListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the VocabList model
     */
    readonly fields: VocabListFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for VocabList.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__VocabListClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    vocabs<T extends Prisma.VocabList$vocabsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VocabList$vocabsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VocabPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    studySessions<T extends Prisma.VocabList$studySessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VocabList$studySessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudySessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the VocabList model
 */
export interface VocabListFieldRefs {
    readonly id: Prisma.FieldRef<"VocabList", 'String'>;
    readonly userId: Prisma.FieldRef<"VocabList", 'String'>;
    readonly name: Prisma.FieldRef<"VocabList", 'String'>;
    readonly isDefault: Prisma.FieldRef<"VocabList", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"VocabList", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"VocabList", 'DateTime'>;
}
/**
 * VocabList findUnique
 */
export type VocabListFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListInclude<ExtArgs> | null;
    /**
     * Filter, which VocabList to fetch.
     */
    where: Prisma.VocabListWhereUniqueInput;
};
/**
 * VocabList findUniqueOrThrow
 */
export type VocabListFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListInclude<ExtArgs> | null;
    /**
     * Filter, which VocabList to fetch.
     */
    where: Prisma.VocabListWhereUniqueInput;
};
/**
 * VocabList findFirst
 */
export type VocabListFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListInclude<ExtArgs> | null;
    /**
     * Filter, which VocabList to fetch.
     */
    where?: Prisma.VocabListWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VocabLists to fetch.
     */
    orderBy?: Prisma.VocabListOrderByWithRelationInput | Prisma.VocabListOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VocabLists.
     */
    cursor?: Prisma.VocabListWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VocabLists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VocabLists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VocabLists.
     */
    distinct?: Prisma.VocabListScalarFieldEnum | Prisma.VocabListScalarFieldEnum[];
};
/**
 * VocabList findFirstOrThrow
 */
export type VocabListFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListInclude<ExtArgs> | null;
    /**
     * Filter, which VocabList to fetch.
     */
    where?: Prisma.VocabListWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VocabLists to fetch.
     */
    orderBy?: Prisma.VocabListOrderByWithRelationInput | Prisma.VocabListOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VocabLists.
     */
    cursor?: Prisma.VocabListWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VocabLists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VocabLists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VocabLists.
     */
    distinct?: Prisma.VocabListScalarFieldEnum | Prisma.VocabListScalarFieldEnum[];
};
/**
 * VocabList findMany
 */
export type VocabListFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListInclude<ExtArgs> | null;
    /**
     * Filter, which VocabLists to fetch.
     */
    where?: Prisma.VocabListWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VocabLists to fetch.
     */
    orderBy?: Prisma.VocabListOrderByWithRelationInput | Prisma.VocabListOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing VocabLists.
     */
    cursor?: Prisma.VocabListWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VocabLists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VocabLists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VocabLists.
     */
    distinct?: Prisma.VocabListScalarFieldEnum | Prisma.VocabListScalarFieldEnum[];
};
/**
 * VocabList create
 */
export type VocabListCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListInclude<ExtArgs> | null;
    /**
     * The data needed to create a VocabList.
     */
    data: Prisma.XOR<Prisma.VocabListCreateInput, Prisma.VocabListUncheckedCreateInput>;
};
/**
 * VocabList createMany
 */
export type VocabListCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many VocabLists.
     */
    data: Prisma.VocabListCreateManyInput | Prisma.VocabListCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * VocabList createManyAndReturn
 */
export type VocabListCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * The data used to create many VocabLists.
     */
    data: Prisma.VocabListCreateManyInput | Prisma.VocabListCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * VocabList update
 */
export type VocabListUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListInclude<ExtArgs> | null;
    /**
     * The data needed to update a VocabList.
     */
    data: Prisma.XOR<Prisma.VocabListUpdateInput, Prisma.VocabListUncheckedUpdateInput>;
    /**
     * Choose, which VocabList to update.
     */
    where: Prisma.VocabListWhereUniqueInput;
};
/**
 * VocabList updateMany
 */
export type VocabListUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update VocabLists.
     */
    data: Prisma.XOR<Prisma.VocabListUpdateManyMutationInput, Prisma.VocabListUncheckedUpdateManyInput>;
    /**
     * Filter which VocabLists to update
     */
    where?: Prisma.VocabListWhereInput;
    /**
     * Limit how many VocabLists to update.
     */
    limit?: number;
};
/**
 * VocabList updateManyAndReturn
 */
export type VocabListUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * The data used to update VocabLists.
     */
    data: Prisma.XOR<Prisma.VocabListUpdateManyMutationInput, Prisma.VocabListUncheckedUpdateManyInput>;
    /**
     * Filter which VocabLists to update
     */
    where?: Prisma.VocabListWhereInput;
    /**
     * Limit how many VocabLists to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * VocabList upsert
 */
export type VocabListUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListInclude<ExtArgs> | null;
    /**
     * The filter to search for the VocabList to update in case it exists.
     */
    where: Prisma.VocabListWhereUniqueInput;
    /**
     * In case the VocabList found by the `where` argument doesn't exist, create a new VocabList with this data.
     */
    create: Prisma.XOR<Prisma.VocabListCreateInput, Prisma.VocabListUncheckedCreateInput>;
    /**
     * In case the VocabList was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.VocabListUpdateInput, Prisma.VocabListUncheckedUpdateInput>;
};
/**
 * VocabList delete
 */
export type VocabListDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListInclude<ExtArgs> | null;
    /**
     * Filter which VocabList to delete.
     */
    where: Prisma.VocabListWhereUniqueInput;
};
/**
 * VocabList deleteMany
 */
export type VocabListDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VocabLists to delete
     */
    where?: Prisma.VocabListWhereInput;
    /**
     * Limit how many VocabLists to delete.
     */
    limit?: number;
};
/**
 * VocabList.vocabs
 */
export type VocabList$vocabsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocab
     */
    select?: Prisma.VocabSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vocab
     */
    omit?: Prisma.VocabOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabInclude<ExtArgs> | null;
    where?: Prisma.VocabWhereInput;
    orderBy?: Prisma.VocabOrderByWithRelationInput | Prisma.VocabOrderByWithRelationInput[];
    cursor?: Prisma.VocabWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VocabScalarFieldEnum | Prisma.VocabScalarFieldEnum[];
};
/**
 * VocabList.studySessions
 */
export type VocabList$studySessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudySession
     */
    select?: Prisma.StudySessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StudySession
     */
    omit?: Prisma.StudySessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudySessionInclude<ExtArgs> | null;
    where?: Prisma.StudySessionWhereInput;
    orderBy?: Prisma.StudySessionOrderByWithRelationInput | Prisma.StudySessionOrderByWithRelationInput[];
    cursor?: Prisma.StudySessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudySessionScalarFieldEnum | Prisma.StudySessionScalarFieldEnum[];
};
/**
 * VocabList without action
 */
export type VocabListDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabList
     */
    select?: Prisma.VocabListSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabList
     */
    omit?: Prisma.VocabListOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabListInclude<ExtArgs> | null;
};
//# sourceMappingURL=VocabList.d.ts.map