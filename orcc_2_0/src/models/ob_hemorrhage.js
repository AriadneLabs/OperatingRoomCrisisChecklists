export let model = {};
model.page = {
    pageNumber: 15,
    title: 'OB Hemorrhage',
    subTitle: 'Cumulative Blood Loss (intrapartum and postpartum) > 1000mL in vaginal or cesarean delivery or blood loss associated with signs or symptoms of hypovolemia within 24 hours after delivery',
};

model.stepSets = [
    /* 1st column */
    [
        {
            id: '100',
            main: 'Call for help',
            editable: true,
            subContent: {
                contentType: 'action-list',
                items: [
                    '<b>Ask</b>: <em>"Who will be the crisis manager?"</em>',
                    'Crisis manager designates checklist reader',
                    'Crisis manager designates a person to monitor estimated blood loss',
                ]
            },
            info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.',
        },
        {
            id: '101',
            main: 'Announce vital signs and cumulative blood loss every 10 minutes',
        },
        {
            id: '102',
            main: 'Open IV fluids <span class="plain-text">and</span> establish adequate IV access',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Warm patient and fluids',
                    'Insert bladder catheter',
                    'Consider arterial access',
                ]
            },
        },
        {
            id: '103',
            main: 'Turn FiO<sub>2</sub> to 100% or start supplemental oxygen',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Minimize volatile anesthetics ',
                ]
            },
        },
        {
            id: '104',
            main: 'Prepare for transfusion',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Assign 1 person as primary contact with Blood Bank',
                    {
                        text: 'Activate massive transfusion protocol',
                        subList: [],
                        editable: true,
                        deletable: true,
                        info: 'Please add details about how to activate the massive transfusion protocol at your facility and adjust terminology if needed. If your facility does not have a massive transfusion protocol, delete this bullet point.'
                    },
                    'Request rapid transfuser device',
                ]
            },
        },

        {
            id: '105',
            main: 'Send STAT labs',
            subContent: {
                contentType: 'action-list',
                items: [
                    'CBC, BMP, Type and Screen, fibrinogen, PT, aPTT, lactate',
                    {
                        text: 'Viscoelastography',
                        subList: [],
                        editable: true,
                        deletable: true,
                        info: 'Delete this bullet if viscoelastic testing is not available at your facility.'
                    }
                ]
            },
            // info: 'Consider changing the frequency to q10-15 depending on the severity of the hemorrhage.',
        },
    ],
    /* 2nd column */
    [
        {
            id: '106',
            main: 'Give uterotonic agents and tranexamic acid',
        },
        {
            id: '107',
            main: 'Begin transfusion',
            subContent: {
                contentType: 'action-list',
                items: [
                    {
                        text: 'Transfuse with products in ratio of 4 PRBCS : 4 FFP : 1 Platelet',
                        subList: [],
                        editable: true,
                        info: 'There is relatively little data to guide a fixed ratio of blood product transfusion in obstetric patients. Please edit the ratio to match your local practice.'
                    },
                    {
                        text: 'Target fibrinogen > 200 mg/dL',
                        subList: [
                            {
                                text: '10 units cryoprecipitate, expected rise 100 mg/dL',
                                deletable: true,
                                subList: []
                            },
                            {
                                text: 'Fibrinogen concentrate 4g, expected rise 100 mg/dL',
                                deletable: true,
                                subList: []
                            },
                        ],
                        info: 'If one of these products is not available at your facility, or if you prefer use of one product over the other, delete the relevant bullet point.'
                    }
                ]
            },
        },
        {
            id: '108',
            main: 'Surgical team: perform exam and uterine massage',
            subContent: {
                contentType: 'action-list',
                items: [
                    'Consider the differential diagnosis (see box)',
                    'Consider D+C, laceration repair, uterine tamponade',
                    {
                        text: 'If bleeding unresponsive, consider uterine artery ligation or hysterectomy, or Interventional Radiology for embolization',
                        editable: true,
                        subList: [],
                        info: 'You may edit this box to include institution-specific phone numbers or protocols for activating OR or IR resources in obstetric emergencies.'
                    }
                ]
            },
        },
    ]
];

model.references = {
    'differential-diagnosis': {
        id: 'differential-diagnosis',
        header: 'DIFFERENTIAL diagnosis',
        layout: 'vertical-sections',
        sections: [
            {
                contentType: 'list',
                contentItems: [
                    '<b>Tone</b> (uterine atony)',
                    '<b>Trauma</b> (lacerations or uterine rupture)',
                    '<b>Tissue</b> (retained placenta)',
                    '<b>Thrombin</b> (clotting factor deficiency)',
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
                contentType: 'text',
                contentItems: [
                    '<b>Oxytocin (Pitocin)</b>',
                    {
                        main: '3 units IV BOLUS or 5-10 units IM BOLUS',
                        editable: true,
                        info: 'Please edit this to match your institutional high-dose oxytocin protocols if different.',
                    },
                    '— followed by —',
                    {
                        main: '10 - 40 units in 500 - 1000 mL IV INFUSION',
                        editable: true,
                        info: 'Please edit this to match your institutional high-dose oxytocin protocols if different.',
                    },
                    '&emsp; <em>Caution in  hypotension</em>',
                    '<br>',
                    '<b>Methylergonovine maleate (Methergine)</b>',
                    '0.2 mg IM q 2 - 4 hours',
                    '&emsp; DO NOT administer IV',
                    '&emsp; <em>Caution in hypertension, cardiac disease</em>',
                    '<br>',
                    '<b>Carboprost tromethamine (Hemabate)</b>',
                    '250 MCG q 15 - 90 min IM x8 max',
                    '&emsp; DO NOT administer IV',
                    '&emsp; <em>Caution in asthma, HTN</em>',
                    '<br>',
                    '<b>miSOPROStol (Cytotec)</b>',
                    '800 - 1000 MCG PR/buccal/SL  x1 dose',
                    '<br>',
                    '<b>Tranexamic Acid (TXA)</b>',
                    '1000mg IV over 10 min, repeat x1 after 30 min',
                    '<br>',
                    '<b>Calcium Chloride</b>',
                    '1g per 5 units product',
                    '<em>&#8212;or&#8212;</em>',
                    '<b>Calcium Gluconate</b>',
                    '1g per 3 units product'
                ]
            },
        ],
    },
};