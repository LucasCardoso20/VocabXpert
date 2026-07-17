import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model VocabExample
 *
 */
export type VocabExampleModel = runtime.Types.Result.DefaultSelection<Prisma.$VocabExamplePayload>;
export type AggregateVocabExample = {
    _count: VocabExampleCountAggregateOutputType | null;
    _min: VocabExampleMinAggregateOutputType | null;
    _max: VocabExampleMaxAggregateOutputType | null;
};
export type VocabExampleMinAggregateOutputType = {
    id: string | null;
    vocabId: string | null;
    text: string | null;
};
export type VocabExampleMaxAggregateOutputType = {
    id: string | null;
    vocabId: string | null;
    text: string | null;
};
export type VocabExampleCountAggregateOutputType = {
    id: number;
    vocabId: number;
    text: number;
    _all: number;
};
export type VocabExampleMinAggregateInputType = {
    id?: true;
    vocabId?: true;
    text?: true;
};
export type VocabExampleMaxAggregateInputType = {
    id?: true;
    vocabId?: true;
    text?: true;
};
export type VocabExampleCountAggregateInputType = {
    id?: true;
    vocabId?: true;
    text?: true;
    _all?: true;
};
export type VocabExampleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VocabExample to aggregate.
     */
    where?: Prisma.VocabExampleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VocabExamples to fetch.
     */
    orderBy?: Prisma.VocabExampleOrderByWithRelationInput | Prisma.VocabExampleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.VocabExampleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VocabExamples from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VocabExamples.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned VocabExamples
    **/
    _count?: true | VocabExampleCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: VocabExampleMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: VocabExampleMaxAggregateInputType;
};
export type GetVocabExampleAggregateType<T extends VocabExampleAggregateArgs> = {
    [P in keyof T & keyof AggregateVocabExample]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVocabExample[P]> : Prisma.GetScalarType<T[P], AggregateVocabExample[P]>;
};
export type VocabExampleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VocabExampleWhereInput;
    orderBy?: Prisma.VocabExampleOrderByWithAggregationInput | Prisma.VocabExampleOrderByWithAggregationInput[];
    by: Prisma.VocabExampleScalarFieldEnum[] | Prisma.VocabExampleScalarFieldEnum;
    having?: Prisma.VocabExampleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VocabExampleCountAggregateInputType | true;
    _min?: VocabExampleMinAggregateInputType;
    _max?: VocabExampleMaxAggregateInputType;
};
export type VocabExampleGroupByOutputType = {
    id: string;
    vocabId: string;
    text: string;
    _count: VocabExampleCountAggregateOutputType | null;
    _min: VocabExampleMinAggregateOutputType | null;
    _max: VocabExampleMaxAggregateOutputType | null;
};
export type GetVocabExampleGroupByPayload<T extends VocabExampleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VocabExampleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VocabExampleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VocabExampleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VocabExampleGroupByOutputType[P]>;
}>>;
export type VocabExampleWhereInput = {
    AND?: Prisma.VocabExampleWhereInput | Prisma.VocabExampleWhereInput[];
    OR?: Prisma.VocabExampleWhereInput[];
    NOT?: Prisma.VocabExampleWhereInput | Prisma.VocabExampleWhereInput[];
    id?: Prisma.StringFilter<"VocabExample"> | string;
    vocabId?: Prisma.StringFilter<"VocabExample"> | string;
    text?: Prisma.StringFilter<"VocabExample"> | string;
    vocab?: Prisma.XOR<Prisma.VocabScalarRelationFilter, Prisma.VocabWhereInput>;
};
export type VocabExampleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    vocabId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    vocab?: Prisma.VocabOrderByWithRelationInput;
};
export type VocabExampleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VocabExampleWhereInput | Prisma.VocabExampleWhereInput[];
    OR?: Prisma.VocabExampleWhereInput[];
    NOT?: Prisma.VocabExampleWhereInput | Prisma.VocabExampleWhereInput[];
    vocabId?: Prisma.StringFilter<"VocabExample"> | string;
    text?: Prisma.StringFilter<"VocabExample"> | string;
    vocab?: Prisma.XOR<Prisma.VocabScalarRelationFilter, Prisma.VocabWhereInput>;
}, "id">;
export type VocabExampleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    vocabId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    _count?: Prisma.VocabExampleCountOrderByAggregateInput;
    _max?: Prisma.VocabExampleMaxOrderByAggregateInput;
    _min?: Prisma.VocabExampleMinOrderByAggregateInput;
};
export type VocabExampleScalarWhereWithAggregatesInput = {
    AND?: Prisma.VocabExampleScalarWhereWithAggregatesInput | Prisma.VocabExampleScalarWhereWithAggregatesInput[];
    OR?: Prisma.VocabExampleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VocabExampleScalarWhereWithAggregatesInput | Prisma.VocabExampleScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"VocabExample"> | string;
    vocabId?: Prisma.StringWithAggregatesFilter<"VocabExample"> | string;
    text?: Prisma.StringWithAggregatesFilter<"VocabExample"> | string;
};
export type VocabExampleCreateInput = {
    id?: string;
    text: string;
    vocab: Prisma.VocabCreateNestedOneWithoutExamplesInput;
};
export type VocabExampleUncheckedCreateInput = {
    id?: string;
    vocabId: string;
    text: string;
};
export type VocabExampleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    vocab?: Prisma.VocabUpdateOneRequiredWithoutExamplesNestedInput;
};
export type VocabExampleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vocabId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VocabExampleCreateManyInput = {
    id?: string;
    vocabId: string;
    text: string;
};
export type VocabExampleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VocabExampleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vocabId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VocabExampleListRelationFilter = {
    every?: Prisma.VocabExampleWhereInput;
    some?: Prisma.VocabExampleWhereInput;
    none?: Prisma.VocabExampleWhereInput;
};
export type VocabExampleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VocabExampleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vocabId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
};
export type VocabExampleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vocabId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
};
export type VocabExampleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vocabId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
};
export type VocabExampleCreateNestedManyWithoutVocabInput = {
    create?: Prisma.XOR<Prisma.VocabExampleCreateWithoutVocabInput, Prisma.VocabExampleUncheckedCreateWithoutVocabInput> | Prisma.VocabExampleCreateWithoutVocabInput[] | Prisma.VocabExampleUncheckedCreateWithoutVocabInput[];
    connectOrCreate?: Prisma.VocabExampleCreateOrConnectWithoutVocabInput | Prisma.VocabExampleCreateOrConnectWithoutVocabInput[];
    createMany?: Prisma.VocabExampleCreateManyVocabInputEnvelope;
    connect?: Prisma.VocabExampleWhereUniqueInput | Prisma.VocabExampleWhereUniqueInput[];
};
export type VocabExampleUncheckedCreateNestedManyWithoutVocabInput = {
    create?: Prisma.XOR<Prisma.VocabExampleCreateWithoutVocabInput, Prisma.VocabExampleUncheckedCreateWithoutVocabInput> | Prisma.VocabExampleCreateWithoutVocabInput[] | Prisma.VocabExampleUncheckedCreateWithoutVocabInput[];
    connectOrCreate?: Prisma.VocabExampleCreateOrConnectWithoutVocabInput | Prisma.VocabExampleCreateOrConnectWithoutVocabInput[];
    createMany?: Prisma.VocabExampleCreateManyVocabInputEnvelope;
    connect?: Prisma.VocabExampleWhereUniqueInput | Prisma.VocabExampleWhereUniqueInput[];
};
export type VocabExampleUpdateManyWithoutVocabNestedInput = {
    create?: Prisma.XOR<Prisma.VocabExampleCreateWithoutVocabInput, Prisma.VocabExampleUncheckedCreateWithoutVocabInput> | Prisma.VocabExampleCreateWithoutVocabInput[] | Prisma.VocabExampleUncheckedCreateWithoutVocabInput[];
    connectOrCreate?: Prisma.VocabExampleCreateOrConnectWithoutVocabInput | Prisma.VocabExampleCreateOrConnectWithoutVocabInput[];
    upsert?: Prisma.VocabExampleUpsertWithWhereUniqueWithoutVocabInput | Prisma.VocabExampleUpsertWithWhereUniqueWithoutVocabInput[];
    createMany?: Prisma.VocabExampleCreateManyVocabInputEnvelope;
    set?: Prisma.VocabExampleWhereUniqueInput | Prisma.VocabExampleWhereUniqueInput[];
    disconnect?: Prisma.VocabExampleWhereUniqueInput | Prisma.VocabExampleWhereUniqueInput[];
    delete?: Prisma.VocabExampleWhereUniqueInput | Prisma.VocabExampleWhereUniqueInput[];
    connect?: Prisma.VocabExampleWhereUniqueInput | Prisma.VocabExampleWhereUniqueInput[];
    update?: Prisma.VocabExampleUpdateWithWhereUniqueWithoutVocabInput | Prisma.VocabExampleUpdateWithWhereUniqueWithoutVocabInput[];
    updateMany?: Prisma.VocabExampleUpdateManyWithWhereWithoutVocabInput | Prisma.VocabExampleUpdateManyWithWhereWithoutVocabInput[];
    deleteMany?: Prisma.VocabExampleScalarWhereInput | Prisma.VocabExampleScalarWhereInput[];
};
export type VocabExampleUncheckedUpdateManyWithoutVocabNestedInput = {
    create?: Prisma.XOR<Prisma.VocabExampleCreateWithoutVocabInput, Prisma.VocabExampleUncheckedCreateWithoutVocabInput> | Prisma.VocabExampleCreateWithoutVocabInput[] | Prisma.VocabExampleUncheckedCreateWithoutVocabInput[];
    connectOrCreate?: Prisma.VocabExampleCreateOrConnectWithoutVocabInput | Prisma.VocabExampleCreateOrConnectWithoutVocabInput[];
    upsert?: Prisma.VocabExampleUpsertWithWhereUniqueWithoutVocabInput | Prisma.VocabExampleUpsertWithWhereUniqueWithoutVocabInput[];
    createMany?: Prisma.VocabExampleCreateManyVocabInputEnvelope;
    set?: Prisma.VocabExampleWhereUniqueInput | Prisma.VocabExampleWhereUniqueInput[];
    disconnect?: Prisma.VocabExampleWhereUniqueInput | Prisma.VocabExampleWhereUniqueInput[];
    delete?: Prisma.VocabExampleWhereUniqueInput | Prisma.VocabExampleWhereUniqueInput[];
    connect?: Prisma.VocabExampleWhereUniqueInput | Prisma.VocabExampleWhereUniqueInput[];
    update?: Prisma.VocabExampleUpdateWithWhereUniqueWithoutVocabInput | Prisma.VocabExampleUpdateWithWhereUniqueWithoutVocabInput[];
    updateMany?: Prisma.VocabExampleUpdateManyWithWhereWithoutVocabInput | Prisma.VocabExampleUpdateManyWithWhereWithoutVocabInput[];
    deleteMany?: Prisma.VocabExampleScalarWhereInput | Prisma.VocabExampleScalarWhereInput[];
};
export type VocabExampleCreateWithoutVocabInput = {
    id?: string;
    text: string;
};
export type VocabExampleUncheckedCreateWithoutVocabInput = {
    id?: string;
    text: string;
};
export type VocabExampleCreateOrConnectWithoutVocabInput = {
    where: Prisma.VocabExampleWhereUniqueInput;
    create: Prisma.XOR<Prisma.VocabExampleCreateWithoutVocabInput, Prisma.VocabExampleUncheckedCreateWithoutVocabInput>;
};
export type VocabExampleCreateManyVocabInputEnvelope = {
    data: Prisma.VocabExampleCreateManyVocabInput | Prisma.VocabExampleCreateManyVocabInput[];
    skipDuplicates?: boolean;
};
export type VocabExampleUpsertWithWhereUniqueWithoutVocabInput = {
    where: Prisma.VocabExampleWhereUniqueInput;
    update: Prisma.XOR<Prisma.VocabExampleUpdateWithoutVocabInput, Prisma.VocabExampleUncheckedUpdateWithoutVocabInput>;
    create: Prisma.XOR<Prisma.VocabExampleCreateWithoutVocabInput, Prisma.VocabExampleUncheckedCreateWithoutVocabInput>;
};
export type VocabExampleUpdateWithWhereUniqueWithoutVocabInput = {
    where: Prisma.VocabExampleWhereUniqueInput;
    data: Prisma.XOR<Prisma.VocabExampleUpdateWithoutVocabInput, Prisma.VocabExampleUncheckedUpdateWithoutVocabInput>;
};
export type VocabExampleUpdateManyWithWhereWithoutVocabInput = {
    where: Prisma.VocabExampleScalarWhereInput;
    data: Prisma.XOR<Prisma.VocabExampleUpdateManyMutationInput, Prisma.VocabExampleUncheckedUpdateManyWithoutVocabInput>;
};
export type VocabExampleScalarWhereInput = {
    AND?: Prisma.VocabExampleScalarWhereInput | Prisma.VocabExampleScalarWhereInput[];
    OR?: Prisma.VocabExampleScalarWhereInput[];
    NOT?: Prisma.VocabExampleScalarWhereInput | Prisma.VocabExampleScalarWhereInput[];
    id?: Prisma.StringFilter<"VocabExample"> | string;
    vocabId?: Prisma.StringFilter<"VocabExample"> | string;
    text?: Prisma.StringFilter<"VocabExample"> | string;
};
export type VocabExampleCreateManyVocabInput = {
    id?: string;
    text: string;
};
export type VocabExampleUpdateWithoutVocabInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VocabExampleUncheckedUpdateWithoutVocabInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VocabExampleUncheckedUpdateManyWithoutVocabInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VocabExampleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vocabId?: boolean;
    text?: boolean;
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vocabExample"]>;
export type VocabExampleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vocabId?: boolean;
    text?: boolean;
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vocabExample"]>;
export type VocabExampleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vocabId?: boolean;
    text?: boolean;
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vocabExample"]>;
export type VocabExampleSelectScalar = {
    id?: boolean;
    vocabId?: boolean;
    text?: boolean;
};
export type VocabExampleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "vocabId" | "text", ExtArgs["result"]["vocabExample"]>;
export type VocabExampleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
};
export type VocabExampleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
};
export type VocabExampleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vocab?: boolean | Prisma.VocabDefaultArgs<ExtArgs>;
};
export type $VocabExamplePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VocabExample";
    objects: {
        vocab: Prisma.$VocabPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        vocabId: string;
        text: string;
    }, ExtArgs["result"]["vocabExample"]>;
    composites: {};
};
export type VocabExampleGetPayload<S extends boolean | null | undefined | VocabExampleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload, S>;
export type VocabExampleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VocabExampleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VocabExampleCountAggregateInputType | true;
};
export interface VocabExampleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VocabExample'];
        meta: {
            name: 'VocabExample';
        };
    };
    /**
     * Find zero or one VocabExample that matches the filter.
     * @param {VocabExampleFindUniqueArgs} args - Arguments to find a VocabExample
     * @example
     * // Get one VocabExample
     * const vocabExample = await prisma.vocabExample.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VocabExampleFindUniqueArgs>(args: Prisma.SelectSubset<T, VocabExampleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VocabExampleClient<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one VocabExample that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VocabExampleFindUniqueOrThrowArgs} args - Arguments to find a VocabExample
     * @example
     * // Get one VocabExample
     * const vocabExample = await prisma.vocabExample.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VocabExampleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VocabExampleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VocabExampleClient<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VocabExample that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabExampleFindFirstArgs} args - Arguments to find a VocabExample
     * @example
     * // Get one VocabExample
     * const vocabExample = await prisma.vocabExample.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VocabExampleFindFirstArgs>(args?: Prisma.SelectSubset<T, VocabExampleFindFirstArgs<ExtArgs>>): Prisma.Prisma__VocabExampleClient<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VocabExample that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabExampleFindFirstOrThrowArgs} args - Arguments to find a VocabExample
     * @example
     * // Get one VocabExample
     * const vocabExample = await prisma.vocabExample.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VocabExampleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VocabExampleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VocabExampleClient<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more VocabExamples that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabExampleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VocabExamples
     * const vocabExamples = await prisma.vocabExample.findMany()
     *
     * // Get first 10 VocabExamples
     * const vocabExamples = await prisma.vocabExample.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const vocabExampleWithIdOnly = await prisma.vocabExample.findMany({ select: { id: true } })
     *
     */
    findMany<T extends VocabExampleFindManyArgs>(args?: Prisma.SelectSubset<T, VocabExampleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a VocabExample.
     * @param {VocabExampleCreateArgs} args - Arguments to create a VocabExample.
     * @example
     * // Create one VocabExample
     * const VocabExample = await prisma.vocabExample.create({
     *   data: {
     *     // ... data to create a VocabExample
     *   }
     * })
     *
     */
    create<T extends VocabExampleCreateArgs>(args: Prisma.SelectSubset<T, VocabExampleCreateArgs<ExtArgs>>): Prisma.Prisma__VocabExampleClient<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many VocabExamples.
     * @param {VocabExampleCreateManyArgs} args - Arguments to create many VocabExamples.
     * @example
     * // Create many VocabExamples
     * const vocabExample = await prisma.vocabExample.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VocabExampleCreateManyArgs>(args?: Prisma.SelectSubset<T, VocabExampleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many VocabExamples and returns the data saved in the database.
     * @param {VocabExampleCreateManyAndReturnArgs} args - Arguments to create many VocabExamples.
     * @example
     * // Create many VocabExamples
     * const vocabExample = await prisma.vocabExample.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many VocabExamples and only return the `id`
     * const vocabExampleWithIdOnly = await prisma.vocabExample.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VocabExampleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VocabExampleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a VocabExample.
     * @param {VocabExampleDeleteArgs} args - Arguments to delete one VocabExample.
     * @example
     * // Delete one VocabExample
     * const VocabExample = await prisma.vocabExample.delete({
     *   where: {
     *     // ... filter to delete one VocabExample
     *   }
     * })
     *
     */
    delete<T extends VocabExampleDeleteArgs>(args: Prisma.SelectSubset<T, VocabExampleDeleteArgs<ExtArgs>>): Prisma.Prisma__VocabExampleClient<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one VocabExample.
     * @param {VocabExampleUpdateArgs} args - Arguments to update one VocabExample.
     * @example
     * // Update one VocabExample
     * const vocabExample = await prisma.vocabExample.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VocabExampleUpdateArgs>(args: Prisma.SelectSubset<T, VocabExampleUpdateArgs<ExtArgs>>): Prisma.Prisma__VocabExampleClient<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more VocabExamples.
     * @param {VocabExampleDeleteManyArgs} args - Arguments to filter VocabExamples to delete.
     * @example
     * // Delete a few VocabExamples
     * const { count } = await prisma.vocabExample.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VocabExampleDeleteManyArgs>(args?: Prisma.SelectSubset<T, VocabExampleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VocabExamples.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabExampleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VocabExamples
     * const vocabExample = await prisma.vocabExample.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VocabExampleUpdateManyArgs>(args: Prisma.SelectSubset<T, VocabExampleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VocabExamples and returns the data updated in the database.
     * @param {VocabExampleUpdateManyAndReturnArgs} args - Arguments to update many VocabExamples.
     * @example
     * // Update many VocabExamples
     * const vocabExample = await prisma.vocabExample.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more VocabExamples and only return the `id`
     * const vocabExampleWithIdOnly = await prisma.vocabExample.updateManyAndReturn({
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
    updateManyAndReturn<T extends VocabExampleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VocabExampleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one VocabExample.
     * @param {VocabExampleUpsertArgs} args - Arguments to update or create a VocabExample.
     * @example
     * // Update or create a VocabExample
     * const vocabExample = await prisma.vocabExample.upsert({
     *   create: {
     *     // ... data to create a VocabExample
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VocabExample we want to update
     *   }
     * })
     */
    upsert<T extends VocabExampleUpsertArgs>(args: Prisma.SelectSubset<T, VocabExampleUpsertArgs<ExtArgs>>): Prisma.Prisma__VocabExampleClient<runtime.Types.Result.GetResult<Prisma.$VocabExamplePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of VocabExamples.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabExampleCountArgs} args - Arguments to filter VocabExamples to count.
     * @example
     * // Count the number of VocabExamples
     * const count = await prisma.vocabExample.count({
     *   where: {
     *     // ... the filter for the VocabExamples we want to count
     *   }
     * })
    **/
    count<T extends VocabExampleCountArgs>(args?: Prisma.Subset<T, VocabExampleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VocabExampleCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a VocabExample.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabExampleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VocabExampleAggregateArgs>(args: Prisma.Subset<T, VocabExampleAggregateArgs>): Prisma.PrismaPromise<GetVocabExampleAggregateType<T>>;
    /**
     * Group by VocabExample.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabExampleGroupByArgs} args - Group by arguments.
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
    groupBy<T extends VocabExampleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VocabExampleGroupByArgs['orderBy'];
    } : {
        orderBy?: VocabExampleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VocabExampleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVocabExampleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the VocabExample model
     */
    readonly fields: VocabExampleFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for VocabExample.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__VocabExampleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    vocab<T extends Prisma.VocabDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VocabDefaultArgs<ExtArgs>>): Prisma.Prisma__VocabClient<runtime.Types.Result.GetResult<Prisma.$VocabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the VocabExample model
 */
export interface VocabExampleFieldRefs {
    readonly id: Prisma.FieldRef<"VocabExample", 'String'>;
    readonly vocabId: Prisma.FieldRef<"VocabExample", 'String'>;
    readonly text: Prisma.FieldRef<"VocabExample", 'String'>;
}
/**
 * VocabExample findUnique
 */
export type VocabExampleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleInclude<ExtArgs> | null;
    /**
     * Filter, which VocabExample to fetch.
     */
    where: Prisma.VocabExampleWhereUniqueInput;
};
/**
 * VocabExample findUniqueOrThrow
 */
export type VocabExampleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleInclude<ExtArgs> | null;
    /**
     * Filter, which VocabExample to fetch.
     */
    where: Prisma.VocabExampleWhereUniqueInput;
};
/**
 * VocabExample findFirst
 */
export type VocabExampleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleInclude<ExtArgs> | null;
    /**
     * Filter, which VocabExample to fetch.
     */
    where?: Prisma.VocabExampleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VocabExamples to fetch.
     */
    orderBy?: Prisma.VocabExampleOrderByWithRelationInput | Prisma.VocabExampleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VocabExamples.
     */
    cursor?: Prisma.VocabExampleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VocabExamples from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VocabExamples.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VocabExamples.
     */
    distinct?: Prisma.VocabExampleScalarFieldEnum | Prisma.VocabExampleScalarFieldEnum[];
};
/**
 * VocabExample findFirstOrThrow
 */
export type VocabExampleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleInclude<ExtArgs> | null;
    /**
     * Filter, which VocabExample to fetch.
     */
    where?: Prisma.VocabExampleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VocabExamples to fetch.
     */
    orderBy?: Prisma.VocabExampleOrderByWithRelationInput | Prisma.VocabExampleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VocabExamples.
     */
    cursor?: Prisma.VocabExampleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VocabExamples from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VocabExamples.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VocabExamples.
     */
    distinct?: Prisma.VocabExampleScalarFieldEnum | Prisma.VocabExampleScalarFieldEnum[];
};
/**
 * VocabExample findMany
 */
export type VocabExampleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleInclude<ExtArgs> | null;
    /**
     * Filter, which VocabExamples to fetch.
     */
    where?: Prisma.VocabExampleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VocabExamples to fetch.
     */
    orderBy?: Prisma.VocabExampleOrderByWithRelationInput | Prisma.VocabExampleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing VocabExamples.
     */
    cursor?: Prisma.VocabExampleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VocabExamples from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VocabExamples.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VocabExamples.
     */
    distinct?: Prisma.VocabExampleScalarFieldEnum | Prisma.VocabExampleScalarFieldEnum[];
};
/**
 * VocabExample create
 */
