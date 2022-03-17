export default {
    // 愿意进行筛查原因
    willingReason: [
        { label: '工作忙碌，抽不出时间前往筛查地点；', id: 0 },
        { label: '想在级别高的医疗机构做筛查(二级、三级医院等)；', id: 1 },
        { label: '居住地点距筛查地点远，不方便；', id: 2 },
        { label: '其他', id: 3 }
    ],
    // 不愿意筛查原因
    unwillingReason: [
        { label: '认为自己身体现在没有问题，想在感到身体不适或异常后再做检查；', id: 0 },
        { label: '单位组织的体检包含慢阻肺/哮喘相关检查；', id: 1 },
        { label: '担心筛查有风险/危险(呼气造成喘憋等情况发生)；', id: 2 },
        { label: '居住地点距筛查地点远；', id: 3 },
        { label: '其他', id: 4 }
    ],
    // 居住地所属
    addressTypeList: [
        { label: '城市', value: 1 },
        { label: '农村', value: 2 }
    ],
    // 保险类型
    insuranceCheckbox: [
        { label: '城镇职工基本医疗保险' },
        { label: '城镇居民基本医疗保险' },
        { label: '公费医疗' },
        { label: '新型农村合作医疗' },
        { label: '商业医疗保险' },
        { label: '全自费' },
        { label: '贫困救助' },
        { label: '其他社会保险' },
        { label: '其他付费方式' }
    ],
    // 家属
    contactList: [
        { label: '0', value: '子女' },
        { label: '1', value: '父母' },
        { label: '2', value: '夫妻' }
    ],
    // 家庭月均收入
    monthlyFamilyIncomeEach: [
        { label: 1, value: '低于2000元' },
        { label: 2, value: '2000-5000元' },
        { label: 3, value: '5000-10000元' },
        { label: 4, value: '高于10000元' }
    ],
    // 性别
    genderList: [
        { label: 1, value: '男' },
        { label: 2, value: '女' },
        { label: 9, value: '其他' }
    ],
    // 是否
    isTrueList: [
        { label: 1, value: '是' },
        { label: 0, value: '否' }
    ],
    // 诊断检查
    examineList: [
        { label: 0, value: '0' },
        { label: 1, value: '1' },
        { label: 2, value: '2' },
        { label: 3, value: '3' },
        { label: 4, value: '4' },
        { label: 5, value: '5' }
    ],
    // mMRC评价等级
    mMRCLevel: [
        { label: 0, value: '只有在剧烈运动时才感到呼吸困难' },
        { label: 1, value: '在平地急行爬楼梯或者爬小山是感到呼吸困难' },
        { label: 2, value: '因为气短回避同龄人走得慢，或按自己的步伐行走时需要停下来休息' },
        { label: 3, value: '平地行走100米或走几分钟后需要停下来休息' },
        { label: 4, value: '因为严重呼吸困难以至于不能离开家或者影响到穿衣或脱衣' }
    ],
    mMRscore: [
        { label: 0, value: '急性加重次数<2' },
        { label: 1, value: '急性加重次数>=2' }
    ],
    // cat总得分
    totalScore: [
        { label: 0, value: '>=10分' },
        { label: 1, value: '<10分' }
    ],
    // 学历
    degreeList: [
        { label: '小学及以下', value: '小学及以下' },
        { label: '初中', value: '初中' },
        { label: '高中', value: '高中' },
        { label: '中专', value: '中专' },
        { label: '大专', value: '大专' },
        { label: '大学', value: '大学' },
        { label: '硕士及以上', value: '硕士及以上' }
    ],
    // 是否愿意
    isScreening: [
        { label: 1, value: '愿意' },
        { label: 0, value: '不愿意' }
    ],
    willingReasonlist: [
        {
            list:
                [{ label: '认为自己身体现在没有问题，想在感到身体不适或异常后再做检查；', id: 0 }, { label: '单位组织的体检包含慢阻肺/哮喘相关检查；', id: 1 }, { label: '担心筛查有风险/危险(呼气造成喘憋等情况发生)；', id: 2 }, { label: '居住地点距筛查地点远；', id: 3 }, { label: '其他', id: 4 }]
        },
        {
            list:
                [{ label: '工作忙碌，抽不出时间前往筛查地点；', id: 0 }, { label: '想在级别高的医疗机构做筛查(二级、三级医院等)；', id: 1 }, { label: '居住地点距筛查地点远，不方便；', id: 2 }, { label: '其他', id: 3 }]
        }
    ]
}
