export let model = {};
model.page = {
  pageNumber: '02',
  title: 'Anaphylaxis',
  subTitle: 'Hypotension, bronchospasm, high peak-airway pressures, decreased breath sounds, tachycardia, urticaria'
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
          'Crisis manager designates checklist reader'
        ]
      }
    },
    {
      id: '101',
      main: 'Give EPINEPHrine bolus',
      subContent: {
        contentType: 'action-list',
        items: [
          'Repeat bolus with increasing dose as needed',
          'Consider EPINEPHrine infusion',
        ]
      }
    },
    {
      id: '102',
      main: 'Establish/secure airway',
      subContent: {
        contentType: 'action-list',
        items: [
          '<b>Turn FiO<sub>2</sub> to 100%</b> or start supplemental oxygen',
        ]
      }
    },
    {
      id: '103',
      main: 'Remove potential causative agents',
    },
    {
      id: '104',
      main: 'Give fluid bolus',
    },

    {
      id: '105',
      main: 'Consider...',
      subContent: {
        contentType: 'action-list',
        items: [
          'Minimize volatile anesthetics if patient remains unstable',
          'Consider albuterol as adjunctive therapy for bronchospasm unresponsive to EPINEPHrine',
          'Vasopressin bolus and/or infusion for patients with hypotension unresponsive to EPINEPHrine',
          'Terminate procedure',
          {
            text: 'Once hemodynamically stable:',
            subList: [
              'Supplemental treatment with diphenhydrAMINE and corticosteroids',
              'Tryptase level: Check within first hour, repeat at 4 and 18-24 hours'
            ]
          }
        ]
      }
    }
  ]

];

model.references = {
  'common-causative-agents': {
    id: 'common-agents',
    header: 'Common CAUSATIVE AGENTS',
    layout: 'vertical-sections',
    sections: [
      {
        contentType: 'text',
        contentItems: [
          'Neuromuscular blocking agents',
          'Antibiotics',
          'Latex products',
          'IV contrast and dyes',
          'Sugammadex',
          'Allogenic blood components (<em>go to</em> <span class="screen-click-only" onclick="navigateTo(\'transfusion_reaction\')">CHKLST 17</span>)',
          'Chlorhexidine',
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
          'If <b>Cardiac Arrest</b> develops:',
          '<span style="color: grey;">•</span> Asystole/PEA, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_pea_asystole\')"><em>go to</em> CHKLST 04</span>',
          '<span style="color: grey;">•</span> VF/VT, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_vf_vt\')"><em>go to</em> CHKLST 05</span>',
          'If <b>airway obstruction</b> develops, <span class="screen-click-only" onclick="navigateTo(\'failed_airway\')"><em>go to</em> CHKLST 07</span>'
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
        header: '',
        contentType: 'drug-table',
        tableWidth: 'narrow',
        drugs: [
          {
            options: [
              {
                name: 'EPINEPHrine',
                value: [
                  'BOLUS: 10 - 50 MCG IV',
                  {
                    defaultValue: '1 mg in 100 mL = 10 MCG/mL',
                    selectable: true,
                    deletable: true,
                    valueOptions: ['1 mg in 100 mL = 10 MCG/mL', '2mg in 100 mL = 20 MCG/mL', '1 mg in 250 mL = 4 MCG/mL', '2 mg in 250 mL = 8 MCG/mL', '1 mL of 100 MCG/mL in 9 mL = 10 MCG/mL'],
                    info: 'This is a drop down menu where you can select from methods of preparing dilute EPINEPHrine for bolus administration. You can delete the dilution instructions if desired.'
                  },
                  {
                    defaultValue: 'INFUSION: 0.01- 0.1 MCG/kg/min',
                    selectable: true,
                    valueOptions: ['INFUSION: 0.01 - 0.1 MCG/kg/min', 'INFUSION: 1 - 10 MCG/min'],
                    info: 'This is a drop down menu where you can select from dose ranges for MCG/min or MCG/kg/min.'
                  },
                  'If no IV access, 0.3 mg IM'
                ],
              },
              {
                name: 'Vasopressin',
                value: [
                  'BOLUS: 1-2 units IV',
                  {
                    defaultValue: '1 mL of 20 units/mL in 19 mL = 1 unit/mL',
                    deletable: true,
                    info: 'You can delete this dilution instruction if desired.'
                  },
                  'INFUSION: 0.03 units/min'
                ],
              },
              {
                name: 'Albuterol',
                value: [
                  '2-3 puffs MDI',
                  '2.5 mg via nebulizer',
                ],
              },
            ]
          },
        ]
      },
      {
        header: 'Supplemental Treatment',
        contentType: 'drug-table',
        drugs: [
          {
            options: [
              {
                name: 'diphenhydrAMINE',
                value: [
                  '25 - 50 mg IV',
                ],
              },
              {
                name: 'Corticosteroids',
                value: [
                  'Hydrocortisone 100 mg IV',
                  'Methylprednisolone 1 mg/kg IV'
                ],
              },
            ]
          }
        ]
      }
    ],
  },
}