export type VocabExampleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleInclude<ExtArgs> | null;
    /**
     * The data needed to create a VocabExample.
     */
    data: Prisma.XOR<Prisma.VocabExampleCreateInput, Prisma.VocabExampleUncheckedCreateInput>;
};
/**
 * VocabExample createMany
 */
export type VocabExampleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many VocabExamples.
     */
    data: Prisma.VocabExampleCreateManyInput | Prisma.VocabExampleCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * VocabExample createManyAndReturn
 */
export type VocabExampleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * The data used to create many VocabExamples.
     */
    data: Prisma.VocabExampleCreateManyInput | Prisma.VocabExampleCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * VocabExample update
 */
export type VocabExampleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleInclude<ExtArgs> | null;
    /**
     * The data needed to update a VocabExample.
     */
    data: Prisma.XOR<Prisma.VocabExampleUpdateInput, Prisma.VocabExampleUncheckedUpdateInput>;
    /**
     * Choose, which VocabExample to update.
     */
    where: Prisma.VocabExampleWhereUniqueInput;
};
/**
 * VocabExample updateMany
 */
export type VocabExampleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update VocabExamples.
     */
    data: Prisma.XOR<Prisma.VocabExampleUpdateManyMutationInput, Prisma.VocabExampleUncheckedUpdateManyInput>;
    /**
     * Filter which VocabExamples to update
     */
    where?: Prisma.VocabExampleWhereInput;
    /**
     * Limit how many VocabExamples to update.
     */
    limit?: number;
};
/**
 * VocabExample updateManyAndReturn
 */
