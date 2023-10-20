export let model = {};
model.page = {
  pageNumber: '04',
  title: 'Cardiac Arrest – Asystole/PEA',
  subTitle: 'Non-shockable pulseless cardiac arrest'
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
          '<b>Say</b>: <em>"The top priority is high-quality CPR"</em>',
          'Crisis manager assigns roles - see ROLE assignments box',
        ]
      }
    },
    {
      id: '101',
      main: 'Put backboard under patient',
      subContent: {
        contentType: 'action-list',
        items: [
          'Turn supine as soon as possible, but do not delay the start of compressions',
        ]
      }
    },
    {
      id: '102',
      main: 'Turn FiO<sub>2</sub> to 100%, turn off volatile anesthetic'
    },
    {
      id: '103',
      main: 'Start CPR and assessment cycle',
      subContent: {
        contentType: 'action-list',
        items: [
          {
            text: '<b>Perform CPR</b>',
            subList: [
              '“Hard and fast” about 100-120 compressions/min to depth ≥2 inches',
              'Ensure full chest recoil with minimal interruptions',
              {
                text: '10 breaths/minute, do no over-ventilate',
                subList: ['Bag-mask ventilation until able to place endotracheal tube']
              },
            ],
          },
          {
            text: '<b>Give EPINEPHrine 1mg IV</b>',
            subList: [
              'Repeat EPINEPHrine every 3-5 minutes',
            ],
          },
          {
            text: '<b>Assess every 2 minutes (limit assessment to <10 seconds)</b>',
            subList: [
              'Change CPR compression provider',
              {
                text: 'Check ETCO<sub>2</sub>',
                subList: [
                  'If: <10 mmHg, evaluate CPR technique',
                  'If: Sudden increase to >40 mmHg, may indicate return of spontaneous circulation',
                ]
              },
              {
                text: 'Check rhythm',
                subList: [
                  {
                    text: 'If: Asystole/PEA continues:',
                    subList: [
                      'Resume CPR and assessment cycle (restart Step 4)',
                      'Treat reversible causes, consider reading aloud differential diagnoses'
                    ]
                  },
                  {
                    text: 'If: VF / VT',
                    subList: [
                      'Resume CPR',
                      '<span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_vf_vt\')"><em>go to</em> CHKLST 05</span>'
                    ]
                  },
                ]
              },
            ],
          },
        ]
      }
    },
    {
      id: '104',
      main: 'Consider ECMO if refractory cardiac arrest',
      editable: true,
      deletable: true,
      info: 'Please add details about how to coordinate ECMO at your facility here, such as phone numbers or paging groups. If you do not have access to ECMO, delete this bullet point.'
    },
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
        drugs: [
          {
            options: [
              {
                name: 'EPINEPHrine',
                value: '1 mg IV, repeat every 3 - 5 minutes',
              },
            ],
          },

        ],
      },
      {
        header: 'TOXIN treatment',
        contentType: 'drug-table',
        tableWidth: 'wide',
        drugs: [
          {
            options: [
              {
                name: '<em>Local anesthetic</em>',
                value: '<em>go to</em> <span class="screen-click-only" onclick="navigateTo(\'last\')">CHKLST 12</span>'
              },
              {
                name: '<em>Beta-blocker</em>',
                value: '<b>Glucagon</b>   5 - 10 mg IV push',
              },
              {
                name: '<em>Calcium Channel Blocker</em>',
                value: '<b>Calcium chloride</b> 1g IV <br><em>- or -</em>',
              },
              {
                name: '',
                value: '<b>Calcium gluconate</b> 3g IV ',
              }
            ],
          },

        ],
      },
      {
        header: 'HYPERKALEMIA treatment',
        contentType: 'drug-table',
        tableWidth: 'wide',
        drugs: [
          {
            options: [
              {
                name: 'Calcium chloride<br><em>- or -</em><br>Calcium gluconate',
                value: '0.5 - 1 g IV<br><br>1 - 3 g IV'
              },
              {
                name: 'Sodium bicarbonate <span class="normal-weight">(if pH <7.2)</span>',
                value: '50 mEq IV',
              },
              {
                name: 'Insulin (Regular)<br><em>- and -</em><br>Dextrose',
                value: '5 - 10 units  IV<br><br>50 - 100 mL D50W IV<br><em>– or –</em><br>250 - 500 mL D10W IV',
              },
            ],
          },
        ],
      }
    ],
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
          'Surgical stimulation',
        ],
      },
    ]
  },

  'role-assignment': {
    id: 'role-assignment',
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
    ],
  }
};