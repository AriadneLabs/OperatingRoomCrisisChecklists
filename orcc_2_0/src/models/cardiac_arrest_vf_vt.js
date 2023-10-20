export let model = {};
model.page = {
    pageNumber: '05',
    title: 'Adult Cardiac Arrest – VF/VT',
    subTitle: 'Shockable pulseless cardiac arrest'
};

model.stepSets = [
    /* 1st column */
    [
        {
            id: '100',
            main: 'Call for help and a code cart',
            editable: true,
            info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.',
            subContent: {
                contentType: 'action-list',
                items: [
                    '<b>Ask</b>: <em>"Who will be the crisis manager?"</em>',
                    '<b>Say</b>: <em>"Shock patient as soon as the defibrillator arrives"</em>',
                    'Crisis manager assigns roles (see ROLE assignments box)'
                ]
            }
        },
        {
            id: '101',
            main: 'Put backboard under patient',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Turn supine as soon as possible, but do not delay the start of compressions'
                ]
            }
        },
        {
            id: '102',
            main: 'Turn FiO<sub>2</sub> to 100%; turn off volatile anesthetics'
        },
        {
            id: '103',
            main: 'Start CPR - defibrillation - assessment cycle',
            subContent: {
                contentType: 'action-list',
                items: [
                    {
                        text: '<b>Perform high-quality CPR</b>',
                        subList: [
                            '"Hard and fast" about 100 – 120 compressions/min to depth ≥ 2 inches',
                            'Ensure full chest recoil with minimal interruptions',
                            {
                                text: '10 breaths/minute; do not over-ventilate',
                                subList: [
                                    'Bag-mask ventilation until able to place endotracheal tube'
                                ]
                            },
                        ],
                    },
                    {
                        text: '<b>Defibrillate</b>',
                        subList: [
                            'Shock at highest setting',
                            'Resume CPR immediately after shock',
                        ],
                    },
                    {
                        text: '<b>Give EPINEPHrine</b>',
                        subList: [
                            'Repeat EPINEPHrine every 3 – 5 minutes',
                        ],
                    },
                    '<b>Give antiarrhythmics for refractory VF/VT after 2 shocks</b>',
                    {
                        text: '<b>Assess every 2 minutes</b>',
                        subList: [
                            'Change CPR compression provider',
                            {
                                text: 'Check ETCO<sub>2</sub>',
                                subList: [
                                    'If: <10 mm Hg, evaluate CPR technique',
                                    'If: Sudden increase to >40 mm Hg, may indicate return of spontaneous circulation'
                                ]
                            },
                            'Treat reversible causes, consider reading aloud differential diagnoses',
                            {
                                text: 'Check rhythm; if rhythm organized, check pulse',
                                subList: [
                                    'If: VF/VT continues: Resume CPR cycles (restart Step 4)',
                                    'If: Asystole/PEA: <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_pea_asystole\')"><em>go to</em> CHKLST 04</span>'
                                ]
                            },
                        ],
                    },
                ]
            }
        },
        {
            id: '104',
            main: 'Consider ECMO',
            editable: true,
            deletable: true,
            info: 'Please add details about how to coordinate ECMO at your facility here, such as phone numbers or paging groups. If you do not have access to ECMO, delete this bullet point.'
        },
    ],
];

model.references = {
    'drug-doses': {
        id: 'drug-doses',
        header: 'DRUG DOSES & treatments',
        layout: 'vertical-sections-noseparator',
        sections: [
            {
                contentType: 'drug-table',
                drugs: [
                    {
                        options: [
                            {
                                name: 'EPINEPHrine',
                                value: '1 mg IV, repeat every 3 – 5 minutes',
                            },
                        ],
                    },

                ],
            },
            {
                header: 'ANTIARRHYTHMICS',
                contentType: 'drug-table',
                drugs: [
                    {
                        options: [
                            {
                                name: 'Amiodarone',
                                value: ['1st dose: 300 mg IV', '2nd dose: 150 mg IV'],
                            },
                            {
                                name: 'Lidocaine',
                                value: ['1st dose: 1 - 1.5 mg/kg', '2nd dose: 0.5 - 0.75 mg/kg'],
                            },
                            {
                                name: 'Magnesium',
                                value: '2 - 4 g IV for <b><em>Torsades de Pointes</em></b>',
                            },
                        ],
                    },

                ],
            },
        ],
    },

    'defibrillator-instructions': {
        id: 'defibrillator-instructions',
        header: 'DEFIBRILLATOR instructions',
        layout: 'vertical-sections',
        sections: [
            {
                contentType: 'numbered-list',
                contentItems: [
                    {
                        main: 'Place electrodes on chest',
                        deletable: true,
                    },
                    {
                        main: 'Turn defibrillator ON, set to DEFIB mode, and set ENERGY LEVEL. <u>Biphasic</u>: Follow manufacturer recommendation. (If unknown, use highest setting.) <u>Monophasic</u>: 360J',
                        deletable: true,
                    },
                    {
                        main: 'Deliver shock: press CHARGE, then press SHOCK',
                        deletable: true,
                    }
                ],
                editable: true,
                info: 'Please edit instructions for use to be specific to your institution’s device(s).'
            },
        ]
    },

    'differential-diagnosis': {
        id: 'differential-diagnosis',
        header: 'DIFFERENTIAL diagnosis',
        layout: 'horizontal-sections-noseparator',
        sections: [
            {
                contentType: 'text',
                contentItems: [
                    'Hypovolemia',
                    'Hyper- or hypokalemia',
                    'Tamponade',
                    'Tension pneumothorax',
                    'Auto-PEEP',
                    'Embolism',
                    'High neuraxial',
                    'Intra-abdominal hypertension',
                ],
            },
            {
                contentType: 'text',
                contentItems: [
                    '<span class="screen-click-only" onclick="navigateTo(\'myocardial_ischemia\')">Myocardial ischemia (CHKLST 14)</span>',
                    'Acidosis',
                    '<span class="screen-click-only" onclick="navigateTo(\'hypoxia\')">Hypoxia (CHKLST 11)</span>',
                    'Hypoglycemia',
                    '<span class="screen-click-only" onclick="navigateTo(\'last\')">LAST (CHKLST 12)</span>',
                ],
            },
        ]
    },

    'role-assignments': {
        id: 'role-assignments',
        header: 'ROLE assignments',
        layout: 'horizontal-sections-noseparator',
        sections: [
            {
                contentType: 'text',
                contentItems: [
                    'Chest compressions',
                    'Airway',
                    'Vascular access',
                    'Documentation',
                ],
            },
            {
                contentType: 'text',
                contentItems: [
                    'Code cart',
                    'Time keeping',
                    'Checklist reader',
                ],
            },
        ]
    },
};