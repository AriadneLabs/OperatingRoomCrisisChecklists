export let model = {};
model.page = {
  pageNumber: '09',
  title: 'Hemorrhage',
  subTitle: 'Acute massive bleeding'
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
      info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.'
    },

    {
      id: '101',
      main: 'Crystalloid bolus until blood products available',
    },

    {
      id: '102',
      main: 'Obtain large bore IV access, rapid infuser',
      subContent: {
        contentType: 'action-list',
        items: [
          'Obtain arterial access'
        ]
      },
      editable: true,
      info: 'Please edit this line with the details about your institution’s rapid infuser device(s), e.g. “obtain large bore IV access and the Belmont”',
    },

    {
      id: '103',
      main: 'Turn FiO<sub>2</sub> to 100% <span class="plain-text">and</span> reduce volatile anesthetics',
    },

    {
      id: '104',
      main: 'Call blood bank',
      editable: true,
      subContent: {
        contentType: 'action-list',
        items: [
          {
            text: 'Activate massive transfusion protocol',
            editable: true,
            deletable: true,
            info: 'Please add details about how to activate the massive transfusion protocol at your facility. If your facility does not have a massive transfusion protocol, delete this bullet point.',
            subList: [
              'Consider <b>whole blood</b>',
              'Consider <b>uncrossmatched Type O RBC</b> and <b>Type AB plasma</b>',
              {
                text: 'Consider <b>autologous blood salvage</b>',
                editable: true,
                deletable: true,
                info: 'If autologous blood salvage is not in use at your facility, consider deleting',
                subList: []
              }
            ],
          },
          'Assign 1 person as primary contact for blood bank',
        ]
      },
      info: 'Please add details about how to communicate with the Blood Bank at your institution.'
    },

    {
      id: '105',
      main: 'Begin transfusion in 1 PRBC : 1 FFP : 1 Platelet',
      editable: true,
      info: 'Please edit the ratio to match your local practice if it differs from 1:1:1.',
      subContent: {
        contentType: 'action-list',
        items: [
          'Calcium repletion for massive transfusion',
          'Fibrinogen replacement as indicated'
        ]
      },
    },

    {
      id: '106',
      main: 'Consider TXA administration',
    },

    {
      id: '107',
      main: 'Warm patient and fluids',
    },

  ], [
    {
      id: '108',
      main: 'Discuss management plan <span class="plain-text">with surgical, anesthesiology, and nursing teams</span>',
      subContent: {
        contentType: 'action-list',
        items: [
          'Call for additional surgery consultation as indicated',
          'Consider damage control surgery (pack, close, resuscitate)',
          {
            text: 'Consider resuscitative endovascular balloon occlusion of the aorta (REBOA) for hemorrhage below the diaphragm',
            subList: [],
            editable: true,
            deletable: true,
            info: 'Please add details about how to coordinate placing a REBOA at your facility here, such as phone numbers or paging groups. If you do not have access to the resources to place a REBOA, delete this bullet point.'
          },
          {
            text: 'Consider ECMO or cardiac bypass to facilitate surgical repair',
            subList: [],
            editable: true,
            deletable: true,
            info: 'Please add details about how to coordinate ECMO or cardiopulmonary bypass at your facility here, such as phone numbers or paging groups. If you do not have access to ECMO and cardiopulmonary bypass, delete this bullet point.'
          }
        ]
      },
    },

    {
      id: '109',
      main: 'Send labs',
      subContent: {
        contentType: 'action-list',
        items: [
          'CBC, PT / PTT / INR, fibrinogen, lactate, arterial blood gas, potassium, and ionized calcium',
          {
            text: 'Viscoelastography',
            subList: [],
            editable: true,
            deletable: true,
            info: 'Delete this bullet if viscoelastic testing is not available at your facility. If you do have viscoelastography available, you may edit to add your brand - “viscoelastography (TEG)”.'
          }
        ]
      }
    },

    {
      id: '110',
      main: 'Consider re-dosing antibiotics <span class="plain-text">if EBL > 1500 mL</span>',
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
        header: 'ANTIFIBRINOLYTIC treatment',
        contentType: 'drug-table',
        drugs: [
          {
            options: [
              {
                name: 'Tranexamic Acid (TXA)',
                value: [
                  'BOLUS: 1 g IV',
                  'Over 10 min',
                  'INFUSION: 1 g/500 mL',
                  'Over 8 hours',
                ],
              },
            ],
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
                value: '1 g per 3 units product<br><br>1 g per 5 units product',
              },
            ],
            afterContent: 'Adjust to measured ionized calcium'
          },
        ],
      },
      {
        header: 'HYPERKALEMIA treatment',
        contentType: 'drug-table',
        drugs: [
          {
            options: [
              {
                name: 'Insulin (Regular)<br><em>- and -</em><br>Dextrose',
                value: '5 - 10 units IV <br><br>50 - 100 mL D50W IV<br><em>- or -</em><br>250 - 500 mL D10W IV',
              },
              {
                name: 'Sodium bicarbonate<br><span class="normal-weight">(if pH &lt; 7.2)</span>',
                value: '50 mEq IV',
              },
            ],
          },
        ],
      }
    ],
  },
};