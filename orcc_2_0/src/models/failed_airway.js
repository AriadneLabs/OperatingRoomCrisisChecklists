export let model = {};
model.page = {
    pageNumber: '07',
    title: 'Failed Airway',
    subTitle: '2 unsuccessful intubation attempts by an airway expert in a patient under general anesthesia'
};

model.stepSets = [
    /* 1st column */
    [
        {
            id: '100',
            main: 'Call for help and a code cart',
            subContent: {
                contentType: 'action-list',
                items: [
                    '<b>Ask</b>: <em>"Who will be the crisis manager?"</em>',
                    'Crisis manager designates checklist reader'
                ]
            },
            editable: true,
            info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.',
        },
        {
            id: '101',
            main: 'Get difficult airway cart',
            editable: true,
            info: 'Specify location of airway cart'
        },
        {
            id: '102',
            main: 'Monitor elapsed TIME, intubation ATTEMPTS, and SpO<sub>2</sub>',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Limit attempts to 3 by initial provider plus 1 attempt by other airway expert (<b>“3+1”</b>)'
                ]
            }
        },
        {
            id: '103',
            main: 'Bag-mask ventilation with 100% Oxygen',
            subContent: {
                contentType: 'action-list',
                items: [
                    {
                        text: 'Is ventilation adequate?',
                        subList: [
                            'Maintaining adequate SpO<sub>2</sub>?',
                            'Capnographic evidence of adequate ventilation?',
                        ],
                    },
                ]
            }
        },

    ]
];

model.infoTable = {
    separator: 'Switch list if ventilation status changes',
    'left': {
        header: 'Ventilation <b>NOT ADEQUATE</b>',
        subContent: {
            contentType: 'action-list',
            items: [
                {
                    text: 'Consider/attempt supraglottic airway',
                    subList: [
                        'Optimize patient position',
                    ],
                },
                {
                    text: 'If unsuccessful, attempt alternative intubation approaches as you <b>prepare</b> for emergency invasive airwayy',
                    subList: [
                        'Limit to <b>“3+1”</b>',
                    ],
                },
                {
                    text: 'If you remain unable to intubate and unable to ventilate, <b>implement</b> emergency invasive airway',
                    subList: [],
                    addable: true,
                    addableInfo: 'Please add a sub-bullet point to this list with details about how to obtain emergency invasive airway equipment and/or personnel.',
                }
            ]
        }
    },
    right: {
        header: 'Ventilation <b>ADEQUATE</b>',
        subContent: {
            contentType: 'action-list',
            items: [
                {
                    text: 'Attempt alternative intubation techniques',
                    subList: [
                        'Limit to <b>“3+1”</b>',
                    ],
                },
                'Consider doing the procedure with a supraglottic or mask airway',
                'Optimize ventilation/intubating conditions',
                'Consider invasive airway',
                'Consider awakening patient',
                {
                    text: 'If awakening patient, consider:',
                    subList: [
                        'Awake intubation',
                        'Complete procedure under local or regional',
                        'Cancel the procedure',
                    ],
                },
            ]
        }
    }
};

model.references = {
    'intubation-techniques': {
        id: 'intubation-techniques',
        header: 'Alternative INTUBATION TECHNIQUES',
        layout: 'vertical-sections',
        sections: [
            {
                contentType: 'text',
                contentItems: [
                    {
                        main: 'Video laryngoscope',
                        deletable: true,
                    },
                    {
                        main: 'Intubation via supraglottic device',
                        deletable: true,
                    },
                    {
                        main: 'Different blades',
                        deletable: true,
                    },
                    {
                        main: 'Intubating stylet',
                        deletable: true,
                    },
                    {
                        main: 'Gum elastic bougie',
                        deletable: true,
                    },
                    {
                        main: 'Flexible bronchoscope',
                        deletable: true,
                    },
                    {
                        main: 'Lightwand',
                        deletable: true,
                    },
                    {
                        main: 'Retrograde intubation',
                        deletable: true,
                    },
                    {
                        main: 'Blind oral or nasal intubation',
                        deletable: true,
                    },
                ],
                editable: true,
                info: 'Please add or delete equipment to match what is available at your institution.',
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
                tableWidth: 'narrow',
                drugs: [
                    {
                        options: [{
                            name: 'Sugammadex',
                            value: '8 - 16 mg/kg IV',
                        }],
                    },
                    {
                        options: [{
                            name: 'Naloxone',
                            value: ['0.4 mg IV '],
                        }],                        
                    },
                    {
                        options: [{
                            name: 'Flumazenil',
                            value: ['0.2 mg IV', 'May repeat up to 1 mg'],
                        }],
                        afterContent: 'AVOID in chronic benzodiazepine use or seizure history'
                    },                    
                    
                ],
            },
        ],
    },
};