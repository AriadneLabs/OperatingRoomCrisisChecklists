export let model = {};
model.page = {
  pageNumber: '11',
  title: 'Hypoxia',
  subTitle: 'Unexplained oxygen desaturation'
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
          'Crisis manager designates checklist reader',
        ]
      },
      editable: true,
      info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.'
    },

    {
      id: '101',
      main: 'Turn FiO<sub>2</sub> to 100% <span class="plain-text">at high gas flows</span>',
      subContent: {
        contentType: 'action-list',
        items: [
          'Confirm inspired FiO<sub>2</sub> = 100% on gas analyzer',
          'Confirm presence of end-tidal CO<sub>2</sub>',
        ]
      },
    },

    {
      id: '102',
      main: 'Hand-ventilate <span class="plain-text">to assess compliance</span>',
    },

    {
      id: '103',
      main: 'Listen <span class="plain-text">to breath sounds</span>',
    },

    {
      id: '104',
      main: 'Check...',
      subContent: {
        contentType: 'action-list',
        items: [
          'Blood pressure, pulse, airway pressures',
          'Capnogram waveform',
          'Endotracheal tube/supraglottic device position',
          'Pulse oximeter placement and limb perfusion',
          'Circuit integrity: disconnection, kinks, holes',
        ]
      },
    },

    {
      id: '105',
      main: 'Consider initial stabilization actions',
      subContent: {
        contentType: 'action-list',
        items: [
          'Suction secretions',
          'Remove circuit and use self-inflating bag',
          'Alveolar recruitment maneuver and PEEP titration',
          'Bronchodilator therapy',
          'Deepen anesthetic and paralysis',
          'Optimize positioning and insufflation pressure',
        ]
      },
    },
  ], [
    {
      id: '106',
      main: 'Consider causes  - see DIFFERENTIAL Diagnosis',
      // subContent: {
      //   contentType: 'action-list',
      //   items: [
      //     {
      //       text: 'Is airway / breathing issue suspected?',
      //       subList: [],
      //       // branches: [
      //       //   {
      //       //     header: '<b>YES</b> airway issue suspected',
      //       //     sections: [
      //       //       {
      //       //         header: 'Airway / Breathing',
      //       //         subList: [
      //       //           'Right mainstem intubation',
      //       //           'Aspiration',
      //       //           'Atelectasis',
      //       //           'Bronchospasm',
      //       //           'Anaphylaxis, <span class="screen-click-only" onclick="navigateTo(\'anaphylaxis\')"><em>go to</em> CHKLST 02</span>',
      //       //           'Hypoventilation',
      //       //           'Laryngospasm',
      //       //           'Obesity / positioning',
      //       //           'Pneumothorax',
      //       //           'Pulmonary edema',
      //       //           'Auto-PEEP',
      //       //         ]
      //       //       }
      //       //     ],
      //       //   },
      //       //   {
      //       //     header: '<b>NO</b> airway issue suspected',
      //       //     sections: [
      //       //       {
      //       //         header: 'Circulation',
      //       //         subList: [
      //       //           'Embolism, <span class="screen-click-only" onclick="navigateTo(\'air_embolism\')"><em>go to</em> CHKLST 01</span>',
      //       //           'Heart disease',
      //       //           'Tamponade',
      //       //           'Septic shock',
      //       //           'Severe hypotension, <a href="/hypotension"><em>go to</em> CHKLST 10</a>',
      //       //         ]
      //       //       },
      //       //       {
      //       //         header: 'Artifacts',
      //       //         subList: [
      //       //           'Dyes (e.g. methylene blue)',
      //       //           'Hemoglobinopathies (e.g. methemoglobinemia)',
      //       //         ]
      //       //       }
      //       //     ]
      //       //   },
      //       // ],
      //     },
      //   ]
      // },
    },
    {
      id: '107',
      main: 'If hypoxia persists, consider ECMO',
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
    layout: 'vertical-sections',
    sections: [
      {
        contentType: 'drug-table',
        tableWidth: 'narrow',
        drugs: [
          {
            options: [
              {
                name: 'Albuterol',
                value: ['3 MDI puffs per ETT', '2.5  mg  via nebulizer']
              },
              {
                name: 'EPINEPHrine',
                value: ['10 - 20 MCG IV, repeat PRN',
                  {
                    defaultValue: '1 mg in 100 mL = 10 MCG/mL',
                    selectable: true,
                    deletable: true,
                    valueOptions: ['1 mg in 100 mL = 10 MCG/mL', '2mg in 100 mL = 20 MCG/mL', '1 mg in 250 mL = 4 MCG/mL', '2 mg in 250 mL = 8 MCG/mL', '1 mL of 100 MCG/mL in 9 mL = 10 MCG/mL'],
                    info: 'This is a drop down menu where you can select from methods of preparing dilute EPINEPHrine for bolus administration. You can delete the dilution instructions if desired.'
                  },
                ]
              },
            ],
          },
        ],
      },
    ],
  },
  'additional-diagnostics': {
    id: 'additional-diagnostics',
    header: 'Additional DIAGNOSTIC TESTS',
    layout: 'vertical-sections',
    sections: [
      {
        contentType: 'text',
        contentItems: [
          'Fiberoptic bronchoscopy',
          'Chest x-ray',
          'Electrocardiogram',
          'Transesophageal echocardiogram',
          'Arterial or venous blood gas',
          'Lung ultrasound',
        ]
      }
    ]
  },
  'differential-diagnosis': {
    id: 'differential-diagnosis',
    header: 'DIFFERENTIAL diagnosis',
    layout: 'horizontal-sections-noseparator',
    sections: [
      {
        header: '',
        contentType: 'text',
        contentItems: [
          '<b>Airway / Breathing</b>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Right mainstem intubation</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Aspiration</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Atelectasis</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Bronchospasm</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Anaphylaxis <span class="screen-click-only" onclick="navigateTo(\'anaphylaxis\')">(CHKLST 02)</span></div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Hypoventilation</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Laryngospasm</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Obesity / positioning</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Pneumothorax</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Pulmonary edema</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Auto-PEEP</div></div>',
        ]
      },
      {
        header: '',
        contentType: 'text',
        contentItems: [
          '<b>Circulation</b>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Embolism <span class="screen-click-only" onclick="navigateTo(\'air_embolism\')">(CHKLST 01)</span></div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Heart disease</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Tamponade</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Septic shock</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Severe hypotension <span class="screen-click-only" onclick="navigateTo(\'hypotension\')">(CHKLST 10)</span></div></div>',
          '<br>',
          '<b>Artifacts</b>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Dyes (e.g. methylene blue)</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Hemoglobinopathies (e.g. methemoglobinemia)</div></div>',
        ]
      },
    ],
  },
};