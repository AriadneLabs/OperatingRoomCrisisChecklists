export let model = {};
model.page = {
    pageNumber: 12,
    title: 'Local Anesthetic Systemic Toxicity (LAST)',
    subTitle: 'Neurologic or Cardiovascular Signs/Symptoms following use of local anesthetic',
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
            main: 'Get LAST rescue kit or lipid emulsion and consider early call for ECMO',
            editable: true,
            info: 'Add location of LAST rescue kit. If your facility does not have ECMO, You may delete the second half of this line. Information about how to call ECMO can be added in editing step 7.'
        },
        {
            id: '102',
            main: 'STOP local anesthetic infusion, if running',
        },
        {
            id: '103',
            main: 'START administering lipid emulsion',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Do not delay airway protection or hemodynamic management while waiting for lipid emulsion',
                ]
            }
        },
        {
            id: '104',
            main: 'If seizing:',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Ensure adequate airway patency and ventilation',
                    'Administer benzodiazepine',
                    'If only propofol is available, administer low dose, e.g. 20 mg increments',
                ]
            }
        },
        {
            id: '105',
            main: 'If hemodynamically unstable, give low-dose EPINEPHrine',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Doses of EPINEPHrine are LOWER than ACLS recommendations',
                    'AVOID: beta blockers, calcium channel blockers, local anesthetics, and vasopressin',
                    'Ensure adequate airway patency and ventilation',
                ]
            },
        },
        {
            id: '106',
            main: 'If cardiovascular collapse is unresponsive to EPINEPHrine and lipid emulsion, initiate ECMO or cardiac bypass',
            editable: true,
            deletable: true,
            info: 'You may add details about how to coordinate ECMO at your facility here, such as phone numbers or paging groups. If you do not have access to ECMO, delete that part of the sentence. If you do not have access to ECMO or cardiopulmonary bypass, delete the whole bullet point.'
        },
        {
            id: '107',
            main: 'Continue lipid emulsion for at least 15 minutes after achieving hemodynamic stability',
        },
    ],
];

model.references = {
    'signs-and-symptoms': {
        id: 'signs-and-symptoms',
        header: 'SIGNS and SYMPTOMS',
        layout: 'vertical-sections',
        sections: [
            {
                contentType: 'text',
                contentItems: [
                    '<b>Timing</b>: onset from 60 seconds to 60 minutes following injection of local anesthetic',
                    '<b>Neurologic Symptoms</b>: neurologic excitement (agitation, metallic taste, auditory changes) -> seizures (generalized or focal) and neurologic depression',
                    '<b>Cardiac Symptoms</b>: HTN, tachycardia, arrhythmia -> bradycardia, conduction block, asystole',
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
                    'If <b>PEA</b> develops, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_pea_asystole\')"><em>go to</em> CHKLST 04</span> (note EPINEPHrine dose modifications in LAST)',
                    'If <b>VF/VT</b> develops, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_vf_vt\')"><em>go to</em> CHKLST 05</span> (note EPINEPHrine dose modifications in LAST)',
                ],
            },
        ]
    },

    'drug-doses': {
        id: 'drug-doses',
        header: 'DRUG DOSES & treatments',
        layout: 'vertical-sections-noseparator',
        sections: [
            {
                header: 'Lipid Emulsion 20%',
                contentType: 'table',
                leftItems: [' ', 'BOLUS:', 'INFUSION:'],
                contentItems: [
                    ['Weight ≥ 70 kg', '100mL IV over 2-3 min', '250mL IV over 15-20 min'],
                    ['Weight < 70 kg', '1.5 mL/kg IV over 2-3 min', '0.25 mL/kg/min IV'],
                ],
                afterContent: 'Repeat bolus and double infusion if patient remains unstable; Max lipid dose 12 mL/kg for initial dosing',
            },
            {
                header: '',
                contentType: 'text',
                contentItems: [
                    '<b>Midazolam</b> 0.05 mg/kg, max 2 mg per dose, repeat as needed <br> <em>- or -</em>',
                    '<b>LORazepam</b> 0.1 mg/kg, max 4 mg per dose, repeat as needed',
                ],
            },
            {
                header: 'EPINEPHrine',
                contentType: 'text',
                contentItems: [
                    '10 - 20 MCG IV bolus, increase as needed to max 1 MCG/kg',
                    {
                        defaultValue: '1 mg in 100 mL = 10 MCG/mL',
                        selectable: true,
                        deletable: true,
                        valueOptions: ['1 mg in 100 mL = 10 MCG/mL', '2mg in 100 mL = 20 MCG/mL', '1 mg in 250 mL = 4 MCG/mL', '2 mg in 250 mL = 8 MCG/mL', '1 mL of 100 MCG/mL in 9 mL = 10 MCG/mL'],
                        info: 'This is a drop down menu where you can select from methods of preparing dilute EPINEPHrine for bolus administration. You can delete the dilution instructions if desired.'
                    },
                ],
            },
        ],
    },
};