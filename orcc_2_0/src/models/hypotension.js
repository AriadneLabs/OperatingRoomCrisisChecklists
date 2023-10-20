export let model = {};
model.page = {
    pageNumber: '10',
    title: 'Hypotension',
    subTitle: 'Unexplained drop in blood pressure refractory to initial treatment'
};

model.stepSets = [
    /* 1st column */
    [
        {
            id: '100',
            main: 'Call for help',
            subContent: {
                contentType: 'action-list',
                items: [
                    '<b>Ask</b>: <em>"Who will be the crisis manager?"</em>',
                    'Crisis manager designates checklist reader'
                ]
            },
            editable: true,
            info: 'You may add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.'
        },

        {
            id: '101',
            main: 'Check...',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Measurement artifact',
                    'EtCO2 - adequacy of perfusion',
                    {
                        text: 'Heart rate',
                        subList: [
                            'If BRADYCARDIA, <span class="screen-click-only" onclick="navigateTo(\'bradycardia\')"><em>go to</em> CHKLST 03</span>',
                            'If TACHYCARDIA, <span class="screen-click-only" onclick="navigateTo(\'tachycardia\')"><em>go to</em> CHKLST 16</span>',
                        ],
                    },
                    {
                        text: 'Rhythm',
                        subList: [
                            'If PEA, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_pea_asystole\')"><em>go to</em> CHKLST 04</span>',
                            'If VF / VT, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_vf_vt\')"><em>go to</em> CHKLST 05</span>',
                        ],
                    },
                ]
            },
        },

        {
            id: '102',
            main: 'Inspect surgical field for bleeding',
            subContent: {
                contentType: 'action-list',
                items: [
                    'If BLEEDING, <span class="screen-click-only" onclick="navigateTo(\'hemorrhage\')"><em>go to</em> CHKLST 09</span>'
                ]
            },
        },

        {
            id: '103',
            main: 'Run IV fluids wide open',
        },

        {
            id: '104',
            main: 'Give vasopressors <span class="plain-text">and titrate to response</span>',
            subContent: {
                contentType: 'action-list',
                items: [
                    {
                        text: 'MILD hypotension:',
                        subList: [
                            'Give ePHEDrine or phenylephrine',
                        ],
                    },
                    {
                        text: 'SIGNIFICANT / REFRACTORY hypotension:',
                        subList: [
                            'Administer norepinephrine; consider escalating to add vasopressin or EPINEPHrine',
                        ],
                    },
                ]
            },
        },

        {
            id: '105',
            main: 'Turn FiO<sub>2</sub> to 100% and minimize volatile anesthetics',
        },
    ], [
        {
            id: '106',
            main: 'Consider...',
            subContent: {
                contentType: 'bullet-list',
                items: [
                    'Trendelenburg position',
                    'Additional IV access',
                    'Arterial line',
                    {
                        text: 'Point of care ultrasound or echocardiography for diagnosis',
                        editable: true,
                        deletable: true,
                        info: 'You may add details about how to obtain a TEE,  TTE , or POCUS at your facility here, such as phone numbers or paging groups. If you do not have access to TEE, TTE, or POCUS, delete this bullet point.',
                    },
                    {
                        text: 'Mechanical circulatory support',
                        editable: true,
                        deletable: true,
                        info: 'You may add details about how to coordinate mechanical circulatory support (ECMO, bypass, VAD, IABP) at your facility here, such as phone numbers or paging groups. If you do not have access to mechanical circulatory support, delete this bullet point.'
                    },
                ]
            },
        },

        // {
        //     id: '107',
        //     main: 'Consider causes...<br>',
        //     subContent: {
        //         contentType: 'bullet-list',
        //         items: [
        //             {
        //                 beforeContent: 'Volume / Vasoplegia (Vasodilation',
        //                 list: [
        //                     'Occult bleeding',
        //                     'Anaphylaxis, <span class="screen-click-only" onclick="navigateTo(\'anaphylaxis\')"><em>go to</em> CHKLST 02</span>',
        //                     'Drug overdose or error',
        //                     'Sepsis',
        //                     'Hypoxia, <span class="screen-click-only" onclick="navigateTo(\'hypoxia\')"><em>go to</em> CHKLST 11</span>',
        //                     'Hypocalcemia',
        //                     'Adrenal insufficiency',
        //                     'Reperfusion',
        //                 ]
        //             },
        //             {
        //                 beforeContent: 'Obstructed Blood Flow',
        //                 list: [
        //                     'Mechanical or surgical manipulation',
        //                     'Insufflation during laparoscopy',
        //                     'Vascular compression',
        //                     'Tamponade',
        //                     'Increased PEEP',
        //                     'Pneumothorax',
        //                 ]
        //             },
        //             {
        //                 beforeContent: 'Cardiac Function',
        //                 list: [
        //                     'Myocardial ischemia, <span class="screen-click-only" onclick="navigateTo(\'myocardial_ischemia\')"><em>go to</em> CHKLST 14</span>',
        //                     'Heart failure',
        //                     'Emboli (pulmonary, fat, amniotic, CO2, air), <span class="screen-click-only" onclick="navigateTo(\'air_embolism\')"><em>go to</em> CHKLST 01</span>',
        //                     'Bone cementing',
        //                     'Malignant hyperthermia, <span class="screen-click-only" onclick="navigateTo(\'malignant_hyperthermia\')"><em>go to</em> CHKLST 13</span>',
        //                 ]
        //             },
        //         ]
        //     },
        // },
    ]
];

