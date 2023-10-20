export let model = {};
model.page = {
    pageNumber: '06',
    title: 'Delayed Emergence',
    subTitle: 'Prolonged unresponsiveness following general anesthesia or abnormal neurologic exam following general anesthesia',
};

model.stepSets = [
    /* 1st column */
    [
        {
            id: '100',
            main: 'Call for help',
            editable: true,
            info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.',
            subContent: {
                contentType: 'action-list',
                items: [
                    '<b>Ask</b>: <em>"Who will be the crisis manager?"</em>',
                    'Crisis manager designates checklist reader',
                ]
            },
        },
        {
            id: '101',
            main: 'Ensure all anesthetic medications have been stopped',
        },
        {
            id: '102',
            main: 'Check for and correct hypoxemia, hypercarbia, hypothermia, or hypotension',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Consider signs of increased intracranial pressure (widened pulse pressure, bradycardia, irregular respirations)',
                ]
            }
        },
        {
            id: '103',
            main: 'Check for and treat residual drug effects',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Neuromuscular blockade (check TOF)',
                    'Opiates and hypnotics',
                ]
            }
        },
        {
            id: '104',
            main: 'Send labs',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Arterial blood gas, electrolytes, glucose',
                ]
            }
        },
        {
            id: '105',
            main: 'Correct electrolyte, glucose abnormalities',
        },
        {
            id: '106',
            main: 'Perform neurologic examination',
            subContent: {
                contentType: 'action-list',
                items: [
                    'If unresponsive: pupil changes, gag reflex, level of arousal',
                    {
                        text: 'If responsive: stroke assessment',
                        subList: [
                            'Facial droop - show teeth in smile',
                            'Pronator drift - eyes closed, extend arms with palms up for 10 seconds',
                            'Speech assessment - say “you can’t teach old dogs new tricks”',
                            'Assess for severe sudden headache',
                        ],
                    },
                    {
                        text: 'Consider <b>STAT head CT</b> and <b>neurology consult</b> for abnormal exam',
                        subList: [
                        ],
                        editable: true,
                        info: 'Please add details as appropriate for how to obtain a stat head CT or neurology consult at your institution.'
                    },
                ]
            }
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
                    'Serotonin syndrome',
                    'Myxedema coma or thyroid storm',
                    'Concomitant head injury',
                    'Hepatic or uremic encephalopathy',
                    'Neurosurgical complications',
                    '<span style="color: grey;">•</span> Hemorrhage',
                    '<span style="color: grey;">•</span> Vascular occlusion',
                    '<span style="color: grey;">•</span> Elevated ICP',
                    'Postictal state following intraoperative seizure',
                    'Medication error',
                    'Local Anesthetic Systemic Toxicity <span class="screen-click-only" onclick="navigateTo(\'last\')">(CHKLST 12)</span>',
                    'Central anticholinergic syndrome',
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
                tableWidth: 'narrow',
                drugs: [
                    {
                        options: [{
                            name: 'Naloxone',
                            value: ['40 MCG IV', '(0.4 mg to total 10 mL = 40 MCG/mL)', 'Repeat q 2 minutes'],
                        }],
                        afterContent: 'If no response to 400 MCG, consider non-opiate causes'
                    },
                    {
                        options: [{
                            name: 'Flumazenil',
                            value: ['0.2 mg IV', 'Repeat dose q 1 minute', 'Max dose 1 mg'],
                        }],
                        afterContent: 'AVOID in chronic benzodiazepine use or seizure history'
                    },                    
                    {
                        options: [{
                            name: 'Sugammadex',
                            value: '2 - 4 mg/kg IV',
                        }],
                    },
                ],
            },
        ],
    },
};