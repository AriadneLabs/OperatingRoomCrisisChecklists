export let model = {};
model.page = {
    pageNumber: 14,
    title: 'Myocardial Ischemia',
    subTitle: 'Chest Pain, Shortness of Breath, ST Elevation or Depression, Ventricular Arrhythmias',
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
                    'Crisis manager designates checklist reader',
                ]
            },
            editable: true,
            info: 'You may add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.'
        },
        {
            id: '101',
            main: 'Increase oxygen delivery <span class="plain-text">and</span> decrease oxygen demand',
            subContent: {
                contentType: 'action-list',
                items: [
                    {
                        text: '<em>Increase Supply:</em>',
                        subList: [
                            '100% FiO<sub>2</sub>',
                            'Correct anemia <b>(goal hgb 7-9 g/dL)</b>',
                            'Correct hypotension (<span class="screen-click-only" onclick="navigateTo(\'hypotension\')">see CHKLST 10</span>)',
                        ],
                    },
                    {
                        text: '<em>Decrease Demand:</em>',
                        subList: [
                            'Correct tachycardia - <b>caution in RCA ischemia (II, III, aVF)</b>',
                            'Correct hypertension',
                            'Restore sinus rhythm (<span class="screen-click-only" onclick="navigateTo(\'tachycardia\')">see CHKLST 16)</span>',
                        ],
                    },
                ]
            },
        },
        {
            id: '102',
            main: 'Obtain 12-lead EKG <span>and</span> send troponin levels',
        },
        {
            id: '103',
            main: 'Consult cardiology',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Consideration of anticoagulation and/or antiplatelet therapy',
                    'Consideration of thrombolysis or cardiac catheterization',
                ]
            },
            editable: true,
            info: 'You may add details as appropriate for how to obtain a cardiology consult or cath lab activation at your institution.'
        },
        {
            id: '104',
            main: 'Discuss clinical condition with surgical team',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Safe to abort surgery?',
                    'Safe to consider anticoagulation and/or antiplatelet therapy?',
                ]
            }
        },
        {
            id: '105',
            main: 'Consider hemodynamic monitoring',
            subContent: {
                contentType: 'action-list',
                items: [
                    'If ongoing hemodynamic instability, arterial line',
                    'If persistent vasopressor requirement, central line',
                    'If evidence of cardiogenic shock, non-invasive cardiac output monitor or PA catheter',
                ]
            }
        },
        {
            id: '106',
            main: 'Consider TEE or TTE if ongoing hemodynamic instability',
            editable: true,
            deletable: true,
            info: 'You may add details about how to obtain a TEE or TTE at your facility here, such as phone numbers or paging groups. If you do not have access to TEE or TTE, delete this bullet point.'
        },

        {
            id: '107',
            main: 'Consider ICU admission',
        },
    ],
];

model.references = {
    'differential-diagnosis': {
        id: 'differential-diagnosis',
        header: 'DIFFERENTIAL diagnosis',
        layout: 'vertical-sections',
        sections: [
            {
                contentType: 'text',
                contentItems: [
                    'Coronary artery disease with acute thrombus',
                    'Coronary artery disease with demand ischemia',
                    'Coronary artery embolism',
                    'Local Anesthetic Systemic Toxicity (<span class="screen-click-only" onclick="navigateTo(\'last\')">CHKLST 12</span>)',
                    'Severe hypoxia (<span class="screen-click-only" onclick="navigateTo(\'hypoxia\')">CHKLST 11</span>)',
                ],
            },
        ]
    },

    'critical-changes': {
        id: 'critical-changes',
        header: 'Critical CHANGES',
        layout: 'vertical-sections',
        sections: [
            {
                contentType: 'text',
                contentItems: [
                    'If <b>PEA</b> develops, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_pea_asystole\')"><em>go to</em> CHKLST 04</span>',
                    'If <b>VF/VT</b> develops, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_vf_vt\')"><em>go to</em> CHKLST 05</span>',
                ],
            },
        ]
    },

    'drug-doses': {
        id: 'drug-doses',
        header: 'DRUG DOSES & treatments',
        layout: 'vertical-sections',
        sections: [
            {
                contentType: 'drug-table',
                drugs: [
                    {
                        options: [
                            {
                                name: 'Nitroglycerin',
                                value: '0.5 - 5 MCG/kg/min',
                            },
                            {
                                name: 'Aspirin',
                                value: '325 mg PO/PR x1 dose',
                            },
                            {
                                name: 'Heparin',
                                value: '4000 - 5000 units IV push',
                            },
                            {
                                name: 'Norepinephrine',
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
                                    }
                                ]
                            },
                            {
                                name: 'EPINEPHrine',
                                value: ['BOLUS: 4 - 10 MCG IV',
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
                                        valueOptions: ['INFUSION: 0.01 - 0.1 MCG/kg/min', 'INFUSION: 1 - 10 MCG/min'],
                                        info: 'This is a drop down menu where you can select from dose ranges for MCG/min or MCG/kg/min.'
                                    }
                                ],
                            },
                            {
                                name: 'Esmolol',
                                value: '50 - 300 MCG/kg/min',
                            },
                            {
                                name: 'Metoprolol',
                                value: '5 - 20 mg IV',
                            },
                        ],
                    },
                ],
            },
        ],
    },
};