model.references = {
    'drug-doses': {
        id: 'drug-doses',
        header: 'DRUG DOSES & treatments',
        layout: 'vertical-sections-noseparator',
        sections: [
            {
                contentType: 'drug-table',
                tableWidth: 'narrow',
                drugs: [
                    {
                        options: [
                            {
                                name: 'ePHEDrine:',
                                value: ['5 - 25 mg IV <br><em>- or -</em>', '50 mg IM x 1'],
                            },
                        ],
                    },
                    {
                        options: [
                            {
                                name: 'Phenylephrine:',
                                value: [
                                    'BOLUS: 50 - 200 MCG IV',
                                    {
                                        defaultValue: '1 mL of 10 mg/mL in 100 mL = 100 MCG/mL',
                                        selectable: true,
                                        deletable: true,
                                        valueOptions: ['1 mL of 10 mg/mL in 100 mL = 100 MCG/mL', '1 mL of 10mg/mL in 250 mL = 40 MCG/mL', '2 mL of 10mg/mL in 250 mL = 80 MCG/mL', '2 mL of 10 mg/mL in 100 mL = 200 MCG/mL'],
                                        info: 'This is a drop down menu where you can select from methods of preparing dilute Phenylephrine for bolus administration. You can delete the dilution instructions if desired.'
                                    },
                                    {
                                        defaultValue: 'INFUSION: 0.5-1 MCG/kg/min',
                                        selectable: true,
                                        valueOptions: ['INFUSION: 0.5-1 MCG/kg/min', 'INFUSION: 30-80 MCG/min'],
                                        info: 'This is a drop down menu where you can select from dose ranges for MCG/min or MCG/kg/min.'
                                    },
                                ],

                            },
                        ],
                    },
                    {
                        options: [
                            {
                                name: 'Norepinephrine:',
                                value: [
                                    'BOLUS: 5 - 20 MCG IV',
                                    {
                                        defaultValue: '1 mL of 1mg/mL in 100 mL = 10 MCG/mL',
                                        selectable: true,
                                        deletable: true,
                                        valueOptions: ['1 mL of 1mg/mL in 100 mL = 10 MCG/mL', '4 mL of 1mg/mL in 250 mL = 16 MCG/mL', '3 mL of 1 mg/mL in 250 mL = 12 MCG/mL', '2 mL of 1 mg/mL in 250 mL = 8 MCG/mL', '1 mL of 1mg/mL in 250 mL = 4 MCG/mL', '2 mL of 1mg/mL in 100 mL = 20 MCG/mL'],
                                        info: 'This is a drop down menu where you can select from methods of preparing dilute Norepinephrine for bolus administration. You can delete the dilution instructions if desired.'
                                    },
                                    {
                                        defaultValue: 'INFUSION: 0.05 - 0.5 MCG/kg/min',
                                        selectable: true,
                                        valueOptions: ['INFUSION: 2 - 20 MCG/min', 'INFUSION: 0.05 - 0.5 MCG/kg/min'],
                                        info: 'This is a drop down menu where you can select from dose ranges for MCG/min or MCG/kg/min.'
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        options: [
                            {
                                name: 'Vasopressin:',
                                value: [
                                    'BOLUS: 1 - 2 units IV',
                                    {
                                        defaultValue: '1 mL of 20 units/mL in 19 mL = 1 unit/mL',
                                        deletable: true,
                                        info: 'You can delete this dilution instruction if desired.'
                                    },                                    
                                    'INFUSION: 0.01 - 0.04 units/min',                                    
                                ],
                            },
                        ],
                    },
                    {
                        options: [
                            {
                                name: 'EPINEPHrine:',
                                value: [
                                    'BOLUS: 4 - 10 MCG IV',
                                    {
                                        defaultValue: '1 mg in 100 mL = 10 MCG/mL',
                                        selectable: true,
                                        deletable: true,
                                        valueOptions: ['1 mg in 100 mL = 10 MCG/mL', '2mg in 100 mL = 20 MCG/mL', '1 mg in 250 mL = 4 MCG/mL', '2 mg in 250 mL = 8 MCG/mL', '1 mL of 100 MCG/mL in 9 mL = 10 MCG/mL'],
                                        info: 'This is a drop down menu where you can select from methods of preparing dilute EPINEPHrine for bolus administration. You can delete the dilution instructions if desired.'
                                    },
                                    {
                                        defaultValue: 'INFUSION: 0.01 - 0.1 MCG/kg/min',
                                        selectable: true,
                                        valueOptions: ['INFUSION: 1-10 MCG/min', 'INFUSION: 0.01 - 0.1 MCG/kg/min'],
                                        info: 'This is a drop down menu where you can select from dose ranges for MCG/min or MCG/kg/min.'
                                    },
                                ],

                            },
                        ],
                    },
                ],
            },
            {
                header: 'REFRACTORY VASOPLEGIA treatment',
                contentType: 'drug-table',
                drugs: [
                    {
                        options: [
                            {
                                name: 'Methylene Blue',
                                value: ['1 - 2 mg/kg in 100mL NS', 'over 20 - 60 minutes'],
                            },
                        ],
                        afterContent: 'Consider pharmacy consultation',
                    },
                    {
                        options: [
                            {
                                name: 'Hydrocortisone',
                                value: '100 mg IV',
                            }
                        ]
                    },
                ],
            },
            {
                header: 'HYPOCALCEMIA treatment',
                contentType: 'drug-table',
                drugs: [
                    {
                        options: [
                            {
                                name: 'Calcium Gluconate<br><em>- or -</em><br>Calcium Chloride',
                                value: '1 - 3 g IV<br><br>0.5 - 1 g IV',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    'differential-diagnosis': {
        id: 'differential-diagnosis',
        header: 'DIFFERENTIAL diagnosis',
        layout: 'horizontal-sections-noseparator',
        sections: [
            {
                header: '',
                contentType: 'text',
                contentItems: [
                    '<b>Volume / Vasoplegia (Vasodilation)</b>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Occult bleeding</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Anaphylaxis, <span class="screen-click-only" onclick="navigateTo(\'anaphylaxis\')"><em>go to</em> CHKLST 02</span></div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Drug overdose or error</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Sepsis</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Hypoxia, <span class="screen-click-only" onclick="navigateTo(\'hypoxia\')"><em>go to</em> CHKLST 11</span></a></div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Hypocalcemia</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Adrenal insufficienc</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Obesity / positioning</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Reperfusion</div></div>',
                    '<b>Obstructed Blood Flow</b>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Mechanical or surgical manipulation</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Insufflation during laparoscopy</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Vascular compression</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Tamponade</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Increased PEEP</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Pneumothorax</div></div>',
                    '<b>Cardiac Function</b>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Myocardial ischemia, <span class="screen-click-only" onclick="navigateTo(\'myocardial_ischemia\')"><em>go to</em> CHKLST 14</span></div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Heart failure</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Emboli (pulmonary, fat, amniotic, CO<sub>2</sub>, air), <span class="screen-click-only" onclick="navigateTo(\'air_embolism\')"><em>go to</em> CHKLST 01</span></div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Bone cementing</div></div>',
                    '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Malignant hyperthermia, <span class="screen-click-only" onclick="navigateTo(\'malignant_hyperthermia\')"><em>go to</em> CHKLST 13</span></div></div>'


                ]
            },
        ],
    },
};