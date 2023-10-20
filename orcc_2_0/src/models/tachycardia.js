export let model = {};
model.page = {
    pageNumber: '16',
    title: 'Tachycardia - Unstable',
    subTitle: 'Persistent tachycardia with hypotension, ischemic chest pain, altered mental status, or shock'
};

model.stepSets = [
    [
        {
            id: '100',
            main: 'Call for help and a code cart',
            editable: true,
            subContent: {
                contentType: 'action-list',
                items: [
                    '<b>Ask</b>: <em>"Who will be the crisis manager?"</em>',
                    'Crisis manager designates checklist reader',
                ]
            },
            info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.',
        },
        {
            id: '101',
            main: 'Turn FiO<sub>2</sub> to 100% <span class="plain-text">and</span> turn down volatile anesthetic',
        },
        {
            id: '102',
            main: 'Analyze rhythm',
            subContent: {
                contentType: 'action-list',
                items: [
                    'If <b>wide complex, irregular</b>: treat as VF, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_vf_vt\')"><em>go to</em> CHKLST 05</span>',
                    'If <b>narrow complex, regular</b>: consider adenosine while awaiting cardioversion',
                ]
            },
        },
        {
            id: '103',
            main: 'Prepare for immediate synchronized cardioversion',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Sedate conscious patients unless deteriorating rapidly',
                ]
            }
        },
        {
            id: '104',
            main: 'Cardiovert per instructions in gray box',
            subContent: {
                contentType: 'action-list',
                items: [
                    'If <b>cardioversion needed and unable to synchronize</b>, use high-energy unsynchronized shocks (biphasic - select highest setting, monophasic - 360 J)'
                ]
            }
        },
        {
            id: '105',
            main: 'If resistant to electrical conversion, consider amiodarone',
        },
        {
            id: '106',
            main: 'Consider cardiology consultation',
        }
    ]
];

model.references = {
    'drug-doses': {
        id: 'drug-doses',
        header: 'DRUG DOSES & treatments',
        layout: 'vertical-sections-noseparator',
        sections: [
            {
                header: '',
                contentType: 'drug-table',
                tableWidth: 'narrow',
                drugs: [
                    {
                        options: [
                            {
                                name: 'Adenosine',
                                value: ['6 mg rapid IV push', 'If persistent, 12 mg rapid IV push', '<em>Caution in severe asthma</em>'],
                            },
                            {
                                name: 'Amiodarone',
                                value: ['150 mg IV over 10 minutes', 'May repeat x1'],
                            },
                        ],
                    },
                ],
            },
        ],
    },

    'synchronized-cardioversion': {
        id: 'synchronized-cardioversion',
        header: 'SYNCHRONIZED CARDIOVERSION Instructions',
        layout: 'vertical-sections',
        sections: [
            {
                contentType: 'numbered-list',
                editable: true,
                info: 'Please edit instructions for use to be specific to your institution’s device(s). Please limit content to 10 lines.',
                contentItems: [
                    {
                        main: 'Turn monitor/defibrillator ON, set to defibrillator mode',
                        editable: true,
                        deletable: true,
                    },
                    {
                        main: 'Place electrodes on chest',
                        editable: true,
                        deletable: true,
                    },
                    {
                        main: 'Engage synchronization mode',
                        editable: true,
                        deletable: true,
                    },
                    {
                        main: 'Adjust EKG if necessary until SYNC markers seen with each R-wave',
                        editable: true,
                        deletable: true,
                    },
                    {
                        main: 'Select energy level',
                        editable: true,
                        deletable: true,
                    },
                    {
                        main: 'Press charge button',
                        editable: true,
                        deletable: true,
                    },
                    {
                        main: 'Press and hold shock button',
                        editable: true,
                        deletable: true,
                    },
                    {
                        main: 'Check monitor, if tachycardia persists, increase energy level',
                        editable: true,
                        deletable: true,
                    },
                    {
                        main: 'Engage synchronization mode after delivery of each shock',
                        editable: true,
                        deletable: true,
                    },
                ]
            }
        ]
    },

    'energy-level': {
        id: 'energy-level',
        header: 'ENERGY Level',
        layout: 'vertical-sections-noseparator',
        sections: [
            {
                header: '',
                contentType: 'drug-table',
                tableWidth: 'wide',
                drugs: [
                    {
                        options: [
                            {
                                name: '<b>CONDITION</b>',
                                value: '<b>ENERGY LEVEL</b>',
                            },
                            {
                                name: 'Narrow complex, regular',
                                value: '50 J - 100 J',
                            },
                            {
                                name: 'Narrow complex, irregular',
                                value: '120 J - 200 J biphasic;<br>200 J monophasic',
                            },
                            {
                                name: 'Wide complex, regular',
                                value: '100 J',
                            },
                            {
                                name: 'Wide complex, irregular',
                                value: 'Treat as VF, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_vf_vt\')"><em>go to</em> CHKLST 05</span>',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    'critical-changes': {
        id: 'critical-changes',
        header: 'Critical CHANGES',
        layout: 'vertical-sections',
        sections: [
            {
                contentType: 'text',
                contentItems: [
                    'If <b>Cardiac Arrest</b> develops:',
                    '<span style="color: grey;">•</span> Asystole/PEA, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_pea_asystole\')"><em>go to</em> CHKLST 04</span>',
                    '<span style="color: grey;">•</span> VF/VT, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_vf_vt\')"><em>go to</em> CHKLST 05</span>',
                ],
            },
        ]
    },
};