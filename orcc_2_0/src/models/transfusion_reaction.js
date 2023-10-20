export let model = {};
model.page = {
  pageNumber: 17,
  title: 'Transfusion Reaction',
  subTitle: '<div><b>Hemolytic Reaction:</b> Cardiac instability, bronchospasm, bleeding, dark urine</div><div><b>Non-hemolytic Reaction:</b> fever, rash, pulmonary edema</div><div><b>Anaphylactic Reaction:</b> hypotension, urticaria, bronchospasm</div>',
};

model.stepSets = [
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
      main: 'Disconnect any blood products infusing',
      subContent: {
        contentType: 'action-list',
        items: [
          'Check blood product labels for correct patient name and ABO compatibility',
          'Send the blood product(s) back to the blood bank for evaluation'
        ]
      },
    },
    {
      id: '102',
      main: 'Support hemodynamics with EPINEPHrine',
      subContent: {
        contentType: 'action-list',
        items: [
          'Repeat bolus with increasing dose as needed',
          'Consider EPINEPHrine infusion'
        ]
      }
    },
    {
      id: '103',
      main: 'Manage bronchospasm',
      subContent: {
        contentType: 'action-list',
        items: [
          'FiO<sub>2</sub> 100%',
          'Albuterol or EPINEPHrine',
        ]
      }
    },
    {
      id: '104',
      main: 'Maintain urine output if hemolysis noted',
      subContent: {
        contentType: 'action-list',
        items: [
          'Volume load 20 mL/kg crystalloid. <em>Caution if signs of volume overload.</em>',
          'Consider furosemide or mannitol to goal UOP 1-2 mL/kg/hr',
        ]
      }
    },
    {
      id: '105',
      main: 'Monitor labs',
      subContent: {
        contentType: 'action-list',
        items: [
          'Arterial or venous blood gas, electrolytes',
          {
            text: 'PT, aPTT, fibrinogen, viscoelastography',
            editable: true,
            info: 'Delete "viscoelastography" if viscoelastic testing is not available at your facility.',
            subList: []
          },
          {
            text: 'Direct antiglobulin (Coomb’s) test, haptoglobin, LDH, free hemoglobin, tryptase',
            editable: true,
            info: ' Edit the names of these tests to match the names in the orders available at your facility.',
            subList: []
          },
        ]
      }
    },
    {
      id: '106',
      main: 'Consider invasive lines',
      subContent: {
        contentType: 'action-list',
        items: [
          'Arterial line for ongoing hemodynamic instability',
          'Central venous catheter for vasopressors',
        ]
      }
    },
    {
      id: '107',
      main: 'Further treatment',
      subContent: {
        contentType: 'action-list',
        items: [
          'Consider hematology consult and ICU admission',
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
          'Anaphylaxis from other causes (<span class="screen-click-only" onclick="navigateTo(\'anaphylaxis\')">CHKLST 02</span>)',
          'Hypotension (<span class="screen-click-only" onclick="navigateTo(\'hypotension\')">CHKLST 10</span>)',
          'Transfusion Related Acute Lung Injury  (TRALI)',
          'Transfusion-Associated Circulatory Overload (TACO)',
          'Septic Shock',
          'Other hemolytic anemias (idiopathic, HUS, HELLP)',
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
                name: 'EPINEPHrine',
                value: [
                  'BOLUS: 10 -20  MCG IV',
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
                  },
                ],
              },
              {
                name: 'Furosemide',
                value: 'BOLUS 40  mg IV',
              },
              {
                name: 'Albuterol',
                value: ['2-3 puffs MDI via ETT', '2.5 mg via nebulizer',]
              }
            ],
          },
        ],
      },
    ],
  },
};