export type VocabExampleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * The data used to update VocabExamples.
     */
    data: Prisma.XOR<Prisma.VocabExampleUpdateManyMutationInput, Prisma.VocabExampleUncheckedUpdateManyInput>;
    /**
     * Filter which VocabExamples to update
     */
    where?: Prisma.VocabExampleWhereInput;
    /**
     * Limit how many VocabExamples to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * VocabExample upsert
 */
export type VocabExampleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleInclude<ExtArgs> | null;
    /**
     * The filter to search for the VocabExample to update in case it exists.
     */
    where: Prisma.VocabExampleWhereUniqueInput;
    /**
     * In case the VocabExample found by the `where` argument doesn't exist, create a new VocabExample with this data.
     */
    create: Prisma.XOR<Prisma.VocabExampleCreateInput, Prisma.VocabExampleUncheckedCreateInput>;
    /**
     * In case the VocabExample was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.VocabExampleUpdateInput, Prisma.VocabExampleUncheckedUpdateInput>;
};
/**
 * VocabExample delete
 */
export type VocabExampleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleInclude<ExtArgs> | null;
    /**
     * Filter which VocabExample to delete.
     */
    where: Prisma.VocabExampleWhereUniqueInput;
};
/**
 * VocabExample deleteMany
 */
export type VocabExampleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VocabExamples to delete
     */
    where?: Prisma.VocabExampleWhereInput;
    /**
     * Limit how many VocabExamples to delete.
     */
    limit?: number;
};
/**
 * VocabExample without action
 */
export type VocabExampleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VocabExample
     */
    select?: Prisma.VocabExampleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VocabExample
     */
    omit?: Prisma.VocabExampleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VocabExampleInclude<ExtArgs> | null;
};
//# sourceMappingURL=VocabExample.d.ts.map